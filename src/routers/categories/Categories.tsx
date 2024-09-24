import Header from '../../components/common/Header';
import MainLayout from '../../components/layout/MainLayout';

export default function Categories() {
  return (
    <MainLayout activeContentIndex={5}>
      <div className="md:col-span-1 py-4">
        <Header title="Quản lý thể loại" />
      </div>
      <div>Quản lý thể loại</div>
    </MainLayout>
  );
}
