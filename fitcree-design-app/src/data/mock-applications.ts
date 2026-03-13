// クリエイターごとの応募内容モックデータ
export interface ApplicationData {
  creatorId: string;
  appliedDate: string;
  message: string;
  roughDraft?: string;
  quotes: { id: number; item: string; price: number }[];
  portfolios: {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    url?: string;
  }[];
}

// creatorId → ApplicationData のマップ
export const MOCK_APPLICATIONS: Record<string, ApplicationData> = {
  'creator-1': {
    creatorId: 'creator-1',
    appliedDate: '2025/03/07',
    message:
      'キャラクターデザインの豊富な経験を活かし、ブランドの世界観を表現するデザインをご提案いたします。ターゲット層に親しみやすく、かつ印象に残るビジュアル制作が得意です。納期についても柔軟に対応可能ですので、ぜひご検討ください。',
    roughDraft:
      'カフェのコンセプトに合わせた手描き風のロゴ案を3パターンご用意する予定です。ナチュラルな色合いとオーガニック感を大切にしたデザインを想定しています。',
    quotes: [
      { id: 1, item: 'ロゴデザイン（3案）', price: 80000 },
      { id: 2, item: 'ショップカードデザイン', price: 30000 },
      { id: 3, item: '修正対応（2回まで）', price: 15000 },
    ],
    portfolios: [
      {
        id: 1,
        title: 'オーガニックカフェのブランドデザイン',
        category: 'ロゴデザイン',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400',
        description: '自然素材をモチーフにしたロゴとショップカードのデザイン。温かみのある色使いが好評でした。',
        url: 'https://example.com/work-cafe',
      },
      {
        id: 2,
        title: 'ベーカリーショップのVI制作',
        category: 'ブランディング',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
        description: '店舗のリブランディングに伴うVI一式を制作。ロゴからパッケージまでトータルでデザインしました。',
      },
    ],
  },
  'creator-2': {
    creatorId: 'creator-2',
    appliedDate: '2025/03/08',
    message:
      'UI/UXデザイナーとしてFigmaを中心に多数のプロジェクトに携わってきました。ユーザー視点を大切にしたデザインで、見た目だけでなく使いやすさも追求します。Reactの実装経験もあるため、実装を見据えた現実的なデザインが可能です。',
    quotes: [
      { id: 1, item: 'デザイン費（3案作成）', price: 60000 },
      { id: 2, item: '修正対応（無制限）', price: 20000 },
      { id: 3, item: '入稿データ作成', price: 10000 },
    ],
    portfolios: [
      {
        id: 1,
        title: 'レストラン予約サイトのUI設計',
        category: 'Webサイト',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400',
        description: '高級レストランの予約サイト。直感的な操作性と洗練されたビジュアルを両立しました。',
        url: 'https://example.com/work-restaurant',
      },
    ],
  },
  'creator-3': {
    creatorId: 'creator-3',
    appliedDate: '2025/03/09',
    message:
      'SEOライティングの経験を活かし、検索エンジンにも強いコンテンツを制作いたします。ターゲットユーザーのペルソナ分析から構成案の作成、ライティングまで一貫して対応可能です。',
    quotes: [
      { id: 1, item: 'コンテンツ企画・構成', price: 40000 },
      { id: 2, item: 'ライティング（5ページ）', price: 50000 },
    ],
    portfolios: [
      {
        id: 1,
        title: 'ヘルスケア企業のオウンドメディア',
        category: 'ライティング',
        image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=400',
        description: '月間PV 50万を達成したヘルスケアメディアの記事コンテンツを担当しました。',
      },
    ],
  },
  'creator-4': {
    creatorId: 'creator-4',
    appliedDate: '2025/03/09',
    message:
      '商品撮影を中心に活動しているフォトグラファーです。食品・飲料系の撮影を得意としており、カフェの雰囲気を最大限に引き出す写真をお届けします。',
    quotes: [
      { id: 1, item: '撮影費（半日）', price: 50000 },
      { id: 2, item: 'レタッチ・納品', price: 20000 },
    ],
    portfolios: [
      {
        id: 1,
        title: 'カフェメニュー撮影',
        category: 'フォトグラフィー',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400',
        description: '自然光を活かしたカフェメニューの撮影。SNS映えする構図を意識しています。',
      },
    ],
  },
  'creator-5': {
    creatorId: 'creator-5',
    appliedDate: '2025/03/10',
    message:
      '映像制作のスペシャリストとして、After Effectsを駆使したモーショングラフィックスからドキュメンタリー映像まで幅広く対応します。カフェのプロモーション映像制作に興味があります。',
    quotes: [
      { id: 1, item: '企画・コンテ作成', price: 30000 },
      { id: 2, item: '撮影（1日）', price: 80000 },
      { id: 3, item: '編集・MA', price: 60000 },
    ],
    portfolios: [
      {
        id: 1,
        title: 'レストランプロモーション映像',
        category: '映像制作',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=400',
        description: '店舗のオープニングに合わせたプロモーション映像。30秒のSNS広告用に最適化しました。',
      },
    ],
  },
  'creator-6': {
    creatorId: 'creator-6',
    appliedDate: '2025/03/10',
    message:
      'Next.js / TypeScriptを主軸に開発を行っているフロントエンドエンジニアです。デザインカンプからの高精度なコーディングが得意で、レスポンシブ対応やアニメーション実装まで対応します。',
    quotes: [
      { id: 1, item: 'コーディング（トップ + 下層5P）', price: 150000 },
      { id: 2, item: 'CMS構築', price: 80000 },
    ],
    portfolios: [
      {
        id: 1,
        title: 'アパレルブランドECサイト',
        category: 'Web開発',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
        description: 'Next.js + Shopifyを使ったヘッドレスECサイト。表示速度とUXを重視した実装です。',
      },
    ],
  },
};

// creatorId から応募データを取得するヘルパー
export function getApplicationByCreatorId(creatorId: string): ApplicationData | null {
  return MOCK_APPLICATIONS[creatorId] || null;
}
