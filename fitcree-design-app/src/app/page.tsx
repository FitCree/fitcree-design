import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            FitCree Design
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            デザイン作成用のプロジェクトです!!!
          </p>

          <div className="mt-12 w-full">
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
              クライアントページ
            </h2>
            <ul className="flex flex-col gap-3 list-disc">
              <li>
                <Link
                  href="/client/post-job"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  案件投稿フォーム : /client/post-job
                </Link>
              </li>
              <li>
                <Link
                  href="/client/post-job/specs"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  案件投稿フォーム 仕様書 (表) : /client/post-job/specs
                </Link>
              </li>
              <li>
                <Link
                  href="/client/post-job/preview"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  案件投稿フォーム プレビュー : /client/post-job/preview
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-8 w-full">
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
              スタイルガイドページ
            </h2>
            <ul className="flex flex-col gap-3 list-disc">
              <li>
                <Link
                  href="/styleguide"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  スタイルガイド : /styleguide
                </Link>
              </li>
              <li>
                <Link
                  href="/styleguide/form"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  フォーム : /styleguide/form
                </Link>
              </li>
              <li>
                <Link
                  href="/styleguide/form/elements"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  フォーム要素 : /styleguide/form/elements
                </Link>
              </li>
              <li>
                <Link
                  href="/styleguide/form/layout"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  フォームレイアウト : /styleguide/form/layout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
