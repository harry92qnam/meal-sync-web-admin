import { Outlet } from 'react-router-dom';
import Accounts from './routers/accounts/Accounts';
import ForgotPassword from './routers/authentication/ForgotPassword';
import Login from './routers/authentication/Login';
import ResetPassword from './routers/authentication/ResetPassword';
import VerifyCodeReset from './routers/authentication/VerifyCodeReset';
import Dashboard from './routers/dashboard/Dashboard';
import OrderDetail from './routers/orders/OrderDetail';
import Orders from './routers/orders/Orders';
import Reports from './routers/reports/Reports';
import Setting from './routers/setting/Setting';
import Shops from './routers/shops/Shops';
import Withdrawals from './routers/withdrawals/Withdrawals';
import Moderators from './routers/moderators/Moderators';
import Categories from './routers/categories/Categories';

function App() {
  return <Outlet />;
}

export default App;

// Export route configuration
export const routeConfig = [
  {
    path: '/',
    element: <App />,
    children: [
      // Common
      { index: true, element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'verify-reset', element: <VerifyCodeReset /> },
      { path: 'reset-password', element: <ResetPassword /> },

      // Route for admin role
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'moderators', element: <Moderators /> },
      { path: 'setting', element: <Setting /> },

      // Route for moderator role
      { path: 'orders', element: <Orders /> },
      { path: 'orders/:orderId', element: <OrderDetail /> },
      { path: 'shops', element: <Shops /> },
      { path: 'accounts', element: <Accounts /> },
      { path: 'withdrawals', element: <Withdrawals /> },
      { path: 'reports', element: <Reports /> },
      { path: 'categories', element: <Categories /> },
    ],
  },
];
