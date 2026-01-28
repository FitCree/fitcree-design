import { LucideIcon, Briefcase, Users, Clock, MessageSquare } from 'lucide-react';

// --- Interfaces ---

export interface User {
  id: string;
  name: string;
  company?: string;
  avatarUrl: string;
  mode: 'client' | 'creator';
  stats?: StatItem[];
  projects?: Project[];
}

export interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export interface Project {
  id: number;
  title: string;
  status: 'recruiting' | 'selection' | 'in_progress' | 'completed';
  statusLabel: string;
  category: string;
  postedDate: string;
  deadline: string;
  applicants?: number;
  newApplicants?: number;
  budget: string;
  partnerName?: string;
  progress?: number;
  hasUnreadMessage?: boolean;
}

// --- Mock Data ---

// Common Stats Templates
const CLIENT_STATS_TEMPLATE: Omit<StatItem, 'value'>[] = [
  { label: '募集中', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: '選定中', icon: Users, color: 'text-sky-600', bg: 'bg-sky-50' },
  { label: '進行中', icon: Clock, color: 'text-green-600', bg: 'bg-green-50' },
  { label: '未読メッセージ', icon: MessageSquare, color: 'text-red-500', bg: 'bg-red-50' },
];

export const MOCK_CLIENTS: User[] = [
  {
    id: 'client-1',
    name: '田中 太郎',
    company: '株式会社サンプルデザイン',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    mode: 'client',
    stats: [
      { ...CLIENT_STATS_TEMPLATE[0], value: 2 },
      { ...CLIENT_STATS_TEMPLATE[1], value: 1 },
      { ...CLIENT_STATS_TEMPLATE[2], value: 3 },
      { ...CLIENT_STATS_TEMPLATE[3], value: 5 },
    ],
    projects: [
      {
        id: 1,
        title: '【急募】新規オーガニックカフェのロゴデザイン・ショップカード制作',
        status: 'recruiting',
        statusLabel: CLIENT_STATS_TEMPLATE[0].label,
        category: 'デザイン',
        postedDate: '2026/02/20',
        deadline: '2026/03/05',
        applicants: 12,
        newApplicants: 3,
        budget: '50,000 ~ 100,000円'
      },
      {
        id: 2,
        title: '自社ECサイトの商品撮影（アパレル・小物）',
        status: 'selection',
        statusLabel: CLIENT_STATS_TEMPLATE[1].label,
        category: '写真撮影',
        postedDate: '2026/02/15',
        deadline: '2026/02/28',
        applicants: 8,
        newApplicants: 0,
        budget: '30,000 ~ 50,000円'
      },
      {
        id: 3,
        title: '採用LPのライティング・インタビュー取材',
        status: 'in_progress',
        statusLabel: CLIENT_STATS_TEMPLATE[2].label,
        partnerName: '佐藤 ライター',
        category: 'ライティング',
        postedDate: '2026/01/10',
        deadline: '2026/02/25',
        progress: 60,
        budget: '100,000円',
        hasUnreadMessage: true
      }
    ]
  },
  {
    id: 'client-2',
    name: '鈴木 一郎',
    company: 'テックイノベーション株式会社',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    mode: 'client',
    stats: [
      { ...CLIENT_STATS_TEMPLATE[0], value: 1 },
      { ...CLIENT_STATS_TEMPLATE[1], value: 4 },
      { ...CLIENT_STATS_TEMPLATE[2], value: 2 },
      { ...CLIENT_STATS_TEMPLATE[3], value: 0 },
    ],
    projects: [
      {
        id: 101,
        title: 'コーポレートサイトのリニューアル（要件定義〜実装）',
        status: 'selection',
        statusLabel: CLIENT_STATS_TEMPLATE[1].label,
        category: 'Web開発',
        postedDate: '2026/02/10',
        deadline: '2026/03/10',
        applicants: 15,
        newApplicants: 2,
        budget: '500,000 ~ 1,000,000円'
      },
      {
        id: 102,
        title: '新卒採用向けパンフレットのデザイン',
        status: 'in_progress',
        statusLabel: CLIENT_STATS_TEMPLATE[2].label,
        partnerName: '山田 クリエイター',
        category: 'デザイン',
        postedDate: '2026/01/20',
        deadline: '2026/02/28',
        progress: 80,
        budget: '100,000 ~ 200,000円'
      }
    ]
  },
  {
    id: 'client-3',
    name: '佐藤 花子',
    company: 'グローバル貿易合同会社',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bella',
    mode: 'client',
    stats: [
      { ...CLIENT_STATS_TEMPLATE[0], value: 0 },
      { ...CLIENT_STATS_TEMPLATE[1], value: 0 },
      { ...CLIENT_STATS_TEMPLATE[2], value: 1 },
      { ...CLIENT_STATS_TEMPLATE[3], value: 2 },
    ],
    projects: [
      {
        id: 201,
        title: '海外向け製品カタログの翻訳（日→英）',
        status: 'in_progress',
        statusLabel: CLIENT_STATS_TEMPLATE[2].label,
        partnerName: 'John Translator',
        category: '翻訳',
        postedDate: '2026/01/15',
        deadline: '2026/02/20',
        progress: 30,
        budget: '50,000 ~ 100,000円',
        hasUnreadMessage: true
      }
    ]
  }
];

export const MOCK_CREATORS: User[] = [
  {
    id: 'creator-1',
    name: '山田 イラストマン',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
    mode: 'creator',
  },
  {
    id: 'creator-2',
    name: '佐藤 デザイン',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Molly',
    mode: 'creator',
  },
  {
    id: 'creator-3',
    name: '高橋 ライター',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Simba',
    mode: 'creator',
  }
];

export const ALL_MOCK_USERS = [...MOCK_CLIENTS, ...MOCK_CREATORS];
