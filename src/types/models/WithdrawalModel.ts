export default interface WithdrawalModel {
  id: number;
  shopName: string;
  shopOwnerName?: string;
  email?: string;
  requestAmount: number;
  availableAmount: number;
  status: number;
  bankCode: string;
  bankShortName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  createdDate: string;
}
