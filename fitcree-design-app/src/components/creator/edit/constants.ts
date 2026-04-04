// 編集フォーム共通の定数

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

export const AGE_RESTRICTION_OPTIONS = [
  { id: 'all', label: '全年齢', description: '誰でも閲覧可能な作品です。' },
  { id: 'r15', label: 'R-15', description: '15歳未満の方の閲覧に適さない表現を含みます。' },
  { id: 'r18', label: 'R-18（成人向け）', description: '18歳未満の方の閲覧に適さない表現（グロテスク・性的表現等）を含みます。' },
];

export const AI_OPTIONS = [
  { id: 'none', label: '非AI / 制作補助のみ（AI生成物なし）', description: 'AIを全く使わない、またはアイデア出し・構成・デバッグ等の「表に出ない工程」のみで使用。' },
  { id: 'part', label: '部分利用 / ハイブリッド（AI生成物あり）', description: '背景、テクスチャ、一部の文章、特定のコードモジュールなどにAI生成物をそのまま活用。' },
  { id: 'full', label: 'AI主体（プロンプト・ディレクション）', description: '作品の根幹（メインビジュアル、全体の構成、主要なコンテンツ）をAIが生成。' },
];

export const VISIBILITY_OPTIONS = [
  { id: 'public', label: 'だれでも', description: '誰でも閲覧することができます。' },
  { id: 'fitcree_only', label: 'FitCreeユーザーのみ', description: 'FitCreeアカウントを持っているユーザーにのみ表示されます。' },
  { id: 'limited', label: '限定公開', description: '作品は非公開になり、専用リンクでのみ閲覧可能になります。' },
];
