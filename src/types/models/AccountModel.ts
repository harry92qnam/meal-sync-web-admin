export default interface AccountModel {
  id: number;
  fullName: string;
  phoneNumber: string;
  avatarUrl?: string;
  numberOfCurrentOrders?: number;
  email: string;
  status: number;
  createdDate: string;
}
