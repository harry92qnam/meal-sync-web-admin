import ShopModel from '@/types/models/ShopModel';
import OrderModel from '../../types/models/OrderModel';
import apiClient from './api-client';
import createHttpService from './api-service';
import AccountModel from '@/types/models/AccountModel';
import ReportModel from '@/types/models/ReportModel';
import CategoryModel from '@/types/models/CategoryModel';
import ContainerModel from '@/types/models/ContainerModel';

export const endpoints = {
  ORDERS: 'moderator/order',
  SHOPS: 'moderator/shop',
  ACCOUNTS: 'moderator/customer',
  REPORTS: 'moderator/report',
  WITHDRAWALS: 'moderator/withdrawal-request',
  COMMISSION_GET: 'admin/commission-config',
  COMMISSION_UPDATE: 'admin/commission-config/update',
  STORAGE_FILE_UPLOAD: 'storage/file/upload',
  STORAGE_FILE_DELETE: 'storage/file/delete',
  CATEGORIES: 'admin/platform-category/get-all',
  CONTAINERS: 'admin/food-packing-unit?type=1',
};

export const orderApiService = createHttpService<OrderModel>(apiClient, endpoints.ORDERS);
export const shopApiService = createHttpService<ShopModel>(apiClient, endpoints.SHOPS);
export const accountApiService = createHttpService<AccountModel>(apiClient, endpoints.ACCOUNTS);
export const reportApiService = createHttpService<ReportModel>(apiClient, endpoints.REPORTS);
export const categoryApiService = createHttpService<CategoryModel>(apiClient, endpoints.CATEGORIES);
export const containerApiService = createHttpService<ContainerModel>(
  apiClient,
  endpoints.CONTAINERS,
);
