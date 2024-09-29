export default interface ShopModel {
  id: number;
  shopName: string;
  description: string;
  shopOwnerName: string;
  email: string;
  address: string;
  logoUrl: string;
  bannerUrl: string;
  phoneNumber: string;
  active: string;
  status: number;
  totalOrder: number;
  totalProduct: number;
  totalRating: number;
  avgRating: number;
  createdDate: string;
  shopRevenue: number;
  activeFrom: number;
  activeTo: number;
}
