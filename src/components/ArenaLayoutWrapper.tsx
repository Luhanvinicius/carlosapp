// components/ArenaLayoutWrapper.tsx - Wrapper client para layout da arena
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import ArenaLayout from '@/layouts/ArenaLayout';

export default function ArenaLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="ORGANIZER">
      <ArenaLayout>{children}</ArenaLayout>
    </ProtectedRoute>
  );
}


