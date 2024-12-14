export default interface ReportDetailModel {
  isAllowAction: boolean;
  isUnderReview: boolean;
  isNotAllowReject: boolean;
  orderInfo: {
    status: 10;
    reasonIdentity:
      | 'DeliveryFailByShopReportedByCustomer'
      | 'DeliveryFailByCustomerReportedByCustomer'
      | 'DeliveredReportedByCustomer';
  };
  reports: [
    {
      id: number;
      orderId: number;
      orderDescription: string;
      title: string;
      content: string;
      imageUrls?: string[];
      status: number;
      reason?: string;
      isReportedByCustomer: boolean;
      createdDate: string;
    },
  ];
  customerInfo: {
    id: number;
    phoneNumber: string;
    email: string;
    avatarUrl: string;
    fullName: string;
    status: number;
  };
  shopInfo: {
    id: number;
    name: string;
    logoUrl?: string;
    bannerUrl?: string;
    description: string;
    phoneNumber: string;
    status: number;
  };
}
