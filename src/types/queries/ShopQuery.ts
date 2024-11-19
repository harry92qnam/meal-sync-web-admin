import PagingRequestQuery from './PagingRequestQuery';

export default interface ShopQuery extends PagingRequestQuery {
  searchValue: string;
  status: number;
  dateFrom: Date;
  dateTo: Date;
}
