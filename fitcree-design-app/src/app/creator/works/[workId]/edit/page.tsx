'use client';

import { useParams } from 'next/navigation';
import { MOCK_WORK_DETAILS } from '@/data/mock-work-details';
import WebEditForm from '@/components/creator/edit/WebEditForm';
import VideoEditForm from '@/components/creator/edit/VideoEditForm';

export default function EditWorkPage() {
  const params = useParams();
  const workId = params.workId as string;
  const work = MOCK_WORK_DETAILS[workId];

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">作品が見つかりません</p>
      </div>
    );
  }

  // カテゴリに応じた編集フォームを返す
  // 新しい分野を追加する場合はここにケースを追加し、対応する XxxEditForm を作成する
  switch (work.category) {
    case 'video':
      return <VideoEditForm workId={workId} work={work} />;
    case 'web':
    default:
      return <WebEditForm workId={workId} work={work} />;
  }
}
