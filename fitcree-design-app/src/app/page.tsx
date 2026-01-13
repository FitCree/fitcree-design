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
            <ul className="flex flex-col gap-3">
              <li>
                <Link 
                  href="/client/post-job" 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  /client/post-job
                </Link>
              </li>
              <li>
                <Link 
                  href="/client/post-job/preview" 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  /client/post-job/preview
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-8 w-full">
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
              スタイルガイドページ
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link 
                  href="/styleguide" 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  /styleguide
                </Link>
              </li>
              <li>
                <Link 
                  href="/styleguide/form" 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  /styleguide/form
                </Link>
              </li>
              <li>
                <Link 
                  href="/styleguide/form/elements" 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  /styleguide/form/elements
                </Link>
              </li>
              <li>
                <Link 
                  href="/styleguide/form/layout" 
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  /styleguide/form/layout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
