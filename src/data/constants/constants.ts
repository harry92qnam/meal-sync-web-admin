// Manage orders
const ORDER_COLUMNS = [
  { key: 'id', name: 'Mã đơn hàng' },
  { key: 'shopName', name: 'Tên cửa hàng' },
  { key: 'customerName', name: 'Tên khách hàng' },
  { key: 'phoneNumber', name: 'Số điện thoại khách hàng' },
  { key: 'status', name: 'Trạng thái đơn hàng' },
  { key: 'totalPrice', name: 'Tổng hóa đơn' },
  { key: 'intendedReceiveDate', name: 'Ngày dự kiến nhận hàng' },
];

const ORDER_STATUS = [
  { key: 1, desc: 'Đã hoàn thành' },
  { key: 2, desc: 'Đang thực hiện' },
  { key: 3, desc: 'Đang có báo cáo' },
  { key: 4, desc: 'Đã hủy' },
];

const DORMITORY = [
  { key: 1, desc: 'Khu A' },
  { key: 2, desc: 'Khu B' },
];

// Manage shops
const SHOP_COLUMNS = [
  { key: 'id', name: 'Mã cửa hàng' },
  { key: 'shopName', name: 'Tên cửa hàng' },
  { key: 'shopOwnerName', name: 'Tên chủ cửa hàng' },
  { key: 'totalFood', name: 'Tổng sản phẩm' },
  { key: 'totalRevenue', name: 'Tổng doanh thu' },
  { key: 'totalOrderInProcess', name: 'Số đơn đang xử lý' },
  { key: 'createdDate', name: 'Số ngày đã hoạt động' },
  { key: 'status', name: 'Trạng thái cửa hàng' },
  { key: 'actions', name: 'Thao tác' },
];

const SHOP_STATUS = [
  { key: 1, desc: 'Chưa phê duyệt' },
  { key: 2, desc: 'Đang hoạt động' },
  { key: 3, desc: 'Đang đóng cửa' },
  { key: 4, desc: 'Đang cấm tạm thời' },
  { key: 5, desc: 'Đã bị cấm' },
];

// Manage accounts
const ACCOUNT_COLUMNS = [
  { key: 'id', name: 'Mã người dùng' },
  { key: 'fullName', name: 'Tên tài khoản' },
  { key: 'email', name: 'Email' },
  { key: 'phoneNumber', name: 'Số điện thoại' },
  { key: 'status', name: 'Trạng thái' },
  { key: 'totalOrderInProcess', name: 'Số đơn đang xử lý' },
  { key: 'createdDate', name: 'Ngày tạo tài khoản' },
  { key: 'actions', name: 'Thao tác' },
];

const ACCOUNT_STATUS = [
  { key: 1, desc: 'Đang hoạt động' },
  { key: 2, desc: 'Đang cấm tạm thời' },
  { key: 3, desc: 'Đã bị cấm' },
];

const GENDER = [
  { key: 0, desc: 'Nam' },
  { key: 1, desc: 'Nữ' },
  { key: 2, desc: 'Không xác định' },
];

const ACCOUNT_TYPE = [
  { key: 1, name: 'Khách hàng' },
  { key: 2, name: 'Chủ cửa hàng' },
];

// Manage withdrawal requests
const WITHDRAWAL_COLUMNS = [
  { key: 'id', name: 'Mã yêu cầu' },
  { key: 'shopName', name: 'Tên cửa hàng' },
  { key: 'requestAmount', name: 'Số tiền yêu cầu' },
  { key: 'availableAmount', name: 'Số dư hiện tại' },
  { key: 'bankShortName', name: 'Ngân hàng thụ hưởng' },
  { key: 'bankAccountNumber', name: 'Số tài khoản' },
  { key: 'status', name: 'Trạng thái' },
  { key: 'createdDate', name: 'Thời gian yêu cầu' },
];

const WITHDRAWAL_STATUS = [
  { key: 1, desc: 'Chờ xử lý' },
  { key: 3, desc: 'Đang xử lý' },
  { key: 4, desc: 'Đã phê duyệt' },
  { key: 5, desc: 'Đã từ chối' },
];

// Manage reports
const REPORT_COLUMNS = [
  { key: 'id', name: 'Mã báo cáo' },
  { key: 'orderId', name: 'Mã đơn hàng' },
  { key: 'customerName', name: 'Tên người báo cáo' },
  { key: 'shopName', name: 'Tên cửa hàng' },
  { key: 'title', name: 'Loại báo cáo' },
  { key: 'content', name: 'Lý do cụ thể' },
  { key: 'status', name: 'Trạng thái' },
  { key: 'createdDate', name: 'Thời gian báo cáo' },
];

const REPORT_STATUS = [
  { key: 1, desc: 'Chưa thể xử lý' },
  { key: 2, desc: 'Chờ xử lý' },
  { key: 3, desc: 'Đang xử lý' },
  { key: 4, desc: 'Đã phê duyệt' },
  { key: 5, desc: 'Đã từ chối' },
];

export {
  ACCOUNT_COLUMNS,
  ACCOUNT_STATUS,
  ORDER_COLUMNS,
  ORDER_STATUS,
  SHOP_COLUMNS,
  SHOP_STATUS,
  ACCOUNT_TYPE,
  WITHDRAWAL_COLUMNS,
  WITHDRAWAL_STATUS,
  REPORT_COLUMNS,
  REPORT_STATUS,
  GENDER,
  DORMITORY,
};
