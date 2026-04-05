/**
 * 全分野共通の「公開設定」選択肢
 *
 * 投稿フォーム・編集フォームで共通利用する定数です。
 * 文言を変更する場合はこのファイルのみ編集してください。
 */

export const AGE_RESTRICTION_OPTIONS = [
  { id: 'all',  label: '全年齢',           description: '誰でも閲覧可能な作品です。' },
  { id: 'r15',  label: 'R-15',             description: '15歳未満の方の閲覧に適さない表現を含みます。' },
  { id: 'r18',  label: 'R-18（成人向け）', description: '18歳未満の方の閲覧に適さない表現（グロテスク・性的表現等）を含みます。' },
];

export const VISIBILITY_OPTIONS = [
  { id: 'public',      label: 'だれでも',           description: '誰でも閲覧することができます。' },
  { id: 'fitcree_only', label: 'FitCreeユーザーのみ', description: 'FitCreeアカウントを持っているユーザーにのみ表示されます。' },
  { id: 'limited',     label: '限定公開',           description: '作品は非公開になり、専用リンクでのみ閲覧可能になります。' },
];
