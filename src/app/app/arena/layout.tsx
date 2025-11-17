// app/app/arena/layout.tsx - Layout da área da arena (Server Component)
import ArenaLayoutWrapper from '@/components/ArenaLayoutWrapper';

export default function ArenaAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ArenaLayoutWrapper>{children}</ArenaLayoutWrapper>;
}


