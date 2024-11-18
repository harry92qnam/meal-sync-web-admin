import APICommonResponse from './APICommonResponse';

export interface DashboardOverviewAPIReponse extends APICommonResponse {
  value: {
    totalTrading: number;
    totalTradingRate: number;
    totalRevenue: number;
    totalRevenueRate: number;
    totalOrder: number;
    totalOrderRate: number;
    totalUser: number;
    totalUserRate: number;
    dayCompareRate: number;
  };
}

export interface DashboardOrderDayInfo {
  totalOfOrder: number;
  totalTradingAmount: number;
  revenue: number;
  pending: number;
  confirmed: number;
  deliverying: number;
  rejected: number;
  cancelled: number;
  successful: number;
  failed: number;
}

export interface DashboardOrderAPIReponse extends APICommonResponse {
  value: {
    week: DashboardOrderDayInfo[];
  };
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
