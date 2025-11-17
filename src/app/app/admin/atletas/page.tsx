// app/app/admin/atletas/page.tsx - Atletas admin
'use client';

// Redireciona para a página de atletas existente
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAtletasPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/atletas');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Carregando...</h1>
      </div>
    </div>
  );
}


