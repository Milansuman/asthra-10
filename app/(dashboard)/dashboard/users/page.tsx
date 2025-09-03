"use client";

import type { UserZodType } from "@/lib/validator";
import { columns } from "./_components/columns";
import { UsersTable } from "./_components/users-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { api } from "@/trpc/react";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, Search } from "lucide-react";

export default function Users() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [role, setRole] = useState<
    | "USER"
    | "STUDENT_COORDINATOR"
    | "FACULTY_COORDINATOR"
    | "MANAGEMENT"
    | "ADMIN"
    | "DESK"
    | undefined
  >(undefined);

  // for lazy loading
  const [items, setItems] = useState<UserZodType[]>([]);
  const [lastFetchedPage, setLastFetchedPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Normalize search before sending
  const normalizedSearch =
    debouncedSearch.trim() === "" ? undefined : debouncedSearch;

  const { data, isPending } = api.user.getUserList.useQuery(
    {
      search: normalizedSearch,
      page,
      limit,
      role: role || undefined,
    },
    { keepPreviousData: true }
  );

  const users = data?.users ?? [];
  const pagination = data?.pagination;

  // Merge results into items for infinite scroll
  useEffect(() => {
    if (data && page !== lastFetchedPage) {
      if (page === 1) {
        setItems(users);
      } else {
        setItems((prev) => [...prev, ...users]);
      }
      setLastFetchedPage(page);
      setHasMore(!!pagination?.hasNextPage);
    }
  }, [data, page, users, pagination, lastFetchedPage]);

  // Reset list when filters/search/limit change
  useEffect(() => {
    setItems([]);
    setLastFetchedPage(0);
    setHasMore(true);
    setPage(1);
  }, [normalizedSearch, role, limit]);

  // Lazy load observer
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isPending) {
        setPage((prev) => prev + 1);
      }
    });
    observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, isPending]);

  return (
    <div className="flex flex-col space-y-6 flex-1 overflow-hidden">
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            User Management
          </h1>
          <p className="text-slate-600 mt-1">
            Manage user accounts and permissions
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search users by name, email, college, department, year, role, KTU, or phone..."
                value={search}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearch(val);

                  if (val.trim() === "") {
                    // Force clear immediately
                    setDebouncedSearch("");
                    setPage(1);
                    setItems([]);
                  }
                }}
                className="pl-10 bg-white border-slate-300"
              />
            </div>
            <div className="flex gap-2 shrink-0">
              <Select
                value={role ?? "all"}
                onValueChange={(value) => {
                  setRole(
                    value === "all"
                      ? undefined
                      : (value as
                        | "USER"
                        | "STUDENT_COORDINATOR"
                        | "FACULTY_COORDINATOR"
                        | "MANAGEMENT"
                        | "ADMIN"
                        | "DESK")
                  );
                  setPage(1);
                  setItems([]);
                }}
              >
                <SelectTrigger className="w-48 bg-white border-slate-300">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="STUDENT_COORDINATOR">
                    Student Coordinator
                  </SelectItem>
                  <SelectItem value="FACULTY_COORDINATOR">
                    Faculty Coordinator
                  </SelectItem>
                  <SelectItem value="MANAGEMENT">Management</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="DESK">Desk</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  setLimit(Number.parseInt(value, 10));
                  setPage(1);
                  setItems([]);
                }}
              >
                <SelectTrigger className="w-24 bg-white border-slate-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="w-full flex overflow-hidden">
          <div className="h-full w-full overflow-auto">
            {items.length === 0 && !isPending ? (
              <div className="p-6 text-center text-slate-500">
                No users found. Try adjusting filters or search.
              </div>
            ) : (
              <UsersTable
                columns={columns}
                data={items as UserZodType[]}
                isPending={isPending}
              />
            )}
            {/* Lazy scroll loader */}
            <div ref={loaderRef} className="h-12 flex items-center justify-center">
              {isPending && <span className="text-slate-500">Loading...</span>}
              {!hasMore && items.length > 0 && (
                <span className="text-slate-400 text-sm">No more users</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
