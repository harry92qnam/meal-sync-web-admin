export default interface ShopModel {
  id: number;
  shopName: string;
  shopOwnerName: string;
  logoUrl: string;
  totalOrder: number;
  numberOfCurrentOrders: number;
  totalFood: number;
  totalRevenue: number;
  status: number;
  createdDate: string;
}
