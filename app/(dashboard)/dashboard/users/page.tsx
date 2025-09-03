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
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

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

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isPending } = api.user.getUserList.useQuery({
    search: debouncedSearch || undefined,
    page,
    limit,
    role: role || undefined,
  });

  const users = data?.users ?? [];
  const pagination = data?.pagination;

  const handlePageChange = (newPage: number) => {
    if (
      newPage >= 1 &&
      (!pagination?.totalPages || newPage <= pagination.totalPages)
    ) {
      console.log("Changing page:", { from: page, to: newPage });
      setPage(newPage);
    }
  };

  // Debug pagination
  useEffect(() => {
    console.log("Debug:", {
      currentPage: page,
      paginationData: pagination,
      userCount: users.length,
      queryParams: {
        search: debouncedSearch || undefined,
        page,
        limit,
        role,
      },
    });
  }, [page, pagination, users.length, debouncedSearch, limit, role]);

  // Debug logging
  useEffect(() => {
    console.log("Pagination state:", {
      search,
      debouncedSearch,
      data,
      usersCount: users.length,
      pagination,
    });
  }, [search, debouncedSearch, data, users, pagination]);

  useEffect(() => {
    console.log("Pagination Debug:", {
      hasPreviousPage: pagination?.hasPreviousPage,
      currentPage: page,
      totalPages: pagination?.totalPages,
    });
  }, [pagination, page]);

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
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white border-slate-300"
              />
            </div>
            <div className="flex gap-2 shrink-0">
              <Select
                value={role}
                onValueChange={(value) => {
                  setRole(
                    value === "all"
                      ? undefined
                      : value as
                      | "USER"
                      | "STUDENT_COORDINATOR"
                      | "FACULTY_COORDINATOR"
                      | "MANAGEMENT"
                      | "ADMIN"
                      | "DESK"
                  );
                  setPage(1);
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

          {pagination && pagination.totalCount > 0 && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div>
                Showing{" "}
                {((page - 1) * limit) + 1} to{" "}
                {Math.min(page * limit, pagination.totalCount)} of{" "}
                {pagination.totalCount} users
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={!pagination?.hasPreviousPage}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="px-2">
                  Page {page} of {pagination?.totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={!pagination?.hasNextPage}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex overflow-hidden">
          <div className="h-full w-full overflow-auto">
            <UsersTable
              columns={columns}
              data={users as UserZodType[]}
              isPending={isPending}
            />
          </div>
        </div>

        {pagination && (
          <div className="flex items-center justify-between p-6 border-t border-slate-200 text-sm text-slate-600 flex-shrink-0">
            <div>
              Showing{" "}
              {((page - 1) * limit) + 1} to{" "}
              {Math.min(page * limit, pagination.totalCount)} of{" "}
              {pagination.totalCount} users
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={!pagination?.hasPreviousPage}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="px-2">
                Page {page} of {pagination?.totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={!pagination?.hasNextPage}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}