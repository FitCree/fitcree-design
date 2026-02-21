/**
 * 【FitCree マスターデータ】
 * 各種選択肢のマスターデータを定義します。
 * このファイルを変更すると、すべての参照箇所に自動的に反映されます。
 */

/**
 * 依頼分野のマスターデータ
 */
export const REQUEST_CATEGORIES: string[] = [
  'Webサイト',
  'イラスト',
  'グラフィック',
  '写真',
  '動画',
  'ライティング・編集',
  '音楽・サウンド',
  '声・パフォーマンス',
  'エンジニアリング',
  'その他'
];

/**
 * 業界のマスターデータ
 */
export const INDUSTRIES: string[] = [
  '飲食',
  '美容・ファッション',
  '教育・学習支援',
  'IT・Webサービス',
  '医療・福祉',
  '建築・不動産',
  'エンタメ・メディア',
  '製造・工業',
  '小売・EC',
  'その他'
];

/**
 * 完成物の用途のマスターデータ
 * 依頼分野に応じて動的に選択肢が変わる
 */
export const USAGE_PURPOSES: Record<string, string[]> = {
  'Webサイト': [
    'Web掲載（LP / コーポレート / EC）',
    'SNS投稿用（静止画 / 動画 / UGC）',
    '印刷物（ポスター / メニュー / DM / POP）',
    '広告用（Meta / Google / Tiktok広告）',
    'ブランド資産（CI / VI / ガイドライン）',
    '素材提供（写真 / アイコン）',
    'アプリ / サービス用UI',
    'その他'
  ],
  'グラフィック': [
    'ブランディング・CI/VI（ロゴ / 名刺 / 封筒 / ガイドライン）',
    '販促・PRツール（チラシ / パンフレット / DM / POP）',
    '広告・大型出力（ポスター / 看板 / 交通広告 / OOH）',
    'パッケージ・ラベル（商品包装 / ボトル / 化粧箱）',
    'エディトリアル・出版（書籍 / 雑誌 / フリーペーパー / カタログ）',
    'プロダクト・ノベルティ（アパレル / 雑貨 / イベントグッズ）',
    '空間・展示会（展示ブース装飾 / サイン計画 / 店舗内装グラフィック）',
    'デジタル・SNS用グラフィック（バナー / サムネイル / インフォグラフィック）',
    '素材・図版制作（イラスト / アイコン / 地図 / グラフ）',
    'その他'
  ],
  '動画': [
    '広告・プロモーション（Web広告 / TVCM / キャンペーン映像）',
    'SNS・ショート動画（TikTok / Reels / YouTubeショート）',
    'コーポレート・採用（会社紹介 / インタビュー / 採用ピッチ）',
    '商品・サービス紹介（Appデモ / SaaS操作画面 / 機能解説）',
    'ブランディング・イメージ映像（コンセプトムービー / 世界観紹介）',
    'YouTube・番組制作（企画動画 / 教育系コンテンツ / Vlog）',
    'イベント・展示会（オープニング / ブース放映用 / 記録映像）',
    'エンタメ・ミュージックビデオ（MV / ライブ演出映像 / 舞台用）',
    '教育・ラーニング（eラーニング / 講習資料 / チュートリアル）',
    'その他'
  ],
  // その他の分野用のダミーデータ
  'default': [
    'ダミー1',
    'ダミー2',
    'ダミー3',
    'ダミー4',
    'ダミー5'
  ]
};


/**
 * 予算レンジのマスターデータ
 */
export const BUDGET_RANGES: string[] = [
  '相談して決めたい',
  '5,000円 〜 30,000円',
  '30,000円 〜 100,000円',
  '100,000円 〜 300,000円',
  '300,000円 〜 500,000円',
  '500,000円 〜 1,000,000円',
  '1,000,000円以上'
];

/**
 * プロジェクトステータスの設定
 * ラベル、色、アイコンを集中管理します。
 */
import { LucideIcon, Briefcase, Users, Clock, MessageSquare } from 'lucide-react';
import { ProjectStatus, StatItem } from '@/types/data';

export const PROJECT_STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; bg: string; icon: LucideIcon }> = {
  recruiting: { label: '募集中', color: 'text-red-700', bg: 'bg-red-100', icon: Briefcase },
  selection: { label: '選考中', color: 'text-red-700', bg: 'bg-red-100', icon: Users },
  in_progress: { label: '進行中', color: 'text-blue-700', bg: 'bg-blue-100', icon: Clock },
  completed: { label: '完了', color: 'text-green-700', bg: 'bg-green-100', icon: Clock },
  closed: { label: '完了', color: 'text-green-700', bg: 'bg-green-100', icon: MessageSquare },
};

export const CLIENT_STATS_TEMPLATE: Omit<StatItem, 'value'>[] = [
  { ...PROJECT_STATUS_CONFIG.recruiting, color: 'text-blue-600', bg: 'bg-blue-50' },
  { ...PROJECT_STATUS_CONFIG.selection, color: 'text-sky-600', bg: 'bg-sky-50' },
  { ...PROJECT_STATUS_CONFIG.in_progress, color: 'text-green-600', bg: 'bg-green-50' },
  { ...PROJECT_STATUS_CONFIG.closed, color: 'text-neutral-500', bg: 'bg-neutral-50' },
  { label: '未読メッセージ', icon: MessageSquare, color: 'text-red-500', bg: 'bg-red-50' },
];
