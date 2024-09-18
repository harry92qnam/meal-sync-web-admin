import Header from '../../components/common/Header';
import MainLayout from '../../components/layout/MainLayout';

export default function Dashboard() {
  return (
    <MainLayout activeContentIndex={0}>
      <div className="md:col-span-1 py-4">
        <Header title="Thống kê tổng quan" />
      </div>
      <div>
        <p>Thống kê tổng quan</p>
      </div>
    </MainLayout>
  );
}
