import Dashboard from './routers/dashboard/Dashboard';
import RQZustandTest from './routers/test/RQZustandTest';
import Transactions from './routers/transactions/Transactions';
import TransactionDetail from './routers/transactions/TransactionDetail';
import { Outlet } from 'react-router-dom';
import ForgotPassword from './routers/authentication/ForgotPassword';
import Login from './routers/authentication/Login';

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
      { index: true, element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'transactions',
        element: <Transactions />,
        children: [{ path: ':transactionId', element: <TransactionDetail /> }],
      },
      {
        path: 'test',
        element: <RQZustandTest />,
      },
    ],
  },
];
