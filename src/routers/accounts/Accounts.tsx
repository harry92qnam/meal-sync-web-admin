import Header from '../../components/common/Header';
import MainLayout from '../../components/layout/MainLayout';

export default function Accounts() {
  return (
    <MainLayout activeContentIndex={3}>
      <div className="md:col-span-1 py-4">
        <Header title="Quản lý tài khoản" />
      </div>
      <div>
        <p>Quản lý tài khoản</p>
      </div>
    </MainLayout>
  );
}
