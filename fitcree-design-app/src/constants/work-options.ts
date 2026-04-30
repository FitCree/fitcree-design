export const INDUSTRIES = [
  '飲食',
  'IT・テクノロジー',
  '教育・学校',
  '医療・ヘルスケア',
  '不動産',
  '美容・ファッション',
  '金融・保険',
  '小売・EC',
  '製造',
  '旅行・観光',
  'メディア・エンタメ',
  'その他',
];

export const DURATION_UNITS = ['時間', '日', '週間', 'ヶ月'];

export const CLIENT_TYPE_OPTIONS = [
  { id: 'self', label: 'クライアントなし（自主制作／仮想制作）' },
  {
    id: 'client_anonymous',
    label: 'クライアントあり（名前は非公開）',
    description: '外部案件で、クライアント名は公開されません。',
  },
  {
    id: 'client_public',
    label: 'クライアントあり（名前公開可）',
    description: 'クライアントの許可を得た場合に選択してください（企業名もしくは一部を入力）',
  },
];

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
