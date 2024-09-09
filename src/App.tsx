import Dashboard from './routers/dashboard/Dashboard';
import Login from './routers/login/Login';
import RQZustandTest from './routers/test/RQZustandTest';
import Transaction from './routers/transactions/Transaction';
import TransactionDetail from './routers/transactions/TransactionDetail';
import { Outlet } from 'react-router-dom';

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
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'transactions',
        element: <Transaction />,
        children: [{ path: ':transactionId', element: <TransactionDetail /> }],
      },
      {
        path: 'test',
        element: <RQZustandTest />,
      },
    ],
  },
];
