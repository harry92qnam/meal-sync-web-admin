import Header from '../../components/common/Header';
import MainLayout from '../../components/layout/MainLayout';

export default function Withdrawals() {
  return (
    <MainLayout activeContentIndex={4}>
      <div className="md:col-span-1 py-4">
        <Header title="Yêu cầu rút tiền" />
      </div>
      <div>Yêu cầu rút tiền</div>
    </MainLayout>
  );
}
