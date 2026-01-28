"use client";

import { usePathname } from 'next/navigation';
import HeaderClient from '@/components/common/header-client';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPostJob = pathname?.startsWith('/client/post-job');

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderClient />
      <main className={isPostJob ? "" : "pt-14"}>
        {children}
      </main>
    </div >
  );
}
