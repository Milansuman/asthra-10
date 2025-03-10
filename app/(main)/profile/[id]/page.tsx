import { api } from "@/trpc/server";
import { ProfilePageCard } from "../page";
import type { UserZodType } from "@/lib/validator";

type Props = {
  params: Promise<{ id: string }>;
};


export default async function ProfilePage({ params }: Props) {
  const { id } = await params;

  const user = await api.user.getUserForVerification({ id });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <main className="flex flex-col md:flex-row gap-6 justify-start p-6 min-h-screen ambit relative">
      <ProfilePageCard user={user as UserZodType} />
      <div className="flex-[1_auto] flex flex-col gap-6 items-center justify-center relative overflow-hidden">
      </div>
    </main>
  )
}
