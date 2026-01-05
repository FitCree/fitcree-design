'use client';

import Link from 'next/link';

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-8 pb-32">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-neutral-300 pb-6">
          <h1 className="text-3xl font-extrabold text-neutral-800">FitCree Form Components</h1>
          <p className="text-neutral-500 mt-2">フォーム関連のコンポーネントスタイルガイドです。</p>
        </header>

        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-sm border border-neutral-300 p-6">
            <h2 className="text-xl font-bold text-neutral-800 mb-3">Form Elements</h2>
            <p className="text-neutral-600 mb-4">
              FormElements.tsx の全コンポーネント一覧です。以下のフォーム要素を確認できます：
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 mb-4 ml-4">
              <li>
                <Link href="/styleguide/form/elements#tipsbox" className="text-blue-600 hover:text-blue-700 hover:underline">
                  TipsBox
                </Link>
              </li>
              <li>
                <Link href="/styleguide/form/elements#formsection" className="text-blue-600 hover:text-blue-700 hover:underline">
                  FormSection
                </Link>
              </li>
              <li>
                <Link href="/styleguide/form/elements#textinput" className="text-blue-600 hover:text-blue-700 hover:underline">
                  TextInput
                </Link>
              </li>
              <li>
                <Link href="/styleguide/form/elements#textarea" className="text-blue-600 hover:text-blue-700 hover:underline">
                  TextArea
                </Link>
              </li>
              <li>
                <Link href="/styleguide/form/elements#checkboxgrid" className="text-blue-600 hover:text-blue-700 hover:underline">
                  CheckboxGrid
                </Link>
              </li>
              <li>
                <Link href="/styleguide/form/elements#radiocard" className="text-blue-600 hover:text-blue-700 hover:underline">
                  RadioCard
                </Link>
              </li>
              <li>
                <Link href="/styleguide/form/elements#radiolist" className="text-blue-600 hover:text-blue-700 hover:underline">
                  RadioList
                </Link>
              </li>
              <li>
                <Link href="/styleguide/form/elements#urllistinput" className="text-blue-600 hover:text-blue-700 hover:underline">
                  UrlListInput
                </Link>
              </li>
              <li>
                <Link href="/styleguide/form/elements#fileuploader" className="text-blue-600 hover:text-blue-700 hover:underline">
                  FileUploader
                </Link>
              </li>
            </ul>
            <Link 
              href="/styleguide/form/elements" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              すべて見る →
            </Link>
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-neutral-300 p-6">
            <h2 className="text-xl font-bold text-neutral-800 mb-3">Form Layout</h2>
            <p className="text-neutral-600 mb-4">
              FormLayout.tsx の全コンポーネント一覧です。以下のレイアウトコンポーネントを確認できます：
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-600 mb-4 ml-4">
              <li>
                <Link href="/styleguide/form/layout#formstepper" className="text-blue-600 hover:text-blue-700 hover:underline">
                  FormStepper
                </Link>
              </li>
              <li>
                <Link href="/styleguide/form/layout#formheader" className="text-blue-600 hover:text-blue-700 hover:underline">
                  FormHeader
                </Link>
              </li>
              <li>
                <Link href="/styleguide/form/layout#formfooter" className="text-blue-600 hover:text-blue-700 hover:underline">
                  FormFooter
                </Link>
              </li>
            </ul>
            <Link 
              href="/styleguide/form/layout" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              すべて見る →
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}