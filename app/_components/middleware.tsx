"use client";

import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const Middleware = (props: { children: React.ReactNode }) => {
  const { status, data } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const redirect = (path: string) => {
    toast("Not Authorized, Redirecting");
    router.push(path as "/");
    return null;
  };
  const matches = pathname.match(/\/(dashboard|profile|payment)/);
  if (matches) {
    if (status === "unauthenticated") {
      return redirect("/login");
    }

    if (status === "authenticated") {
      const path = matches[1] as "dashboard" | "profile" | "payment";

      if (data.user.role === "USER" && path === "dashboard") {
        return redirect("/");
      }
    }
  }

  if (status === "loading") {
    return <Loader2 className="w-3 h-3 animate-spin" />;
  }

  return <>{props.children}</>;
};

export default Middleware;
