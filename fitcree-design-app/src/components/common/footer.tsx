"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-100 border-t border-neutral-200 pt-12 pb-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/images/fitcree-logo.svg" alt="FitCree" className="h-5 w-auto" />
            </Link>
            <p className="text-sm text-neutral-500">
              クリエイター特化型のクリエイターマッチングサービス
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <Link href="https://fitcree.com" target="_blank" className="text-sm font-medium text-neutral-600 hover:text-orange-600 transition-colors">
              サービスサイト
            </Link>
            <Link href="https://fitcree.com/company" target="_blank" className="text-sm font-medium text-neutral-600 hover:text-orange-600 transition-colors">
              企業サイト
            </Link>
            <Link href="https://fitcree.com/contact" target="_blank" className="text-sm font-medium text-neutral-600 hover:text-orange-600 transition-colors">
              お問い合わせ
            </Link>
            <button onClick={() => alert("このページは準備中です")} className="text-sm font-medium text-neutral-600 hover:text-orange-600 transition-colors">
              利用規約
            </button>
            <button onClick={() => alert("このページは準備中です")} className="text-sm font-medium text-neutral-600 hover:text-orange-600 transition-colors">
              プライバシーポリシー
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} FitCree inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
