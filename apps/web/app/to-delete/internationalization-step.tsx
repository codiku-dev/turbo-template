'use client';

import { I18nExample } from './internationalization/i18n-example';
import { LanguageSwitcher } from './internationalization/language-switcher';
import { useTranslations } from 'next-intl';

export function InternationalizationStep() {
  const t = useTranslations('Landing.step5');

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-400 ml-2">apps/web/app/components/my-component.tsx</span>
          </div>
          <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">{t('code')}</span>
        </div>
        <div className="p-6 overflow-x-auto">
          <pre className="text-sm font-mono leading-relaxed text-gray-300">
            <code>
              <span className="text-gray-500">'use client'</span>
              <span className="text-gray-300">;</span>{'\n'}
              <span className="text-gray-500">import</span>{' '}
              <span className="text-blue-400">{'{'} useTranslations {'}'}</span>{' '}
              <span className="text-gray-500">from</span>{' '}
              <span className="text-green-400">'next-intl'</span>
              <span className="text-gray-300">;</span>{'\n\n'}
              <span className="text-purple-400">export function</span>{' '}
              <span className="text-yellow-400">MyComponent</span>
              <span className="text-gray-300">() {'{'}</span>{'\n'}
              <span className="text-gray-300">  </span>
              <span className="text-purple-400">const</span>{' '}
              <span className="text-blue-400">t</span>{' '}
              <span className="text-purple-400">=</span>{' '}
              <span className="text-yellow-400">useTranslations</span>
              <span className="text-gray-300">(</span>
              <span className="text-green-400">'I18nExample'</span>
              <span className="text-gray-300">);</span>{'\n\n'}
              <span className="text-purple-400">  return</span>{' '}
              <span className="text-gray-300">(</span>{'\n'}
              <span className="text-gray-300">    {'<'}</span>
              <span className="text-pink-400">div</span>
              <span className="text-gray-300">{'>'}</span>{'\n'}
              <span className="text-gray-300">      {'<'}</span>
              <span className="text-pink-400">h1</span>
              <span className="text-gray-300">{'>'}</span>
              <span className="text-gray-300">{'{'}t(</span>
              <span className="text-green-400">'title'</span>
              <span className="text-gray-300">){'}'}</span>
              <span className="text-gray-300">{'</'}</span>
              <span className="text-pink-400">h1</span>
              <span className="text-gray-300">{'>'}</span>{'\n'}
              <span className="text-gray-300">    {'</'}</span>
              <span className="text-pink-400">div</span>
              <span className="text-gray-300">{'>'}</span>{'\n'}
              <span className="text-gray-300">  );</span>{'\n'}
              <span className="text-gray-300">{'}'}</span>
            </code>
          </pre>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-400 ml-2">Résultat</span>
          </div>
          <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">{t('result')}</span>
        </div>
        <div className="p-6 bg-white">
          <div className="mb-4 flex justify-end">
            <LanguageSwitcher />
          </div>
          <I18nExample />
        </div>
      </div>
    </div>
  );
}
