"use client";

import React from "react";
import Link from "next/link";
import { LogIn, UserPlus, ExternalLink } from "lucide-react";

export default function HeaderGuest() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200 fixed top-0 w-full z-50 h-14 flex items-center justify-between px-6 sm:px-12 transition-all">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/images/fitcree-logo.svg" alt="FitCree" className="h-6 w-auto" />
        </Link>
      </div>

      {/* Center: Navigation (Desktop) */}
      <nav className="hidden md:flex items-center gap-8">
        <Link
          href="https://fitcree.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-bold text-neutral-600 hover:text-orange-600 transition-colors"
        >
          サービス公式サイト
          <ExternalLink size={14} />
        </Link>
      </nav>

      {/* Center: Navigation (Desktop) */}
      <nav className="hidden md:flex items-center gap-8">
        <Link href="#" className="text-sm font-bold text-neutral-600 hover:text-orange-600 transition-colors">
          クリエイターを探す
        </Link>
        <Link href="/creator/search" className="text-sm font-bold text-neutral-600 hover:text-orange-600 transition-colors">
          案件を探す
        </Link>
      </nav>

      {/* Right: Auth Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-800 hover:bg-neutral-50 rounded-full transition-all"
        >
          <LogIn size={18} />
          ログイン
        </Link>
        <Link
          href="/signup"
          className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-full active:scale-95 transition-all"
        >
          <UserPlus size={18} />
          新規登録
        </Link>
      </div>
    </header>
  );
}
