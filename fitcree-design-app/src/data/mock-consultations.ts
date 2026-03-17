// クライアントからクリエイターへのお仕事の相談モックデータ

export interface Consultation {
  id: string;
  clientId: string;
  clientName: string;
  clientCompany?: string;
  clientAvatarUrl: string;
  creatorId: string;
  portfolioTitle: string;
  portfolioImage: string;
  category: string;
  budgetRange: string;
  deadline?: string;
  title: string;
  message: string;
  status: 'unread' | 'read' | 'accepted' | 'declined';
  createdAt: string;
}

export const MOCK_CONSULTATIONS: Consultation[] = [
  {
    id: 'consult-1',
    clientId: 'client-1',
    clientName: '田中 太郎',
    clientCompany: '株式会社サンプルデザイン',
    clientAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    creatorId: 'creator-1',
    portfolioTitle: '海のフード「Baktes」のコーポレートサイトデザイン',
    portfolioImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    category: 'Webデザイン',
    budgetRange: '100,000円 〜 300,000円',
    deadline: '2026/05/31',
    title: 'カフェのブランディングをお願いしたい',
    message: '山田様の作品「Baktes」のサイトデザインを拝見し、非常に感銘を受けました。\n\n弊社が新たにオープンするカフェのブランディング全般（ロゴ、Webサイト、ショップカード）をお願いできないかと考えております。\n\n自然素材を使ったオーガニックカフェで、30代女性をメインターゲットとしています。山田様の温かみのあるデザインがぴったりだと感じました。\n\nまずは一度お打ち合わせさせていただけないでしょうか。',
    status: 'unread',
    createdAt: '2026/03/15',
  },
  {
    id: 'consult-2',
    clientId: 'client-2',
    clientName: '鈴木 一郎',
    clientCompany: 'テックイノベーション株式会社',
    clientAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
    creatorId: 'creator-1',
    portfolioTitle: '高級レストランのブランディングサイト制作',
    portfolioImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80',
    category: 'Webデザイン',
    budgetRange: '300,000円 〜 500,000円',
    deadline: '2026/06/30',
    title: '新サービスのLP制作を相談したい',
    message: '山田様のレストランサイトの制作実績を拝見しました。高級感を損なわず、ユーザーに寄り添ったデザインが素晴らしいと感じております。\n\n弊社で新たにリリースするSaaSプロダクトのランディングページの制作をお願いしたく、ご連絡いたしました。ターゲットは中小企業の経営者層で、信頼感とモダンさを両立したデザインを求めています。\n\nご興味がございましたら、詳細をお伝えさせていただければ幸いです。',
    status: 'unread',
    createdAt: '2026/03/13',
  },
  {
    id: 'consult-3',
    clientId: 'client-3',
    clientName: '佐々木 花子',
    clientCompany: 'フラワーデザインスタジオ',
    clientAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daisy',
    creatorId: 'creator-1',
    portfolioTitle: '夏休みの秋保大滝を撮影｜宮城県',
    portfolioImage: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=600&q=80',
    category: 'フォトグラフィー',
    budgetRange: '30,000円 〜 100,000円',
    title: 'フラワーアレンジメントの撮影をお願いしたい',
    message: '秋保大滝のお写真、自然の美しさを見事に切り取っていて感動しました。\n\n当スタジオのフラワーアレンジメント作品集を制作するにあたり、撮影をお願いできないかと考えております。花の繊細な色味やテクスチャーを活かした撮影ができる方を探していました。\n\nスタジオでの撮影を想定しており、半日〜1日程度を予定しています。',
    status: 'read',
    createdAt: '2026/03/10',
  },
  {
    id: 'consult-4',
    clientId: 'client-1',
    clientName: '田中 太郎',
    clientCompany: '株式会社サンプルデザイン',
    clientAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    creatorId: 'creator-1',
    portfolioTitle: '海のフード「Baktes」のコーポレートサイトデザイン',
    portfolioImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    category: 'グラフィックデザイン',
    budgetRange: '30,000円 〜 100,000円',
    deadline: '2026/04/15',
    title: '会社案内パンフレットのデザイン',
    message: '以前にもご相談させていただいた田中です。\n\nBaktesのサイトデザインが社内でも大変好評で、今回は会社案内パンフレット（A4・8ページ）のデザインもお願いしたいと考えております。\n\n既存のコーポレートカラーに合わせつつ、親しみやすいデザインをご提案いただけると嬉しいです。',
    status: 'accepted',
    createdAt: '2026/02/20',
  },
  {
    id: 'consult-5',
    clientId: 'client-2',
    clientName: '鈴木 一郎',
    clientCompany: 'テックイノベーション株式会社',
    clientAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
    creatorId: 'creator-1',
    portfolioTitle: '高級レストランのブランディングサイト制作',
    portfolioImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80',
    category: 'Webデザイン',
    budgetRange: '100,000円 〜 300,000円',
    title: '社内ツールのUIデザイン改善',
    message: '鈴木です。以前ご相談した件とは別に、弊社で利用している社内ツールのUIが使いづらいとの声があり、デザインの改善をお願いしたいと考えております。\n\n現状の課題を整理した資料もございますので、まずはお話しできればと思います。',
    status: 'declined',
    createdAt: '2026/02/05',
  },
];

// 特定のクリエイター宛ての相談を取得
export function getConsultationsForCreator(creatorId: string): Consultation[] {
  return MOCK_CONSULTATIONS.filter((c) => c.creatorId === creatorId).sort(
    (a, b) => b.createdAt.localeCompare(a.createdAt)
  );
}
