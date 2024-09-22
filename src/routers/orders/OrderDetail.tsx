import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import MainLayout from '../../components/layout/MainLayout';

export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const decodedId = orderId ? atob(orderId) : '';
  return (
    <MainLayout activeContentIndex={0}>
      <div className="md:col-span-1 py-4">
        <Header title="Quản lý giao dịch" />
      </div>
      <div>
        <p>Chi tiết giao dịch</p>
      </div>
      <div>
        <h2>Order Detail</h2>
        <p>Order ID: {decodedId}</p>
      </div>
    </MainLayout>
  );
}
