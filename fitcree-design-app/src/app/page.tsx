import Image from "next/image";
import Link from "next/link";
import HeaderGuest from "@/components/common/header-guest";

export default function Home() {
  return (
    <>
      <HeaderGuest />
      <main className="min-h-screen w-full py-32 px-6 bg-white">
        <div className="m-auto max-w-3xl">

          <h1 className="max-w-xs text-3xl font-bold leading-10 tracking-tight text-black">
            FitCree Design Project
          </h1>
          <p className="max-w-md text-lg leading-8 text-neutral-800">
            デザイン作成用のプロジェクトです!!!
          </p>

          <div className="mt-12 w-full">
            <h2 className="mb-4 text-xl font-bold text-neutral-800">
              クリエイターモード
            </h2>
            <ul className="flex flex-col gap-3 list-disc pl-5 text-neutral-800">
              <li>
                <Link className="link-blue" href="/creator">
                  クリエイター用トップページ : /creator
                </Link>
              </li>
              <li>
                <Link className="link-blue" href="/projects/101">
                  案件詳細ページサンプル : /projects/101
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-12 w-full">
            <h2 className="mb-4 text-xl font-bold text-neutral-800">
              クライアントモード
            </h2>
            <ul className="flex flex-col gap-3 list-disc pl-5 text-neutral-800">
              <li>
                <Link className="link-blue" href="/client">
                  クライアントトップページ サンプル : /client
                </Link>
                <ul className="mt-2 flex flex-col gap-3 list-disc pl-5 text-neutral-800">
                  <li>
                    <Link className="link-blue" href="/client/client-1">
                      クライアントユーザー 1 : /client/client-1
                    </Link>
                  </li>
                  <li>
                    <Link className="link-blue" href="/client/client-2">
                      クライアントユーザー 2 : /client/client-2
                    </Link>
                  </li>
                  <li>
                    <Link className="link-blue" href="/client/client-3">
                      クライアントユーザー 3 : /client/client-3
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="link-blue" href="/client/post-job">
                  案件投稿フォーム : /client/post-job
                </Link>
              </li>
              <li>
                <Link className="link-blue" href="/client/post-job/specs">
                  案件投稿フォーム 仕様書 (表) : /client/post-job/specs
                </Link>
              </li>
              <li>
                <Link className="link-blue" href="/client/post-job/preview">
                  案件投稿フォーム プレビュー : /client/post-job/preview
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-12 w-full">
            <h2 className="mb-4 text-xl font-bold text-neutral-800">
              検索ページ
            </h2>
            <ul className="flex flex-col gap-3 list-disc pl-5 text-neutral-800">
              <li>
                <Link className="link-blue" href="/search/creators">
                  クリエイター検索 (作成中) : /search/creators
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-8 w-full">
            <h2 className="mb-4 text-xl font-semibold text-neutral-800">
              スタイルガイド
            </h2>
            <p className="text-neutral-500 mt-2">スタイルガイドのページです。</p>
            <ul className="flex flex-col gap-3 list-disc pl-5 text-neutral-800">
              <li>
                <Link className="link-blue" href="/styleguide">
                  スタイルガイド : /styleguide
                </Link>
              </li>
              <li>
                <Link className="link-blue" href="/styleguide/form">
                  フォーム : /styleguide/form
                </Link>
              </li>
              <li>
                <Link className="link-blue" href="/styleguide/form/elements">
                  フォーム要素 : /styleguide/form/elements
                </Link>
              </li>
              <li>
                <Link className="link-blue" href="/styleguide/form/layout">
                  フォームレイアウト : /styleguide/form/layout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
