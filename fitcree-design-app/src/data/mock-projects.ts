import { ProjectDetails } from './mock-data';

export const PROJECT_DETAILS: Record<number, ProjectDetails> = {
  101: {
    usagePurpose: ['ロゴ', 'ショップカード', 'SNS用アイコン'],
    industry: ['飲食・レストラン', 'オーガニック・健康'],
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
  },
  102: {
    usagePurpose: ['WEB広告バナー'],
    industry: ['IT・システム'],
    requestType: 'specified',
    background: '新しいサービスのリリースに伴い、広告用のWebバナー制作をお願いしたいです。必須項目のみを入力した際の表示確認を目的としています。',
    deliveryFormat: { mode: 'consult', values: [] },
    publicity: 'ok',
    deadlineDate: { type: 'negotiable' }
  },
  103: {
    usagePurpose: ['ECサイト', 'Instagram投稿用'],
    industry: ['アパレル・ファッション', '小売・EC'],
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
  },
  104: {
    usagePurpose: ['採用サイト', 'オウンドメディア'],
    industry: ['IT・ソフトウェア', '人材・教育'],
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
  },
  201: {
    usagePurpose: ['WEBサイトのリニューアル'],
    industry: ['IT・ソフトウェア', 'コンサルタント・専門職'],
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
    requirements: ['proposal', 'estimate'],
    deadlineDate: {
      type: 'date',
      value: '2026/03/10'
    },
    persona: 'BtoB企業のサイト制作実績が豊富な制作会社またはフリーランスの方。SEOの知識やアクセシビリティへの配慮ができる方を求めます。'
  },
  202: {
    usagePurpose: ['採用パンフレット', '説明会用資料'],
    industry: ['IT・ソフトウェア', '人材・教育'],
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
  },
  301: {
    usagePurpose: ['製品カタログ', 'WEBサイト'],
    industry: ['貿易・物流', 'メーカー・製造'],
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
  },
  105: {
    usagePurpose: ['イベント告知チラシ', 'ポスター'],
    industry: ['イベント・興行', '地方自治体'],
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
};
