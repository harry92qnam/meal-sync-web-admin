export default interface ReportModel {
  id: number;
  shopName: string;
  customerName: string;
  orderId: number;
  title: string;
  content: string;
  status: number;
  isAllowAction: boolean;
  isUnderReview: boolean;
  isNotAllowReject: boolean;
  reason?: string;
  createdDate: string;
}
