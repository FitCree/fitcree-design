/**
 * Project オブジェクトから投稿フォームの formData 形式への変換ユーティリティ
 * 案件編集ページで既存データをフォームにプリフィルする際に使用
 */

import { Project } from '@/types/data';
import { REQUEST_CATEGORIES, BUDGET_RANGES } from '@/data/master-data';

/**
 * Project オブジェクトを投稿フォームの formData 形式に変換する
 * postedDate は編集不可のため含めない
 */
export function projectToFormData(project: Project): Record<string, any> {
  const details = project.details;
  const data: Record<string, any> = {};

  // --- STEP 1: 基本情報 ---
  data.title = project.title || '';
  data.category = REQUEST_CATEGORIES[project.categoryId] || '';

  if (details?.usagePurpose) {
    data.usagePurpose = details.usagePurpose;
  }
  if (details?.industry) {
    data.industry = details.industry;
  }
  if (details?.requestType) {
    data.requestType = details.requestType;
  }

  // --- STEP 2: 詳細 ---
  if (details?.background) {
    data.background = details.background;
  }
  if (details?.target) {
    data.target = details.target;
  }
  if (details?.taste) {
    data.taste = details.taste;
  }
  if (details?.referenceUrls) {
    data.referenceUrls = details.referenceUrls;
  }
  // referenceFiles はファイルオブジェクトのため編集時は扱わない

  // --- STEP 3: 条件・制約 ---
  if (details?.conditions) {
    data.conditions = details.conditions;
  }
  if (details?.deliveryFormat) {
    data.deliveryFormatType = details.deliveryFormat.mode || 'consult';
    data.deliveryFormat = details.deliveryFormat.values || [];
  }
  if (details?.publicity) {
    data.publicity = details.publicity;
  }
  if (details?.requirements) {
    data.requirements = details.requirements;
  }

  // --- STEP 4: 予算・日程 ---
  if (details?.deadlineDate) {
    data.deadlineDateType = details.deadlineDate.type || 'date';
    if (details.deadlineDate.value) {
      // YYYY/MM/DD → YYYY-MM-DD 形式に変換（date input 用）
      data.deadlineDate = details.deadlineDate.value.replace(/\//g, '-');
    }
  }

  data.budgetRange = BUDGET_RANGES[project.budgetRangeId] || '';

  // contractType は現在「単発」固定
  data.contractType = '単発';

  // --- STEP 5: 人物像 ---
  if (details?.persona) {
    data.persona = details.persona;
  }

  return data;
}
