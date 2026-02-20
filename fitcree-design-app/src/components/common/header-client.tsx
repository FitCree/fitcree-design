"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import {
  User, Settings, Heart, Activity, LogOut,
  Search, Plus, Mail, Bell
} from "lucide-react";
import { MOCK_CLIENTS } from "@/data/mock-data";

// Determing the user based on URL is handled inside the component
const DEFAULT_USER = MOCK_CLIENTS[0];

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
    </div>
  );
};

export default function HeaderClient() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract clientId from pathname if present
  // Path format: /client/[clientId]
  const pathParts = pathname?.split("/") || [];
  const clientId = pathParts[2];
  const currentUser = MOCK_CLIENTS.find(c => c.id === clientId) || DEFAULT_USER;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
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
        <button className="text-neutral-500 hover:text-neutral-700 p-2 relative">
          <Mail size={20} />
        </button>

        <button className="text-neutral-500 hover:text-neutral-700 p-2 relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Avatar Dropdown */}
        <div className="relative ml-2" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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