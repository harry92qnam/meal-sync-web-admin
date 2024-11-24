import PagingRequestQuery from './PagingRequestQuery';

export default interface AccountQuery extends PagingRequestQuery {
  searchValue: string;
  dormitoryId: number;
  status: number;
  dateFrom: Date;
  dateTo: Date;
}
