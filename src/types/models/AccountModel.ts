export default interface AccountModel {
  id: number;
  fullName: string;
  phoneNumber: string;
  avatarUrl?: string;
  email: string;
  status: number;
  createdDate: string;
}
