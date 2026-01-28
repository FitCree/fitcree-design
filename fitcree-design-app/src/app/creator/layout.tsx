import HeaderCreator from '@/components/common/header-creator';

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderCreator />
      <main className="pt-14">
        {children}
      </main>
    </div>
  );
}
