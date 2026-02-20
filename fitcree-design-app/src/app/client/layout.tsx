"use client";

import { usePathname } from 'next/navigation';
import HeaderClient from '@/components/common/header-client';
import Footer from '@/components/common/footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPostJob = pathname?.startsWith('/client/post-job');

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <HeaderClient />
      <main className={`${isPostJob ? "" : "pt-14"} flex-grow`}>
        {children}
      </main>
      {!isPostJob && <Footer />}
    </div>
  );
}
