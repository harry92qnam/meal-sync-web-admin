// Manage orders
const ORDER_COLUMNS = [
  { key: 'id', name: 'Thứ tự đơn hàng' },
  { key: 'shopName', name: 'Tên cửa hàng' },
  { key: 'customerName', name: 'Tên khách hàng' },
  { key: 'status', name: 'Trạng thái đơn hàng' },
  { key: 'price', name: 'Tổng hóa đơn' },
  { key: 'orderDate', name: 'Thời gian giao dịch' },
];

const ORDER_STATUS = [
  { key: 1, desc: 'Đã hoàn thành' },
  { key: 2, desc: 'Đang thực hiện' },
  { key: 3, desc: 'Đã hủy' },
];

// Manage shops
const SHOP_COLUMNS = [
  { key: 'id', name: 'Thứ tự cửa hàng' },
  { key: 'shopName', name: 'Tên cửa hàng' },
  { key: 'shopOwnerName', name: 'Tên chủ cửa hàng' },
  // { key: 'phoneNumber', name: 'Số điện thoại' },
  { key: 'totalOrder', name: 'Tổng đơn hàng' },
  { key: 'totalProduct', name: 'Tổng sản phẩm' },
  { key: 'balance', name: 'Tổng doanh thu' },
  { key: 'status', name: 'Trạng thái cửa hàng' },
  { key: 'createdDate', name: 'Ngày đăng ký' },
  { key: 'actions', name: 'Thao tác' },
];

const SHOP_STATUS = [
  { key: 1, desc: 'Chưa phê duyệt' },
  { key: 2, desc: 'Đang hoạt động' },
  { key: 3, desc: 'Đang đóng cửa' },
  { key: 4, desc: 'Đã bị cấm' },
];

// Manage accounts
const accountColumns = [
  { name: 'Thứ tự', uid: 'id', sortable: true },
  { name: 'Tên tài khoản', uid: 'fullName', sortable: true },
  { name: 'Số điện thoại', uid: 'phoneNumber' },
  { name: 'Email', uid: 'email' },
  { name: 'Loại tài khoản', uid: 'role', sortable: true },
  { name: 'Trạng thái', uid: 'status', sortable: true },
  { name: 'Ngày đăng ký', uid: 'createdDate', sortable: true },
  { name: 'Thao tác', uid: 'actions' },
];

const accountStatus = [
  { name: 'Đang hoạt động', uid: 'Đang hoạt động' },
  { name: 'Đã bị cấm', uid: 'Đã bị cấm' },
  { name: 'Chưa xác thực', uid: 'Chưa xác thực' },
];

const accountType = [
  { name: 'Khách hàng', uid: 'Khách hàng' },
  { name: 'Chủ cửa hàng', uid: 'Chủ cửa hàng' },
];

export {
  ORDER_COLUMNS,
  ORDER_STATUS,
  SHOP_COLUMNS,
  SHOP_STATUS,
  accountColumns,
  accountStatus,
  accountType,
};
