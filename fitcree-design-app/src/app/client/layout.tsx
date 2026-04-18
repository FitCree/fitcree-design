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
  const isEditJob = /\/client\/[^/]+\/project\/[^/]+\/edit/.test(pathname || '');
  const isCancelPage = /\/client\/[^/]+\/project\/[^/]+\/cancel/.test(pathname || '');
  const isFormPage = isPostJob || isEditJob || isCancelPage;
  const isWorkspace = pathname?.startsWith('/client/workspace');

  if (isWorkspace) {
    return (
      <div className="h-screen bg-white flex flex-col overflow-hidden">
        <HeaderClient />
        <div className="pt-14 flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {!isFormPage && <HeaderClient />}
      <main className={`${isFormPage ? "" : "pt-14"} flex-grow`}>
        {children}
      </main>
      {!isFormPage && <Footer />}
    </div>
  );
}
