import PagingRequestQuery from './PagingRequestQuery';

export default interface OrderQuery extends PagingRequestQuery {
  searchValue: string;
  statusMode: number;
  dormitoryMode: number;
  dateFrom: Date;
  dateTo: Date;
}
