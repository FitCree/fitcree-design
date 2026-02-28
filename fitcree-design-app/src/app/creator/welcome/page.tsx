/**
 * クリエイター初期設定完了（ウェルカム）ページ
 *
 * ※ テストマーケティング用ページ
 *   本番用は別途作成予定。このフォルダ（welcome/）はテスト段階の暫定実装です。
 *
 * URL: /creator/welcome
 */

import { CheckCircle2, Sparkles } from 'lucide-react';
import Footer from '@/components/common/footer';

export default function CreatorWelcomePage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* ロゴのみのヘッダー */}
      <header className="w-full h-14 flex items-center px-4 sm:px-8">
        <img
          src="/images/fitcree-logo.svg"
          alt="FitCree"
          className="h-6 w-auto"
        />
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow flex items-center justify-center md:p-4 p-4 md:pb-14 pb-10">
        <div className="bg-white p-4 md:p-16 rounded-2xl max-w-lg w-full text-center">
          {/* ロゴマーク */}
          <div className="flex justify-center mb-8">
            <img
              src="/images/fitcree_logomark.svg"
              alt="FitCree"
              className="h-12 w-auto"
              width={48}
              height={48}
            />
          </div>

          {/* 完了アイコン */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" aria-hidden="true" />
            </div>
          </div>

          {/* 見出し */}
          <h1 className="text-neutral-800 text-3xl font-bold mb-4">
            登録完了！
          </h1>

          <p className="text-neutral-700 text-base mb-10 leading-relaxed">
            FitCreeへようこそ！<br />
            アカウント登録が完了しました。
          </p>

          {/* 開発中メッセージ */}
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-10 text-left">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-orange-500" aria-hidden="true" />
              <p className="text-neutral-800 font-bold text-base">
                ただいまサービスを準備中です
              </p>
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed">
              現在、ポートフォリオ機能や案件マッチングなど、
              クリエイターの皆さんに使っていただく機能を鋭意開発中です。
              リリース時にはメールや<a href="https://fitcree.com/info" target="_blank" rel="noopener noreferrer" className="text-orange-500 font-bold hover:underline">公式のお知らせ</a>でご案内しますので、楽しみにお待ちください。
            </p>
            <p className="text-neutral-600 text-sm leading-relaxed mt-3">
              あなたの「好き」が仕事につながる世界を、一緒に作っていきましょう。
            </p>
          </div>

          {/* トップページへ（外部リンク） */}
          <a
            href="https://fitcree.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          >
            トップページへ
          </a>
        </div>
      </main>

      {/* フッター */}
      <Footer />
    </div>
  );
}
