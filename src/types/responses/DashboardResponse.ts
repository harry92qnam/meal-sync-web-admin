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
  totalOfOrder: number; // Tổng số đơn hàng
  pending: number; // Số đơn hàng đang chờ xử lý
  rejected: number; // Số đơn hàng bị từ chối
  processingOrder: number; // Số đơn hàng đang xử lý
  delivered: number; // Số đơn hàng đã giao
  failDelivered: number; // Số đơn hàng giao thất bại
  canceled: number; // Số đơn hàng bị hủy
  successful: number; // Số đơn hàng thành công
  issueProcessing: number; // Số đơn hàng đang giải quyết vấn đề
  resolved: number; // Số vấn đề đã được giải quyết
  totalTradingAmount: number; // Tổng giá trị giao dịch
  totalChargeFee: number; // Tổng phí giao dịch
  label: string; // Nhãn hoặc ngày tháng liên quan
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
