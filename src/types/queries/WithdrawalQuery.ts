import PagingRequestQuery from './PagingRequestQuery';

export default interface WithdrawalQuery extends PagingRequestQuery {
  shopId?: number;
  shopName?: string;
  status?: number;
  dateFrom?: Date;
  dateTo?: Date;
  orderBy?: number;
  orderMode?: number;
}
