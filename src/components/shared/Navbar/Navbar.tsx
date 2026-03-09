"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout } from "@/redux/features/auth";
import { useGetUserQuery } from "@/redux/service/profileData";
import { RootState } from "@/redux/store";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Drawer, Dropdown, Typography } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const { Text } = Typography;

type NavLink = {
  id: string;
  href: string;
  label: string;
};

const NAV_LINKS: NavLink[] = [
  { id: "how-it-works", href: "/#how-it-works", label: "HOW IT WORKS" },
  { id: "templates", href: "/#templates", label: "TEMPLATES" },
  { id: "pricing", href: "/#pricing", label: "PRICING" },
  { id: "ai-tools", href: "/#ai-tools", label: "AI TOOLS" },
];

function BrandLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0f172a] text-sm font-bold text-white">
        N
      </span>
      <span className="leading-tight">
        <span className="block text-[1.05rem] font-extrabold tracking-tight text-[#0f172a]">
          NOMAD <span className="text-[#2458f5]">CV</span>
        </span>
        <span className="block text-[0.52rem] font-medium tracking-[0.11em] text-[#6b7280]">
          SIMPLE - RAPIDE - SANS FRONTIERES
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const dispatch = useDispatch();

  const sign = useSelector((state: RootState) => state.auth.user);
  const role = sign?.role;
  const { data: userData } = useGetUserQuery();
  const imageUrl = userData?.data?.profile?.Image?.[0]?.url;

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = NAV_LINKS.map((link) => link.href.replace("/#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => !!section);

    if (window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      setActiveSection(hashId);
    } else if (sections[0]) {
      setActiveSection(sections[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  const avatarMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "profileOrDashboard",
        label: (
          <Link href={role === "ADMIN" ? "/dashboard" : "/profile"}>
            <Text strong>{role === "ADMIN" ? "Admin Dashboard" : "View Profile"}</Text>
          </Link>
        ),
      },
      { type: "divider" },
      {
        key: "logout",
        label: (
          <Text
            onClick={() => dispatch(logout())}
            className="!w-full block"
            strong
            style={{ color: "#ef4444" }}
          >
            Log Out
          </Text>
        ),
      },
    ],
    [dispatch, role]
  );

  const isLinkActive = (href: string, id: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && activeSection === id;
    }
    return pathname === href;
  };

  return (
    <header className="w-full">
      <div className={cn("w-full transition-all duration-300", isSticky ? "h-[68px]" : "h-[80px]")} />

      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-[#d9dfeb] backdrop-blur transition-all duration-300",
          isSticky ? "bg-white/95 shadow-md" : "bg-white"
        )}
      >
        <div
          className={cn(
            "w-full bg-[#1f1f1f] transition-all duration-300",
            isSticky ? "h-1.5" : "h-3"
          )}
        />

        <div
          className={cn(
            "mx-auto flex w-full max-w-[1240px] items-center justify-between px-3 sm:px-6 lg:px-8 transition-all duration-300",
            isSticky ? "h-[62px]" : "h-[68px]"
          )}
        >
          <BrandLogo />

          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={cn(
                  "text-[1.02rem] font-medium tracking-tight text-[#111827] transition-colors hover:text-[#2458f5]",
                  isLinkActive(link.href, link.id) ? "font-semibold text-[#2458f5]" : ""
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            {!sign ? (
              <>
                <Link href="/login" className="text-[1.01rem] font-medium text-[#111827] hover:text-[#2458f5]">
                  SIGN IN
                </Link>
                <Button asChild className="h-10 rounded-xl bg-[#2458f5] px-6 text-sm font-bold text-white hover:bg-[#1f4ed9]">
                  <Link href="/signup">CREATE MY CV</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="h-10 rounded-xl bg-[#2458f5] px-6 text-sm font-bold text-white hover:bg-[#1f4ed9]">
                  <Link href="/profile">CREATE MY CV</Link>
                </Button>
                <Dropdown menu={{ items: avatarMenuItems }} trigger={["click"]} placement="bottomRight">
                  <div className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-[#f3f6fb] cursor-pointer">
                    <Avatar
                      src={imageUrl || "https://i.pravatar.cc/120?img=12"}
                      className="border border-[#d8deea]"
                      alt="User Avatar"
                      size={34}
                    />
                    <div className="leading-tight">
                      <Text strong className="text-[12px] text-[#0f172a]">
                        {sign?.name}
                      </Text>
                    </div>
                    <DownOutlined className="text-[10px] text-[#64748b]" />
                  </div>
                </Dropdown>
              </>
            )}
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#d7deea] text-[#111827] lg:hidden"
            aria-label="Open menu"
          >
            <IoMenu size={22} />
          </button>
        </div>
      </div>

      <Drawer
        placement="left"
        width={300}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        closeIcon={false}
        styles={{ body: { padding: 0 }, header: { borderBottom: "1px solid #e6ebf5" } }}
        title={<BrandLogo />}
        extra={
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-1 text-[#64748b] hover:text-[#0f172a]"
            aria-label="Close menu"
          >
            <IoClose size={20} />
          </button>
        }
      >
        <div className="px-4 py-5">
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="block rounded-lg px-3 py-3 text-sm font-semibold text-[#0f172a] hover:bg-[#eff4ff]"
                onClick={() => setDrawerOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 border-t border-[#e6ebf5] pt-5">
            {!sign ? (
              <div className="space-y-3">
                <Button asChild variant="outline" className="h-10 w-full border-[#cfd9ec] text-[#0f172a]">
                  <Link href="/login" onClick={() => setDrawerOpen(false)}>
                    <UserOutlined className="mr-2" />
                    SIGN IN
                  </Link>
                </Button>
                <Button asChild className="h-10 w-full bg-[#2458f5] font-semibold text-white hover:bg-[#1f4ed9]">
                  <Link href="/signup" onClick={() => setDrawerOpen(false)}>
                    CREATE MY CV
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button asChild className="h-10 w-full bg-[#2458f5] font-semibold text-white hover:bg-[#1f4ed9]">
                  <Link href="/profile" onClick={() => setDrawerOpen(false)}>
                    CREATE MY CV
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-full border-[#cfd9ec] text-[#ef4444] hover:text-[#ef4444]"
                  onClick={() => {
                    dispatch(logout());
                    setDrawerOpen(false);
                  }}
                >
                  Log Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </header>
  );
}
