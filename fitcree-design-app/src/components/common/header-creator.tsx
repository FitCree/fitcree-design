"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User, Settings, Heart, LogOut,
  Search, Plus, Mail, Bell, Briefcase, LayoutGrid
} from "lucide-react";
import { MOCK_CREATORS } from "@/data/mock-data";
import { getConsultationsForCreator } from "@/data/mock-consultations";
import AddWorkModal from "@/components/creator/AddWorkModal";

// Use the first creator as the current user for now
const MOCK_USER = MOCK_CREATORS[0];
const UNREAD_CONSULTATION_COUNT = getConsultationsForCreator(MOCK_USER.id).filter(
  (c) => c.status === 'unread'
).length;

const MOCK_NOTIFICATIONS = [
  { id: 'n1', title: '【重要】利用規約の改定について', date: '2026-04-20', isUnread: true },
  { id: 'n2', title: 'FitCree機能アップデートのお知らせ', date: '2026-04-15', isUnread: true },
  { id: 'n3', title: 'ゴールデンウィーク期間中のサポートについて', date: '2026-04-10', isUnread: false },
  { id: 'n4', title: 'クリエイター向け新機能：ポートフォリオ一括編集', date: '2026-04-05', isUnread: false },
  { id: 'n5', title: 'メンテナンスのお知らせ（4月28日 深夜）', date: '2026-03-30', isUnread: false },
  { id: 'n6', title: '春のキャンペーン開始のお知らせ', date: '2026-03-25', isUnread: false },
  { id: 'n7', title: 'クリエイタースコア算出方法の更新について', date: '2026-03-20', isUnread: false },
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
              <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
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
          className="block text-center text-sm text-orange-600 hover:text-orange-700 font-medium py-1 transition-colors"
        >
          もっと見る
        </a>
      </div>
    </div>
  );
};

const HeaderDropdown = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
      <div className="px-4 py-3 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <img src={MOCK_USER.avatarUrl} alt="" className="w-10 h-10 rounded-full border border-neutral-200" />
          <div>
            <p className="text-sm font-bold text-neutral-900">{MOCK_USER.name}</p>
            <p className="text-xs text-neutral-500">クリエイター</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        <Link href="/creator/profile" onClick={onClose} className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3">
          <User size={16} className="text-neutral-400" /> プロフィール編集
        </Link>
        <Link href="/creator/workspace" onClick={onClose} className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3">
          <LayoutGrid size={16} className="text-neutral-400" /> ワークスペース
        </Link>
        <Link href="/creator/activity" onClick={onClose} className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3">
          <Briefcase size={16} className="text-neutral-400" /> お仕事の相談・応募状況
          {UNREAD_CONSULTATION_COUNT > 0 && (
            <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {UNREAD_CONSULTATION_COUNT}
            </span>
          )}
        </Link>
      </div>

      <div className="border-t border-neutral-100 py-2">
        <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3">
          <Heart size={16} className="text-neutral-400" /> 気になる案件
        </button>
        <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-3">
          <Settings size={16} className="text-neutral-400" /> 設定
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

export default function HeaderCreator() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showAddWorkModal, setShowAddWorkModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="bg-white border-b border-orange-500 fixed top-0 w-full z-20 h-14 flex items-center justify-between px-4 sm:px-8">
      {/* Left: Logo */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          {/* FitCree Logo (Image) */}
          <img src="/images/fitcree-logo.svg" alt="FitCree" className="h-6 w-auto" />
        </Link>
      </div>

      {/* Center: Navigation (Hidden on mobile) */}
      <div className="hidden lg:flex items-center gap-6">
        <Link href="/creator/search" className="flex items-center text-sm text-neutral-600 font-bold hover:text-orange-600 transition-colors">
          <Search size={16} className="text-orange-500 mr-2" />
          案件を探す
        </Link>
        <button onClick={() => setShowAddWorkModal(true)} className="flex items-center text-sm text-neutral-600 font-bold hover:text-orange-600 transition-colors">
          <Plus size={16} className="text-orange-500 mr-2" />
          作品を追加
        </button>
      </div>

      {/* Right: Icons & Avatar */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/creator/workspace"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-orange-500 text-orange-600 text-sm font-bold hover:bg-orange-50 transition-colors focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
        >
          <LayoutGrid size={14} />
          ワークスペース
        </Link>
        <Link href="/creator/activity" className="text-neutral-500 hover:text-neutral-700 p-2 relative block">
          <Mail size={20} />
          {UNREAD_CONSULTATION_COUNT > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 rounded-full border-2 border-white text-[10px] font-bold text-white leading-none px-1">
              {UNREAD_CONSULTATION_COUNT}
            </span>
          )}
        </Link>

        <div className="relative" ref={bellRef}>
          <button
            onClick={() => { setIsNotificationOpen(!isNotificationOpen); setIsDropdownOpen(false); }}
            className={`p-2 relative transition-colors ${isNotificationOpen ? 'text-orange-500' : 'text-neutral-500 hover:text-neutral-700'}`}
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
              src={MOCK_USER.avatarUrl}
              alt="User Avatar"
              className={`w-9 h-9 rounded-full bg-neutral-100 border-2 ${isDropdownOpen ? 'border-blue-500' : 'border-white'} shadow-sm`}
            />
          </button>

          <HeaderDropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
        </div>
      </div>

      {showAddWorkModal && (
        <AddWorkModal
          onClose={() => setShowAddWorkModal(false)}
          onComplete={(source, category) => {
            setShowAddWorkModal(false);
            if (category === 'video') {
              router.push(`/creator/works/post/video?source=${source}`);
            } else if (category === 'illustration') {
              router.push(`/creator/works/post/illustration?source=${source}`);
            } else if (category === 'photo') {
              router.push(`/creator/works/post/photo?source=${source}`);
            } else if (category === 'graphic') {
              router.push(`/creator/works/post/graphic?source=${source}`);
            } else {
              router.push(`/creator/works/post?source=${source}&category=${category}`);
            }
          }}
        />
      )}
    </header>
  );
}
