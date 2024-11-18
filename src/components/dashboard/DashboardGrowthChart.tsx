'use client';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import useFetchWithRQWithFetchFunc from '@/hooks/fetching/useFetchWithRQWithFetchFunc';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import apiClient from '@/services/api-services/api-client';
import { DashboardOverviewAPIReponse } from '@/types/responses/DashboardResponse';
import React from 'react';
import Chart from 'react-apexcharts';
const dashboardOverviewEndpoint = '/admin/dashboard/overview';
const DashboardGrowthChart = () => {
  const { range } = usePeriodTimeFilterState();
  const { data, isLoading, error } = useFetchWithRQWithFetchFunc(
    [dashboardOverviewEndpoint],
    (): Promise<DashboardOverviewAPIReponse> =>
      apiClient
        .get<DashboardOverviewAPIReponse>(dashboardOverviewEndpoint, {
          params: { ...range },
        })
        .then((response) => response.data),
    [range],
  );
  const totalRevenueRate = data ? Math.round(data.value.totalRevenueRate) : 0;
  const totalOrderRate = data ? Math.round(data.value.totalOrderRate) : 0;
  const totalUserRate = data ? Math.round(data.value.totalUserRate) : 0;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col w-full">
      <h2 className="text-xl font-semibold mb-4">Tăng trưởng</h2>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center relative mx-[-24px]">
          <Chart
            options={{
              chart: {
                height: 350,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    size: '50%',
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: false,
                    },
                  },
                },
              },
            }}
            series={[totalRevenueRate]}
            type="radialBar"
            height={240}
          />
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
            <div className="text-blue-500 text-2xl font-bold">{totalRevenueRate}%</div>
            <div className="text-gray-500 text-sm">Doanh thu</div>
          </div>
        </div>
        <div className="text-center relative mx-[-24px]">
          <Chart
            options={{
              chart: {
                height: 350,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    size: '50%',
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: false,
                    },
                  },
                },
              },
              colors: ['#EAB308'],
            }}
            series={[totalOrderRate]}
            type="radialBar"
            height={240}
          />
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
            <div className="text-yellow-500 text-2xl font-bold">{totalOrderRate}%</div>
            <div className="text-gray-500 text-sm">Số đơn</div>
          </div>
        </div>
        <div className="text-center relative mx-[-24px]">
          <Chart
            options={{
              chart: {
                height: 350,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  hollow: {
                    size: '50%',
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: false,
                    },
                  },
                },
              },
              colors: ['#22C55E'],
            }}
            series={[totalUserRate]}
            type="radialBar"
            height={240}
          />
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
            <div className="text-green-500 text-2xl font-bold">{totalUserRate}%</div>
            <div className="text-gray-500 text-sm">Người dùng</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGrowthChart;
