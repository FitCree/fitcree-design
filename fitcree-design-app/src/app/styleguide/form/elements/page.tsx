'use client';

import React, { useState } from 'react';
import * as FormElements from '../../../../components/forms/FormElements';

export default function StyleguidePage() {
  const [text, setText] = useState('');
  const [textArea, setTextArea] = useState('');
  const [checks, setChecks] = useState('');
  const [radio, setRadio] = useState('proposal');
  const [radioList, setRadioList] = useState('option1');
  const [urls, setUrls] = useState(['']);

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-8 pb-32">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-neutral-300 pb-6">
          <h1 className="text-3xl font-extrabold text-neutral-800">FitCree Form Components</h1>
          <p className="text-neutral-500 mt-2">FormElements.tsxの全コンポーネント一覧です。</p>
        </header>

        {/* FormElements Components */}
        <section>

          <div className="space-y-8">
            <div id="tipsbox">
              <h2 className="text-blue-500 text-sm font-bold mb-3">TipsBox</h2>
              <FormElements.TipsBox title="ヒントボックス" content="ここにユーザーへのアドバイスが表示されます。" />
            </div>

            <div id="formsection">
              <h2 className="text-indigo-600 text-sm font-bold mb-3">FormSection</h2>
              <FormElements.FormSection label="フォームセクション（必須）" required helpText="補足説明がここに入ります。">
                <div className="p-6 bg-neutral-100 rounded border border-neutral-300 text-xs text-neutral-500">
                  ここに子要素が表示されます
                </div>
              </FormElements.FormSection>
            </div>

            <div id="textinput">
              <h2 className="text-indigo-600 text-sm font-bold mb-3">TextInput</h2>
              <FormElements.FormSection label="テキスト入力（必須）" required helpText="最大80文字まで入力可能です。">
                <FormElements.TextInput
                  value={text}
                  onChange={setText}
                  placeholder="入力してください..."
                  maxLength={80}
                />
              </FormElements.FormSection>
            </div>

            <div id="textarea">
              <h2 className="text-indigo-600 text-sm font-bold mb-3">TextArea</h2>
              <FormElements.FormSection label="長文入力">
                <FormElements.TextArea
                  value={textArea}
                  onChange={setTextArea}
                  placeholder="詳細を記載してください..."
                  rows={5}
                />
              </FormElements.FormSection>
            </div>

            <div id="checkboxgrid">
              <h2 className="text-indigo-600 text-sm font-bold mb-3">CheckboxGrid (3列)</h2>
              <FormElements.FormSection label="チェックボックスグリッド（3列表示）">
                <FormElements.CheckboxGrid
                  options={['テキスト', 'テキスト', 'テキスト', 'テキスト', 'テキスト', 'テキスト']}
                  selectedValues={checks}
                  cols={3}
                />
              </FormElements.FormSection>
            </div>

            <div>
              <h2 className="text-indigo-600 text-sm font-bold mb-3">CheckboxGrid (4列)</h2>
              <FormElements.FormSection label="チェックボックスグリッド（4列表示）">
                <FormElements.CheckboxGrid
                  options={['テキスト', 'テキスト', 'テキスト', 'テキスト', 'テキスト', 'テキスト', 'テキスト', 'テキスト']}
                  selectedValues={checks}
                  cols={4}
                />
              </FormElements.FormSection>
            </div>

            <div id="radiocard">
              <h2 className="text-indigo-600 text-sm font-bold mb-3">RadioCard</h2>
              <FormElements.FormSection label="ラジオカード（依頼タイプ等）">
                <FormElements.RadioCard
                  selectedValue={radio}
                  onChange={setRadio}
                  options={[
                    { id: 'proposal', label: '提案型', desc: '方向性から相談したい', subDesc: '企画力・ブランド理解重視', icon: '💡' },
                    { id: 'specified', label: '指定型', desc: '要件通りに作りたい', subDesc: '再現性・スピード重視', icon: '🎯' },
                    { id: 'partner', label: '伴走型', desc: '継続的に関わりたい', subDesc: 'コミュ力・継続改善重視', icon: '🤝' },
                  ]}
                />
              </FormElements.FormSection>
            </div>

            <div id="radiolist">
              <h2 className="text-indigo-600 text-sm font-bold mb-3">RadioList</h2>
              <FormElements.FormSection label="ラジオリスト（標準ラジオボタン）">
                <FormElements.RadioList
                  name="radioList"
                  selectedValue={radioList}
                  onChange={setRadioList}
                  options={[
                    { id: 'option1', label: 'オプション1', sub: '説明1' },
                    { id: 'option2', label: 'オプション2', sub: '説明2' },
                    { id: 'option3', label: 'オプション3', sub: '説明3' },
                  ]}
                />
              </FormElements.FormSection>
            </div>

            <div id="urllistinput">
              <h2 className="text-indigo-600 text-sm font-bold mb-3">UrlListInput</h2>
              <FormElements.FormSection label="URLリスト入力">
                <FormElements.UrlListInput urls={urls} onChange={setUrls} />
              </FormElements.FormSection>
            </div>

            <div id="fileuploader">
              <h2 className="text-indigo-600 text-sm font-bold mb-3">FileUploader</h2>
              <FormElements.FormSection label="ファイルアップロード">
                <FormElements.FileUploader />
              </FormElements.FormSection>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}