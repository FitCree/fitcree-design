import { LucideIcon, Briefcase, Users, Clock, MessageSquare } from 'lucide-react';
import { BUDGET_RANGES, REQUEST_CATEGORIES } from '../../docs/specs/master-data';
import { PROJECT_DETAILS } from './mock-projects';

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
  status: 'recruiting' | 'selection' | 'in_progress' | 'completed' | 'closed';
  statusLabel: string;
  categoryId: number;
  postedDate: string;
  deadline: string;
  startDate?: string;
  applicants?: number;
  newApplicants?: number;
  budgetRangeId: number;
  partnerName?: string;
  progress?: number;
  hasUnreadMessage?: boolean;
  applicantUsers?: User[];
  assignedUsers?: User[];
  // 詳細データ用（job-post-spec.tsに基づく）
  details?: ProjectDetails;
}

export interface ProjectDetails {
  usagePurpose?: string[];
  industry?: string[];
  requestType?: 'proposal' | 'specified' | 'partner';
  background?: string;
  target?: string;
  taste?: string[];
  referenceUrls?: string[];
  referenceFiles?: string[];
  conditions?: string[];
  deliveryFormat?: {
    mode: 'consult' | 'specified';
    values: string[];
  };
  publicity?: 'ok' | 'partial' | 'ng';
  requirements?: string[];
  deadlineDate?: {
    type: 'date' | 'asap' | 'negotiable';
    value?: string;
  };
  persona?: string;
}

export type ProjectStatus = Project['status'];

export const PROJECT_STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; bg: string; icon: LucideIcon }> = {
  recruiting: { label: '募集中', color: 'text-blue-700', bg: 'bg-blue-100', icon: Briefcase },
  selection: { label: '選定中', color: 'text-sky-700', bg: 'bg-sky-100', icon: Users },
  in_progress: { label: '進行中', color: 'text-green-700', bg: 'bg-green-100', icon: Clock },
  completed: { label: '完了', color: 'text-green-700', bg: 'bg-green-100', icon: Clock },
  closed: { label: '終了', color: 'text-neutral-600', bg: 'bg-neutral-100', icon: MessageSquare },
};

// --- Mock Data ---

// Common Stats Templates
export const CLIENT_STATS_TEMPLATE: Omit<StatItem, 'value'>[] = [
  { ...PROJECT_STATUS_CONFIG.recruiting, color: 'text-blue-600', bg: 'bg-blue-50' },
  { ...PROJECT_STATUS_CONFIG.selection, color: 'text-sky-600', bg: 'bg-sky-50' },
  { ...PROJECT_STATUS_CONFIG.in_progress, color: 'text-green-600', bg: 'bg-green-50' },
  { ...PROJECT_STATUS_CONFIG.closed, color: 'text-neutral-500', bg: 'bg-neutral-50' },
  { label: '未読メッセージ', icon: MessageSquare, color: 'text-red-500', bg: 'bg-red-50' },
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
        id: 101,
        title: '【項目全部入力パターン】新規オーガニックカフェのロゴデザイン・ショップカード制作',
        status: 'recruiting',
        statusLabel: CLIENT_STATS_TEMPLATE[0].label,
        categoryId: 2, // グラフィック
        postedDate: '2026/02/20',
        deadline: '2026/03/05',
        applicants: 12,
        newApplicants: 3,
        budgetRangeId: 2, // 30,000 ~ 100,000円
        details: PROJECT_DETAILS[101],
        applicantUsers: [MOCK_CREATORS[0], MOCK_CREATORS[1]]
      },
      {
        id: 102,
        title: '【項目必須のみパターン】シンプルWebバナー制作の依頼',
        status: 'recruiting',
        statusLabel: CLIENT_STATS_TEMPLATE[0].label,
        categoryId: 2, // グラフィック
        postedDate: '2026/02/09',
        deadline: '2026/02/25',
        applicants: 0,
        newApplicants: 0,
        budgetRangeId: 2, // 30,000 ~ 100,000円
        details: PROJECT_DETAILS[102]
      },
      {
        id: 103,
        title: '自社ECサイトの商品撮影（アパレル・小物）',
        status: 'selection',
        statusLabel: CLIENT_STATS_TEMPLATE[1].label,
        categoryId: 3, // 写真
        postedDate: '2026/02/15',
        deadline: '2026/02/28',
        applicants: 8,
        newApplicants: 0,
        budgetRangeId: 2, // 30,000 ~ 100,000円
        details: PROJECT_DETAILS[103],
        applicantUsers: [MOCK_CREATORS[1], MOCK_CREATORS[2]]
      },
      {
        id: 104,
        title: '採用LPのライティング・インタビュー取材',
        status: 'in_progress',
        statusLabel: CLIENT_STATS_TEMPLATE[2].label,
        partnerName: '佐藤 ライター',
        categoryId: 5, // ライティング・編集
        postedDate: '2026/01/10',
        deadline: '2026/02/25',
        startDate: '2026/01/15',
        progress: 60,
        budgetRangeId: 3, // 100,000 ~ 300,000円
        hasUnreadMessage: true,
        details: PROJECT_DETAILS[104],
        assignedUsers: [MOCK_CREATORS[2]]
      },
      {
        id: 105,
        title: '【終了パターン】市民健康フェスティバルの告知ポスター制作',
        status: 'closed',
        statusLabel: CLIENT_STATS_TEMPLATE[3].label,
        categoryId: 2, // グラフィック
        postedDate: '2025/11/10',
        deadline: '2025/12/15',
        startDate: '2025/11/20',
        budgetRangeId: 2, // 30,000 ~ 100,000円
        details: PROJECT_DETAILS[105],
        assignedUsers: [MOCK_CREATORS[0]]
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
        id: 201,
        title: 'コーポレートサイトのリニューアル（要件定義〜実装）',
        status: 'recruiting',
        statusLabel: CLIENT_STATS_TEMPLATE[1].label,
        categoryId: 0, // Webサイト
        postedDate: '2026/02/10',
        deadline: '2026/03/10',
        applicants: 15,
        newApplicants: 2,
        budgetRangeId: 5, // 500,000 ~ 1,000,000円
        details: PROJECT_DETAILS[201],
        applicantUsers: [MOCK_CREATORS[0], MOCK_CREATORS[1], MOCK_CREATORS[2]]
      },
      {
        id: 202,
        title: '新卒採用向けパンフレットのデザイン',
        status: 'in_progress',
        statusLabel: CLIENT_STATS_TEMPLATE[2].label,
        partnerName: '山田 クリエイター',
        categoryId: 2, // グラフィック
        postedDate: '2026/01/20',
        deadline: '2026/02/28',
        startDate: '2026/01/25',
        progress: 80,
        budgetRangeId: 3, // 100,000 ~ 300,000円
        details: PROJECT_DETAILS[202],
        assignedUsers: [MOCK_CREATORS[0]]
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
        id: 301,
        title: '海外向け製品カタログの翻訳（日→英）',
        status: 'in_progress',
        statusLabel: CLIENT_STATS_TEMPLATE[2].label,
        partnerName: 'John Translator',
        categoryId: 9, // その他
        postedDate: '2026/01/15',
        deadline: '2026/02/20',
        startDate: '2026/01/20',
        progress: 30,
        budgetRangeId: 2, // 50,000 ~ 100,000円
        hasUnreadMessage: true,
        details: PROJECT_DETAILS[301]
      }
    ]
  }
];

export const ALL_MOCK_USERS = [...MOCK_CLIENTS, ...MOCK_CREATORS];
