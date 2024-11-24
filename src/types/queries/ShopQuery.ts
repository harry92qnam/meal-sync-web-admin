import PagingRequestQuery from './PagingRequestQuery';

export default interface ShopQuery extends PagingRequestQuery {
  searchValue: string;
  dormitoryId: number;
  status: number;
  dateFrom: Date;
  dateTo: Date;
}
