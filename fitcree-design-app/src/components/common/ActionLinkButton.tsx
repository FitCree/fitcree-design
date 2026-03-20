import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface ActionLinkButtonProps {
  href: string;
  label: string;
  icon: LucideIcon;
  className?: string;
}

export default function ActionLinkButton({ href, label, icon: Icon, className = '' }: ActionLinkButtonProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-900 text-white text-sm font-bold rounded-lg transition-colors ${className}`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}
