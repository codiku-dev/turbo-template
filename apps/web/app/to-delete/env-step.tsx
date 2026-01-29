'use client';

import { useTranslations } from 'next-intl';

export function EnvStep() {
  const t4 = useTranslations('Landing.step4');

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">{t4('typedEnv')}</h3>
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 ml-2">apps/api/src/main.ts</span>
            </div>
            <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">{t4('typedEnvBadge')}</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed text-gray-300">
              <code>
                <span className="text-gray-500">// ✨ {t4('typedVarLabel')}</span>{'\n'}
                <span className="text-purple-400">const</span>{' '}
                <span className="text-blue-400">dbUrl</span>{' '}
                <span className="text-purple-400">=</span>{' '}
                <span className="text-blue-400">process</span>
                <span className="text-gray-300">.</span>
                <span className="text-blue-400">env</span>
                <span className="text-gray-300">.</span>
                <span className="text-yellow-400 underline decoration-red-500 decoration-wavy decoration-2">PATABASE_URL</span>
                <span className="text-gray-300">;</span>
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">{t4('validationTitle')}</h3>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">.env.local.development</span>
              </div>
              <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">{t4('envFile')}</span>
            </div>
            <div className="p-4">
              <pre className="text-xs font-mono text-gray-300 leading-relaxed">
                <code>
                  <span className="text-green-400">PATABASE_URL</span>
                  <span className="text-gray-500">=</span>
                  <span className="text-yellow-400">postgresql://...</span>
                  {'\n'}
                  <span className="text-green-400">PORT</span>
                  <span className="text-gray-500">=</span>
                  <span className="text-yellow-400">3090</span>
                  {'\n'}
                  <span className="text-gray-500">#AUTH_SECRET {t4('missing')}</span>
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
                <span className="text-xs text-gray-400 ml-2">{t4('terminal')}</span>
              </div>
              <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">{t4('result')}</span>
            </div>
            <div className="p-4">
              <pre className="text-xs font-mono text-gray-300 leading-relaxed">
                <code>
                  <span className="text-red-400">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
                  {'\n'}
                  <span className="text-white">🔍 Validating environment variables</span>
                  {'\n'}
                  <span className="text-red-400">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
                  {'\n\n'}
                  <span className="text-red-400">  ❌ apps/api: Missing env variable : AUTH_SECRET</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
