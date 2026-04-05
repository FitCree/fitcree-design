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
  // イラスト・アート固有
  illustImages?: string[];
  illustName?: string;
  illustType?: string;
  artStyle?: string;
  // 写真固有
  photoImages?: string[];
  photoName?: string;
  photoGenre?: string;
  shootingLocation?: string;
  // グラフィック固有
  graphicImages?: string[];
  graphicName?: string;
  graphicType?: string;
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
    description:'企業の採用強化を目的に、コーポレートサイトをリニューアルしました。学生が理解しやすいように情報を整理し、写真を多く取り入れています。\n\n〇〇についてエ夫し、〇〇を機能して制作しています。\nダミーテキストですダミーテキストですダミーテキストですダミーテキストですダミーテキストですダミーテキストです。ダミーテキストですダミーテキストですダミーテキストですダミーテキストです。\n\nダミーテキストですダミーテキストでダミーテキストでダミーテキストですダミーテキストですダミーテキストで。。',
    siteUrl: 'https://www.uminofood-baktes.com/',
    siteName: '海のフード「Baktes」',
    industry: '飲食業',
    siteType: 'コーポレートサイト',
    target: ['#飲食好き', '#女性'],
    purpose: ['#コンバージョン改善', '#集客施策'],
    durationValue: '1',
    durationUnit: 'ヶ月',
    tools: ['#Figma', '#Adobe Illustrator', '#photoshop'],
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
  'work-2': {
    id: 'work-2',
    creatorId: 'creator-1',
    title: '夏休みの秋保大滝を撮影｜宮城県',
    category: 'photo',
    categoryLabel: '写真',
    heroImageUrl: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=600&q=80',
    captures: [],
    photoImages: [
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
    ],
    description: '宮城県仙台市にある秋保大滝を夏に撮影した作品です。\n\n長時間露光を活用し、流れ落ちる水の柔らかさを表現しました。マジックアワーの時間帯に合わせて入山し、光の変化を捉えた6枚のシリーズです。\n\nRAW現像はCapture Oneを使用し、緑の深みと水しぶきの白を活かした仕上がりにしています。',
    photoName: '秋保大滝 夏景色シリーズ',
    photoGenre: '風景・自然',
    shootingLocation: '宮城県仙台市太白区',
    industry: '旅行・観光',
    target: [],
    purpose: [],
    durationValue: '1',
    durationUnit: '日',
    tools: ['#Sony α7 IV', '#Capture One'],
    siteTags: ['#風景', '#滝', '#長時間露光', '#マジックアワー'],
    responsibilities: ['#撮影', '#レタッチ'],
    clientType: 'self',
    createdDate: '2026/01/28',
    views: 0,
    likes: 0,
    shares: 0,
  },
  'work-3': {
    id: 'work-3',
    creatorId: 'creator-1',
    title: 'ファンタジーRPGのキャラクターデザイン集',
    category: 'illustration',
    categoryLabel: 'イラスト・アート',
    heroImageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=600&q=80',
    captures: [],
    illustImages: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=600&q=80',
    ],
    description:
      'ファンタジーRPGゲームのメインキャラクター3名のデザインを担当しました。\n\n世界観設定に合わせた衣装・武器・カラーパレットを一から設計し、ゲーム内UIへの組み込みも想定したデザインになっています。ラフ→線画→彩色まで一気通貫で対応しました。',
    illustName: 'ファンタジーRPG キャラクターデザイン',
    illustType: 'キャラクターイラスト',
    artStyle: 'アニメ調',
    industry: 'メディア・エンタメ',
    target: [],
    purpose: [],
    durationValue: '3',
    durationUnit: '週間',
    tools: ['#Clip Studio Paint', '#Adobe Photoshop'],
    siteTags: ['#キャラクターデザイン', '#ファンタジー', '#ゲームアート'],
    responsibilities: ['#ラフ', '#線画', '#彩色', '#キャラクターデザイン'],
    clientType: 'client_anonymous',
    createdDate: '2026/04/05',
    views: 0,
    likes: 0,
    shares: 0,
  },
  'work-4': {
    id: 'work-4',
    creatorId: 'creator-1',
    title: 'テクノロジー企業のロゴ・VI設計',
    category: 'graphic',
    categoryLabel: 'グラフィック',
    heroImageUrl: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&w=600&q=80',
    captures: [],
    graphicImages: [
      'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=600&q=80',
    ],
    description:
      'ITスタートアップ企業のコーポレートアイデンティティを一から設計した案件です。\n\nロゴの設計から始まり、カラーパレット・タイポグラフィの選定、ブランドガイドラインの作成まで一貫して担当しました。「先進性」と「信頼感」を両立させるミニマルなデザインを採用しています。\n\n名刺・封筒・パワーポイントテンプレートへの展開も対応し、VIシステムとして統一感のあるブランドを構築しました。',
    graphicName: 'TechVision ロゴ・ブランドアイデンティティ',
    graphicType: 'ロゴ・VI（ブランドアイデンティティ）',
    industry: 'IT・テクノロジー',
    target: [],
    purpose: [],
    durationValue: '2',
    durationUnit: '週間',
    tools: ['#Adobe Illustrator', '#Adobe InDesign'],
    siteTags: ['#ロゴデザイン', '#ブランドアイデンティティ', '#VI設計', '#コーポレートカラー'],
    responsibilities: ['#ディレクション', '#ロゴデザイン', '#ブランドガイドライン'],
    clientType: 'client_anonymous',
    createdDate: '2025/12/20',
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
  illustration: 'work-3',
  photo: 'work-2',
  graphic: 'work-4',
};
