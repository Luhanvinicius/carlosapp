// app/app/admin/layout.tsx - Layout da área do admin (Server Component)
import AdminLayoutWrapper from '@/components/AdminLayoutWrapper';

export default function AdminAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}


