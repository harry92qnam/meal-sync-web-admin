export default interface WithdrawalModel {
  id: number;
  shopId: number;
  shopName: string;
  logoUrl: string;
  bannerUrl: string;
  balance: number;
  email: string;
  requestId: number;
  requestedAmount: number;
  status: number;
  bankCode: number;
  bankShortName: string;
  bankAccountNumber: string;
  note: string | null;
  createdDate: string;
  processedDate: string;
}
