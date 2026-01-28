import HeaderClient from '@/components/common/header-client';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderClient />
      <main className="pt-20 pb-10 px-4 sm:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
