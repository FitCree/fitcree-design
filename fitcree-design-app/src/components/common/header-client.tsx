"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import {
  User, Settings, Heart, Activity, LogOut,
  Search, Plus, Mail, Bell, LayoutGrid
} from "lucide-react";
import { MOCK_CLIENTS } from "@/data/mock-data";

// Determing the user based on URL is handled inside the component
const DEFAULT_USER = MOCK_CLIENTS[0];

const MOCK_NOTIFICATIONS = [
  { id: 'n1', title: '【重要】利用規約の改定について', date: '2026-04-20', isUnread: true },
  { id: 'n2', title: 'FitCree機能アップデートのお知らせ', date: '2026-04-15', isUnread: true },
  { id: 'n3', title: 'ゴールデンウィーク期間中のサポートについて', date: '2026-04-10', isUnread: false },
  { id: 'n4', title: 'クライアント向け新機能：案件テンプレート追加', date: '2026-04-05', isUnread: false },
  { id: 'n5', title: 'メンテナンスのお知らせ（4月28日 深夜）', date: '2026-03-30', isUnread: false },
  { id: 'n6', title: '春のキャンペーン開始のお知らせ', date: '2026-03-25', isUnread: false },
  { id: 'n7', title: 'マッチング精度向上アップデートのお知らせ', date: '2026-03-20', isUnread: false },
  { id: 'n8', title: 'セキュリティアップデートのお知らせ', date: '2026-03-15', isUnread: false },
  { id: 'n9', title: '新カテゴリ「3DCG」追加のお知らせ', date: '2026-03-10', isUnread: false },
  { id: 'n10', title: 'FitCreeが月間利用者数10万人を突破しました', date: '2026-03-01', isUnread: false },
];
const UNREAD_NOTIFICATION_COUNT = MOCK_NOTIFICATIONS.filter((n) => n.isUnread).length;

const NotificationDropdown = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-neutral-100 z-50 animate-in fade-in zoom-in-95 duration-100">
      <div className="px-4 py-3 border-b border-neutral-100">
        <p className="text-sm font-bold text-neutral-800">お知らせ</p>
      </div>

      <div className="overflow-y-auto max-h-[360px]">
        {MOCK_NOTIFICATIONS.map((notification) => (
          <a
            key={notification.id}
            href={`https://fitcree.com/news/${notification.id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 border-b border-neutral-100 last:border-b-0 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className={`text-sm leading-snug ${notification.isUnread ? 'font-bold text-neutral-800' : 'text-neutral-700'}`}>
                {notification.title}
              </p>
              <p className="text-xs text-neutral-500 mt-1">{notification.date}</p>
            </div>
            {notification.isUnread && (
              <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            )}
          </a>
        ))}
      </div>

      <div className="border-t border-neutral-100 px-4 py-2">
        <a
          href="https://fitcree.com/news"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-1 transition-colors"
        >
          もっと見る
        </a>
      </div>
    </div>
  );
};

const HeaderDropdown = ({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: any }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
      <div className="px-4 py-3 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <img src={user.avatarUrl} alt="" className="w-10 h-10 rounded-full border border-neutral-200" />
          <div>
            <p className="text-sm font-bold text-neutral-900">{user.name}</p>
            <p className="text-xs text-neutral-500">マイページ</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3">
          <User size={16} className="text-neutral-400" /> プロフィール編集
        </button>
        <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3">
          <Settings size={16} className="text-neutral-400" /> 設定
        </button>
      </div>

      <div className="border-t border-neutral-100 py-2">
        <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3">
          <Heart size={16} className="text-neutral-400" /> 気になるクリエイター
        </button>
        <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3">
          <Activity size={16} className="text-neutral-400" /> アクセス状況
        </button>
      </div>

      <div className="border-t border-neutral-100 pt-2 pb-1">
        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
          <LogOut size={16} /> ログアウト
        </button>
      </div>

      <div className="border-t border-neutral-100 px-4 py-2 flex items-center justify-center gap-1 text-sm text-neutral-500">
        <a href="https://fitcree.com/guide" target="_blank" rel="noopener noreferrer" className="text-center px-1 py-1 w-full hover:text-neutral-600 hover:bg-neutral-50 transition-colors">ガイド</a>
        <span>/</span>
        <a href="https://fitcree.com/support/registration" target="_blank" rel="noopener noreferrer" className="text-center px-1 py-1 w-full hover:text-neutral-600 hover:bg-neutral-50 transition-colors">サポート窓口</a>
      </div>
    </div>
  );
};

export default function HeaderClient() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  // Extract clientId from pathname if present
  // Path format: /client/[clientId]
  const pathParts = pathname?.split("/") || [];
  const clientId = pathParts[2];
  const currentUser = MOCK_CLIENTS.find(c => c.id === clientId) || DEFAULT_USER;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // post-job 配下（/client/post-job で始まるパス）ではヘッダーを表示しない
  if (pathname?.startsWith("/client/post-job")) {
    return null;
  }

  return (
    <header className="bg-white border-b border-blue-400 fixed top-0 w-full z-20 h-14 flex items-center justify-between px-4 sm:px-8">
      {/* Left: Logo & Mode Switch */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          {/* FitCree Logo (Image) */}
          <img src="/images/fitcree-logo.svg" alt="FitCree" className="h-6 w-auto" />
        </Link>
      </div>

      {/* Center: Search & Actions (Hidden on mobile) */}
      <div className="hidden lg:flex items-center gap-6">
        <Link href="/search/creators" className="flex items-center text-sm text-neutral-600 font-bold hover:text-blue-600 transition-colors">
          <Search size={16} className="text-blue-600 mr-2" />
          クリエイターを探す
        </Link>
        <Link href="/client/post-job" className="flex items-center text-sm text-neutral-600 font-bold hover:text-blue-600 transition-colors">
          <Plus size={16} className="text-blue-600 mr-2" />
          案件を作成
        </Link>
      </div>

      {/* Right: Icons & Avatar */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/client/workspace"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-blue-500 text-blue-600 text-sm font-bold hover:bg-blue-50 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          <LayoutGrid size={14} />
          ワークスペース
        </Link>
        <button className="text-neutral-500 hover:text-neutral-700 p-2 relative">
          <Mail size={20} />
        </button>

        <div className="relative" ref={bellRef}>
          <button
            onClick={() => { setIsNotificationOpen(!isNotificationOpen); setIsDropdownOpen(false); }}
            className={`p-2 relative transition-colors ${isNotificationOpen ? 'text-blue-500' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            <Bell size={20} />
            {UNREAD_NOTIFICATION_COUNT > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 rounded-full border-2 border-white text-xs font-bold text-white leading-none px-1">
                {UNREAD_NOTIFICATION_COUNT}
              </span>
            )}
          </button>
          <NotificationDropdown isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
        </div>

        {/* Avatar Dropdown */}
        <div className="relative ml-2" ref={dropdownRef}>
          <button
            onClick={() => { setIsDropdownOpen(!isDropdownOpen); setIsNotificationOpen(false); }}
            className="block focus:outline-none transition-transform active:scale-95"
          >
            <img
              src={currentUser.avatarUrl}
              alt="User Avatar"
              className={`w-9 h-9 rounded-full bg-neutral-100 border-2 ${isDropdownOpen ? 'border-blue-500' : 'border-white'} shadow-sm`}
            />
          </button>

          <HeaderDropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} user={currentUser} />
        </div>
      </div>
    </header>
  );
}