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
  accountFlags: [
    {
      id: number;
      description: string;
      createdDate: string;
    },
  ];
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
