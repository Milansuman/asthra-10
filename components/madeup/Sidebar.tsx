"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Calendar,
  Users,
  Upload,
  Edit,
  UserCheck,
  Monitor,
  QrCode,
  CreditCard,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Camera,
  Clock,
} from "lucide-react";

export type SidebarItemData = {
  icon?: React.ReactNode;
  label: string;
  link?: string;
  children?: SidebarItemData[];
  onClick?: () => void;
  className?: string;
};

export type SidebarProps = {
  items?: SidebarItemData[];
  className?: string;
};

const sidebarItems: SidebarItemData[] = [
  {
    icon: <Home size={20} />,
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: <Calendar size={20} />,
    label: "Events",
    children: [
      {
        icon: <BarChart3 size={16} />,
        label: "All Events",
        link: "/dashboard/events",
      },
      {
        icon: <Edit size={16} />,
        label: "Edit Events",
        link: "/dashboard/events/edit",
      },
      {
        icon: <Users size={16} />,
        label: "Event Participants",
        link: "/dashboard/events/list",
      },
    ],
  },
  {
    icon: <UserCheck size={20} />,
    label: "Attendance",
    children: [
      {
        icon: <QrCode size={16} />,
        label: "Universal Scanner",
        link: "/dashboard/attendence",
      },
      {
        icon: <Camera size={16} />,
        label: "Asthra Attendance",
        link: "/dashboard/attendence/asthra",
      },
      {
        icon: <QrCode size={16} />,
        label: "Event Attendance",
        link: "/dashboard/attendence",
      },
    ],
  },
  {
    icon: <Monitor size={20} />,
    label: "Front Desk",
    children: [
      {
        icon: <Users size={16} />,
        label: "Participants",
        link: "/dashboard/desk",
      },
      {
        icon: <QrCode size={16} />,
        label: "Spot Registration",
        link: "/dashboard/desk/scan",
      },
    ],
  },
  {
    icon: <Users size={20} />,
    label: "User Management",
    link: "/dashboard/users",
  },
  {
    icon: <CreditCard size={20} />,
    label: "Payment",
    children: [
      {
        icon: <Settings size={16} />,
        label: "Payment Resolver",
        link: "/dashboard/order",
      },
      {
        icon: <Edit size={16} />,
        label: "Create Order",
        link: "/dashboard/order/create",
      },
    ],
  },
  {
    icon: <Upload size={20} />,
    label: "Upload Media",
    link: "/dashboard/upload",
  },
  {
    icon: <Clock size={20} />,
    label: "Cron Jobs",
    link: "/dashboard/cron",
  },
];

function SidebarItem({ item, level = 0 }: { item: SidebarItemData; level?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.link === pathname;
  const hasActiveChild = item.children?.some(child => child.link === pathname);

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    if (item.onClick) {
      item.onClick();
    }
  };

  const ItemContent = () => (
    <div
      className={`
        flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
        ${isActive
          ? "bg-slate-900 text-white shadow-md"
          : hasActiveChild
            ? "bg-slate-100 text-slate-900"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }
        ${level > 0 ? "ml-4" : ""}
      `}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        {item.icon}
        <span className="font-medium">{item.label}</span>
      </div>
      {hasChildren && (
        <div
          className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
        >
          <ChevronRight size={16} />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      {item.link && !hasChildren ? (
        <Link href={item.link}>
          <ItemContent />
        </Link>
      ) : (
        <ItemContent />
      )}

      {hasChildren && isExpanded && (
        <div className="overflow-hidden">
          <div className="mt-1 space-y-1">
            {item.children?.map((child, index) => (
              <SidebarItem key={index} item={child} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ items = sidebarItems, className = "" }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="md:hidden fixed top-4 left-4 z-50 bg-white border border-slate-300 text-slate-900 p-2 rounded-lg shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <aside className="md:hidden fixed left-0 top-0 bottom-0 w-80 bg-white border-r border-slate-200 z-50 overflow-y-auto shadow-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900">Dashboard</h2>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="text-slate-400 hover:text-slate-900"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-2">
              {items.map((item, index) => (
                <SidebarItem key={index} item={item} />
              ))}
            </nav>
          </div>
        </aside>
      )}

      {/* Desktop Sidebar */}
      <aside className={`hidden md:block left-0 top-0 bottom-0 w-80 bg-white border-r border-slate-200 overflow-y-auto shadow-lg ${className} min-w-80`}>
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Asthra Dashboard</h2>
            <p className="text-sm text-slate-600 mt-1">Management Portal</p>
          </div>
          <nav className="space-y-2">
            {items.map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}