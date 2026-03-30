import { LogIn } from 'lucide-react';
import Link from 'next/link';

interface GuestLoginCTAProps {
  /** メッセージテキスト */
  message: string;
  /** オーバーレイモード（透明背景で親要素の上に被せる） */
  overlay?: boolean;
}

export default function GuestLoginCTA({ message, overlay = false }: GuestLoginCTAProps) {
  const content = (
    <>
      <p className="text-sm text-neutral-600">{message}</p>
      <Link
        href="/login"
        className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-full transition-colors"
      >
        <LogIn className="w-4 h-4" />
        ログイン
      </Link>
    </>
  );

  if (overlay) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/60 rounded-lg">
        {content}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-6 border border-neutral-200 rounded-lg bg-neutral-50">
      {content}
    </div>
  );
}
