'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
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
        <div className="p-6 bg-white h-full">
          <div className="mb-4 flex justify-end">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}



export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLocale = (newLocale: string) => {
    // Set cookie côté client
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setIsOpen(false);
    // Refresh pour que le serveur Next.js lise le nouveau cookie
    router.refresh();
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
      >
        <span>{languages.find(l => l.code === locale)?.label || locale}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLocale(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${locale === lang.code ? 'bg-indigo-50 text-indigo-600 font-semibold' : ''
                }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
