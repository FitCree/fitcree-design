// 作品詳細のモックデータ
export interface WorkDetail {
  id: string;
  creatorId: string;
  title: string;
  category: string;
  categoryLabel: string;
  heroImageUrl: string;
  thumbnailUrl: string;
  captures: string[];
  description: string;
  // WEB固有
  siteUrl?: string;
  siteName?: string;
  industry?: string;
  siteType?: string;
  target: string[];
  purpose: string[];
  // 動画固有
  youtubeId?: string;
  videoName?: string;
  videoType?: string;
  durationValue?: string;
  durationUnit?: string;
  tools: string[];
  siteTags: string[];
  responsibilities: string[];
  clientType: 'self' | 'client_anonymous' | 'client_public';
  clientName?: string;
  createdDate: string;
  views: number;
  likes: number;
  shares: number;
}

export const MOCK_WORK_DETAILS: Record<string, WorkDetail> = {
  'work-1': {
    id: 'work-1',
    creatorId: 'creator-1',
    title: '海のフード「Baktes」のコーポレートサイトデザイン',
    category: 'web',
    categoryLabel: 'WEB',
    heroImageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    captures: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    ],
    description:
      '企業の採用強化を目的に、コーポレートサイトをリニューアルしました。学生が理解しやすいように情報を整理し、写真を多く取り入れています。\n\n〇〇についてエ夫し、〇〇を機能して制作しています。\nダミーテキストですダミーテキストですダミーテキストですダミーテキストですダミーテキストですダミーテキストです。ダミーテキストですダミーテキストですダミーテキストですダミーテキストです。\n\nダミーテキストですダミーテキストでダミーテキストでダミーテキストですダミーテキストですダミーテキストで。。',
    siteUrl: 'https://www.uminofood-baktes.com/',
    siteName: '海のフード「Baktes」',
    industry: '飲食業',
    siteType: 'コーポレートサイト',
    target: ['#飲食好き', '#女性'],
    purpose: ['#コンバージョン改善', '#集客施策'],
    durationValue: '1',
    durationUnit: 'ヶ月',
    tools: ['#Figma', '#ドリーム名', '#ドリーム名'],
    siteTags: ['#ページュ', '#近代角ゴシック'],
    responsibilities: ['#ディレクション', '#デザイン', '#コーディング'],
    clientType: 'self',
    createdDate: '2026/02/10',
    views: 24,
    likes: 6,
    shares: 3,
  },
  'work-5': {
    id: 'work-5',
    creatorId: 'creator-1',
    title: 'スタートアップ企業の採用プロモーション動画',
    category: 'video',
    categoryLabel: '動画',
    heroImageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
    captures: [
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1601506521793-dc748fc80b67?auto=format&fit=crop&w=600&q=80',
    ],
    description:
      'スタートアップ企業の採用強化を目的に、社内の雰囲気や働き方を伝えるプロモーション動画を制作しました。\n\n社員インタビューとオフィスの日常風景を組み合わせ、企業文化がリアルに伝わる構成を意識しています。カラーグレーディングでは企業ブランドカラーに合わせた温かみのある仕上がりにしました。\n\nターゲットとなる若手エンジニア層に刺さるよう、テンポのよい編集とモーショングラフィックスを取り入れています。',
    youtubeId: '031CPKWyl10',
    videoName: 'スタートアップ株式会社 採用PV 2025',
    industry: 'IT・テクノロジー',
    videoType: '採用動画',
    target: [],
    purpose: [],
    durationValue: '2',
    durationUnit: '週間',
    tools: ['#Premiere Pro', '#After Effects', '#DaVinci Resolve'],
    siteTags: ['#インタビュー', '#モーショングラフィックス', '#カラーグレーディング'],
    responsibilities: ['#ディレクション', '#撮影', '#編集', '#カラーグレーディング'],
    clientType: 'client_anonymous',
    createdDate: '2025/12/05',
    views: 18,
    likes: 5,
    shares: 2,
  },
  'video-preview': {
    id: 'video-preview',
    creatorId: 'creator-1',
    title: 'スタートアップ企業の採用プロモーション動画',
    category: 'video',
    categoryLabel: '動画',
    heroImageUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    captures: [],
    description:
      'スタートアップ企業の採用強化を目的に、社内の雰囲気や働き方を伝えるプロモーション動画を制作しました。\n\n社員インタビューとオフィスの日常風景を組み合わせ、企業文化がリアルに伝わる構成を意識しています。カラーグレーディングでは企業ブランドカラーに合わせた温かみのある仕上がりにしました。',
    youtubeId: 'dQw4w9WgXcQ',
    videoName: 'スタートアップ株式会社 採用PV',
    industry: 'IT・テクノロジー',
    videoType: '採用動画',
    target: [],
    purpose: [],
    durationValue: '2',
    durationUnit: '週間',
    tools: ['#Premiere Pro', '#After Effects'],
    siteTags: ['#インタビュー', '#モーショングラフィックス'],
    responsibilities: ['#ディレクション', '#撮影', '#編集', '#カラーグレーディング'],
    clientType: 'client_anonymous',
    createdDate: '2026/04/04',
    views: 0,
    likes: 0,
    shares: 0,
  },
};

export function getWorkDetail(id: string): WorkDetail | null {
  return MOCK_WORK_DETAILS[id] || null;
}

export const CATEGORY_PREVIEW_WORK: Record<string, string> = {
  web: 'work-1',
  video: 'video-preview',
};
