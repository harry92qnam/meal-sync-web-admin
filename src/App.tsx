import { Route, Routes } from 'react-router-dom';
import Login from './routers/login/Login';
import Dashboard from './routers/dashboard/Dashboard';
import Transaction from './routers/transactions/Transaction';
import TransactionDetail from './routers/transactions/TransactionDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transaction" element={<Transaction />}>
        <Route path=":transactionId" element={<TransactionDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
