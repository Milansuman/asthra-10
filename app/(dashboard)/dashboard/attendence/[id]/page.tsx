import { api } from "@/trpc/server"
import Scanner from "../_components/scanner"

export default async function Page({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const eventData = await api.event.getSpecific({
    id
  })

  if (!eventData) {
    return <div>Event Not Found</div>
  }

  return <Scanner eventData={eventData} />
}