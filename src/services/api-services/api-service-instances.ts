import ShopModel from '@/types/models/ShopModel';
import OrderModel from '../../types/models/OrderModel';
import apiClient from './api-client';
import createHttpService from './api-service';
import AccountModel from '@/types/models/AccountModel';
import ReportModel from '@/types/models/ReportModel';

export const endpoints = {
  ORDERS: 'moderator/order',
  SHOPS: 'moderator/shop',
  ACCOUNTS: 'moderator/customer',
  REPORTS: 'moderator/report',
  WITHDRAWALS: 'moderator/withdrawal-request',
  COMMISSION_GET: 'admin/commission-config',
  COMMISSION_UPDATE: 'admin/commission-config/update',
};

export const orderApiService = createHttpService<OrderModel>(apiClient, endpoints.ORDERS);
export const shopApiService = createHttpService<ShopModel>(apiClient, endpoints.SHOPS);
export const accountApiService = createHttpService<AccountModel>(apiClient, endpoints.ACCOUNTS);
export const reportApiService = createHttpService<ReportModel>(apiClient, endpoints.REPORTS);
