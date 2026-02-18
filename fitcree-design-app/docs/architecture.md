# プロジェクト構成 (Directory Map)
本ドキュメントは、FitCreeプロジェクトにおけるディレクトリ構成と各フォルダの責務を定義します。AIは新規ファイルの作成や既存コードの参照時に、この構造を遵守してください。

## 1. ディレクトリツリー（主要構成）

```
/ (Root)
├── .cursorrules             # AIへの自動命令定義（ハブ）
├── Makefile                 # 開発補助コマンド
└── fitcree-design-app/      # アプリケーション本体
    ├── docs/                # 【最重要】設計・規約（Source of Truth）
    │   ├── overview.md      # サービスの目的・ターゲット
    │   ├── design-system.md # デザイン・余白・色の掟
    │   ├── architecture.md  # 本ファイル（構成定義）
    │   └── accessibility.md # 実装品質・アクセシビリティ
    ├── src/
    │   ├── app/             # App Router（ページ・ルーティング）
    │   │   └── globals.css  # ★スタイルの根本定義（Tailwindテーマ設定）
    │   └── components/      # UIコンポーネント
    │       ├── client/      # クライアント向け専用部品
    │       ├── common/      # 共通部品（ヘッダー類）
    │       ├── forms/       # フォーム関連の共通部品
    │       │   ├── elements/ # 個別の入力パーツ
    │       │   └── layout/   # フォームの枠組み
    │       ├── projects/    # 案件・プロジェクト関連部品
    │       └── ui-kit.tsx   # FitCree基本UIパーツ定義
    │   └── data/            # 共通ユーティリティ・仮のデータ
    └── package.json         # 依存関係管理
```

## 2. フォルダごとの責務

### docs/
プロジェクトの全仕様が集約されています。AIは実装前に必ずこの中身を確認し、定義されたルール（特に `design-system.md`）から逸脱したコードを生成しないでください。

### src/app/globals.css
プロジェクトの色やフォントの設定がここに記述されています。AIはスタイルを確認する際、このファイルを優先的に参照してください。

### src/app/
Next.jsの規約に基づいたルーティングを配置します。デザインの実装（UIの組み立て）はここで行いますが、ロジックや共通部品は抽出して components や lib に配置することを推奨します。

### src/components/
- `forms/`: `FormElements.tsx` や `FormLayout.tsx` を含み、入力フォームの一貫性を管理します。AIは新しいフォームを作る際、まずこの中の既存パーツが使えないか必ず検索してください。
- `common/`: ロール別（Client / Creator / Guest）のヘッダーなど、全ページで共通して使用される要素を配置します。
- `ui-kit.tsx`: 基本的なボタンやバッジなど、FitCree全体のデザインの基礎となる最小単位の部品を管理します。

### tailwind.config.ts
デザインシステムの根幹となる色の名前や拡張設定が記述されています。

