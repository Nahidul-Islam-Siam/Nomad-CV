import AdminLayout from "@/components/shared/layout/Layout";
import Link from "next/link";
import { ReactNode } from "react";
import {
  FaHome,
  FaUserCheck,
  FaUsers,
  FaBuilding,
  FaFileAlt,
  FaRegBuilding,
  FaMoneyBillWave,
} from "react-icons/fa"; // import icons from react-icons

interface MenuItem {
  label: React.ReactNode;
  key: React.Key;
  href?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

const navItems: MenuItem[] = [
  {
    label: (
      <Link
        href="/dashboard"
        className="flex gap-2 items-center py-3 hover:bg-gray-100"
      >
        <FaHome className="w-5 h-5" />
        <span className="text-sm">Dashboard</span>
      </Link>
    ),
    key: "dashboard",
  },

  {
    label: (
      <Link
        href="/dashboard/agents"
        className="flex gap-2 items-center py-3 border-y border-gray-200 hover:bg-gray-100"
      >
        <FaUsers className="w-5 h-5" />
        <span className="text-sm">Agents</span>
      </Link>
    ),
    key: "agents",
    children: [
      {
        label: (
          <Link href="/dashboard/agents" className="py-2">
            <FaUsers className="w-4 h-4 mr-2" />
            <span>Agent List</span>
          </Link>
        ),
        key: "agents-list",
      },
      {
        label: (
          <Link href="/dashboard/agent-request" className="py-2">
            <FaUserCheck className="w-4 h-4 mr-2" />
            <span>Agent Request</span>
          </Link>
        ),
        key: "dashboard-agent-request",
      },
      {
        label: (
          <Link href="/dashboard/all-agent" className="py-2">
            <FaUsers className="w-4 h-4 mr-2" />
            <span>All Agent</span>
          </Link>
        ),
        key: "dashboard-all-agent",
      },
    ],
  },
  {
    label: (
      <Link
        href="/dashboard/developers"
        className="flex gap-2 items-center py-3 border-y border-gray-200 hover:bg-gray-100"
      >
        <FaRegBuilding className="w-5 h-5" />
        <span className="text-sm">Developers</span>
      </Link>
    ),
    key: "developers",
    children: [
      {
        label: (
          <Link href="/dashboard/developers" className="py-2">
            <FaRegBuilding className="w-4 h-4 mr-2" />
            <span>Developer List</span>
          </Link>
        ),
        key: "developers-list",
      },
      {
        label: (
          <Link href="/dashboard/developers-request" className="py-2">
            <FaUserCheck className="w-4 h-4 mr-2" />
            <span>Developer Request</span>
          </Link>
        ),
        key: "dashboard-developers-request",
      },
      {
        label: (
          <Link href="/dashboard/all-developer" className="py-2">
            <FaUsers className="w-4 h-4 mr-2" />
            <span>All Developer</span>
          </Link>
        ),
        key: "dashboard-all-developer",
      },
    ],
  },
  {
    label: (
      <Link
        href="/dashboard/mortgages"
        className="flex gap-2 items-center py-3 border-y border-gray-200 hover:bg-gray-100"
      >
        <FaMoneyBillWave className="w-5 h-5" />
        <span className="text-sm">Mortgage</span>
      </Link>
    ),
    key: "mortgage",
    children: [
      {
        label: (
          <Link href="/dashboard/mortgages" className="py-2">
            <FaMoneyBillWave className="w-4 h-4 mr-2" />
            <span>Mortgage List</span>
          </Link>
        ),
        key: "mortgage-list",
      },
      {
        label: (
          <Link href="/dashboard/mortgage-request" className="py-2">
            <FaFileAlt className="w-4 h-4 mr-2" />
            <span>Mortgage Request</span>
          </Link>
        ),
        key: "dashboard-mortgages-request",
      },
      {
        label: (
          <Link href="/dashboard/all-mortgage" className="py-2">
            <FaMoneyBillWave className="w-4 h-4 mr-2" />
            <span>All Mortgage</span>
          </Link>
        ),
        key: "dashboard-all-mortgage",
      },
    ],
  },
  {
    label: (
      <Link
        href="/dashboard/add-filters"
        className="flex gap-2 items-center py-3 border-y border-gray-200 hover:bg-gray-100"
      >
        <FaBuilding className="w-5 h-5" />
        <span className="text-sm">Add Filters</span>
      </Link>
    ),
    key: "add-filters",
  },
];

const SuperAdminLayout = ({ children }: { children: ReactNode }) => {
  return <AdminLayout menu={navItems}>{children}</AdminLayout>;
};

export default SuperAdminLayout;
