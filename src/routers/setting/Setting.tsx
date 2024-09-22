import Header from '../../components/common/Header';
import MainLayout from '../../components/layout/MainLayout';

export default function Setting() {
  return (
    <MainLayout activeContentIndex={2}>
      <div className="md:col-span-1 py-4">
        <Header title="Cài đặt" />
      </div>
      <div>Cài đặt</div>
    </MainLayout>
  );
}
