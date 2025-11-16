// app/app/admin/layout.tsx - Layout da área do admin
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/layouts/AdminLayout';

export default function AdminAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        {children}
      </AdminLayout>
    </ProtectedRoute>
  );
}

