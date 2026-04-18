// ワークスペース用モックデータ
// 相談(consultation)と応募(application)を統合した「仕事総合スペース」のデータ定義

export interface WorkspaceParticipant {
  id: string;
  name: string;
  avatarUrl: string;
  role: 'creator' | 'client';
}

export interface WorkspaceRoom {
  id: string;
  type: 'consultation' | 'application';
  title: string;
  clientName: string;
  clientCompany?: string;
  clientAvatarUrl: string;
  // 案件応募の場合
  projectId?: number;
  projectStatus?: string;
  categoryLabel?: string;
  // 相談の場合
  consultationId?: string;
  portfolioTitle?: string;
  // チャット共通
  status: 'active' | 'negotiating' | 'completed';
  agreedBudget?: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageAt: string;
  participants: WorkspaceParticipant[];
  // 応募・対応メッセージと見積もり
  applicationMessage?: string;
  applicationQuotes?: { item: string; price: number }[];
}

export interface WorkspaceMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderAvatarUrl: string;
  senderRole: 'creator' | 'client';
  content: string;
  timestamp: string;
  displayTime: string;
}

const CREATOR_ID = 'creator-1';
const CREATOR_NAME = '山田 イラストマン';
const CREATOR_AVATAR = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack';

export const WORKSPACE_ROOMS: WorkspaceRoom[] = [
  {
    id: 'room-1',
    type: 'consultation',
    consultationId: 'consult-4',
    title: '会社案内パンフレットのデザイン',
    clientName: '田中 太郎',
    clientCompany: '株式会社サンプルデザイン',
    clientAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    portfolioTitle: '海のフード「Baktes」のコーポレートサイトデザイン',
    status: 'active',
    agreedBudget: '80,000円',
    unreadCount: 2,
    lastMessage: 'では来週の月曜日はいかがでしょうか？',
    lastMessageAt: '14:32',
    participants: [
      { id: CREATOR_ID, name: CREATOR_NAME, avatarUrl: CREATOR_AVATAR, role: 'creator' },
      {
        id: 'client-1',
        name: '田中 太郎',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        role: 'client',
      },
    ],
    applicationMessage:
      '田中様、ご相談いただきありがとうございます。\n\nBaktesのサイトデザインを気に入っていただき、大変嬉しいです。会社案内パンフレット（A4・8ページ）の件、喜んでお手伝いさせてください。\n\n既存のコーポレートカラーに合わせながら、親しみやすさと信頼感を兼ね備えたデザインをご提案いたします。',
    applicationQuotes: [
      { item: 'パンフレットデザイン（A4・8P）', price: 60000 },
      { item: '修正対応（2回まで込み）', price: 15000 },
      { item: '印刷用データ入稿', price: 5000 },
    ],
  },
  {
    id: 'room-2',
    type: 'application',
    projectId: 104,
    title: 'ブランドロゴ＆VI制作（スタートアップ向け）',
    clientName: '渡辺 健太',
    clientCompany: '株式会社Bloom Tech',
    clientAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Blossom',
    categoryLabel: 'グラフィック',
    projectStatus: 'in_progress',
    status: 'active',
    agreedBudget: '150,000円',
    unreadCount: 0,
    lastMessage: 'ラフ案ありがとうございます！方向性はとても良いと思います。',
    lastMessageAt: '昨日',
    participants: [
      { id: CREATOR_ID, name: CREATOR_NAME, avatarUrl: CREATOR_AVATAR, role: 'creator' },
      {
        id: 'client-4',
        name: '渡辺 健太',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Blossom',
        role: 'client',
      },
    ],
    applicationMessage:
      'スタートアップのブランドロゴ＆VI制作の募集を拝見し、応募させていただきます。\n\nこれまでにITスタートアップや飲食店のVI制作を多数手がけており、ブランドの「らしさ」を大切にしたデザインが得意です。今回のプロジェクトにとても興味を持っております。',
    applicationQuotes: [
      { item: 'ロゴデザイン（3案提案）', price: 80000 },
      { item: 'VIガイドライン制作', price: 50000 },
      { item: '各種展開データ作成', price: 20000 },
    ],
  },
  {
    id: 'room-3',
    type: 'consultation',
    consultationId: 'consult-3',
    title: 'フラワーアレンジメントの撮影をお願いしたい',
    clientName: '佐々木 花子',
    clientCompany: 'フラワーデザインスタジオ',
    clientAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daisy',
    portfolioTitle: '夏休みの秋保大滝を撮影｜宮城県',
    status: 'negotiating',
    agreedBudget: undefined,
    unreadCount: 1,
    lastMessage: 'スタジオの場所と日程について確認させてください。',
    lastMessageAt: '2日前',
    participants: [
      { id: CREATOR_ID, name: CREATOR_NAME, avatarUrl: CREATOR_AVATAR, role: 'creator' },
      {
        id: 'client-3',
        name: '佐々木 花子',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daisy',
        role: 'client',
      },
    ],
    applicationMessage:
      '佐々木様、ご相談いただきありがとうございます。\n\nフラワーアレンジメントの撮影、ぜひお手伝いしたいと思います。花の繊細な色やテクスチャーを活かした撮影を得意としており、素材の美しさを最大限に引き出せるよう努めます。',
    applicationQuotes: [
      { item: '撮影費（半日・スタジオ撮影）', price: 40000 },
      { item: 'レタッチ・セレクト', price: 15000 },
      { item: 'データ納品（RAW+JPG）', price: 5000 },
    ],
  },
  {
    id: 'room-4',
    type: 'application',
    projectId: 105,
    title: 'ECサイト用商品ページバナー制作',
    clientName: '高橋 めぐみ',
    clientCompany: 'ナチュラルビューティ合同会社',
    clientAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Megu',
    categoryLabel: 'グラフィック',
    projectStatus: 'completed',
    status: 'completed',
    agreedBudget: '60,000円',
    unreadCount: 0,
    lastMessage: '納品物受領しました。ありがとうございました！',
    lastMessageAt: '1週間前',
    participants: [
      { id: CREATOR_ID, name: CREATOR_NAME, avatarUrl: CREATOR_AVATAR, role: 'creator' },
      {
        id: 'client-5',
        name: '高橋 めぐみ',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Megu',
        role: 'client',
      },
    ],
  },
];

export const WORKSPACE_MESSAGES: WorkspaceMessage[] = [
  // room-1: 会社案内パンフレット
  {
    id: 'msg-1-1',
    roomId: 'room-1',
    senderId: 'client-1',
    senderName: '田中 太郎',
    senderAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    senderRole: 'client',
    content: '山田さん、ご承諾いただきありがとうございます！会社案内パンフレットの件、よろしくお願いします。',
    timestamp: '2026-02-21T09:00:00',
    displayTime: '2026/02/21 09:00',
  },
  {
    id: 'msg-1-2',
    roomId: 'room-1',
    senderId: CREATOR_ID,
    senderName: CREATOR_NAME,
    senderAvatarUrl: CREATOR_AVATAR,
    senderRole: 'creator',
    content: 'こちらこそよろしくお願いします！まずは現在使用しているコーポレートカラーや既存の資料があれば共有いただけますか？',
    timestamp: '2026-02-21T09:45:00',
    displayTime: '2026/02/21 09:45',
  },
  {
    id: 'msg-1-3',
    roomId: 'room-1',
    senderId: 'client-1',
    senderName: '田中 太郎',
    senderAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    senderRole: 'client',
    content: 'はい、添付で送りますね。カラーはメインがネイビーで、アクセントにゴールドを使っています。',
    timestamp: '2026-02-21T10:15:00',
    displayTime: '2026/02/21 10:15',
  },
  {
    id: 'msg-1-4',
    roomId: 'room-1',
    senderId: CREATOR_ID,
    senderName: CREATOR_NAME,
    senderAvatarUrl: CREATOR_AVATAR,
    senderRole: 'creator',
    content: '資料ありがとうございます！確認しました。信頼感と格調を大切にしたデザインになりそうですね。ラフ案を3パターン、来週中にご提示できます。',
    timestamp: '2026-02-21T14:00:00',
    displayTime: '2026/02/21 14:00',
  },
  {
    id: 'msg-1-5',
    roomId: 'room-1',
    senderId: 'client-1',
    senderName: '田中 太郎',
    senderAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    senderRole: 'client',
    content: 'では来週の月曜日はいかがでしょうか？',
    timestamp: '2026-02-21T14:32:00',
    displayTime: '今日 14:32',
  },

  // room-2: ブランドロゴ
  {
    id: 'msg-2-1',
    roomId: 'room-2',
    senderId: 'client-4',
    senderName: '渡辺 健太',
    senderAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Blossom',
    senderRole: 'client',
    content: '山田さん、採用のご連絡です！ぜひよろしくお願いします。まずはキックオフのお打ち合わせをオンラインで設定させていただけますか？',
    timestamp: '2026-03-01T10:00:00',
    displayTime: '2026/03/01 10:00',
  },
  {
    id: 'msg-2-2',
    roomId: 'room-2',
    senderId: CREATOR_ID,
    senderName: CREATOR_NAME,
    senderAvatarUrl: CREATOR_AVATAR,
    senderRole: 'creator',
    content: 'ありがとうございます！ぜひよろしくお願いします。今週木曜日の15時〜17時はいかがでしょうか？',
    timestamp: '2026-03-01T10:30:00',
    displayTime: '2026/03/01 10:30',
  },
  {
    id: 'msg-2-3',
    roomId: 'room-2',
    senderId: 'client-4',
    senderName: '渡辺 健太',
    senderAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Blossom',
    senderRole: 'client',
    content: '木曜15時、OKです！Meetのリンクをあとで送ります。',
    timestamp: '2026-03-01T11:00:00',
    displayTime: '2026/03/01 11:00',
  },
  {
    id: 'msg-2-4',
    roomId: 'room-2',
    senderId: CREATOR_ID,
    senderName: CREATOR_NAME,
    senderAvatarUrl: CREATOR_AVATAR,
    senderRole: 'creator',
    content: 'お打ち合わせありがとうございました！ヒアリング内容をもとにラフ案を作成します。2〜3日でお送りできると思います。',
    timestamp: '2026-03-06T17:00:00',
    displayTime: '2026/03/06 17:00',
  },
  {
    id: 'msg-2-5',
    roomId: 'room-2',
    senderId: CREATOR_ID,
    senderName: CREATOR_NAME,
    senderAvatarUrl: CREATOR_AVATAR,
    senderRole: 'creator',
    content: 'ラフ案3パターンを送付しました。それぞれコンセプトを記載しておりますので、ご確認ください。',
    timestamp: '2026-03-09T13:00:00',
    displayTime: '2026/03/09 13:00',
  },
  {
    id: 'msg-2-6',
    roomId: 'room-2',
    senderId: 'client-4',
    senderName: '渡辺 健太',
    senderAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Blossom',
    senderRole: 'client',
    content: 'ラフ案ありがとうございます！方向性はとても良いと思います。Bパターンの色味をもう少し明るくしたバージョンも見てみたいです。',
    timestamp: '2026-03-09T16:00:00',
    displayTime: '昨日 16:00',
  },

  // room-3: フラワー撮影
  {
    id: 'msg-3-1',
    roomId: 'room-3',
    senderId: 'client-3',
    senderName: '佐々木 花子',
    senderAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daisy',
    senderRole: 'client',
    content: 'お問い合わせへのご返信ありがとうございます。ぜひお願いしたいと思います！撮影日程についてご相談させてください。',
    timestamp: '2026-03-12T10:00:00',
    displayTime: '2026/03/12 10:00',
  },
  {
    id: 'msg-3-2',
    roomId: 'room-3',
    senderId: CREATOR_ID,
    senderName: CREATOR_NAME,
    senderAvatarUrl: CREATOR_AVATAR,
    senderRole: 'creator',
    content: 'ご連絡ありがとうございます！3月下旬〜4月上旬でしたら対応できます。スタジオの場所はどちらになりますか？',
    timestamp: '2026-03-12T11:00:00',
    displayTime: '2026/03/12 11:00',
  },
  {
    id: 'msg-3-3',
    roomId: 'room-3',
    senderId: 'client-3',
    senderName: '佐々木 花子',
    senderAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daisy',
    senderRole: 'client',
    content: 'スタジオの場所と日程について確認させてください。場所は渋谷区内で、4月5日（土）はご都合いかがでしょうか？',
    timestamp: '2026-03-14T15:00:00',
    displayTime: '2日前 15:00',
  },

  // room-4: EC バナー（完了）
  {
    id: 'msg-4-1',
    roomId: 'room-4',
    senderId: 'client-5',
    senderName: '高橋 めぐみ',
    senderAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Megu',
    senderRole: 'client',
    content: '山田さん、バナーの最終データを受け取りました。クオリティが高く、とても満足しています。',
    timestamp: '2026-03-10T14:00:00',
    displayTime: '2026/03/10 14:00',
  },
  {
    id: 'msg-4-2',
    roomId: 'room-4',
    senderId: CREATOR_ID,
    senderName: CREATOR_NAME,
    senderAvatarUrl: CREATOR_AVATAR,
    senderRole: 'creator',
    content: 'ありがとうございます！喜んでいただけて嬉しいです。また機会があればぜひご依頼ください。',
    timestamp: '2026-03-10T15:00:00',
    displayTime: '2026/03/10 15:00',
  },
  {
    id: 'msg-4-3',
    roomId: 'room-4',
    senderId: 'client-5',
    senderName: '高橋 めぐみ',
    senderAvatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Megu',
    senderRole: 'client',
    content: '納品物受領しました。ありがとうございました！',
    timestamp: '2026-03-11T09:00:00',
    displayTime: '1週間前 09:00',
  },
];

export function getMessagesForRoom(roomId: string): WorkspaceMessage[] {
  return WORKSPACE_MESSAGES.filter((m) => m.roomId === roomId);
}
