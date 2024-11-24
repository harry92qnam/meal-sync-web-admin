export default interface OrderModel {
  id: number;
  customerId: number;
  fullName: string;
  phoneNumber: string;
  totalPrice: number;
  totalPromotion: number;
  chargeFee: number;
  startTime: number;
  endTime: number;
  timeFrameFormat: string;
  orderDate: string;
  intendedReceiveDate: string;
  receiveAt?: string;
  cancelAt?: string;
  completedAt?: string;
  resolveAt?: string;
  status: number;
  rejectAt?: string;
  building: {
    id: number;
    name: string;
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
  };
}
