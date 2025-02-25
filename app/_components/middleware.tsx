"use client";

import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const Middleware = (props: { children: React.ReactNode }) => {
  const { status, data } = useSession();
  // const pathname = usePathname();
  // const router = useRouter();

  // const redirect = (path: string) => {
  // 	toast("Not Authorized, Redirecting");
  // 	router.push(path);
  // 	return null;
  // };
  // const matches = pathname.match(/\/(client|resource|onboarding)/);
  // if (matches) {
  // 	if (status === "unauthenticated") return redirect("/");

  // 	if (status === "authenticated") {
  // 		const path = matches[1] as "client" | "resource" | "onboarding";

  // 		if (data.user.type === "unknown" && path !== "onboarding")
  // 			return redirect("/onboarding");

  // 		if (data.user.type === "client" && path !== "client")
  // 			return redirect("/client");

  // 		if (data.user.type === "resource" && path !== "resource")
  // 			return redirect("/resource");
  // 	}
  // }

  if (status === "loading") return <Loader2 className="w-3 h-3 animate-spin" />;

  return <>{props.children}</>;
};

export default Middleware;
