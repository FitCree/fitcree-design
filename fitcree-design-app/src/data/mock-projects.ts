import { Project, User } from '@/types/data';
import { REQUEST_CATEGORIES, BUDGET_RANGES, PROJECT_STATUS_CONFIG } from './master-data';

export const ALL_PROJECTS: Project[] = [
  {
    id: 101,
    title: '【項目全部入力パターン】新規オーガニックカフェのロゴデザイン・ショップカード制作',
    status: 'recruiting',
    statusLabel: PROJECT_STATUS_CONFIG.recruiting.label,
    categoryId: 2,
    categoryLabel: REQUEST_CATEGORIES[2],
    postedDate: '2026/02/20',
    deadline: '2026/03/05',
    applicants: 12,
    newApplicants: 3,
    budgetRangeId: 2,
    budgetRangeLabel: BUDGET_RANGES[2],
    details: {
      usagePurpose: ['ロゴ', 'ショップカード', 'SNS用アイコン'],
      industry: ['飲食'],
      requestType: 'proposal',
      background: '来月、表参道に新規オープンするオーガニックカフェ「Green Leaf Cafe」のブランドアイデンティティを構築したいと考えています。自然体で落ち着ける空間を提供することをコンセプトにしており、ターゲット層に響く洗練されたデザインを求めています。',
      target: '20代〜40代の健康志向の高い女性、近隣のオフィスワーカー',
      taste: ['ナチュラル', 'ミニマル', 'オーガニック', '洗練'],
      referenceUrls: ['https://example.com/cafe-ref1', 'https://example.com/branding-ref2'],
      referenceFiles: ['ブランドガイドライン.pdf', 'ムードボード作成資料.zip'],
      conditions: ['nda', 'copyrightTransfer'],
      deliveryFormat: {
        mode: 'specified',
        values: ['AI', 'PDF', 'PNG']
      },
      publicity: 'ok',
      requirements: ['proposal', 'estimate'],
      deadlineDate: {
        type: 'date',
        value: '2026/03/05'
      },
      persona: 'こちらの意図を深く汲み取り、ブランドのストーリーを共に作っていけるプロフェッショナルな方を募集します。カフェやライフスタイルブランドの実績がある方は大歓迎です。'
    }
  },
  {
    id: 102,
    title: '【項目必須のみパターン】シンプルWebバナー制作の依頼',
    status: 'recruiting',
    statusLabel: PROJECT_STATUS_CONFIG.recruiting.label,
    categoryId: 2,
    categoryLabel: REQUEST_CATEGORIES[2],
    postedDate: '2026/02/09',
    deadline: '2026/02/25',
    applicants: 0,
    newApplicants: 0,
    budgetRangeId: 2,
    budgetRangeLabel: BUDGET_RANGES[2],
    details: {
      usagePurpose: ['WEB広告バナー'],
      industry: ['IT・Webサービス'],
      requestType: 'specified',
      background: '新しいサービスのリリースに伴い、広告用のWebバナー制作をお願いしたいです。必須項目のみを入力した際の表示確認を目的としています。',
      deliveryFormat: { mode: 'consult', values: [] },
      publicity: 'ok',
      deadlineDate: { type: 'negotiable' }
    }
  },
  {
    id: 103,
    title: '自社ECサイトの商品撮影（アパレル・小物）',
    status: 'selection',
    statusLabel: PROJECT_STATUS_CONFIG.selection.label,
    categoryId: 3,
    categoryLabel: REQUEST_CATEGORIES[3],
    postedDate: '2026/02/15',
    deadline: '2026/02/28',
    applicants: 8,
    newApplicants: 0,
    budgetRangeId: 2,
    budgetRangeLabel: BUDGET_RANGES[2],
    details: {
      usagePurpose: ['ECサイト', 'Instagram投稿用'],
      industry: ['美容・ファッション', '小売・EC'],
      requestType: 'specified',
      background: '自社で運営しているアパレルECサイト「Urban Select」の新商品（春物新作20点）の撮影依頼です。これまで内製で撮影してきましたが、クオリティ向上のためプロの方にお願いしたいと考えています。',
      target: '30代の都会的なライフスタイルを送る男女',
      taste: ['清潔感', 'トレンディ', '明るい'],
      referenceUrls: ['https://example.com/ec-ref'],
      conditions: ['residence', 'nda'],
      deliveryFormat: {
        mode: 'specified',
        values: ['JPG']
      },
      publicity: 'partial',
      requirements: ['proposal'],
      deadlineDate: {
        type: 'date',
        value: '2026/02/28'
      },
      persona: 'アパレルの物撮り経験が豊富な方を募集します。光の当て方や素材感が伝わる撮影が得意な方を重視します。'
    }
  },
  {
    id: 104,
    title: '採用LPのライティング・インタビュー取材',
    status: 'in_progress',
    statusLabel: PROJECT_STATUS_CONFIG.in_progress.label,
    partnerName: '佐藤 ライター',
    categoryId: 5,
    categoryLabel: REQUEST_CATEGORIES[5],
    postedDate: '2026/01/10',
    deadline: '2026/02/25',
    startDate: '2026/01/15',
    progress: 60,
    budgetRangeId: 3,
    budgetRangeLabel: BUDGET_RANGES[3],
    hasUnreadMessage: true,
    details: {
      usagePurpose: ['採用サイト', 'オウンドメディア'],
      industry: ['IT・Webサービス', '教育・学習支援'],
      requestType: 'partner',
      background: '事業拡大に伴い、開発チームの採用を強化しています。メンバーの熱量やエンジニア文化を伝えるため、社員3名のインタビュー記事と、それをまとめた採用LPの制作をお願いしたいです。',
      target: '挑戦志向のある中途エンジニア',
      taste: ['プロフェッショナル', '情熱的', '誠実'],
      conditions: ['nda', 'onlineMeeting'],
      deliveryFormat: {
        mode: 'consult',
        values: []
      },
      publicity: 'ok',
      requirements: ['proposal', 'estimate'],
      deadlineDate: {
        type: 'asap'
      },
      persona: 'エンジニアリングに対する理解があり、インタビューを通じて本質的な魅力を引き出せるライター兼編集者の方。継続的なコミュニケーションが取れる方を希望します。'
    }
  },
  {
    id: 105,
    title: '【終了パターン】市民健康フェスティバルの告知ポスター制作',
    status: 'closed',
    statusLabel: PROJECT_STATUS_CONFIG.closed.label,
    categoryId: 2,
    categoryLabel: REQUEST_CATEGORIES[2],
    postedDate: '2025/11/10',
    deadline: '2025/12/15',
    startDate: '2025/11/20',
    budgetRangeId: 2,
    budgetRangeLabel: BUDGET_RANGES[2],
    details: {
      usagePurpose: ['イベント告知チラシ', 'ポスター'],
      industry: ['エンタメ・メディア', 'その他'],
      requestType: 'specified',
      background: '昨年末に開催された「市民健康フェスティバル」の告知物制作依頼です。現在はプロジェクトは終了しています。',
      target: '近隣住民、ファミリー層',
      taste: ['明るい', 'にぎやか', '分かりやすい'],
      conditions: ['nda'],
      deliveryFormat: {
        mode: 'specified',
        values: ['AI', 'PDF']
      },
      publicity: 'ok',
      deadlineDate: {
        type: 'date',
        value: '2025/12/15'
      }
    }
  },
  {
    id: 201,
    title: 'コーポレートサイトのリニューアル（要件定義〜実装）',
    status: 'selection',
    statusLabel: PROJECT_STATUS_CONFIG.selection.label,
    categoryId: 0,
    categoryLabel: REQUEST_CATEGORIES[0],
    postedDate: '2026/02/10',
    deadline: '2026/03/10',
    applicants: 15,
    newApplicants: 2,
    budgetRangeId: 5,
    budgetRangeLabel: BUDGET_RANGES[5],
    details: {
      usagePurpose: ['WEBサイトのリニューアル'],
      industry: ['IT・Webサービス', 'その他'],
      requestType: 'specified',
      background: '創業10周年を迎え、当社の技術力と信頼性をより明確に伝えるため、コーポレートサイトを全面的にリニューアルします。WordPressでの実装を想定しており、デザインからコーディングまで一貫してお願いしたいです。',
      target: '大手企業の事業担当者、パートナー企業、採用候補者',
      taste: ['信頼感', '先進的', '重厚'],
      referenceUrls: ['https://example.com/it-corp-ref'],
      conditions: ['nda', 'invoiceIssuer', 'onlineMeeting'],
      deliveryFormat: {
        mode: 'specified',
        values: ['HTML・CSS等ファイル', 'Figma / XD']
      },
      publicity: 'ok',
      requirements: ['proposal'],
      deadlineDate: {
        type: 'asap'
      },
      persona: 'BtoB企業のサイト制作実績が豊富な制作会社またはフリーランスの方。SEOの知識やアクセシビリティへの配慮ができる方を求めます。'
    }
  },
  {
    id: 202,
    title: '新卒採用向けパンフレットのデザイン',
    status: 'in_progress',
    statusLabel: PROJECT_STATUS_CONFIG.in_progress.label,
    partnerName: '山田 イラストマン',
    categoryId: 2,
    categoryLabel: REQUEST_CATEGORIES[2],
    postedDate: '2026/01/20',
    deadline: '2026/02/28',
    startDate: '2026/01/25',
    progress: 80,
    budgetRangeId: 3,
    budgetRangeLabel: BUDGET_RANGES[3],
    details: {
      usagePurpose: ['採用パンフレット', '説明会用資料'],
      industry: ['IT・Webサービス', '教育・学習支援'],
      requestType: 'proposal',
      background: '来期の新卒採用活動で使用する会社紹介パンフレットのデザイン制作です。堅苦しい会社案内ではなく、テック企業らしい「遊び心」と「スマートさ」が共存するデザインを希望しています。',
      target: '2026年卒業見込みの大学生・大学院生',
      taste: ['フレッシュ', 'ダイナミック', '遊び心'],
      conditions: ['nda', 'copyrightTransfer'],
      deliveryFormat: {
        mode: 'specified',
        values: ['AI', 'PDF']
      },
      publicity: 'ok',
      requirements: ['proposal'],
      deadlineDate: {
        type: 'date',
        value: '2026/02/28'
      },
      persona: '若年層のトレンドに敏感で、既存の枠にとらわれない自由な発想ができるデザイナーの方。'
    }
  },
  {
    id: 301,
    title: '海外向け製品カタログの翻訳（日→英）',
    status: 'in_progress',
    statusLabel: PROJECT_STATUS_CONFIG.in_progress.label,
    partnerName: 'John Translator',
    categoryId: 9,
    categoryLabel: REQUEST_CATEGORIES[9],
    postedDate: '2026/01/15',
    deadline: '2026/02/20',
    startDate: '2026/01/20',
    progress: 30,
    budgetRangeId: 2,
    budgetRangeLabel: BUDGET_RANGES[2],
    hasUnreadMessage: true,
    details: {
      usagePurpose: ['製品カタログ', 'WEBサイト'],
      industry: ['製造・工業', 'その他'],
      requestType: 'specified',
      background: '主力製品である精密機械の北米市場展開に向け、既存の日本語カタログ（24ページ）の英訳をお願いします。技術用語が多く含まれるため、正確さと海外のエンジニアに伝わりやすい表現が求められます。',
      target: '海外の製造メーカー、現地代理店',
      conditions: ['nda', 'invoiceIssuer'],
      deliveryFormat: {
        mode: 'specified',
        values: ['Word / Excel']
      },
      publicity: 'ng',
      requirements: ['proposal', 'estimate'],
      deadlineDate: {
        type: 'date',
        value: '2026/02/20'
      },
      persona: '機械分野や貿易実務の専門用語に精通している翻訳者。北米でのビジネス経験や工学のバックグラウンドがある方を優遇します。'
    }
  },
  {
    id: 401,
    title: 'YouTube連載動画の編集・テロップ入れ（5分程度）',
    status: 'recruiting',
    statusLabel: PROJECT_STATUS_CONFIG.recruiting.label,
    categoryId: 4,
    categoryLabel: REQUEST_CATEGORIES[4],
    postedDate: '2026/02/21',
    deadline: '2026/03/10',
    applicants: 3,
    newApplicants: 1,
    budgetRangeId: 1,
    budgetRangeLabel: BUDGET_RANGES[1],
    details: {
      usagePurpose: ['SNS投稿用（静止画 / 動画 / UGC）'],
      industry: ['エンタメ・メディア'],
      requestType: 'proposal',
      background: 'ガジェット紹介系のYouTubeチャンネルで、週1回の連載動画の編集をお願いしたいです。素材（15分程度）のお渡しから3日程度での一次納品を希望しています。',
      target: '20代〜30代のガジェット好き男性',
      taste: ['にぎやか', '先進的'],
      conditions: ['nda', 'onlineMeeting'],
      deliveryFormat: { mode: 'specified', values: ['MP4'] },
      publicity: 'ok',
      requirements: ['proposal'],
      deadlineDate: { type: 'date', value: '2026/03/10' },
      persona: 'YouTubeのトレンドを理解しており、視聴維持率を高める編集テクニックをお持ちの方。'
    }
  },
  {
    id: 501,
    title: 'スマホゲーム用キャラクターイラスト制作（進化3段階分）',
    status: 'recruiting',
    statusLabel: PROJECT_STATUS_CONFIG.recruiting.label,
    categoryId: 1,
    categoryLabel: REQUEST_CATEGORIES[1],
    postedDate: '2026/02/18',
    deadline: '2026/03/15',
    applicants: 15,
    newApplicants: 5,
    budgetRangeId: 4,
    budgetRangeLabel: BUDGET_RANGES[4],
    details: {
      usagePurpose: ['Web掲載（LP / コーポレート / EC）'],
      industry: ['エンタメ・メディア'],
      requestType: 'specified',
      background: 'ファンタジーRPGの新規キャラクター（水属性の騎士）の立ち絵イラストをお願いします。ベースの立ち絵に加え、進化後の2パターンの差分制作を含む計3枚の依頼です。',
      target: '全年齢のスマホゲームユーザー',
      taste: ['ダイナミック', '遊び心'],
      conditions: ['nda', 'copyrightTransfer'],
      deliveryFormat: { mode: 'specified', values: ['PSD', 'PNG'] },
      publicity: 'partial',
      requirements: ['proposal', 'estimate'],
      deadlineDate: { type: 'date', value: '2026/03/15' },
      persona: '厚塗り風の重厚なイラストが得意な方。鎧の金属表現などにこだわっていただける方を募集します。'
    }
  },
  {
    id: 601,
    title: '法人向けSaaSのLPコーディング（Next.js / TailwindCSS）',
    status: 'recruiting',
    statusLabel: PROJECT_STATUS_CONFIG.recruiting.label,
    categoryId: 8,
    categoryLabel: REQUEST_CATEGORIES[8],
    postedDate: '2026/02/19',
    deadline: '2026/03/05',
    applicants: 5,
    newApplicants: 2,
    budgetRangeId: 3,
    budgetRangeLabel: BUDGET_RANGES[3],
    details: {
      usagePurpose: ['Web掲載（LP / コーポレート / EC）'],
      industry: ['IT・Webサービス'],
      requestType: 'specified',
      background: '勤怠管理システムのLPリニューアルに伴い、Figmaのデザインデータを元にコーディングをお願いします。Next.js (App Router) を想定しており、SEOおよびパフォーマンスを重視しています。',
      target: '企業の人事担当者、経営者',
      taste: ['信頼感', '洗練'],
      conditions: ['nda', 'onlineMeeting'],
      deliveryFormat: { mode: 'specified', values: ['Gitリポジトリ納品'] },
      publicity: 'ok',
      requirements: ['proposal'],
      deadlineDate: { type: 'date', value: '2026/03/05' },
      persona: '保守性の高いクリーンなコードを書けるエンジニア。デザインの細部まで忠実に再現いただける方を希望します。'
    }
  },
  {
    id: 701,
    title: '企業VP用BGM制作（30秒・1分パターン）',
    status: 'recruiting',
    statusLabel: PROJECT_STATUS_CONFIG.recruiting.label,
    categoryId: 6,
    categoryLabel: REQUEST_CATEGORIES[6],
    postedDate: '2026/02/21',
    deadline: '2026/03/12',
    applicants: 2,
    newApplicants: 2,
    budgetRangeId: 2,
    budgetRangeLabel: BUDGET_RANGES[2],
    details: {
      usagePurpose: ['ブランディング・イメージ映像（コンセプトムービー / 世界観紹介）'],
      industry: ['製造・工業'],
      requestType: 'proposal',
      background: '精密機器メーカーの広報用動画で使用するオリジナル楽曲の制作です。清潔感がありつつ、未来志向なテクノロジーを感じさせるサウンドを求めています。',
      target: 'ステークホルダー、投資家',
      taste: ['洗練', '先進的'],
      conditions: ['nda'],
      deliveryFormat: { mode: 'specified', values: ['WAV'] },
      publicity: 'ok',
      requirements: ['proposal'],
      deadlineDate: { type: 'date', value: '2026/03/12' },
      persona: 'シンセサイザーを活用したアンビエントやテック系の音楽制作が得意な方。'
    }
  },
  {
    id: 801,
    title: '美容室の予約サイトリニューアル（UIデザインから）',
    status: 'recruiting',
    statusLabel: PROJECT_STATUS_CONFIG.recruiting.label,
    categoryId: 0,
    categoryLabel: REQUEST_CATEGORIES[0],
    postedDate: '2026/02/15',
    deadline: '2026/03/20',
    applicants: 4,
    newApplicants: 0,
    budgetRangeId: 4,
    budgetRangeLabel: BUDGET_RANGES[4],
    details: {
      usagePurpose: ['Web掲載（LP / コーポレート / EC）'],
      industry: ['美容・ファッション'],
      requestType: 'partner',
      background: '自由が丘で展開する美容室のオンライン予約システムのUI改善です。既存システム（PHP）のフロントエンド刷新を予定しており、まずは使い勝手の良いUIデザインとプロトタイプ制作をお願いしたいです。',
      target: '20代〜30代の流行に敏感な女性',
      taste: ['ナチュラル', 'プロフェッショナル'],
      conditions: ['nda', 'onlineMeeting'],
      deliveryFormat: { mode: 'specified', values: ['Figma'] },
      publicity: 'ok',
      requirements: ['proposal', 'estimate'],
      deadlineDate: { type: 'date', value: '2026/03/20' },
      persona: '女性向けの繊細なデザインが得意で、ユーザー体験（UX）を論理的に説明できる方。'
    }
  },
  {
    id: 901,
    title: '新商品のパッケージ・ラベルデザイン制作',
    status: 'recruiting',
    statusLabel: PROJECT_STATUS_CONFIG.recruiting.label,
    categoryId: 2,
    categoryLabel: REQUEST_CATEGORIES[2],
    postedDate: '2026/02/20',
    deadline: '2026/03/15',
    applicants: 7,
    newApplicants: 3,
    budgetRangeId: 3,
    budgetRangeLabel: BUDGET_RANGES[3],
    details: {
      usagePurpose: ['パッケージ・ラベル（商品包装 / ボトル / 化粧箱）'],
      industry: ['飲食'],
      requestType: 'proposal',
      background: '地元の農産物（ベリー系）を使用した高級ジャムの瓶ラベルおよび外箱のデザイン依頼です。ギフトとしての側面が強く、贈答品としてふさわしいプレミアム感を求めています。',
      target: '50代以上の富裕層、贈り物ギフトを探している方',
      taste: ['重厚', '洗練'],
      conditions: ['nda', 'copyrightTransfer'],
      deliveryFormat: { mode: 'specified', values: ['AI', 'PDF'] },
      publicity: 'ok',
      requirements: ['proposal'],
      deadlineDate: { type: 'date', value: '2026/03/15' },
      persona: '和洋問わず、高品質な商品パッケージの実績があるデザイナーの方。'
    }
  },
  {
    id: 111,
    title: '技術者コミュニティのイベントレポート代筆',
    status: 'recruiting',
    statusLabel: PROJECT_STATUS_CONFIG.recruiting.label,
    categoryId: 5,
    categoryLabel: REQUEST_CATEGORIES[5],
    postedDate: '2026/02/21',
    deadline: '2026/03/05',
    applicants: 1,
    newApplicants: 1,
    budgetRangeId: 1,
    budgetRangeLabel: BUDGET_RANGES[1],
    details: {
      usagePurpose: ['Web掲載（LP / コーポレート / EC）'],
      industry: ['IT・Webサービス'],
      requestType: 'specified',
      background: '先日開催した開発者カンファレンスの様子を、公式ブログに掲載するためのレポート記事（約3,000文字）にまとめていただきたいです。当日の動画アーカイブおよび各セッションのスライドを共有します。',
      target: 'エンジニア、技術に関心のある学生',
      taste: ['フレッシュ', '誠実'],
      conditions: ['nda'],
      deliveryFormat: { mode: 'specified', values: ['Markdown'] },
      publicity: 'ok',
      requirements: ['proposal'],
      deadlineDate: { type: 'date', value: '2026/03/05' },
      persona: 'IT関連の用語に抵抗がなく、技術的な内容を分かりやすく要約できるライターの方。'
    }
  },
  {
    id: 121,
    title: '建築事例の竣工写真撮影（都内オフィスビル）',
    status: 'recruiting',
    statusLabel: PROJECT_STATUS_CONFIG.recruiting.label,
    categoryId: 3,
    categoryLabel: REQUEST_CATEGORIES[3],
    postedDate: '2026/02/19',
    deadline: '2026/03/15',
    applicants: 2,
    newApplicants: 1,
    budgetRangeId: 3,
    budgetRangeLabel: BUDGET_RANGES[3],
    details: {
      usagePurpose: ['印刷物（ポスター / メニュー / DM / POP）'],
      industry: ['建築・不動産'],
      requestType: 'specified',
      background: '新築オフィスビルの共用部および一部執務エリアの竣工写真撮影です。Webサイトの実績紹介およびパンフレットへの掲載を予定しています。',
      target: 'ビルオーナー、テナント候補、取引先企業',
      taste: ['プロフェッショナル', '清潔感'],
      conditions: ['nda', 'residence'],
      deliveryFormat: { mode: 'specified', values: ['JPG'] },
      publicity: 'ok',
      requirements: ['proposal', 'estimate'],
      deadlineDate: { type: 'date', value: '2026/03/15' },
      persona: '建築・インテリアの撮影実績が豊富で、空間の広がりや質感を美しく切り取れるフォトグラファーの方。'
    }
  }
];

export const PROJECT_DETAILS = ALL_PROJECTS.reduce((acc, project) => {
  if (project.details) {
    acc[project.id] = project.details;
  }
  return acc;
}, {} as Record<number, any>);
