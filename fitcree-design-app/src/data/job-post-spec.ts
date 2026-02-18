/**
 * 【FitCree 案件投稿フォーム 仕様書】
 * * 新しい項目を追加したい場合は、以下の fields の中にコピー＆ペーストで増やしてください。
 * type の種類: 'text', 'textarea', 'checkbox-grid', 'card-radio', 'radio-list', 'url-list', 'file'
 */

import { REQUEST_CATEGORIES, INDUSTRIES, USAGE_PURPOSES, BUDGET_RANGES } from './master-data';

export const JOB_POST_STEPS = [
  {
    id: 1,
    title: '基本情報',
    tips: "「用途」や「業界」、「依頼タイプ」を明確にすることで、得意分野の合うクリエイターからの応募が増え、ミスマッチが減少します。",
    fields: [
      {
        id: 'title',
        label: '案件タイトル',
        type: 'text',
        required: true,
        maxLength: 80,
        examples: [
          '【30代女性向け】新規オーガニックカフェのLPデザイン・コーディング依頼',
          '飲食店向け予約システムの改修の依頼',
          '新規ブランド立ち上げに伴うロゴデザイン作成'
        ]
      },
      {
        id: 'category',
        label: '依頼分野',
        type: 'radio-list',
        required: true,
        description: '作成してほしい分野を選択してください',
        options: REQUEST_CATEGORIES,
        cols: 3
      },
      {
        id: 'usagePurpose',
        label: '作成物の用途',
        type: 'checkbox-grid',
        required: true,
        description: '完成物の用途を選択してください（「依頼分野」に応じて選択肢が変わります）',
        categoryBasedOptions: USAGE_PURPOSES,
        dependsOn: 'category',
        cols: 2
      },
      {
        id: 'industry',
        label: '作成物の業界',
        type: 'checkbox-grid',
        required: true,
        description: '業界特有の知識やレギュレーション理解が必要な場合に、マッチング精度が高まります',
        options: INDUSTRIES,
        cols: 3
      },
      {
        id: 'requestType',
        label: '依頼タイプ',
        type: 'card-radio',
        required: true,
        description: '現在の想定でお選びください（契約後の変更・相談も可能です。迷った場合は「提案型」をお選びください）',
        options: [
          { id: 'proposal', label: '提案型', desc: '「何を作るか」から相談・提案してほしい', icon: '💡', recommend: '方向性が曖昧 / プロのアイデアが欲しい' },
          { id: 'specified', label: '指定型', desc: '決まった仕様通りに、正確に作ってほしい', icon: '🎯', recommend: '仕様・デザインが確定済 / スピード重視' },
          { id: 'partner', label: '伴走型', desc: '継続的に関わり、一緒に改善してほしい', icon: '🤝', recommend: 'SNS運用 / サイト保守 / ブランド育成' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: '詳細',
    tips: "「背景・目的」を詳しく書いたり、イメージに近い参考資料を添付することで、クリエイターとの認識ズレを防ぎ、質の高い提案が集まりやすくなります。",
    fields: [
      {
        id: 'background',
        label: '依頼背景・目的',
        type: 'textarea',
        required: true,
        maxLength: 1000,
        placeholder: '（例）\n▼背景\n来月、表参道に新規オープンするカフェのWEBサイト制作をお願いしたいです。現在はInstagramのみで告知していますが、メニュー詳細や予約機能を持つ公式サイトが必要です。\n\n▼目的\n・ブランドイメージの確立\n・Webからの予約獲得（月50件目標）\n・Instagramからの動線強化'
      },
      { id: 'target', label: 'ターゲットユーザー', type: 'text', placeholder: '例：20代の働く女性' },
      { id: 'taste', label: '求めるテイスト（タグ）', type: 'tag-input', placeholder: 'ハッシュタグを追加する', maxTags: 10 },
      { id: 'referenceUrls', label: '参考サイト等のURL (3つまで)', type: 'reference-url-input', maxUrls: 3 },
      { id: 'referenceFiles', label: '参考資料・添付ファイル', type: 'reference-file-uploader' }
    ]
  },
  {
    id: 3,
    title: '条件・制約',
    tips: "NDA（秘密保持契約）や権利関係、インボイス対応など、契約前に確認しておきたい条件を明示することで、プロ意識の高いクリエイターと安心して取引できます。",
    fields: [
      {
        id: 'conditions',
        label: '必須条件・制約',
        type: 'checkbox-grid',
        cols: 2,
        options: [
          { id: 'nda', title: 'NDA（秘密保持契約）の締結必須', description: '未公開情報や個人情報を含む場合' },
          { id: 'residence', title: '居住地・対面指定あり', description: '撮影や打ち合わせで現地に来れる方' },
          { id: 'invoiceIssuer', title: '適格請求書（インボイス）発行事業者', description: 'インボイス登録済みの方に限定する場合' },
          { id: 'copyrightTransfer', title: '著作権の譲渡・利用許諾', description: '納品時に成果物の権利譲渡が必要な場合' },
          { id: 'onlineMeeting', title: 'オンライン会議（顔出し）可能', description: 'ビデオ通話での打ち合わせが必要な場合' }
        ]
      },
      {
        id: 'deliveryFormat',
        label: '納品形式',
        type: 'conditional-checkbox-grid',
        required: true,
        defaultMode: 'consult',
        modeOptions: [
          { id: 'consult', label: '相談して決める (推奨)' },
          { id: 'specified', label: '形式を指定する' }
        ],
        checkboxHelpText: '必要な形式をすべて選択してください',
        options: ['JPG / PNG', 'AI / PSD', 'Figma / XD', 'HTML・CSS等ファイル', 'PDF / ドキュメント', 'Word / Excel', 'MP4 / MOV', 'その他・相談'],
        cols: 3
      },
      {
        id: 'publicity',
        label: '実績公開',
        type: 'radio',
        required: true,
        options: [
          { id: 'ok', label: '公開OK', description: '案件内容や成果物をすべて公開してもよい' },
          { id: 'partial', label: '成果物など一部OK', description: '社名非公開など、範囲は相談して決定します' },
          { id: 'ng', label: '不可', description: '完全非公開でお願いしたい' }
        ]
      },
      {
        id: 'requirements',
        label: 'クリエイターによる応募時に追加で提出してほしいもの',
        type: 'checkbox-grid',
        description: 'クリエイターのポートフォリオや詳細は自動で添付され、応募と共に通知されます。\nチェックを入れた項目は、クリエイターが応募する際の必須入力項目になります。\n（ラフ案などを必須にすると、応募数が減る可能性があります）',
        cols: 2,
        options: [
          { id: 'proposal', title: '提案メッセージ', description: '案件へのアプローチや意気込みなど' },
          { id: 'rough', title: 'ラフ案・構成案', description: '具体的な完成イメージ（※応募ハードルが上がります）' },
          { id: 'estimate', title: '概算見積もり', description: '作業工程ごとの金額感や内訳' }
        ]
      }
    ]
  },
  {
    id: 4,
    title: '予算・日程',
    tips: "余裕を持った納期設定や相場に見合った予算は、成果物の品質向上に直結します。迷う場合は「相談して決める」を選び、プロの意見を聞くのも有効です。",
    fields: [
      {
        id: 'deadlineDate',
        label: '希望納期',
        type: 'conditional-date',
        required: true,
        helpText: '※無理のないスケジュール設定をおすすめします',
        options: [
          { id: 'date', label: '日付を指定', icon: 'Calendar' },
          { id: 'asap', label: 'なるべく早く (急募)', icon: 'Zap' },
          { id: 'negotiable', label: '契約後に相談', icon: 'MessageCircle' }
        ],
        defaultType: 'date',
        dateInputId: 'date' // 日付入力を表示する選択肢のID
      },
      {
        id: 'budgetRange',
        label: '予算レンジ',
        type: 'select',
        required: true,
        options: BUDGET_RANGES
      },
      {
        id: 'contractType',
        label: '契約タイプ',
        type: 'radio-list',
        description: '現在は「単発」のみ可能です。今後のアップデートで「継続」や「時給」の契約タイプの追加を予定しています',
        options: ['単発'],
        cols: 3
      }
    ]
  },
  {
    id: 5,
    title: '人物像',
    tips: "スキルだけでなく、「連絡の頻度」や「フィードバックへの姿勢」など、あなたが重視する価値観やスタンスを書くと、長く付き合えるパートナーと出会いやすくなります。",
    fields: [
      {
        id: 'persona',
        label: 'どんなパートナーを求めていますか？',
        type: 'textarea',
        description: 'スキルだけでなく、スタンスや人柄についても書くとマッチング精度が上がります。',
        placeholder: '（例）\n・レスポンスが早く、細かい修正にも柔軟に対応いただける方\n・こちらの意図を汲み取り、プラスアルファの提案をしてくれる方\n・ポートフォリオに飲食店の実績がある方'
      }
    ]
  }
];