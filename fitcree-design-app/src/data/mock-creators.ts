import { User } from '@/types/data';

export const MOCK_CREATORS: User[] = [
  {
    id: 'creator-1',
    name: '山田 イラストマン',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
    mode: 'creator',
    role: 'イラストレーター',
    skills: ['キャラクターデザイン', '背景作画', 'Photoshop'],
    rating: 4.8,
    reviewCount: 24,
    location: '東京都',
    description: '幅広いタッチでのイラスト制作が可能です。特にソーシャルゲームや出版向けのキャラクターデザインに強みがあります。'
  },
  {
    id: 'creator-2',
    name: '佐藤 デザイン',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Molly',
    mode: 'creator',
    role: 'UI/UXデザイナー',
    skills: ['Figma', 'Webデザイン', 'React'],
    rating: 4.9,
    reviewCount: 48,
    location: '神奈川県',
    description: 'UI/UXデザインを中心に、ブランド構築からデジタルの実装まで幅広くサポートします。クライアントの課題の本質を捉え、持続可能な価値を生み出すデザインを提供することが得意です。'
  },
  {
    id: 'creator-3',
    name: '高橋 ライター',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Simba',
    mode: 'creator',
    role: 'コンテンツライター',
    skills: ['取材記事', 'SEOライティング', '編集'],
    rating: 4.7,
    reviewCount: 15,
    location: '大阪府',
    description: 'エンジニアリングに対する理解があり、インタビューを通じて本質的な魅力を引き出せるライター兼編集者です。'
  },
  {
    id: 'creator-4',
    name: '鈴木 フォト',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
    mode: 'creator',
    role: 'フォトグラファー',
    skills: ['商品撮影', '宣材写真', 'Lightroom'],
    rating: 4.6,
    reviewCount: 12,
    location: '愛知県',
    description: '料理やプロダクトの撮影を得意としています。自然光を活かした透明感のある表現を追求しています。'
  },
  {
    id: 'creator-5',
    name: '田中 ムービー',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
    mode: 'creator',
    role: '映像クリエイター',
    skills: ['動画編集', 'After Effects', 'モーショングラフィックス'],
    rating: 4.9,
    reviewCount: 31,
    location: '福岡県',
    description: 'YouTube広告や企業PR動画の制作をメインに活動しています。テンポの良い編集とスタイリッシュな演出が得意です。'
  },
  {
    id: 'creator-6',
    name: '伊藤 エンジニア',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sawyer',
    mode: 'creator',
    role: 'フロントエンドエンジニア',
    skills: ['Next.js', 'Typescript', 'Tailwind CSS'],
    rating: 5.0,
    reviewCount: 18,
    location: '北海道',
    description: 'パフォーマンスとアクセシビリティを重視したWeb制作。デザインの意図を正確にコードに落とし込みます。'
  },
  {
    id: 'creator-7',
    name: '渡辺 サウンド',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bear',
    mode: 'creator',
    role: 'サウンドデザイナー',
    skills: ['作曲', '効果音制作', 'ミックス'],
    rating: 4.8,
    reviewCount: 9,
    location: '千葉県',
    description: 'ゲームやアプリ向けのBGM、効果音制作。没入感を高めるクリエイティブなサウンドを提案します。'
  },
  {
    id: 'creator-8',
    name: '小林 グラフィック',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pepper',
    mode: 'creator',
    role: 'グラフィックデザイナー',
    skills: ['ロゴ作成', 'パンフレット', 'DTP'],
    rating: 4.7,
    reviewCount: 22,
    location: '京都府',
    description: '和のテイストを取り入れたモダンなデザインから、ポップな販促物まで柔軟に対応します。'
  },
  {
    id: 'creator-9',
    name: '加藤 パフォーマンス',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bailey',
    mode: 'creator',
    role: 'ナレーター/声優',
    skills: ['宅録', 'キャラクターボイス', 'ナレーション'],
    rating: 4.9,
    reviewCount: 40,
    location: '埼玉県',
    description: '落ち着いた解説ナレーションから、元気なキャラクターボイスまで幅広く演じ分けます。宅録環境完備。'
  },
  {
    id: 'creator-10',
    name: 'ジョン トランスレーター',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    mode: 'creator',
    role: '翻訳家/コーディネーター',
    skills: ['英訳', '海外進出支援', 'ビジネス英語'],
    rating: 4.8,
    reviewCount: 14,
    location: '海外',
    description: '機械分野や貿易実務の専門用語に精通している翻訳者。北米でのビジネス経験も豊富です。'
  }
];
