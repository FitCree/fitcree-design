import HeaderGuest from '@/components/common/header-guest';
import Footer from '@/components/common/footer';

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <HeaderGuest />
      <main className="pt-14 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
