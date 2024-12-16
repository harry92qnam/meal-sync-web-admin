interface Dormitory {
  id: number;
  name: string;
}

export enum ModeratorStatus {
  Active = 1,
  Locked = 2,
  Deleted = 3,
}

export interface ModeratorModel {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string;
  status: number;
  dormitories: Dormitory[];
}

// Empty example data:
export const emptyModerator: ModeratorModel = {
  id: 0,
  fullName: '',
  phoneNumber: '',
  email: '',
  avatarUrl:
    'https://thanhtu-blog.s3.ap-southeast-1.amazonaws.com/image/eb7ce841-6579-458a-a46a-1dfc8491ed81-1727165769091.png',
  status: ModeratorStatus.Active,
  dormitories: [],
};
export interface ModeratorQuery {
  searchValue: string;
  status: number;
  dormitoryId: number[];
  pageIndex: number;
  pageSize: number;
}

// Example of using the ModeratorQuery interface with the provided values:
export const moderatorQueryEmpty: ModeratorQuery = {
  searchValue: '',
  status: 0,
  dormitoryId: [1, 2],
  pageIndex: 1,
  pageSize: 10,
};
interface Account {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  avatarUrl: string;
}

export interface ActivityActionLog {
  id: number;
  accountId: number;
  actionType: number;
  targetType: number;
  targetId: number;
  actionDetail: string;
  isSuccess: boolean;
  createdDate: string;
  updatedDate: string;
  account: Account;
  description: string;
}
