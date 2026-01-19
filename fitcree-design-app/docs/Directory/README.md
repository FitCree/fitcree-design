# Directory（プロジェクト全体のファイル構成）

このドキュメントは、`fitcree-design` プロジェクト全体の「どのフォルダに何があるか」を素早く把握するための見取り図です。

- **対象**: リポジトリ全体（ルート + `fitcree-design-app/`）
- **更新方針**: フォルダ構成が変わったら、このツリーと説明を更新してください
- **除外方針**: `node_modules/` や `.next/` などの巨大な生成物は、可読性のためツリーから除外しています

## ルート直下（`fitcree-design/`）

- **`.cursorrules`**: Cursor（AI）向けのUI開発ルール（仕様駆動、既存コンポーネント優先など）
- **`.vscode/`**: VSCode / Cursor のエディタ設定
- **`Makefile`**: 開発補助タスク（ある場合はここに定義）
- **`fitcree-design-app/`**: Next.js アプリ本体（UI実装・仕様書・ルール類）

## アプリ直下（`fitcree-design-app/`）

- **`docs/`**: 仕様書・運用ルール・コンセプト（本プロジェクトの「ソースオブトゥルース」）
  - **`docs/specs/`**: 画面項目・順序などの仕様データ（UI変更は原則ここ経由）
  - **`docs/rules/`**: アクセシビリティやワークフローなどのルール
  - **`docs/concept/`**: ビジョン・コンセプト（参考情報）
  - **`docs/Directory/`**: 本フォルダ。プロジェクトのファイル構成を可視化
- **`src/`**: 実装コード
  - **`src/app/`**: Next.js App Router のルーティング/ページ
  - **`src/components/`**: UIキット・フォーム部品（既存コンポーネントを優先して利用）
- **`package.json` / `yarn.lock`**: 依存関係
- **`next.config.ts` / `tsconfig.json` / `eslint.config.mjs`**: Next.js / TypeScript / ESLint 設定
- **`globals.css`（`src/app/globals.css`）**: 全体スタイル
- **`vercel.json`**: Vercel デプロイ設定（必要な場合）

## ディレクトリツリー（主要）

```text
/fitcree-design
├── .vscode/
│   └── settings.json
├── fitcree-design-app/
│   ├── docs/
│   │   ├── concept/
│   │   │   └── product-vision.md
│   │   ├── rules/
│   │   │   ├── accessibility.md
│   │   │   └── workflow.md
│   │   ├── specs/
│   │   │   ├── colors.md
│   │   │   ├── job-post-spec.ts
│   │   │   └── master-data.ts
│   │   └── Directory/
│   │       └── README.md
│   ├── src/
│   │   ├── app/
│   │   │   ├── client/
│   │   │   │   └── post-job/
│   │   │   │       ├── preview/
│   │   │   │       └── page.tsx
│   │   │   ├── styleguide/
│   │   │   │   ├── form/
│   │   │   │   │   ├── elements/
│   │   │   │   │   ├── layout/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── components/
│   │       ├── forms/
│   │       │   ├── elements/
│   │       │   │   ├── CheckboxGrid.tsx
│   │       │   │   ├── ConditionalCheckboxGrid.tsx
│   │       │   │   ├── ConditionalDateInput.tsx
│   │       │   │   ├── DateInput.tsx
│   │       │   │   ├── FileUploader.tsx
│   │       │   │   ├── FormSection.tsx
│   │       │   │   ├── RadioCard.tsx
│   │       │   │   ├── RadioList.tsx
│   │       │   │   ├── ReferenceFileUploader.tsx
│   │       │   │   ├── ReferenceUrlInput.tsx
│   │       │   │   ├── SelectInput.tsx
│   │       │   │   ├── TagInput.tsx
│   │       │   │   ├── TextArea.tsx
│   │       │   │   ├── TextInput.tsx
│   │       │   │   ├── TipsBox.tsx
│   │       │   │   ├── ToggleSwitch.tsx
│   │       │   │   └── UrlListInput.tsx
│   │       │   ├── layout/
│   │       │   │   ├── FormFooter.tsx
│   │       │   │   ├── FormHeader.tsx
│   │       │   │   └── FormStepper.tsx
│   │       │   ├── FormElements.tsx
│   │       │   └── FormLayout.tsx
│   │       └── ui-kit.tsx
│   ├── .gitignore
│   ├── .yarnrc.yml
│   ├── eslint.config.mjs
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   ├── tsconfig.json
│   ├── vercel.json
│   └── yarn.lock
├── .cursorrules
└── Makefile
```

