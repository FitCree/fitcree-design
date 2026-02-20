"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  User, Settings, Heart, Activity, LogOut,
  Search, Plus, Mail, Bell
} from "lucide-react";
import { MOCK_CREATORS } from "@/data/mock-data";

// Use the first creator as the current user for now
const MOCK_USER = MOCK_CREATORS[0];

const HeaderDropdown = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img src={MOCK_USER.avatarUrl} alt="" className="w-10 h-10 rounded-full border border-gray-200" />
          <div>
            <p className="text-sm font-bold text-gray-900">{MOCK_USER.name}</p>
            <p className="text-xs text-gray-500">クリエイター</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
          <User size={16} className="text-gray-400" /> プロフィール編集
        </button>
        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
          <Settings size={16} className="text-gray-400" /> 設定
        </button>
      </div>

      <div className="border-t border-gray-100 py-2">
        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
          <Heart size={16} className="text-gray-400" /> 気になる案件
        </button>
        <Link href="/creator/applications" onClick={onClose} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
          <Activity size={16} className="text-gray-400" /> 応募状況
        </Link>
      </div>

      <div className="border-t border-gray-100 pt-2 pb-1">
        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
          <LogOut size={16} /> ログアウト
        </button>
      </div>
    </div>
  );
};

export default function HeaderCreator() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        <Link href="/creator/search" className="flex items-center text-sm text-gray-600 font-bold hover:text-orange-600 transition-colors">
          <Search size={16} className="text-orange-500 mr-2" />
          案件を探す
        </Link>
        <button onClick={() => alert("このページは作成中です")} className="flex items-center text-sm text-gray-600 font-bold hover:text-orange-600 transition-colors">
          <Plus size={16} className="text-orange-500 mr-2" />
          作品を追加
        </button>
      </div>

      {/* Right: Icons & Avatar */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="text-gray-500 hover:text-gray-700 p-2 relative">
          <Mail size={20} />
        </button>

        <button className="text-gray-500 hover:text-gray-700 p-2 relative">
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
              src={MOCK_USER.avatarUrl}
              alt="User Avatar"
              className={`w-9 h-9 rounded-full bg-gray-100 border-2 ${isDropdownOpen ? 'border-blue-500' : 'border-white'} shadow-sm`}
            />
          </button>

          <HeaderDropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
        </div>
      </div>
    </header>
  );
}
