import useFetchWithRQWithFetchFunc from '@/hooks/fetching/useFetchWithRQWithFetchFunc';
import usePeriodTimeFilterState from '@/hooks/states/usePeriodTimeFilterQuery';
import apiClient from '@/services/api-services/api-client';
import numberFormatUtilServicevice from '@/services/util-services/NumberFormatUtilService';
import { DashboardOverviewAPIReponse } from '@/types/responses/DashboardResponse';
import { Skeleton } from '@nextui-org/react';
import dayjs from 'dayjs';
import { FaArrowDownLong, FaArrowUpLong, FaMoneyBillWheat, FaUser } from 'react-icons/fa6';
import { FcMoneyTransfer } from 'react-icons/fc';
import { GiBuyCard } from 'react-icons/gi';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
const dashboardOverviewEndpoint = '/admin/dashboard/overview';
const DashboardOverview = () => {
  const { range } = usePeriodTimeFilterState();
  const { data, isLoading, error } = useFetchWithRQWithFetchFunc(
    [dashboardOverviewEndpoint],
    (): Promise<DashboardOverviewAPIReponse> =>
      apiClient
        .get<DashboardOverviewAPIReponse>(dashboardOverviewEndpoint, {
          params: {
            dateFrom: dayjs(range.dateFrom).local().format('YYYY-MM-DD'),
            dateTo: dayjs(range.dateTo).local().format('YYYY-MM-DD'),
          },
        })
        .then((response) => response.data),
    [range],
  );
  console.log({
    dateFrom: dayjs(range.dateFrom).local().format('YYYY-MM-DD'),
    dateTo: dayjs(range.dateTo).local().format('YYYY-MM-DD'),
  });

  const totalTradingRate = data ? Math.round(data.value.totalTradingAmountRate) : 0;
  const totalTrading = numberFormatUtilServicevice.formatNumberWithDotEach3digits(
    data ? Math.round(data.value.totalTradingAmount) : 0,
  );
  const totalRevenueRate = data ? Math.round(data.value.totalChargeFeeRate) : 0;
  const totalRevenue = numberFormatUtilServicevice.formatNumberWithDotEach3digits(
    data ? Math.round(data.value.totalChargeFeeRate) : 0,
  );
  const totalOrderRate = data ? Math.round(data.value.totalOrderRate) : 0;
  const totalOrder = numberFormatUtilServicevice.formatNumberWithDotEach3digits(
    data ? Math.round(data.value.totalOrder) : 0,
  );
  const totalUserRate = data ? Math.round(data.value.totalUserRate) : 0;
  const totalUser = numberFormatUtilServicevice.formatNumberWithDotEach3digits(
    data ? Math.round(data.value.totalUser) : 0,
  );
  console.log(
    data?.value?.totalTradingAmount,
    numberFormatUtilServicevice.formatNumberWithDotEach3digits(
      data?.value?.totalTradingAmount || 0,
    ),
  );
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <FaMoneyBillWheat size={24} color="green" />
        </div>
        <div>
          <p className="text-gray-500">Tổng giao dịch</p>
          <p className="text-3xl font-bold">
            {isLoading && data ? (
              <Skeleton className="flex rounded-full w-20 h-8" />
            ) : data?.value.totalTradingAmount ? (
              totalTrading + ' đ'
            ) : (
              0
            )}
          </p>
          <div className="flex items-center mt-[4px]">
            <div className="bg-green-100 flex justify-center items-center w-[16px] h-[16px] rounded-full">
              {data && data?.value.totalTradingAmountRate < 0 ? (
                <FaArrowDownLong color={'red'} size={8} />
              ) : (
                <FaArrowUpLong color={'green'} size={8} />
              )}
            </div>
            <span
              className={`text-${data && data?.value.totalTradingAmountRate < 0 ? 'red' : 'green'}-500 text-sm ml-2 `}
            >
              {isLoading && data ? (
                <Skeleton className="flex rounded-full w-20 h-8" />
              ) : (
                `${Math.abs(totalTradingRate)}% (${data?.value.numDayCompare} ngày)`
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <FcMoneyTransfer size={24} />
        </div>
        <div>
          <p className="text-gray-500">Tổng doanh thu</p>
          <p className="text-3xl font-bold">
            {isLoading && data ? (
              <Skeleton className="flex rounded-full w-20 h-8" />
            ) : data?.value.totalChargeFee ? (
              totalRevenue + ' đ'
            ) : (
              0
            )}
          </p>
          <div className="flex items-center mt-[4px]">
            <div className="bg-green-100 flex justify-center items-center w-[16px] h-[16px] rounded-full">
              {data && data?.value.totalChargeFeeRate < 0 ? (
                <FaArrowDownLong color={'red'} size={8} />
              ) : (
                <FaArrowUpLong color={'green'} size={8} />
              )}
            </div>
            <span
              className={`text-${data && data?.value.totalChargeFeeRate < 0 ? 'red' : 'green'}-500 text-sm ml-2 `}
            >
              {isLoading && data ? (
                <Skeleton className="flex rounded-full w-20 h-8" />
              ) : (
                `${Math.abs(totalRevenueRate)}% (${data?.value.numDayCompare} ngày)`
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <GiBuyCard color="green" size={25} />
        </div>
        <div>
          <p className="text-gray-500">Tổng đơn hàng</p>
          <p className="text-3xl font-bold">
            {isLoading && data ? (
              <Skeleton className="flex rounded-full w-20 h-8" />
            ) : data?.value.totalOrder ? (
              totalOrder
            ) : (
              0
            )}
          </p>
          <div className="flex items-center mt-[4px]">
            <div className="bg-green-100 flex justify-center items-center w-[16px] h-[16px] rounded-full">
              {data && data?.value.totalOrderRate < 0 ? (
                <FaArrowDownLong color={'red'} size={8} />
              ) : (
                <FaArrowUpLong color={'green'} size={8} />
              )}
            </div>
            <span
              className={`text-${data && data?.value.totalOrderRate < 0 ? 'red' : 'green'}-500 text-sm ml-2 `}
            >
              {isLoading && data ? (
                <Skeleton className="flex rounded-full w-20 h-8" />
              ) : (
                `${Math.abs(totalOrderRate)}% (${data?.value.numDayCompare} ngày)`
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-green-100 p-4 rounded-full mr-4">
          <FaUser size={24} color="green" />
        </div>
        <div>
          <p className="text-gray-500">Số người dùng</p>
          <p className="text-3xl font-bold">
            {' '}
            {isLoading && data ? (
              <Skeleton className="flex rounded-full w-20 h-8" />
            ) : data?.value.totalUser ? (
              totalUser
            ) : (
              0
            )}
          </p>
          <div className="flex items-center mt-[4px]">
            <div className="bg-green-100 flex justify-center items-center w-[16px] h-[16px] rounded-full">
              {data && data?.value.totalUserRate < 0 ? (
                <FaArrowDownLong color={'red'} size={8} />
              ) : (
                <FaArrowUpLong color={'green'} size={8} />
              )}
            </div>
            <span
              className={`text-${data && data?.value.totalUserRate < 0 ? 'red' : 'green'}-500 text-sm ml-2 `}
            >
              {isLoading && data ? (
                <Skeleton className="flex rounded-full w-20 h-8" />
              ) : (
                `${Math.abs(totalUserRate)}% (${data?.value.numDayCompare} ngày)`
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
