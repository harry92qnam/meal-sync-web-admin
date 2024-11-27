import PagingRequestQuery from './PagingRequestQuery';

export default interface ReportQuery extends PagingRequestQuery {
  searchValue: string;
  dormitoryId: number;
  status: number;
  dateFrom: Date;
  dateTo: Date;
}
