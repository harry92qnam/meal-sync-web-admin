import ReportModel from '@/types/models/ReportModel';
import FetchResponse from './../types/responses/FetchResponse';
export const sampleNotifications = [
  {
    id: 1,
    avatar: 'https://avatars.githubusercontent.com/u/62385893?v=4',
    content: 'Notification content 1 Notification content 1 Notification content 1',
    createdDate: '2023-01-01T12:00:00Z',
  },
  {
    id: 2,
    avatar:
      'https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    content: 'Notification content 2',
    createdDate: '2023-01-02T12:00:00Z',
  },
  {
    id: 3,
    avatar:
      'https://i.natgeofe.com/k/63b1a8a7-0081-493e-8b53-81d01261ab5d/red-panda-full-body_4x3.jpg',
    content: 'Notification content 3',
    createdDate: '2023-01-03T12:00:00Z',
  },
  {
    id: 4,
    avatar: 'https://media.wired.com/photos/593261cab8eb31692072f129/master/pass/85120553.jpg',
    content: 'Notification content 4',
    createdDate: '2023-01-04T12:00:00Z',
  },
  {
    id: 5,
    avatar: 'https://www.dartmoorzoo.org.uk/wp-content/uploads/2021/01/Tiger-1.jpg',
    content: 'Notification content 5',
    createdDate: '2023-01-05T12:00:00Z',
  },
];

export const sampleReports: FetchResponse<ReportModel> = {
  value: {
    items: [
      {
        id: 1,
        shopId: 1,
        customerId: 1001,
        staffDeliveryId: 1,
        orderId: 1001,
        title: 'Order Delivery Issue',
        content: 'The customer did not receive the correct order.',
        imageUrl: 'https://example.com/report1.jpg',
        status: 1, // Pending
        reason: null,
        createdDate: '2023-10-01',
      },
      {
        id: 2,
        shopId: 2,
        customerId: 1002,
        staffDeliveryId: 2,
        orderId: 1002,
        title: 'Product Quality Issue',
        content: 'The product was damaged upon delivery.',
        imageUrl: 'https://example.com/report2.jpg',
        status: 2, // Resolved
        reason: 'The customer was refunded for the damaged product.',
        createdDate: '2023-02-01',
      },
      {
        id: 3,
        shopId: 3,
        customerId: 1003,
        staffDeliveryId: 3,
        orderId: 1003,
        title: 'Order Cancellation Issue',
        content: 'The customer could not cancel the order after placing it.',
        imageUrl: 'https://example.com/report3.jpg',
        status: 3, // Rejected
        reason: 'The order could not be canceled because it was already being prepared.',
        createdDate: '2023-03-01',
      },
      {
        id: 4,
        shopId: 4,
        customerId: 1004,
        staffDeliveryId: 4,
        orderId: 1004,
        title: 'Order Delivery Delay',
        content: 'The order was delivered late.',
        imageUrl: 'https://example.com/report4.jpg',
        status: 2, // Resolved
        reason: 'The customer was given a discount for the late delivery.',
        createdDate: '2023-04-01',
      },
      {
        id: 5,
        shopId: 5,
        customerId: 1005,
        staffDeliveryId: 5,
        orderId: 1005,
        title: 'Product Quantity Issue',
        content: 'The order was missing a product.',
        imageUrl: 'https://example.com/report5.jpg',
        status: 1, // Pending
        reason: null,
        createdDate: '2023-05-01',
      },
      {
        id: 6,
        shopId: 6,
        customerId: 1006,
        staffDeliveryId: 6,
        orderId: 1006,
        title: 'Payment Issue',
        content: 'The customer could not complete the payment.',
        imageUrl: 'https://example.com/report6.jpg',
        status: 3, // Rejected
        reason: 'The payment gateway was experiencing technical difficulties.',
        createdDate: '2023-06-01',
      },
      {
        id: 7,
        shopId: 7,
        customerId: 1007,
        staffDeliveryId: 7,
        orderId: 1007,
        title: 'Order Delivery Address Issue',
        content: 'The order was delivered to the wrong address.',
        imageUrl: 'https://example.com/report7.jpg',
        status: 2, // Resolved
        reason: 'The customer was refunded for the incorrect delivery.',
        createdDate: '2023-07-01',
      },
      {
        id: 8,
        shopId: 8,
        customerId: 1008,
        staffDeliveryId: 8,
        orderId: 1008,
        title: 'Product Substitution Issue',
        content: 'The product was substituted with a different product.',
        imageUrl: 'https://example.com/report8.jpg',
        status: 1, // Pending
        reason: null,
        createdDate: '2023-08-01',
      },
      {
        id: 9,
        shopId: 9,
        customerId: 1009,
        staffDeliveryId: 9,
        orderId: 1009,
        title: 'Order Refund Issue',
        content: 'The customer did not receive a refund for a canceled order.',
        imageUrl: 'https://example.com/report9.jpg',
        status: 3, // Rejected
        reason: 'The customer did not provide the necessary documentation for a refund.',
        createdDate: '2023-09-01',
      },
      {
        id: 10,
        shopId: 10,
        customerId: 1010,
        staffDeliveryId: 10,
        orderId: 1010,
        title: 'Order Confirmation Issue',
        content: 'The customer did not receive an order confirmation email.',
        imageUrl: 'https://example.com/report10.jpg',
        status: 2, // Resolved
        reason: 'The order confirmation email was resent to the customer.',
        createdDate: '2023-10-01',
      },
    ] as ReportModel[],
    pageIndex: 1,
    pageSize: 10,
    totalCount: 15,
    totalPages: 2,
    hasPrevious: false,
    hasNext: true,
  },
  isSuccess: true,
  isFailure: false,
  error: { code: '', message: '' },
};
