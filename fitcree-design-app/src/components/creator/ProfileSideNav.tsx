"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/creator/profile', label: '基本情報' },
  { href: '#', label: 'ポートフォリオ管理' },
  { href: '/creator/profile/skills', label: 'スキル・ツール' },
];

export default function ProfileSideNav() {
  const pathname = usePathname();

  return (
    <aside className="w-[20%] flex-shrink-0">
      <nav className="flex flex-col space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href !== '#' && pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={
                isActive
                  ? 'px-4 py-3 text-sm font-bold bg-orange-50 text-orange-600 border-l-4 border-orange-500'
                  : 'px-4 py-3 text-sm text-neutral-600 hover:bg-neutral-100 transition-colors'
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
