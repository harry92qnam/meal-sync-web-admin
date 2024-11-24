export default interface OrderDetailModel {
  id: number;
  status: number;
  buildingId: number;
  buildingName: string;
  totalPromotion: number;
  totalPrice: number;
  orderDate: string;
  receiveAt?: string;
  cancelAt?: string;
  rejectAt?: string;
  completedAt?: string;
  resolveAt?: string;
  latestDeliveryFailAt?: string;
  isPaidToShop: boolean;
  isRefund: boolean;
  isReport: boolean;
  reportId: number;
  reason?: string;
  intendedReceiveDate?: string;
  reasonIdentity?: string;
  evidences: [
    {
      imageUrl?: string;
      takePictureDateTime?: string;
    },
  ];
  startTime: number;
  endTime: number;
  note: string;
  dormitoryId: number;
  dormitoryName: string;
  orderDetailSummary: string;
  orderDetailSummaryShort: string;
  customer: {
    id: number;
    fullName: string;
    phoneNumber: string;
    avatarUrl?: string;
    locationId: number;
    address: string;
    latitude: number;
    longitude: number;
  };
  promotion: {
    id: number;
    title: string;
    description: string;
    bannerUrl?: string;
    amountRate?: number;
    amountValue?: number;
    minOrderValue: number;
    applyType: number;
    maximumApplyValue?: number;
  };
  dormitory: {
    id: number;
    name: string;
  };
  shop: {
    id: number;
    shopName: string;
    fullName: string;
    logoUrl?: string;
    bannerUrl?: string;
    phoneNumber: string;
    email: string;
    locationId: number;
    address: string;
  };
  shopDeliveryStaff: {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    avatarUrl?: string;
    isShopOwnerShip: boolean;
  };
  orderDetails: [
    {
      id: number;
      foodId: number;
      name: string;
      imageUrl?: string;
      description?: string;
      quantity: number;
      totalPrice: number;
      basicPrice: number;
      note?: string;
      optionGroups?: [
        {
          optionGroupTitle?: string;
          options?: [
            {
              optionTitle?: string;
              optionImageUrl?: string;
              isCalculatePrice?: boolean;
              price?: number;
            },
          ];
        },
      ];
    },
  ];
}
