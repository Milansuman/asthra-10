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
  ChevronRight,
  Home,
  Camera,
  Clock,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export type SidebarItemData = {
  icon?: React.ReactNode;
  label: string;
  link?: string;
  children?: SidebarItemData[];
  onClick?: () => void;
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
    ],
  },
  // {
  //   icon: <UserCheck size={20} />,
  //   label: "Attendance",
  //   children: [
  //     {
  //       icon: <QrCode size={16} />,
  //       label: "Universal Scanner",
  //       link: "/dashboard/attendence",
  //     },
  //     // {
  //     //   icon: <Camera size={16} />,
  //     //   label: "Asthra Attendance",
  //     //   link: "/dashboard/attendence/asthra",
  //     // },
  //     {
  //       icon: <QrCode size={16} />,
  //       label: "Event Attendance",
  //       link: "/dashboard/attendence/events",
  //     },
  //   ],
  // },
  // {
  //   icon: <Monitor size={20} />,
  //   label: "Front Desk",
  //   children: [
  //     {
  //       icon: <Users size={16} />,
  //       label: "Participants",
  //       link: "/dashboard/desk",
  //     },
  //     {
  //       icon: <QrCode size={16} />,
  //       label: "Spot Registration",
  //       link: "/dashboard/desk/scan",
  //     },
  //   ],
  // },
  {
    icon: <Users size={20} />,
    label: "User Management",
    link: "/dashboard/users",
  },
  // {
  //   icon: <CreditCard size={20} />,
  //   label: "Payment",
  //   children: [
  //     {
  //       icon: <Settings size={16} />,
  //       label: "Payment Resolver",
  //       link: "/dashboard/order",
  //     },
  //     {
  //       icon: <Edit size={16} />,
  //       label: "Create Order",
  //       link: "/dashboard/order/create",
  //     },
  //   ],
  // },
  {
    icon: <Upload size={20} />,
    label: "Upload Media",
    link: "/dashboard/upload",
  },
  // {
  //   icon: <Clock size={20} />,
  //   label: "Cron Jobs",
  //   link: "/dashboard/cron",
  // },
];

function SidebarItem({ item }: { item: SidebarItemData }) {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.link === pathname;
  const hasActiveChild = item.children?.some(child => child.link === pathname);
  const [isExpanded, setIsExpanded] = useState(hasActiveChild || false);

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    if (item.onClick) {
      item.onClick();
    }
  };

  if (hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={item.label}
          isActive={hasActiveChild}
          className="w-full"
          onClick={handleToggle}
        >
          {item.icon}
          <span>{item.label}</span>
          <ChevronRight
            className={`ml-auto transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''
              }`}
          />
        </SidebarMenuButton>
        {isExpanded && (
          <SidebarMenuSub>
            {item.children
              ?.filter(child => child.link)
              .map((child, index) => (
                <SidebarMenuSubItem key={index}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={child.link === pathname}
                  >
                    <Link href={child.link!}>
                      {child.icon}
                      <span>{child.label}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    );
  }

  if (!item.link) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={item.label}
          isActive={isActive}
          onClick={item.onClick}
        >
          {item.icon}
          <span>{item.label}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={item.label}
        isActive={isActive}
      >
        <Link href={item.link as string}>
          {item.icon}
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex flex-col gap-2 py-2 text-sidebar-foreground">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Calendar className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Asthra Dashboard</span>
              <span className="truncate text-xs">Management Portal</span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item, index) => (
                <SidebarItem key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
