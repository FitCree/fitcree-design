/**
 * 【FitCree 案件投稿フォーム 仕様書】
 * * 新しい項目を追加したい場合は、以下の fields の中にコピー＆ペーストで増やしてください。
 * type の種類: 'text', 'textarea', 'checkbox-grid', 'card-radio', 'radio-list', 'url-list', 'file'
 */

import { REQUEST_CATEGORIES, INDUSTRIES } from './master-data';

export const JOB_POST_STEPS = [
  {
    id: 1,
    title: '基本情報',
    tips: "「依頼タイプ」や「用途」、「業界」を明確にすることで、得意分野の合うクリエイターからの応募が増え、ミスマッチが減少します。",
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
      { id: 'category', label: '依頼分野', type: 'radio-list', options: REQUEST_CATEGORIES, cols: 3 },
      { id: 'requestType', label: '依頼タイプ', type: 'card-radio', options: [
        { id: 'proposal', label: '提案型', desc: '方向性から相談', icon: '💡' },
        { id: 'specified', label: '指定型', desc: '要件通り', icon: '🎯' },
        { id: 'partner', label: '伴走型', desc: '継続支援', icon: '🤝' }
      ]},
      { 
        id: 'industry', 
        label: '業界', 
        type: 'checkbox-grid', 
        description: '業界特有の知識やレギュレーション理解が必要な場合に、マッチング精度が高まります。',
        options: INDUSTRIES
      }
    ]
  },
  {
    id: 2,
    title: '詳細',
    fields: [
      { id: 'background', label: '依頼背景・目的', type: 'textarea', required: true, placeholder: 'なぜこの制作が必要なのか、想いを記載してください' },
      { id: 'target', label: 'ターゲットユーザー', type: 'text', placeholder: '例：20代の働く女性' },
      { id: 'taste', label: '求めるテイスト', type: 'text', placeholder: '例：#シンプル #高級感' }
    ]
  },
  {
    id: 3,
    title: '条件・制約',
    fields: [
      { id: 'nda', label: 'NDA締結', type: 'toggle', desc: '秘密保持契約の締結を必須とする' },
      { id: 'deliveryFormat', label: '納品形式', type: 'checkbox-grid', options: ['PNG/JPG', 'AI/PSD', 'PDF', 'Figma', 'MP4/MOV', 'HTML/CSS', 'Word/Excel', 'その他'] },
      { id: 'publicity', label: '実績公開', type: 'radio', options: [
        { id: 'ok', label: '公開OK' },
        { id: 'partial', label: '成果物のみOK' },
        { id: 'ng', label: '不可' }
      ]}
    ]
  },
  {
    id: 4,
    title: '予算・日程',
    fields: [
      { id: 'deadlineDate', label: '希望納期', type: 'date' },
      { id: 'budgetRange', label: '予算レンジ', type: 'select', options: ['1万〜3万', '3万〜10万', '10万〜30万', '30万以上'] }
    ]
  },
  {
    id: 5,
    title: '人物像',
    fields: [
      { id: 'persona', label: 'どんなパートナーを求めていますか？', type: 'textarea', placeholder: 'スキルだけでなく人柄やスタンスの希望を記載してください' }
    ]
  },
  {
    id: 6,
    title: '応募条件',
    fields: [
      { id: 'requirements', label: '応募時に提出してほしいもの', type: 'checkbox-grid', options: ['提案文', 'ラフ案', '見積もり', 'SNS/HP'] }
    ]
  }
];