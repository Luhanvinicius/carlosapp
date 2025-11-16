// app/app/arena/layout.tsx - Layout da área da arena
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import ArenaLayout from '@/layouts/ArenaLayout';

export default function ArenaAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRole="ORGANIZER">
      <ArenaLayout>
        {children}
      </ArenaLayout>
    </ProtectedRoute>
  );
}

