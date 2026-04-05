/**
 * 分野別「生成AIの利用状況」選択肢
 *
 * 投稿フォーム・編集フォームで共通利用する定数です。
 * 文言を変更する場合はこのファイルのみ編集してください。
 */

export const AI_OPTIONS_WEB = [
  {
    id: 'none',
    label: '非AI / 制作補助のみ（AI生成物なし）',
    description: 'AIを全く使わない、またはアイデア出し・構成・デバッグ等の「表に出ない工程」のみで使用。',
  },
  {
    id: 'part',
    label: '部分利用 / ハイブリッド（AI生成物あり）',
    description: '背景、テクスチャ、一部の文章、特定のコードモジュールなどにAI生成物をそのまま活用。',
  },
  {
    id: 'full',
    label: 'AI主体（プロンプト・ディレクション）',
    description: '作品の根幹（サイト全体の構成・コンテンツ・デザイン）をAIが生成。',
  },
];

export const AI_OPTIONS_ILLUSTRATION = [
  {
    id: 'none',
    label: '非AI / 制作補助のみ（AI生成物なし）',
    description: 'AIを全く使わない、またはアイデア出し・構成等の「表に出ない工程」のみで使用。',
  },
  {
    id: 'part',
    label: '部分利用 / ハイブリッド（AI生成物あり）',
    description: '背景、テクスチャ、特定パーツなどにAI生成物をそのまま活用。',
  },
  {
    id: 'full',
    label: 'AI主体（プロンプト・ディレクション）',
    description: 'イラスト全体（キャラクター・背景・構図）をAIが生成。プロンプト指示・ディレクションが主な工程。',
  },
];

export const AI_OPTIONS_PHOTO = [
  {
    id: 'none',
    label: '非AI / 制作補助のみ（AI生成物なし）',
    description: 'AIを全く使わない、またはアイデア出し・構成等の「表に出ない工程」のみで使用。',
  },
  {
    id: 'part',
    label: '部分利用 / ハイブリッド（AI生成物あり）',
    description: '背景素材、テクスチャ、ノイズ除去などにAIツール・AI生成物をそのまま活用。',
  },
  {
    id: 'full',
    label: 'AI主体（プロンプト・ディレクション）',
    description: '画像生成AIによるビジュアル制作、またはAI加工・合成が作品の主体。',
  },
];

export const AI_OPTIONS_GRAPHIC = [
  {
    id: 'none',
    label: '非AI / 制作補助のみ（AI生成物なし）',
    description: 'AIを全く使わない、またはアイデア出し・構成等の「表に出ない工程」のみで使用。',
  },
  {
    id: 'part',
    label: '部分利用 / ハイブリッド（AI生成物あり）',
    description: '背景、テクスチャ、テキスト素材などにAI生成物をそのまま活用。',
  },
  {
    id: 'full',
    label: 'AI主体（プロンプト・ディレクション）',
    description: 'ロゴ・レイアウト・ビジュアルなど作品全体をAIが生成。プロンプト指示・ディレクションが主な工程。',
  },
];

export const AI_OPTIONS_VIDEO = [
  {
    id: 'none',
    label: '非AI / 制作補助のみ（AI生成物なし）',
    description: 'AIを全く使わない、またはアイデア出し・構成等の「表に出ない工程」のみで使用。',
  },
  {
    id: 'part',
    label: '部分利用 / ハイブリッド（AI生成物あり）',
    description: '背景映像、BGM・SE、字幕生成などにAI生成物をそのまま活用。',
  },
  {
    id: 'full',
    label: 'AI主体（プロンプト・ディレクション）',
    description: '映像・音声・テロップなど作品の主要な要素をAIが生成・編集。',
  },
];
