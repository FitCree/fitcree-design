import HeaderCreator from '@/components/common/header-creator';

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderCreator />
      <main className="pt-20 pb-10 px-4 sm:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
