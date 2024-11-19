export default interface ShopDetailModel {
  id: number;
  name: string;
  logoUrl: string;
  bannerUrl: string;
  description: string;
  phoneNumber: string;
  bankCode?: string;
  bankShortName?: string;
  bankAccountNumber?: string;
  totalOrder: number;
  totalFood: number;
  totalReview: number;
  totalRating: number;
  averageStar: number;
  totalRevenue: number;
  status: number;
  numOfWarning: number;
  createdDate: string;
  accountShop: {
    phoneNumber: string;
    email: string;
    fullName: string;
    genders: number;
    numOfFlag: number;
    avatarUrl?: string;
  };
  locationShop: {
    id: number;
    address: string;
    latitude: number;
    longitude: number;
  };
  shopDormitories: [
    {
      id: number;
      name: string;
    },
  ];
  shopOperatingSlots: [
    {
      id: number;
      title: string;
      startTime: number;
      endTime: number;
      isActive: boolean;
      isReceivingOrderPaused: boolean;
    },
  ];
}
