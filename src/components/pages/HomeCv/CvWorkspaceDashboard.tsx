"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { logout } from "@/redux/features/auth";
import { RootState } from "@/redux/store";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  FilePlus2,
  FileText,
  History,
  PencilLine,
  Plus,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type WorkspaceTab = "my-cvs" | "account" | "history";

type CvItem = {
  id: string;
  title: string;
  modified: string;
  status: "completed" | "draft";
};

const cvItems: CvItem[] = [
  {
    id: "cv-1",
    title: "CV Developpeur Full Stack",
    modified: "2/18/2024",
    status: "completed",
  },
  {
    id: "cv-2",
    title: "CV Agent d'Accueil Station",
    modified: "2/20/2024",
    status: "draft",
  },
];

export default function CvWorkspaceDashboard() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("my-cvs");
  const sign = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const tabItems = useMemo(
    () => [
      { id: "my-cvs" as const, label: "My CVs", icon: FileText },
      { id: "account" as const, label: "My Account", icon: Settings },
      { id: "history" as const, label: "History", icon: History },
    ],
    []
  );

  return (
    <section className="min-h-[calc(100vh-140px)] bg-[#e9eef5] px-3 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[1160px]">
        <div className="mb-4 flex items-center justify-end gap-4 text-sm text-[#334155]">
          <span className="truncate font-medium">{sign?.name ?? "Jean Dupont"}</span>
          <button
            type="button"
            onClick={() => dispatch(logout())}
            className="inline-flex items-center gap-1.5 font-semibold text-[#ef4444] hover:text-[#dc2626]"
          >
            <Trash2 className="h-4 w-4" />
            Logout
          </button>
        </div>

        <Card className="rounded-2xl border-[#d3dbe8] bg-white shadow-sm">
          <CardContent className="grid grid-cols-1 gap-2 p-2 md:grid-cols-3">
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "inline-flex h-12 items-center justify-center gap-2 rounded-xl text-base font-semibold transition-colors",
                    isActive ? "bg-[#2458f5] text-white" : "text-[#334155] hover:bg-[#f1f5fb]"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </CardContent>
        </Card>

        {activeTab === "my-cvs" && (
          <div className="mt-4 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                <Input
                  placeholder="Search a CV..."
                  className="h-12 rounded-2xl border-[#cdd8e7] bg-[#eef3fa] pl-10 text-sm text-[#334155]"
                />
              </div>
              <Button className="h-12 rounded-2xl bg-[#2458f5] px-6 text-sm font-bold text-white hover:bg-[#1f4ed9]">
                <Plus className="h-4 w-4" />
                New CV
              </Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {cvItems.map((item) => (
                <Card key={item.id} className="overflow-hidden rounded-2xl border-[#d3dbe8] bg-white shadow-sm">
                  <div className="relative flex h-36 items-center justify-center bg-[#edf2fa]">
                    <FileText className="h-14 w-14 text-[#84b6f7]" />
                    <span
                      className={cn(
                        "absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold",
                        item.status === "completed"
                          ? "bg-[#22c55e] text-white"
                          : "bg-[#f97316] text-white"
                      )}
                    >
                      {item.status === "completed" ? "Completed" : "Draft"}
                    </span>
                  </div>

                  <CardContent className="space-y-3 p-4 pt-4">
                    <div>
                      <h3 className="text-[1.6rem] font-bold text-[#0f172a]">{item.title}</h3>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-[1rem] text-[#475569]">
                        <Clock3 className="h-4 w-4" />
                        Modified on {item.modified}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button className="h-9 flex-1 rounded-xl bg-[#2458f5] text-sm font-semibold text-white hover:bg-[#1f4ed9]">
                        <PencilLine className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-lg border-[#d2dceb] bg-[#f8fafc] text-[#475569]"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-lg border-[#d2dceb] bg-[#f8fafc] text-[#475569]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="flex min-h-[282px] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-[#89b7ff] bg-[#eef4ff] shadow-none transition-colors hover:bg-[#e6efff]">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#dbe8ff] text-[#2458f5]">
                    <FilePlus2 className="h-8 w-8" />
                  </div>
                  <p className="text-[1.8rem] font-bold text-[#0f172a]">Create a new CV</p>
                  <p className="mt-1 text-[1.05rem] text-[#64748b]">With our AI assistant</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "account" && (
          <div className="mt-4 space-y-4">
            <Card className="rounded-2xl border-[#d3dbe8] bg-white shadow-sm">
              <CardContent className="space-y-4 p-5 sm:p-6">
                <h2 className="text-[2rem] font-bold text-[#0f172a]">Personal information</h2>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#334155]">Full name</label>
                  <Input defaultValue={sign?.name ?? "Jean Dupont"} className="h-11 rounded-xl border-[#cfd9e9] bg-white" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#334155]">Email</label>
                  <Input defaultValue="jean.dupont@email.com" className="h-11 rounded-xl border-[#cfd9e9] bg-white" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#334155]">Phone</label>
                  <Input defaultValue="+33 6 12 34 56 78" className="h-11 rounded-xl border-[#cfd9e9] bg-white" />
                </div>

                <Button className="h-11 rounded-xl bg-[#2458f5] px-6 text-sm font-bold text-white hover:bg-[#1f4ed9]">
                  Save changes
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-[#f0cf78] bg-[#fff8e8] shadow-none">
              <CardContent className="space-y-2 p-5 sm:p-6">
                <h3 className="text-[2rem] font-bold text-[#0f172a]">Need help?</h3>
                <p className="text-[1.05rem] text-[#475569]">Our support team is here to help you.</p>
                <Link href="mailto:nomadcv13.assistance@gmail.com" className="text-[1.05rem] font-semibold text-[#b45309] underline">
                  nomadcv13.assistance@gmail.com
                </Link>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "history" && (
          <div className="mt-4 space-y-4">
            <Card className="rounded-2xl border-[#d3dbe8] bg-white shadow-sm">
              <CardContent className="space-y-5 p-5 sm:p-6">
                <h2 className="text-[2rem] font-bold text-[#0f172a]">Payment history</h2>
                <div className="flex flex-col gap-4 rounded-xl bg-[#f3f5f9] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[1.2rem] font-bold text-[#0f172a]">CV Premium</p>
                      <p className="text-[1rem] text-[#64748b]">20 Fevrier 2024</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[1.3rem] font-bold text-[#0f172a]">9.90 EUR</p>
                    <p className="text-sm font-semibold text-[#16a34a]">Paid</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-[#f0cf78] bg-[#fff8e8] shadow-none">
              <CardContent className="space-y-1 p-5 sm:p-6">
                <p className="inline-flex items-center gap-2 text-[1.15rem] font-bold text-[#92400e]">
                  <AlertTriangle className="h-4 w-4" />
                  No refund policy
                </p>
                <p className="text-[1.05rem] text-[#92400e]">All payments are final and non-refundable.</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between text-xs text-[#64748b]">
          <span className="inline-flex items-center gap-1">
            <Check className="h-3 w-3 text-[#16a34a]" />
            Design only mode
          </span>
          <Link href="/#templates" className="text-[#2458f5] hover:underline">
            Back to templates
          </Link>
        </div>
      </div>
    </section>
  );
}

