interface Dormitory {
  id: number;
  name: string;
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
  avatarUrl: '',
  status: 0,
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
