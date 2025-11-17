// components/AdminLayoutWrapper.tsx - Wrapper client para layout do admin
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/layouts/AdminLayout';

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}


