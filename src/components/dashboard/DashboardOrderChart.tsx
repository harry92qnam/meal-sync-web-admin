'use client';
import REACT_QUERY_CACHE_KEYS from '@/data/constants/react-query-cache-keys';
import useFetchWithRQWithFetchFunc from '@/hooks/fetching/useFetchWithRQWithFetchFunc';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import apiClient from '@/services/api-services/api-client';
import { DashboardOrderAPIReponse } from '@/types/responses/DashboardResponse';

import React from 'react';
import Chart, { Props } from 'react-apexcharts';

// const dashboardOrderEndpoint = 'admin/dashboard/chart/order';
const dashboardOrderEndpoint =
  'https://my-json-server.typicode.com/duckodei/vfoody-admin-sample-api/order';
const getLast7Days = () => {
  const data = [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ] as string[];
  let today = new Date().getDay();
  const res = ['0', '1', '2', '3', '4', '5', '6', '7'] as string[];
  for (let i = 0; i < 7; i++) {
    res[7 - 1 - i] = data[(today - i + 7) % 7];
  }
  return res.concat(res.map((item) => '11/22/2023')).concat(res.map((item) => '11/22/2024'));
  // .concat(res);
};
const DashboardOrderChart = () => {
  const { range } = usePeriodTimeFilterState();
  const { data, isLoading, error } = useFetchWithRQWithFetchFunc(
    [dashboardOrderEndpoint],
    (): Promise<DashboardOrderAPIReponse> =>
      apiClient
        .get<DashboardOrderAPIReponse>(dashboardOrderEndpoint, {
          params: { ...range },
        })
        .then((response) => response.data),
    [range],
  );
  const state: Props['series'] = [
    {
      name: 'Tổng',
      data: data?.value?.week
        ? data.value.week.map((item) => item.totalOfOrder).concat([0, 0, 0, 0])
        : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Thành công',
      data: data?.value?.week
        ? data.value.week.map((item) => item.successful).concat([0, 0, 0, 0])
        : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Đang xử lý',
      data: data?.value?.week
        ? data.value.week
            .map((item) => item.pending + item.confirmed + item.deliverying)
            .concat([0, 0, 0, 0])
        : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Thất bại',
      data: data?.value?.week
        ? data.value.week.map((item) => item.failed).concat([0, 0, 0, 0])
        : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Hủy bỏ',
      data: data?.value?.week
        ? data.value.week.map((item) => item.cancelled).concat([0, 0, 0, 0])
        : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];
  const options: Props['options'] = {
    chart: {
      type: 'area',
      animations: {
        easing: 'linear',
        speed: 300,
      },
      sparkline: {
        enabled: false,
      },
      brush: {
        enabled: false,
      },
      id: 'basic-bar',
      fontFamily: 'Inter, sans-serif',
      foreColor: 'var(--nextui-colors-accents9)',
      stacked: false,
      toolbar: {
        show: true,
      },
    },

    xaxis: {
      categories: getLast7Days(),
      labels: {
        // show: false,
        style: {
          colors: 'var(--nextui-colors-accents8)',
          fontFamily: 'Inter, sans-serif',
        },
      },
      axisBorder: {
        color: 'var(--nextui-colors-border)',
      },
      axisTicks: {
        color: 'var(--nextui-colors-border)',
      },
    },
    yaxis: {
      title: {
        text: '',
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: '#ccc',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 600,
        },
      },
      labels: {
        style: {
          colors: 'var(--nextui-colors-accents8)',
          fontFamily: 'Inter, sans-serif',
        },
      },
      tickAmount: 1,
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      show: true,
      borderColor: 'var(--nextui-colors-border)',
      strokeDashArray: 0,
      position: 'back',
    },
    stroke: {
      curve: 'smooth',
      fill: {
        colors: ['red'],
      },
    },
    colors: ['#008FFB', '#33FF57', '#FDD35E', '#FF6969', '#686D76'],
    // @ts-ignore
    markers: false,
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Biểu đồ đơn hàng</h2>
        <button className="text-blue-500">
          <i className="fas fa-download"></i> Lưu báo cáo
        </button>
      </div>
      <div id="chartOrder">
        <Chart options={options} series={state} type="area" height={240} />
      </div>
    </div>
  );
};

export default DashboardOrderChart;
