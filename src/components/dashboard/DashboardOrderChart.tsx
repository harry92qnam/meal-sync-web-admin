'use client';
import useFetchWithRQWithFetchFunc from '@/hooks/fetching/useFetchWithRQWithFetchFunc';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import apiClient from '@/services/api-services/api-client';
import { DashboardOrderAPIReponse } from '@/types/responses/DashboardResponse';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import Chart, { Props } from 'react-apexcharts';

const dashboardOrderEndpoint = 'admin/dashboard/order/status';
// const dashboardOrderEndpoint =
//   'https://my-json-server.typicode.com/duckodei/vfoody-admin-sample-api/order';
const DashboardOrderChart = () => {
  const { range } = usePeriodTimeFilterState();
  const { data, isLoading, error } = useFetchWithRQWithFetchFunc<DashboardOrderAPIReponse>(
    [dashboardOrderEndpoint],
    (): Promise<DashboardOrderAPIReponse> =>
      apiClient
        .get<DashboardOrderAPIReponse>(dashboardOrderEndpoint, {
          params: {
            dateFrom: dayjs(range.dateFrom).utc().format('YYYY-MM-DD'),
            dateTo: dayjs(range.dateTo).utc().format('YYYY-MM-DD'),
          },
        })
        .then((response) => response.data),
    [range],
  );
  // console.log(
  //   'range: ',
  //   dayjs(range.dateFrom).utc().format('YYYY-MM-DD'),
  //   dayjs(range.dateTo).utc().format('YYYY-MM-DD'),
  // );
  const state: Props['series'] = [
    {
      name: '‎ Tổng',
      data: data?.value.map((item) => item.totalOfOrder) || [],
    },
    {
      name: '‎  Thành công',
      data: data?.value.map((item) => item.totalSuccess) || [],
    },
    {
      name: '‎  Đang xử lý',
      data: data?.value.map((item) => item.totalOrderInProcess) || [],
    },
    {
      name: '‎  Thất bại/hoàn tiền',
      data: data?.value.map((item) => item.totalFailOrRefund) || [],
    },
    {
      name: '‎  Hủy bỏ',
      data: data?.value.map((item) => item.totalCancelOrReject) || [],
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
      categories:
        data?.value.map((item) => (item.labelDate ? dayjs(item.labelDate).format('DD/MM') : '')) ||
        [],
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
  console.log('data?.value: ', data?.value);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Biểu đồ đơn hàng</h2>
        {/* <button className="text-blue-500">
          <i className="fas fa-download"></i> Lưu báo cáo
        </button> */}
      </div>
      <div id="chartOrder">
        <Chart options={options} series={state} type="area" height={240} />
      </div>
    </div>
  );
};

export default DashboardOrderChart;
