import HeaderCreator from '@/components/common/header-creator';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <HeaderCreator />
      <div className="pt-14 flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
