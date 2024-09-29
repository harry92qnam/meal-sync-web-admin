import OrderModel from '@/types/models/OrderModel';
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

export const sampleOrders: FetchResponse<OrderModel> = {
  value: {
    items: [
      {
        id: 1,
        shopName: 'Shop A',
        customerName: 'John Doe',
        price: 100,
        orderDate: '2023-10-01',
        status: 2,
        orderInfo: {
          orderId: 101,
          orderStatus: 1,
          shippingFee: 5,
          totalPrice: 105,
          totalPromotion: 0,
          fullName: 'John Doe',
          phoneNumber: '1234567890',
          distance: 2.5,
          durationShipping: '30 mins',
          shopId: 1,
          note: 'Leave at the door',
          reason: '',
          building: {
            buildingId: 1,
            address: '123 Main St',
            longitude: 12.34,
            latitude: 56.78,
          },
          voucher: {
            promotionId: 1,
            title: '10% off',
            amountRate: 10,
            amountValue: 10,
            minimumOrderValue: 50,
            maximumApplyValue: 100,
            applyType: 1,
            startDate: '2023-09-01',
            endDate: '2023-10-01',
          },
        },
        shopInfo: {
          id: 1,
          name: 'Shop A',
          logoUrl: 'http://example.com/logo.png',
          bannerUrl: 'http://example.com/banner.png',
          description: 'Best shop in town',
          balance: 1000,
          phoneNumber: '0987654321',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 50,
          rating: 4.5,
          minimumValueOrderFreeship: 50,
          shippingFee: 5,
          building: {
            buildingId: 1,
            address: '123 Main St',
            longitude: 12.34,
            latitude: 56.78,
          },
        },
        products: [
          {
            orderId: 101,
            productId: 1,
            productQuantity: 1,
            productPrice: 100,
            productName: 'Product A',
            imageUrl: 'http://example.com/productA.png',
            productStatus: 1,
            totalProductPrice: 100,
            topping: [
              {
                questionId: 1,
                questionType: 1,
                queDescription: 'Choose a topping',
                totalDescription: 'Extra cheese',
                options: [
                  {
                    optionId: 1,
                    opDescription: 'Extra cheese',
                    optionPrice: 2,
                    optionImageUrl: 'http://example.com/cheese.png',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        shopName: 'Shop B',
        customerName: 'Jane Smith',
        price: 150,
        orderDate: '2023-10-02',
        status: 3,
        orderInfo: {
          orderId: 102,
          orderStatus: 2,
          shippingFee: 10,
          totalPrice: 160,
          totalPromotion: 5,
          fullName: 'Jane Smith',
          phoneNumber: '2345678901',
          distance: 3.0,
          durationShipping: '45 mins',
          shopId: 2,
          note: 'Ring the bell',
          reason: '',
          building: {
            buildingId: 2,
            address: '456 Elm St',
            longitude: 23.45,
            latitude: 67.89,
          },
          voucher: {
            promotionId: 2,
            title: '5% off',
            amountRate: 5,
            amountValue: 5,
            minimumOrderValue: 30,
            maximumApplyValue: 50,
            applyType: 1,
            startDate: '2023-09-15',
            endDate: '2023-10-15',
          },
        },
        shopInfo: {
          id: 2,
          name: 'Shop B',
          logoUrl: 'http://example.com/logoB.png',
          bannerUrl: 'http://example.com/bannerB.png',
          description: 'Great food and service',
          balance: 800,
          phoneNumber: '9876543210',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 30,
          rating: 4.0,
          minimumValueOrderFreeship: 40,
          shippingFee: 10,
          building: {
            buildingId: 2,
            address: '456 Elm St',
            longitude: 23.45,
            latitude: 67.89,
          },
        },
        products: [
          {
            orderId: 102,
            productId: 2,
            productQuantity: 2,
            productPrice: 75,
            productName: 'Product B',
            imageUrl: 'http://example.com/productB.png',
            productStatus: 1,
            totalProductPrice: 150,
            topping: [],
          },
        ],
      },
      {
        id: 3,
        shopName: 'Shop C',
        customerName: 'Alice Johnson',
        price: 200,
        orderDate: '2023-10-03',
        status: 1,
        orderInfo: {
          orderId: 103,
          orderStatus: 1,
          shippingFee: 15,
          totalPrice: 215,
          totalPromotion: 0,
          fullName: 'Alice Johnson',
          phoneNumber: '3456789012',
          distance: 4.0,
          durationShipping: '50 mins',
          shopId: 3,
          note: 'Leave at the reception',
          reason: '',
          building: {
            buildingId: 3,
            address: '789 Pine St',
            longitude: 34.56,
            latitude: 78.9,
          },
          voucher: {
            promotionId: 3,
            title: 'No promotion',
            amountRate: 0,
            amountValue: 0,
            minimumOrderValue: 0,
            maximumApplyValue: 0,
            applyType: 0,
            startDate: '2023-10-01',
            endDate: '2023-10-31',
          },
        },
        shopInfo: {
          id: 3,
          name: 'Shop C',
          logoUrl: 'http://example.com/logoC.png',
          bannerUrl: 'http://example.com/bannerC.png',
          description: 'Delicious meals',
          balance: 600,
          phoneNumber: '8765432109',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 20,
          rating: 4.8,
          minimumValueOrderFreeship: 60,
          shippingFee: 15,
          building: {
            buildingId: 3,
            address: '789 Pine St',
            longitude: 34.56,
            latitude: 78.9,
          },
        },
        products: [
          {
            orderId: 103,
            productId: 3,
            productQuantity: 1,
            productPrice: 200,
            productName: 'Product C',
            imageUrl: 'http://example.com/productC.png',
            productStatus: 1,
            totalProductPrice: 200,
            topping: [],
          },
        ],
      },
      {
        id: 4,
        shopName: 'Shop D',
        customerName: 'Bob Brown',
        price: 120,
        orderDate: '2023-10-04',
        status: 2,
        orderInfo: {
          orderId: 104,
          orderStatus: 2,
          shippingFee: 8,
          totalPrice: 128,
          totalPromotion: 0,
          fullName: 'Bob Brown',
          phoneNumber: '4567890123',
          distance: 1.5,
          durationShipping: '20 mins',
          shopId: 4,
          note: 'Call when arrived',
          reason: '',
          building: {
            buildingId: 4,
            address: '321 Oak St',
            longitude: 45.67,
            latitude: 89.01,
          },
          voucher: {
            promotionId: 4,
            title: '10% off',
            amountRate: 10,
            amountValue: 12,
            minimumOrderValue: 50,
            maximumApplyValue: 100,
            applyType: 1,
            startDate: '2023-09-01',
            endDate: '2023-10-01',
          },
        },
        shopInfo: {
          id: 4,
          name: 'Shop D',
          logoUrl: 'http://example.com/logoD.png',
          bannerUrl: 'http://example.com/bannerD.png',
          description: 'Fast delivery',
          balance: 500,
          phoneNumber: '7654321098',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 25,
          rating: 4.2,
          minimumValueOrderFreeship: 30,
          shippingFee: 8,
          building: {
            buildingId: 4,
            address: '321 Oak St',
            longitude: 45.67,
            latitude: 89.01,
          },
        },
        products: [
          {
            orderId: 104,
            productId: 4,
            productQuantity: 1,
            productPrice: 120,
            productName: 'Product D',
            imageUrl: 'http://example.com/productD.png',
            productStatus: 1,
            totalProductPrice: 120,
            topping: [],
          },
        ],
      },
      {
        id: 5,
        shopName: 'Shop E',
        customerName: 'Charlie Davis',
        price: 90,
        orderDate: '2023-10-05',
        status: 1,
        orderInfo: {
          orderId: 105,
          orderStatus: 1,
          shippingFee: 5,
          totalPrice: 95,
          totalPromotion: 0,
          fullName: 'Charlie Davis',
          phoneNumber: '5678901234',
          distance: 2.0,
          durationShipping: '25 mins',
          shopId: 5,
          note: 'Leave at the door',
          reason: '',
          building: {
            buildingId: 5,
            address: '654 Maple St',
            longitude: 56.78,
            latitude: 90.12,
          },
          voucher: {
            promotionId: 5,
            title: '5% off',
            amountRate: 5,
            amountValue: 5,
            minimumOrderValue: 20,
            maximumApplyValue: 50,
            applyType: 1,
            startDate: '2023-09-10',
            endDate: '2023-10-10',
          },
        },
        shopInfo: {
          id: 5,
          name: 'Shop E',
          logoUrl: 'http://example.com/logoE.png',
          bannerUrl: 'http://example.com/bannerE.png',
          description: 'Quality products',
          balance: 400,
          phoneNumber: '6543210987',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 15,
          rating: 4.6,
          minimumValueOrderFreeship: 25,
          shippingFee: 5,
          building: {
            buildingId: 5,
            address: '654 Maple St',
            longitude: 56.78,
            latitude: 90.12,
          },
        },
        products: [
          {
            orderId: 105,
            productId: 5,
            productQuantity: 1,
            productPrice: 90,
            productName: 'Product E',
            imageUrl: 'http://example.com/productE.png',
            productStatus: 1,
            totalProductPrice: 90,
            topping: [],
          },
        ],
      },
      {
        id: 6,
        shopName: 'Shop F',
        customerName: 'Diana Evans',
        price: 250,
        orderDate: '2023-10-06',
        status: 2,
        orderInfo: {
          orderId: 106,
          orderStatus: 2,
          shippingFee: 20,
          totalPrice: 270,
          totalPromotion: 0,
          fullName: 'Diana Evans',
          phoneNumber: '6789012345',
          distance: 5.0,
          durationShipping: '60 mins',
          shopId: 6,
          note: 'Deliver to the office',
          reason: '',
          building: {
            buildingId: 6,
            address: '987 Birch St',
            longitude: 67.89,
            latitude: 12.34,
          },
          voucher: {
            promotionId: 6,
            title: 'No promotion',
            amountRate: 0,
            amountValue: 0,
            minimumOrderValue: 0,
            maximumApplyValue: 0,
            applyType: 0,
            startDate: '2023-10-01',
            endDate: '2023-10-31',
          },
        },
        shopInfo: {
          id: 6,
          name: 'Shop F',
          logoUrl: 'http://example.com/logoF.png',
          bannerUrl: 'http://example.com/bannerF.png',
          description: 'Best quality',
          balance: 300,
          phoneNumber: '5432109876',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 10,
          rating: 4.9,
          minimumValueOrderFreeship: 100,
          shippingFee: 20,
          building: {
            buildingId: 6,
            address: '987 Birch St',
            longitude: 67.89,
            latitude: 12.34,
          },
        },
        products: [
          {
            orderId: 106,
            productId: 6,
            productQuantity: 1,
            productPrice: 250,
            productName: 'Product F',
            imageUrl: 'http://example.com/productF.png',
            productStatus: 1,
            totalProductPrice: 250,
            topping: [],
          },
        ],
      },
      {
        id: 7,
        shopName: 'Shop G',
        customerName: 'Eve White',
        price: 60,
        orderDate: '2023-10-07',
        status: 1,
        orderInfo: {
          orderId: 107,
          orderStatus: 1,
          shippingFee: 5,
          totalPrice: 65,
          totalPromotion: 0,
          fullName: 'Eve White',
          phoneNumber: '7890123456',
          distance: 1.0,
          durationShipping: '15 mins',
          shopId: 7,
          note: 'No special instructions',
          reason: '',
          building: {
            buildingId: 7,
            address: '321 Cedar St',
            longitude: 78.9,
            latitude: 23.45,
          },
          voucher: {
            promotionId: 7,
            title: '5% off',
            amountRate: 5,
            amountValue: 5,
            minimumOrderValue: 10,
            maximumApplyValue: 20,
            applyType: 1,
            startDate: '2023-09-20',
            endDate: '2023-10-20',
          },
        },
        shopInfo: {
          id: 7,
          name: 'Shop G',
          logoUrl: 'http://example.com/logoG.png',
          bannerUrl: 'http://example.com/bannerG.png',
          description: 'Affordable prices',
          balance: 200,
          phoneNumber: '4321098765',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 5,
          rating: 4.3,
          minimumValueOrderFreeship: 15,
          shippingFee: 5,
          building: {
            buildingId: 7,
            address: '321 Cedar St',
            longitude: 78.9,
            latitude: 23.45,
          },
        },
        products: [
          {
            orderId: 107,
            productId: 7,
            productQuantity: 1,
            productPrice: 60,
            productName: 'Product G',
            imageUrl: 'http://example.com/productG.png',
            productStatus: 1,
            totalProductPrice: 60,
            topping: [],
          },
        ],
      },
      {
        id: 8,
        shopName: 'Shop H',
        customerName: 'Frank Black',
        price: 180,
        orderDate: '2023-10-08',
        status: 2,
        orderInfo: {
          orderId: 108,
          orderStatus: 2,
          shippingFee: 10,
          totalPrice: 190,
          totalPromotion: 0,
          fullName: 'Frank Black',
          phoneNumber: '8901234567',
          distance: 3.5,
          durationShipping: '40 mins',
          shopId: 8,
          note: 'Deliver to the back door',
          reason: '',
          building: {
            buildingId: 8,
            address: '654 Spruce St',
            longitude: 89.01,
            latitude: 34.56,
          },
          voucher: {
            promotionId: 8,
            title: 'No promotion',
            amountRate: 0,
            amountValue: 0,
            minimumOrderValue: 0,
            maximumApplyValue: 0,
            applyType: 0,
            startDate: '2023-10-01',
            endDate: '2023-10-31',
          },
        },
        shopInfo: {
          id: 8,
          name: 'Shop H',
          logoUrl: 'http://example.com/logoH.png',
          bannerUrl: 'http://example.com/bannerH.png',
          description: 'Great service',
          balance: 100,
          phoneNumber: '3210987654',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 8,
          rating: 4.7,
          minimumValueOrderFreeship: 70,
          shippingFee: 10,
          building: {
            buildingId: 8,
            address: '654 Spruce St',
            longitude: 89.01,
            latitude: 34.56,
          },
        },
        products: [
          {
            orderId: 108,
            productId: 8,
            productQuantity: 1,
            productPrice: 180,
            productName: 'Product H',
            imageUrl: 'http://example.com/productH.png',
            productStatus: 1,
            totalProductPrice: 180,
            topping: [],
          },
        ],
      },
      {
        id: 9,
        shopName: 'Shop I',
        customerName: 'Grace Green',
        price: 75,
        orderDate: '2023-10-09',
        status: 3,
        orderInfo: {
          orderId: 109,
          orderStatus: 1,
          shippingFee: 5,
          totalPrice: 80,
          totalPromotion: 0,
          fullName: 'Grace Green',
          phoneNumber: '9012345678',
          distance: 2.0,
          durationShipping: '30 mins',
          shopId: 9,
          note: 'No special instructions',
          reason: '',
          building: {
            buildingId: 9,
            address: '987 Fir St',
            longitude: 90.12,
            latitude: 45.67,
          },
          voucher: {
            promotionId: 9,
            title: '5% off',
            amountRate: 5,
            amountValue: 5,
            minimumOrderValue: 15,
            maximumApplyValue: 30,
            applyType: 1,
            startDate: '2023-09-25',
            endDate: '2023-10-25',
          },
        },
        shopInfo: {
          id: 9,
          name: 'Shop I',
          logoUrl: 'http://example.com/logoI.png',
          bannerUrl: 'http://example.com/bannerI.png',
          description: 'Fresh ingredients',
          balance: 150,
          phoneNumber: '2109876543',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 12,
          rating: 4.4,
          minimumValueOrderFreeship: 20,
          shippingFee: 5,
          building: {
            buildingId: 9,
            address: '987 Fir St',
            longitude: 90.12,
            latitude: 45.67,
          },
        },
        products: [
          {
            orderId: 109,
            productId: 9,
            productQuantity: 1,
            productPrice: 75,
            productName: 'Product I',
            imageUrl: 'http://example.com/productI.png',
            productStatus: 1,
            totalProductPrice: 75,
            topping: [],
          },
        ],
      },
      {
        id: 10,
        shopName: 'Shop J',
        customerName: 'Henry Blue',
        price: 130,
        orderDate: '2023-10-10',
        status: 2,
        orderInfo: {
          orderId: 110,
          orderStatus: 2,
          shippingFee: 10,
          totalPrice: 140,
          totalPromotion: 0,
          fullName: 'Henry Blue',
          phoneNumber: '0123456789',
          distance: 4.0,
          durationShipping: '50 mins',
          shopId: 10,
          note: 'Deliver to the front door',
          reason: '',
          building: {
            buildingId: 10,
            address: '123 Willow St',
            longitude: 12.34,
            latitude: 56.78,
          },
          voucher: {
            promotionId: 10,
            title: 'No promotion',
            amountRate: 0,
            amountValue: 0,
            minimumOrderValue: 0,
            maximumApplyValue: 0,
            applyType: 0,
            startDate: '2023-10-01',
            endDate: '2023-10-31',
          },
        },
        shopInfo: {
          id: 10,
          name: 'Shop J',
          logoUrl: 'http://example.com/logoJ.png',
          bannerUrl: 'http://example.com/bannerJ.png',
          description: 'Quality service',
          balance: 250,
          phoneNumber: '3216549870',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 18,
          rating: 4.1,
          minimumValueOrderFreeship: 50,
          shippingFee: 10,
          building: {
            buildingId: 10,
            address: '123 Willow St',
            longitude: 12.34,
            latitude: 56.78,
          },
        },
        products: [
          {
            orderId: 110,
            productId: 10,
            productQuantity: 1,
            productPrice: 130,
            productName: 'Product J',
            imageUrl: 'http://example.com/productJ.png',
            productStatus: 1,
            totalProductPrice: 130,
            topping: [],
          },
        ],
      },
      {
        id: 11,
        shopName: 'Shop K',
        customerName: 'Ivy Red',
        price: 110,
        orderDate: '2023-10-11',
        status: 1,
        orderInfo: {
          orderId: 111,
          orderStatus: 1,
          shippingFee: 5,
          totalPrice: 115,
          totalPromotion: 0,
          fullName: 'Ivy Red',
          phoneNumber: '1234567890',
          distance: 2.5,
          durationShipping: '30 mins',
          shopId: 11,
          note: 'Leave at the door',
          reason: '',
          building: {
            buildingId: 11,
            address: '456 Oak St',
            longitude: 23.45,
            latitude: 67.89,
          },
          voucher: {
            promotionId: 11,
            title: '10% off',
            amountRate: 10,
            amountValue: 10,
            minimumOrderValue: 50,
            maximumApplyValue: 100,
            applyType: 1,
            startDate: '2023-09-01',
            endDate: '2023-10-01',
          },
        },
        shopInfo: {
          id: 11,
          name: 'Shop K',
          logoUrl: 'http://example.com/logoK.png',
          bannerUrl: 'http://example.com/bannerK.png',
          description: 'Best in town',
          balance: 300,
          phoneNumber: '0987654321',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 22,
          rating: 4.5,
          minimumValueOrderFreeship: 30,
          shippingFee: 5,
          building: {
            buildingId: 11,
            address: '456 Oak St',
            longitude: 23.45,
            latitude: 67.89,
          },
        },
        products: [
          {
            orderId: 111,
            productId: 11,
            productQuantity: 1,
            productPrice: 110,
            productName: 'Product K',
            imageUrl: 'http://example.com/productK.png',
            productStatus: 1,
            totalProductPrice: 110,
            topping: [],
          },
        ],
      },
      {
        id: 12,
        shopName: 'Shop L',
        customerName: 'Jack Grey',
        price: 95,
        orderDate: '2023-10-12',
        status: 2,
        orderInfo: {
          orderId: 112,
          orderStatus: 2,
          shippingFee: 5,
          totalPrice: 100,
          totalPromotion: 0,
          fullName: 'Jack Grey',
          phoneNumber: '2345678901',
          distance: 1.5,
          durationShipping: '20 mins',
          shopId: 12,
          note: 'Call when arrived',
          reason: '',
          building: {
            buildingId: 12,
            address: '789 Pine St',
            longitude: 34.56,
            latitude: 78.9,
          },
          voucher: {
            promotionId: 12,
            title: '5% off',
            amountRate: 5,
            amountValue: 5,
            minimumOrderValue: 20,
            maximumApplyValue: 50,
            applyType: 1,
            startDate: '2023-09-10',
            endDate: '2023-10-10',
          },
        },
        shopInfo: {
          id: 12,
          name: 'Shop L',
          logoUrl: 'http://example.com/logoL.png',
          bannerUrl: 'http://example.com/bannerL.png',
          description: 'Fast delivery',
          balance: 400,
          phoneNumber: '7654321098',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 15,
          rating: 4.6,
          minimumValueOrderFreeship: 25,
          shippingFee: 5,
          building: {
            buildingId: 12,
            address: '789 Pine St',
            longitude: 34.56,
            latitude: 78.9,
          },
        },
        products: [
          {
            orderId: 112,
            productId: 12,
            productQuantity: 1,
            productPrice: 95,
            productName: 'Product L',
            imageUrl: 'http://example.com/productL.png',
            productStatus: 1,
            totalProductPrice: 95,
            topping: [],
          },
        ],
      },
      {
        id: 13,
        shopName: 'Shop M',
        customerName: 'Liam Orange',
        price: 150,
        orderDate: '2023-10-13',
        status: 1,
        orderInfo: {
          orderId: 113,
          orderStatus: 1,
          shippingFee: 10,
          totalPrice: 160,
          totalPromotion: 0,
          fullName: 'Liam Orange',
          phoneNumber: '3456789012',
          distance: 3.0,
          durationShipping: '45 mins',
          shopId: 13,
          note: 'Leave at the door',
          reason: '',
          building: {
            buildingId: 13,
            address: '321 Oak St',
            longitude: 45.67,
            latitude: 89.01,
          },
          voucher: {
            promotionId: 13,
            title: '10% off',
            amountRate: 10,
            amountValue: 15,
            minimumOrderValue: 50,
            maximumApplyValue: 100,
            applyType: 1,
            startDate: '2023-09-01',
            endDate: '2023-10-01',
          },
        },
        shopInfo: {
          id: 13,
          name: 'Shop M',
          logoUrl: 'http://example.com/logoM.png',
          bannerUrl: 'http://example.com/bannerM.png',
          description: 'Quality products',
          balance: 600,
          phoneNumber: '6543210987',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 20,
          rating: 4.8,
          minimumValueOrderFreeship: 60,
          shippingFee: 10,
          building: {
            buildingId: 13,
            address: '321 Oak St',
            longitude: 45.67,
            latitude: 89.01,
          },
        },
        products: [
          {
            orderId: 113,
            productId: 13,
            productQuantity: 1,
            productPrice: 150,
            productName: 'Product M',
            imageUrl: 'http://example.com/productM.png',
            productStatus: 1,
            totalProductPrice: 150,
            topping: [],
          },
        ],
      },
      {
        id: 14,
        shopName: 'Shop N',
        customerName: 'Olivia Purple',
        price: 80,
        orderDate: '2023-10-14',
        status: 2,
        orderInfo: {
          orderId: 114,
          orderStatus: 2,
          shippingFee: 5,
          totalPrice: 85,
          totalPromotion: 0,
          fullName: 'Olivia Purple',
          phoneNumber: '4567890123',
          distance: 2.0,
          durationShipping: '25 mins',
          shopId: 14,
          note: 'No special instructions',
          reason: '',
          building: {
            buildingId: 14,
            address: '654 Maple St',
            longitude: 56.78,
            latitude: 90.12,
          },
          voucher: {
            promotionId: 14,
            title: '5% off',
            amountRate: 5,
            amountValue: 5,
            minimumOrderValue: 10,
            maximumApplyValue: 20,
            applyType: 1,
            startDate: '2023-09-20',
            endDate: '2023-10-20',
          },
        },
        shopInfo: {
          id: 14,
          name: 'Shop N',
          logoUrl: 'http://example.com/logoN.png',
          bannerUrl: 'http://example.com/bannerN.png',
          description: 'Affordable prices',
          balance: 200,
          phoneNumber: '4321098765',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 5,
          rating: 4.3,
          minimumValueOrderFreeship: 15,
          shippingFee: 5,
          building: {
            buildingId: 14,
            address: '654 Maple St',
            longitude: 56.78,
            latitude: 90.12,
          },
        },
        products: [
          {
            orderId: 114,
            productId: 14,
            productQuantity: 1,
            productPrice: 80,
            productName: 'Product N',
            imageUrl: 'http://example.com/productN.png',
            productStatus: 1,
            totalProductPrice: 80,
            topping: [],
          },
        ],
      },
      {
        id: 15,
        shopName: 'Shop O',
        customerName: 'Noah Brown',
        price: 140,
        orderDate: '2023-10-15',
        status: 1,
        orderInfo: {
          orderId: 115,
          orderStatus: 1,
          shippingFee: 10,
          totalPrice: 150,
          totalPromotion: 0,
          fullName: 'Noah Brown',
          phoneNumber: '5678901234',
          distance: 3.5,
          durationShipping: '40 mins',
          shopId: 15,
          note: 'Deliver to the back door',
          reason: '',
          building: {
            buildingId: 15,
            address: '321 Cedar St',
            longitude: 78.9,
            latitude: 23.45,
          },
          voucher: {
            promotionId: 15,
            title: 'No promotion',
            amountRate: 0,
            amountValue: 0,
            minimumOrderValue: 0,
            maximumApplyValue: 0,
            applyType: 0,
            startDate: '2023-10-01',
            endDate: '2023-10-31',
          },
        },
        shopInfo: {
          id: 15,
          name: 'Shop O',
          logoUrl: 'http://example.com/logoO.png',
          bannerUrl: 'http://example.com/bannerO.png',
          description: 'Great service',
          balance: 100,
          phoneNumber: '3210987654',
          activeFrom: 1633046400,
          activeTo: 1733046400,
          totalProduct: 8,
          rating: 4.7,
          minimumValueOrderFreeship: 70,
          shippingFee: 10,
          building: {
            buildingId: 15,
            address: '321 Cedar St',
            longitude: 78.9,
            latitude: 23.45,
          },
        },
        products: [
          {
            orderId: 115,
            productId: 15,
            productQuantity: 1,
            productPrice: 140,
            productName: 'Product O',
            imageUrl: 'http://example.com/productO.png',
            productStatus: 1,
            totalProductPrice: 140,
            topping: [],
          },
        ],
      },
    ] as OrderModel[],
    pageIndex: 1,
    pageSize: 10,
    numberOfItems: 15,
    totalOfPages: 2,
    hasPrevious: false,
    hasNext: true,
  },
  isSuccess: true,
  isFailure: false,
  error: { code: '', message: '' },
};
