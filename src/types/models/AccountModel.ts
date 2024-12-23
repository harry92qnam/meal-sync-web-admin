export default interface AccountModel {
  id: number;
  fullName: string;
  phoneNumber: string;
  avatarUrl?: string;
  totalOrderInProcess?: number;
  email: string;
  status: number;
  createdDate: string;
}
