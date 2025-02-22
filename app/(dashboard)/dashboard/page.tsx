import { api } from '@/trpc/server';

import Dashboard from './_components/dashboard';

export const dynamic = 'force-dynamic';

async function DashboardPage() {
  const dashData = await api.dashboard.allManagementCounts();
  // console.log(dashData);
  return (
    <>
      <Dashboard data={dashData} />
    </>
  );
}
export default DashboardPage;
