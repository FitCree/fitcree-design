import HeaderCreator from '@/components/common/header-creator';
import Footer from '@/components/common/footer';

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <HeaderCreator />
      <main className="pt-14 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
