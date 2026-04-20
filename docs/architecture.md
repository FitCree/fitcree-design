# プロジェクト構成 (Directory Map)
本ドキュメントは、FitCreeプロジェクトにおけるディレクトリ構成と各フォルダの責務を定義します。AIは新規ファイルの作成や既存コードの参照時に、この構造を遵守してください。

## 1. ディレクトリツリー（主要構成）

```
fitcree-design/ (Root)
├── .cursorrules             # Cursor AI向け自動命令定義
├── CLAUDE.md                # Claude Code向け自動命令定義
├── Makefile                 # 開発補助コマンド
├── docs/                    # 【最重要】設計・規約（Source of Truth）
│   ├── overview.md          # サービスの目的・ターゲット
│   ├── design-system.md     # デザイン・余白・色の掟
│   ├── architecture.md      # 本ファイル（構成定義）
│   └── accessibility.md     # 実装品質・アクセシビリティ
└── fitcree-design-app/      # アプリケーション本体
    ├── src/
    │   ├── app/             # App Router（ページ・ルーティング）
    │   │   └── globals.css  # ★スタイルの根本定義（Tailwindテーマ設定）
    │   ├── components/      # UIコンポーネント
    │   │   ├── client/      # クライアント向け専用部品
    │   │   ├── common/      # 共通部品（ヘッダー類、汎用パーツ）
    │   │   ├── consultations/ # 相談・案件関連部品
    │   │   ├── creator/     # クリエイター向け専用部品
    │   │   ├── forms/       # フォーム関連の共通部品
    │   │   │   ├── elements/ # 個別の入力パーツ（form-theme.ts含む）
    │   │   │   └── layout/   # フォームの枠組み
    │   │   ├── guest/       # ゲスト（未ログイン）向け部品
    │   │   ├── projects/    # プロジェクト関連部品
    │   │   ├── workspace/   # ワークスペース関連部品
    │   │   └── ui-kit.tsx   # FitCree基本UIパーツ定義
    │   ├── constants/       # 定数定義（選択肢・ラベルなど）
    │   ├── data/            # 仮データ・ユーティリティ
    │   ├── lib/             # 汎用ヘルパー関数
    │   └── types/           # TypeScript型定義
    └── package.json         # 依存関係管理
```

## 2. フォルダごとの責務

### docs/（ルート直下）
プロジェクトの全仕様が集約されています。AIは実装前に必ずこの中身を確認し、定義されたルール（特に `design-system.md`）から逸脱したコードを生成しないでください。

### fitcree-design-app/src/app/globals.css（Tailwind v4 テーマ設定）
プロジェクトの色やフォントの設定がここに記述されています。本プロジェクトはTailwind CSS v4を使用しており、テーマ設定は `@theme inline` ディレクティブで管理しています（`tailwind.config.ts` は存在しません）。AIはスタイルを確認する際、このファイルを優先的に参照してください。

### fitcree-design-app/src/app/
Next.jsの規約に基づいたルーティングを配置します。UIの組み立てはここで行いますが、ロジックや共通部品は抽出して `components/` や `lib/` に配置することを推奨します。

### fitcree-design-app/src/components/
- `forms/`: `FormElements.tsx` や `FormLayout.tsx` を含み、入力フォームの一貫性を管理します。`elements/form-theme.ts` にはロール別（Creator/Client）のテーマ定義があります。**AIは新しいフォームを作る際、まずこの中の既存パーツが使えないか必ず確認してください。**
- `common/`: ロール別（Client / Creator / Guest）のヘッダーなど、全ページで共通して使用される要素を配置します。`ActionLinkButton`, `CategoryBadge`, `DetailSection` 等の汎用パーツもここにあります。
- `client/` / `creator/` / `guest/`: 各ロール専用のページパーツを配置します。ロールをまたぐ共通化は `common/` に昇格させてください。
- `consultations/` / `projects/` / `workspace/`: 機能ドメインごとの部品を配置します。
- `ui-kit.tsx`: 現在はプレースホルダー状態。今後、ボタンやバッジなどの最小単位のUIパーツをここに集約予定。現時点での共通パーツは `common/` や `forms/elements/` 内の各コンポーネントを参照すること。

### fitcree-design-app/src/constants/
選択肢のラベル・値など、UIで使用する静的な定数を定義します。コンポーネント内にベタ書きせず、ここからインポートしてください。

### fitcree-design-app/src/lib/
フォームデータの変換など、汎用的なヘルパー関数を配置します。特定のコンポーネントや画面に依存しないロジックはここに置いてください。

### fitcree-design-app/src/types/
TypeScriptの型定義を集約します。複数箇所で使う型はコンポーネントファイル内に直書きせず、ここで定義してインポートしてください。
