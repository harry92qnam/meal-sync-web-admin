import AuthProvider from '@/configs/providers/AuthProvider';
import React, { ReactNode } from 'react';

function AdminLayout({ children }: { children: ReactNode }) {
  return <AuthProvider role={'moderator'}>{children}</AuthProvider>;
}

export default AdminLayout;
