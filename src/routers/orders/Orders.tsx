import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import MainLayout from '../../components/layout/MainLayout';

export default function Orders() {
  const navigate = useNavigate();

  const orders = [
    { id: '1', title: 'Order 1' },
    { id: '2', title: 'Order 2' },
  ];

  const handleClick = (id: string) => {
    const encodedId = btoa(id);
    navigate(`/orders/${encodedId}`);
  };

  return (
    <MainLayout activeContentIndex={0}>
      <div className="md:col-span-1 py-4">
        <Header title="Quản lý giao dịch" />
      </div>
      <div>
        <p>Quản lý giao dịch</p>
      </div>
      <div className="flex">
        <div>
          <h1>Orders</h1>
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <Button onClick={() => handleClick(order.id)}>{order.title}</Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
