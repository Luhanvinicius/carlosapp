// app/app/admin/usuarios/page.tsx - Usuários admin
'use client';

// Redireciona para a página de usuários existente
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminUsuariosPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/usuarios');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Carregando...</h1>
      </div>
    </div>
  );
}

