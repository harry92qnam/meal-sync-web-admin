export default interface AccountDetailModel {
  id: number;
  fullName: string;
  phoneNumber: string;
  avatarUrl?: string;
  email: string;
  status: number;
  numOfFlag: number;
  genders: number;
  createdDate: string;
  accountFlags: [];
  orderSummary: {
    totalOrderInProcess: number;
    totalCancelByCustomer: number;
    totalCancelOrRejectByShop: number;
    totalDelivered: number;
    totalFailDeliveredByCustomer: number;
    totalFailDeliveredByShop: number;
    totalReportResolved: number;
  };
}
