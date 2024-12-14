import PagingRequestQuery from './PagingRequestQuery';

export default interface ContainerQuery extends PagingRequestQuery {
  searchText: string;
}
