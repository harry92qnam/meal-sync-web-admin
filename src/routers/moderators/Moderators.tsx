import Header from '../../components/common/Header';
import MainLayout from '../../components/layout/MainLayout';

export default function Moderators() {
  return (
    <MainLayout activeContentIndex={1}>
      <div className="md:col-span-1 py-4">
        <Header title="Quản lý moderators" />
      </div>
      <div>
        <p>Quản lý moderators</p>
      </div>
    </MainLayout>
  );
}
