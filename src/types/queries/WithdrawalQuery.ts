import PagingRequestQuery from './PagingRequestQuery';

export default interface WithdrawalQuery extends PagingRequestQuery {
  searchValue: string;
  dormitoryId: number;
  status: number;
  dateFrom: Date;
  dateTo: Date;
}
