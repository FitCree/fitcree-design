/**
 * 【FitCree モックデータ集約ファイル】
 * 各個別のモックデータファイルからデータを再エクスポートします。
 * 既存のインポートを壊さないためのエントリーポイントとして機能します。
 */

export * from '@/types/data';
export * from './mock-creators';
export * from './mock-clients';
export * from './mock-projects';

// 互換性のための結合データ
import { MOCK_CLIENTS } from './mock-clients';
import { MOCK_CREATORS } from './mock-creators';

export const ALL_MOCK_USERS = [...MOCK_CLIENTS, ...MOCK_CREATORS];
