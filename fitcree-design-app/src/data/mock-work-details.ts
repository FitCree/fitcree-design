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
  siteUrl?: string;
  siteName?: string;
  industry?: string;
  siteType?: string;
  target: string[];
  purpose: string[];
  durationLabel: string;
  durationBreakdown: string[];
  tools: string[];
  siteTags: string[];
  clientType: 'self' | 'client_anonymous' | 'client_public';
  clientName?: string;
  cost: string;
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
    durationLabel: 'ディレクション、デザイン',
    durationBreakdown: ['#デザイン', '#ディレクション'],
    tools: ['#Figma', '#ドリーム名', '#ドリーム名'],
    siteTags: ['#ページュ', '#近代角ゴシック'],
    clientType: 'self',
    cost: '300,000円',
    createdDate: '2026/02/10',
    views: 24,
    likes: 6,
    shares: 3,
  },
};

export function getWorkDetail(id: string): WorkDetail | null {
  return MOCK_WORK_DETAILS[id] || null;
}
