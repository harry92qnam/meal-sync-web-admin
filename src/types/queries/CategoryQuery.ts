import PagingRequestQuery from './PagingRequestQuery';

export default interface CategoryQuery extends PagingRequestQuery {
  searchValue: string;
}
