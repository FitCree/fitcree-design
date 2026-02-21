import { User } from '@/types/data';
import { CLIENT_STATS_TEMPLATE } from './master-data';
import { ALL_PROJECTS } from './mock-projects';
import { MOCK_CREATORS } from './mock-creators';

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
    projects: ALL_PROJECTS.filter(p => (p.id >= 101 && p.id <= 105) || (p.id >= 401 && p.id <= 601)).map(p => ({
      ...p,
      applicantUsers: p.id === 101 ? [MOCK_CREATORS[0], MOCK_CREATORS[1]] :
        p.id === 103 ? [MOCK_CREATORS[1], MOCK_CREATORS[2]] : undefined,
      assignedUsers: p.id === 104 ? [MOCK_CREATORS[2]] :
        p.id === 105 ? [MOCK_CREATORS[0]] : undefined
    }))
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
    projects: ALL_PROJECTS.filter(p => (p.id >= 201 && p.id <= 202) || (p.id >= 701 && p.id <= 901)).map(p => ({
      ...p,
      applicantUsers: p.id === 201 ? [MOCK_CREATORS[0], MOCK_CREATORS[1], MOCK_CREATORS[2]] : undefined,
      assignedUsers: p.id === 202 ? [MOCK_CREATORS[0]] : undefined
    }))
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
    projects: ALL_PROJECTS.filter(p => p.id === 301 || p.id === 111 || p.id === 121)
  }
];
