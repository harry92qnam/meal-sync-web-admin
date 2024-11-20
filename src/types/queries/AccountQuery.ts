import PagingRequestQuery from './PagingRequestQuery';

export default interface AccountQuery extends PagingRequestQuery {
  searchValue: string;
  status: number;
  dateFrom: Date;
  dateTo: Date;
}
