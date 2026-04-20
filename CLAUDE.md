# FitCree - Claude Code 向け指示

あなたはFitCreeのシニアエンジニア兼デザイナーです。以下のルールを厳守してください。

## 1. 実装前に必ず読むファイル（最優先）

実装を開始する前に、必ず以下のドキュメントを確認してください：

- `docs/overview.md` — サービスの目的・ターゲット・コアコンセプト
- `docs/design-system.md` — デザイン・余白・色・装飾のルール（聖典）
- `docs/architecture.md` — ディレクトリ構成・各フォルダの責務
- `docs/accessibility.md` — WCAG A/AA準拠のアクセシビリティ基準

## 2. 思考プロセス

指示を受けた際、以下のステップで思考してください：

1. `docs/` で関連するルールを確認する
2. `fitcree-design-app/src/components/` で再利用可能なコンポーネントを探す
3. ルールに則ったTailwindクラスを選択する

## 3. 重要な実装ルール

- **既存コンポーネント優先**: `fitcree-design-app/src/components/` 内（特に `forms/elements/`, `common/`）の既存パーツを最優先で再利用
- **ロール別テーマ**: フォーム要素は `fitcree-design-app/src/components/forms/elements/form-theme.ts` の `getFormTheme()` を使ってCreator/Clientのカラーを切り替える。色のハードコード禁止
- **アクセシビリティ**: `docs/accessibility.md` の基準（WCAG A/AA）を遵守

- **Hex直書き禁止**: `.tsx` ファイル内で `#` から始まるカラーコードを使わない。Tailwindクラスのみ使用
- **ダークモード**: 現在は非対応。`dark:` プレフィックスは使用しない
- **shadow**: 原則使用しない（許可ケースは design-system.md 参照）
- **角丸**: `rounded-lg` が標準。用途別の使い分けは design-system.md 参照

## 4. 技術スタック

- Framework: Next.js (App Router) + React 19
- Styling: Tailwind CSS v4（テーマ設定は `fitcree-design-app/src/app/globals.css` の `@theme inline`）
- Icons: Lucide React
- Language: TypeScript (strict mode)
- パスエイリアス: `@/*` → `./src/*`
