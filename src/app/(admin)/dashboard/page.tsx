'use client';
import Header from '@/components/common/Header';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardTimeFilter from '@/components/dashboard/DashboardTimeFilter';
import MainLayout from '@/components/layout/MainLayout';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const DashboardOrderChart = dynamic(
  () => import('../../../components/dashboard/DashboardOrderChart'),
  {
    ssr: false,
  },
);
const DashboardRevenueChart = dynamic(
  () => import('../../../components/dashboard/DashboardRevenueChart'),
  {
    ssr: false,
  },
);
const DashboardGrowthChart = dynamic(
  () => import('../../../components/dashboard/DashboardGrowthChart'),
  {
    ssr: false,
  },
);

const Dashboard: NextPage = () => {
  // const { range } = usePeriodTimeFilterState();
  // console.log('Dashboard: NextPage : ', range);

  return (
    <MainLayout activeContentIndex={0}>
      {/* Header */}
      <div className="md:col-span-1 py-4">
        <Header title={'Admin Dashboard'} showAccountName={true} />
      </div>
      <div className="px-4 mt-[90px]">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl">Tổng quan thống kê</h2>
            <p>Chào mừng đến MealSync Admin.</p>
          </div>
          <DashboardTimeFilter />
        </div>
        <div className="grid grid-cols-2 gap-8 mt-3">
          <div className="h-full flex flex-grow justify-stretch items-stretch">
            <DashboardOverview />
          </div>
          <div className="h-full flex flex-grow justify-stretch items-stretch">
            <DashboardOrderChart />
          </div>
          <div className="h-full flex flex-grow justify-stretch items-stretch">
            <DashboardRevenueChart />
          </div>
          <div className="h-full flex flex-grow justify-stretch items-stretch">
            <DashboardGrowthChart />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
