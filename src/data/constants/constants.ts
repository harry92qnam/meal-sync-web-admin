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
const ACCOUNT_COLUMNS = [
  { key: 'id', name: 'Thứ tự tài khoản' },
  { key: 'fullName', name: 'Tên tài khoản' },
  { key: 'email', name: 'Email' },
  { key: 'phoneNumber', name: 'Số điện thoại' },
  { key: 'roleName', name: 'Loại tài khoản' },
  { key: 'status', name: 'Trạng thái' },
  { key: 'createdDate', name: 'Ngày đăng ký' },
  { key: 'actions', name: 'Thao tác' },
];

const ACCOUNT_STATUS = [
  { key: 1, desc: 'Chưa xác thực' },
  { key: 2, desc: 'Đang hoạt động' },
  { key: 3, desc: 'Đã bị cấm' },
];

const ACCOUNT_TYPE = [
  { key: 1, name: 'Khách hàng' },
  { key: 2, name: 'Chủ cửa hàng' },
];

// Manage request withdrawals

// Manage reports

export {
  ACCOUNT_COLUMNS,
  ACCOUNT_STATUS,
  ORDER_COLUMNS,
  ORDER_STATUS,
  SHOP_COLUMNS,
  SHOP_STATUS,
  ACCOUNT_TYPE,
};
