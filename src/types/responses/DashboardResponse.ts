import APICommonResponse from './APICommonResponse';

export interface DashboardOverviewAPIReponse extends APICommonResponse {
  value: {
    totalTradingAmount: number;
    totalTradingAmountRate: number;
    totalChargeFee: number;
    totalChargeFeeRate: number;
    totalOrder: number;
    totalOrderRate: number;
    totalUser: number;
    totalUserRate: number;
    numDayCompare: number;
  };
}

export interface DashboardOrderDayInfo {
  totalOfOrder: number;
  totalSuccess: number;
  totalOrderInProcess: number;
  totalFailOrRefund: number;
  totalCancelOrReject: number;
  labelDate: string; // ISO date string format
}

export interface DashboardOrderAPIReponse extends APICommonResponse {
  value: DashboardOrderDayInfo[];
}

export interface DashboardRevenueAPIReponse extends APICommonResponse {
  value: {
    thisYear: number;
    lastYear: number;
    totalOfThisYear: number;
    totalOfLastYear: number;
    twelveMonthRevenue: MonthlyRevenue[];
  };
}
interface MonthlyRevenue {
  thisYear: number;
  lastYear: number;
}
