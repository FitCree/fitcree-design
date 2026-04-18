'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Info,
  Send,
  ExternalLink,
  CircleDollarSign,
  ArrowLeft,
  Search,
  X,
  LayoutGrid,
  ChevronDown,
} from 'lucide-react';
import {
  WORKSPACE_ROOMS,
  WorkspaceRoom,
  WorkspaceMessage,
  getMessagesForRoom,
} from '@/data/mock-workspace';

// ロール別テーマ定義
interface WorkspaceTheme {
  selectedRoomBg: string;
  selectedRoomBorderL: string;
  myMsgBg: string;
  myMsgText: string;
  myMsgBorder: string;
  myMsgRounded: string;
  infoPanelActiveBg: string;
  infoPanelActiveText: string;
  sendBg: string;
  sendHover: string;
  sendFocusRing: string;
  inputFocusRing: string;
  inputFocusBorder: string;
  quoteTotal: string;
}

const CREATOR_THEME: WorkspaceTheme = {
  selectedRoomBg: 'bg-orange-50',
  selectedRoomBorderL: 'border-l-orange-500',
  myMsgBg: 'bg-orange-50',
  myMsgText: 'text-neutral-800',
  myMsgBorder: 'border border-orange-200',
  myMsgRounded: 'rounded-br-sm',
  infoPanelActiveBg: 'bg-orange-100',
  infoPanelActiveText: 'text-orange-600',
  sendBg: 'bg-orange-500',
  sendHover: 'hover:bg-orange-600',
  sendFocusRing: 'focus-visible:ring-orange-400',
  inputFocusRing: 'focus-visible:ring-orange-300',
  inputFocusBorder: 'focus-visible:border-orange-400',
  quoteTotal: 'text-orange-600',
};

const CLIENT_THEME: WorkspaceTheme = {
  selectedRoomBg: 'bg-blue-50',
  selectedRoomBorderL: 'border-l-blue-500',
  myMsgBg: 'bg-blue-50',
  myMsgText: 'text-neutral-800',
  myMsgBorder: 'border border-blue-200',
  myMsgRounded: 'rounded-br-sm',
  infoPanelActiveBg: 'bg-blue-100',
  infoPanelActiveText: 'text-blue-600',
  sendBg: 'bg-blue-500',
  sendHover: 'hover:bg-blue-600',
  sendFocusRing: 'focus-visible:ring-blue-400',
  inputFocusRing: 'focus-visible:ring-blue-300',
  inputFocusBorder: 'focus-visible:border-blue-400',
  quoteTotal: 'text-blue-600',
};

// ステータスバッジ
function RoomStatusBadge({ status }: { status: WorkspaceRoom['status'] }) {
  switch (status) {
    case 'active':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
          進行中
        </span>
      );
    case 'negotiating':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-600">
          交渉中
        </span>
      );
    case 'completed':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-neutral-100 text-neutral-500">
          完了
        </span>
      );
  }
}

// ルームリストアイテム
function RoomListItem({
  room,
  isSelected,
  theme,
  onClick,
}: {
  room: WorkspaceRoom;
  isSelected: boolean;
  theme: WorkspaceTheme;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full text-left px-4 py-4 flex items-start gap-3 border-b border-neutral-50 transition-colors border-l-2 ${
          isSelected
            ? `${theme.selectedRoomBg} ${theme.selectedRoomBorderL}`
            : 'hover:bg-neutral-50 border-l-transparent'
        }`}
      >
        <div className="flex-shrink-0 relative">
          <img
            src={room.clientAvatarUrl}
            alt={room.clientName}
            className="w-10 h-10 rounded-full border border-neutral-100"
          />
          {room.unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 rounded-full text-xs font-bold text-white leading-none px-1">
              {room.unreadCount}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <p
              className={`text-sm font-bold truncate ${
                room.unreadCount > 0 ? 'text-neutral-900' : 'text-neutral-700'
              }`}
            >
              {room.clientName}
            </p>
            <span className="text-xs text-neutral-400 flex-shrink-0">{room.lastMessageAt}</span>
          </div>
          <p className="text-xs text-neutral-600 font-medium truncate mb-1">{room.title}</p>
          <p
            className={`text-xs truncate ${
              room.unreadCount > 0 ? 'text-neutral-600 font-medium' : 'text-neutral-400'
            }`}
          >
            {room.lastMessage}
          </p>
        </div>
      </button>
    </li>
  );
}

// メッセージバブル
function MessageBubble({
  msg,
  isMe,
  showHeader,
  theme,
}: {
  msg: WorkspaceMessage;
  isMe: boolean;
  showHeader: boolean;
  theme: WorkspaceTheme;
}) {
  return (
    <div
      className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'} ${
        showHeader ? 'mt-6' : 'mt-1'
      }`}
    >
      <div className="w-8 flex-shrink-0">
        {showHeader ? (
          <img
            src={msg.senderAvatarUrl}
            alt={msg.senderName}
            className="w-8 h-8 rounded-full border border-neutral-100"
          />
        ) : null}
      </div>
      <div className={`flex flex-col max-w-[72%] ${isMe ? 'items-end' : 'items-start'}`}>
        {showHeader && (
          <p className="text-xs text-neutral-400 mb-1 px-1">
            <span className="font-medium">{isMe ? 'あなた' : msg.senderName}</span>
            <span className="ml-2">{msg.displayTime}</span>
          </p>
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isMe
              ? `${theme.myMsgBg} ${theme.myMsgText} ${theme.myMsgBorder} ${theme.myMsgRounded}`
              : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-sm'
          }`}
        >
          {msg.content.split('\n').map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// 日付区切り線
function DateDivider({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-neutral-200" />
      <span className="text-xs text-neutral-400 px-2 flex-shrink-0">{date}</span>
      <div className="flex-1 h-px bg-neutral-200" />
    </div>
  );
}

// 案件情報パネル
function InfoPanel({
  room,
  theme,
  onClose,
}: {
  room: WorkspaceRoom;
  theme: WorkspaceTheme;
  onClose: () => void;
}) {
  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const totalQuote = room.applicationQuotes?.reduce((s, q) => s + q.price, 0) ?? 0;
  const hasQuotes = room.applicationQuotes && room.applicationQuotes.length > 0;

  return (
    <aside className="hidden lg:flex flex-col w-80 border-l border-neutral-200 bg-white overflow-y-auto flex-shrink-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 sticky top-0 bg-white z-10">
        <h3 className="text-sm font-bold text-neutral-800">案件情報</h3>
        <button
          onClick={onClose}
          className={`p-1 text-neutral-400 hover:text-neutral-600 rounded focus-visible:ring-2 ${theme.sendFocusRing} focus-visible:ring-offset-1`}
          aria-label="案件情報を閉じる"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* 案件概要 */}
        <section>
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">案件概要</h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-neutral-500 mb-0.5">案件名</p>
              <p className="text-sm font-bold text-neutral-900 leading-snug">{room.title}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <RoomStatusBadge status={room.status} />
              {room.categoryLabel && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100">
                  {room.categoryLabel}
                </span>
              )}
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-neutral-100 text-neutral-500">
                {room.type === 'consultation' ? '相談' : '応募'}
              </span>
            </div>
            {room.projectId && (
              <Link
                href={`/projects/${room.projectId}`}
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
              >
                <ExternalLink size={14} />
                案件ページを見る
              </Link>
            )}
            {room.portfolioTitle && (
              <div>
                <p className="text-xs text-neutral-500 mb-0.5">きっかけの作品</p>
                <p className="text-sm text-neutral-700 leading-snug">{room.portfolioTitle}</p>
              </div>
            )}
          </div>
        </section>

        {/* 合意予算 + 見積もり明細（アコーディオン） */}
        <section className="border-t border-neutral-100 pt-4">
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">合意予算</h4>

          {/* 予算サマリー行 — 常時表示 */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CircleDollarSign size={16} className="text-green-600 flex-shrink-0" />
              {room.agreedBudget ? (
                <p className="text-base font-bold text-neutral-900">{room.agreedBudget}</p>
              ) : (
                <p className="text-sm text-neutral-400 italic">交渉中</p>
              )}
            </div>

            {/* 見積もり明細トグル（見積もりが存在する場合のみ） */}
            {hasQuotes && (
              <button
                onClick={() => setQuoteOpen((o) => !o)}
                className={`flex items-center gap-1 text-xs font-medium text-neutral-400 hover:text-neutral-600 transition-colors focus-visible:ring-2 ${theme.inputFocusRing} rounded px-1`}
                aria-expanded={quoteOpen}
                aria-label="見積もり明細を開閉"
              >
                明細
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${quoteOpen ? 'rotate-180' : ''}`}
                />
              </button>
            )}
          </div>

          {/* 見積もり明細（アコーディオン本体） */}
          {hasQuotes && quoteOpen && (
            <div className="mt-3 pt-3 border-t border-neutral-100 space-y-2">
              {room.applicationQuotes!.map((q, i) => (
                <div key={i} className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-neutral-500 leading-snug">{q.item}</span>
                  <span className="font-medium text-neutral-700 flex-shrink-0">
                    ¥{q.price.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-2 text-sm border-t border-neutral-200 pt-2">
                <span className="font-bold text-neutral-700">合計</span>
                <span className={`font-bold ${theme.quoteTotal}`}>
                  ¥{totalQuote.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* 応募内容リンク（案件応募タイプのみ） */}
        {room.type === 'application' && room.projectId && (
          <section className="border-t border-neutral-100 pt-4">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">応募内容</h4>
            <Link
              href={`/creator/jobs/${room.projectId}/application-details`}
              className={`flex items-center gap-2 w-full px-3 py-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 transition-colors focus-visible:ring-2 ${theme.inputFocusRing}`}
            >
              <ExternalLink size={14} className="text-neutral-400 flex-shrink-0" />
              応募時の内容を確認する
            </Link>
          </section>
        )}

        {/* 参加者 */}
        <section className="border-t border-neutral-100 pt-4">
          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
            参加者（{room.participants.length}名）
          </h4>
          <ul className="space-y-3">
            {room.participants.map((p) => (
              <li key={p.id} className="flex items-center gap-3">
                <img
                  src={p.avatarUrl}
                  alt={p.name}
                  className="w-8 h-8 rounded-full border border-neutral-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800 truncate">{p.name}</p>
                  <p className="text-xs text-neutral-400">
                    {p.role === 'creator' ? 'クリエイター' : 'クライアント'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}

// メインコンポーネント
interface WorkspaceViewProps {
  role: 'creator' | 'client';
}

export default function WorkspaceView({ role }: WorkspaceViewProps) {
  const theme = role === 'creator' ? CREATOR_THEME : CLIENT_THEME;

  const [selectedRoomId, setSelectedRoomId] = useState<string>(WORKSPACE_ROOMS[0]?.id ?? '');
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [inputText, setInputText] = useState('');
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [messagesByRoom, setMessagesByRoom] = useState<Record<string, WorkspaceMessage[]>>(() => {
    const init: Record<string, WorkspaceMessage[]> = {};
    WORKSPACE_ROOMS.forEach((room) => {
      init[room.id] = getMessagesForRoom(room.id);
    });
    return init;
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const selectedRoom = WORKSPACE_ROOMS.find((r) => r.id === selectedRoomId) ?? null;
  const currentMessages = selectedRoomId ? (messagesByRoom[selectedRoomId] ?? []) : [];

  const filteredRooms = WORKSPACE_ROOMS.filter(
    (room) =>
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedRoomId, currentMessages.length]);

  // クリエイターモードなら senderRole === 'creator' が「自分」、クライアントモードなら 'client' が「自分」
  const isMyMessage = useCallback(
    (msg: WorkspaceMessage) => msg.senderRole === role,
    [role]
  );

  const mySenderInfo =
    role === 'creator'
      ? { name: '山田 イラストマン', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack' }
      : { name: '田中 太郎', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' };

  const handleSendMessage = useCallback(() => {
    const content = inputText.trim();
    if (!content || !selectedRoomId) return;

    const newMsg: WorkspaceMessage = {
      id: `msg-new-${Date.now()}`,
      roomId: selectedRoomId,
      senderId: role === 'creator' ? 'creator-1' : 'client-1',
      senderName: mySenderInfo.name,
      senderAvatarUrl: mySenderInfo.avatarUrl,
      senderRole: role,
      content,
      timestamp: new Date().toISOString(),
      displayTime: '今',
    };

    setMessagesByRoom((prev) => ({
      ...prev,
      [selectedRoomId]: [...(prev[selectedRoomId] ?? []), newMsg],
    }));
    setInputText('');
    setTimeout(() => textareaRef.current?.focus(), 0);
  }, [inputText, selectedRoomId, role, mySenderInfo]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setMobileView('chat');
  };

  return (
    <div className="flex flex-1 overflow-hidden bg-white">
      {/* === 左サイドバー: ルームリスト === */}
      <div
        className={`flex-shrink-0 w-full md:w-72 lg:w-80 border-r border-neutral-200 flex flex-col bg-white ${
          mobileView === 'chat' ? 'hidden md:flex' : 'flex'
        }`}
      >
        <div className="p-4 border-b border-neutral-100 space-y-3">
          <div className="flex items-center gap-2">
            <LayoutGrid size={16} className={role === 'creator' ? 'text-orange-500' : 'text-blue-500'} />
            <h2 className="text-sm font-bold text-neutral-900">ワークスペース</h2>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="案件・クライアントを検索"
              className={`w-full pl-8 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus-visible:ring-2 ${theme.inputFocusRing} ${theme.inputFocusBorder}`}
            />
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto">
          {filteredRooms.length === 0 ? (
            <li className="p-8 text-center text-sm text-neutral-400">
              該当する案件が見つかりません
            </li>
          ) : (
            filteredRooms.map((room) => (
              <RoomListItem
                key={room.id}
                room={room}
                isSelected={selectedRoomId === room.id}
                theme={theme}
                onClick={() => handleSelectRoom(room.id)}
              />
            ))
          )}
        </ul>
      </div>

      {/* === 右エリア: チャット + 情報パネル === */}
      {selectedRoom ? (
        <div
          className={`flex-1 flex overflow-hidden ${
            mobileView === 'list' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* チャットエリア */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* チャットヘッダー */}
            <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-neutral-200 bg-white">
              <button
                onClick={() => setMobileView('list')}
                className={`md:hidden p-1 text-neutral-500 hover:text-neutral-700 focus-visible:ring-2 ${theme.sendFocusRing} rounded`}
                aria-label="リストに戻る"
              >
                <ArrowLeft size={20} />
              </button>

              <img
                src={selectedRoom.clientAvatarUrl}
                alt={selectedRoom.clientName}
                className="w-9 h-9 rounded-full border border-neutral-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-neutral-900 truncate">{selectedRoom.title}</p>
                <p className="text-xs text-neutral-500 truncate">
                  {selectedRoom.clientName}
                  {selectedRoom.clientCompany && ` / ${selectedRoom.clientCompany}`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <RoomStatusBadge status={selectedRoom.status} />
                <button
                  onClick={() => setShowInfoPanel((p) => !p)}
                  className={`p-2 rounded-lg transition-colors focus-visible:ring-2 ${theme.sendFocusRing} focus-visible:ring-offset-1 ${
                    showInfoPanel
                      ? `${theme.infoPanelActiveBg} ${theme.infoPanelActiveText}`
                      : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
                  }`}
                  aria-label="案件情報を表示・非表示"
                  aria-pressed={showInfoPanel}
                >
                  <Info size={18} />
                </button>
              </div>
            </div>

            {/* メッセージ一覧 */}
            <div className="flex-1 overflow-y-auto px-4 py-6 bg-slate-50">
              {currentMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="bg-white rounded-xl p-10 border border-neutral-100 max-w-xs mx-auto">
                    <MessageSquare size={32} className="text-neutral-200 mx-auto mb-3" />
                    <p className="text-sm text-neutral-500 font-medium">まだメッセージがありません</p>
                    <p className="text-xs text-neutral-400 mt-1">最初のメッセージを送ってみましょう</p>
                  </div>
                </div>
              ) : (
                <>
                  {currentMessages.map((msg, idx) => {
                    const meFlag = isMyMessage(msg);
                    const prevMsg = currentMessages[idx - 1];
                    const isSameSender = !!prevMsg && prevMsg.senderId === msg.senderId;
                    const isSameDay =
                      !!prevMsg && msg.timestamp.slice(0, 10) === prevMsg.timestamp.slice(0, 10);
                    const showDateDivider = !isSameDay;
                    const showHeader = !isSameSender || showDateDivider;

                    return (
                      <React.Fragment key={msg.id}>
                        {showDateDivider && <DateDivider date={msg.timestamp.slice(0, 10)} />}
                        <MessageBubble
                          msg={msg}
                          isMe={meFlag}
                          showHeader={showHeader}
                          theme={theme}
                        />
                      </React.Fragment>
                    );
                  })}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* メッセージ入力欄 */}
            <div className="flex-shrink-0 border-t border-neutral-200 p-4 bg-white">
              {selectedRoom.status === 'completed' ? (
                <div className="text-center py-3 text-sm text-neutral-400 bg-neutral-50 rounded-lg border border-neutral-200">
                  この案件は完了しています
                </div>
              ) : (
                <div className="flex items-end gap-3">
                  <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="メッセージを入力（Enter で送信 / Shift+Enter で改行）"
                    rows={1}
                    className={`flex-1 resize-none px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus-visible:ring-2 ${theme.inputFocusRing} ${theme.inputFocusBorder} overflow-y-auto`}
                    style={{ minHeight: '44px', maxHeight: '128px' }}
                    onInput={(e) => {
                      const t = e.currentTarget;
                      t.style.height = 'auto';
                      t.style.height = `${Math.min(t.scrollHeight, 128)}px`;
                    }}
                    aria-label="メッセージを入力"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className={`flex-shrink-0 w-10 h-10 flex items-center justify-center ${theme.sendBg} ${theme.sendHover} disabled:bg-neutral-200 disabled:cursor-not-allowed text-white rounded-xl transition-colors focus-visible:ring-2 ${theme.sendFocusRing} focus-visible:ring-offset-2`}
                    aria-label="送信"
                  >
                    <Send size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 案件情報パネル */}
          {showInfoPanel && (
            <InfoPanel room={selectedRoom} theme={theme} onClose={() => setShowInfoPanel(false)} />
          )}
        </div>
      ) : (
        <div
          className={`flex-1 flex items-center justify-center bg-slate-50 ${
            mobileView === 'list' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="text-center">
            <div className="bg-white rounded-2xl p-12 border border-neutral-100 max-w-sm mx-auto">
              <MessageSquare size={48} className="text-neutral-200 mx-auto mb-4" />
              <p className="text-neutral-500 font-medium">案件を選択してください</p>
              <p className="text-neutral-400 text-sm mt-1">
                左のリストから案件を選ぶとチャットが表示されます
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
