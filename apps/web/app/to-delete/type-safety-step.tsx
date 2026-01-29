'use client';

import { useTranslations } from 'next-intl';
import { trpc } from '@web/libs/trpc-client';

export function TypeSafetyStep() {
  const t = useTranslations('Landing.step1');

  const { data, isLoading, refetch } = trpc.app.hello.useQuery();



  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 ml-2">apps/api/src/features/users/users.router.ts</span>
            </div>
            <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">{t('backendSide')}</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed text-gray-300">
              <code>
                <span className="text-gray-500">import</span>{' '}
                <span className="text-blue-400">{'{'} Query, Router {'}'}</span>{' '}
                <span className="text-gray-500">from</span>{' '}
                <span className="text-green-400">'nestjs-trpc'</span>
                <span className="text-gray-300">;</span>{'\n'}
                <span className="text-gray-500">import</span>{' '}
                <span className="text-blue-400">{'{'} z {'}'}</span>{' '}
                <span className="text-gray-500">from</span>{' '}
                <span className="text-green-400">'zod'</span>
                <span className="text-gray-300">;</span>{'\n\n'}
                <span className="text-purple-400">@Router</span>
                <span className="text-gray-300">({' '}</span>
                <span className="text-blue-400">alias</span>
                <span className="text-gray-300">: </span>
                <span className="text-green-400">'users'</span>
                <span className="text-gray-300">{'}'})</span>{'\n'}
                <span className="text-purple-400">export class</span>{' '}
                <span className="text-yellow-400">UserRouter</span>{' '}
                <span className="text-gray-300">{'{'}</span>{'\n'}
                <span className="text-gray-300">  </span>
                <span className="text-purple-400">@Query</span>
                <span className="text-gray-300">({'{'}</span>{'\n'}
                <span className="text-gray-300">    </span>
                <span className="text-blue-400">output</span>
                <span className="text-gray-300">: </span>
                <span className="text-blue-400">z</span>
                <span className="text-gray-300">.</span>
                <span className="text-yellow-400">array</span>
                <span className="text-gray-300">(</span>
                <span className="text-blue-400">usersSchema</span>
                <span className="text-gray-300">),</span>{'\n'}
                <span className="text-gray-300">  {'}'})</span>{'\n'}
                <span className="text-purple-400">  readAll</span>
                <span className="text-gray-300">() {'{'}</span>{'\n'}
                <span className="text-purple-400">    return</span>{' '}
                <span className="text-blue-400">this</span>
                <span className="text-gray-300">.</span>
                <span className="text-yellow-400">usersService</span>
                <span className="text-gray-300">.</span>
                <span className="text-yellow-400">findAll</span>
                <span className="text-gray-300">();</span>{'\n'}
                <span className="text-gray-300">  {'}'}</span>{'\n'}
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
              <span className="text-xs text-gray-400 ml-2">apps/web/app/page.tsx</span>
            </div>
            <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">{t('frontendSide')}</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed text-gray-300">
              <code>
                <span className="text-gray-500">'use client'</span>
                <span className="text-gray-300">;</span>{'\n'}
                <span className="text-gray-500">import</span>{' '}
                <span className="text-blue-400">{'{'} trpc {'}'}</span>{' '}
                <span className="text-gray-500">from</span>{' '}
                <span className="text-green-400">'@web/libs/trpc-client'</span>
                <span className="text-gray-300">;</span>{'\n\n'}
                <span className="text-purple-400">export default function</span>{' '}
                <span className="text-yellow-400">MyPage</span>
                <span className="text-gray-300">() {'{'}</span>{'\n'}
                <span className="text-gray-300">  </span>
                <span className="text-gray-500">// ✨ Autocomplétion complète</span>{'\n'}
                <span className="text-gray-300">  </span>
                <span className="text-purple-400">const</span>{' '}
                <span className="text-blue-400">{'{'} data, isLoading {'}'}</span>{' '}
                <span className="text-purple-400">=</span>{' '}
                <span className="text-blue-400">trpc</span>
                <span className="text-gray-300">.</span>
                <span className="text-yellow-400">users</span>
                <span className="text-gray-300">.</span>
                <span className="text-yellow-400">readAll</span>
                <span className="text-gray-300">.</span>
                <span className="text-yellow-400">useQuery</span>
                <span className="text-gray-300">();</span>{'\n\n'}
                <span className="text-purple-400">  return</span>{' '}
                <span className="text-gray-300">(</span>{'\n'}
                <span className="text-gray-300">    {'<'}</span>
                <span className="text-pink-400">div</span>
                <span className="text-gray-300">{'>'}</span>{'\n'}
                <span className="text-gray-300">      {'{'}isLoading ? </span>
                <span className="text-green-400">'Loading...'</span>
                <span className="text-gray-300"> : </span>
                <span className="text-blue-400">JSON</span>
                <span className="text-gray-300">.</span>
                <span className="text-yellow-400">stringify</span>
                <span className="text-gray-300">(data){'}'}</span>{'\n'}
                <span className="text-gray-300">    {'</'}</span>
                <span className="text-pink-400">div</span>
                <span className="text-gray-300">{'>'}</span>{'\n'}
                <span className="text-gray-300">  );</span>{'\n'}
                <span className="text-gray-300">{'}'}</span>
              </code>
            </pre>
          </div>
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
            <span className="text-xs text-gray-400 ml-2">Demo</span>
          </div>
          <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">Résultat</span>
        </div>
        <div className="p-6 bg-white">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Loading...' : 'Fetch Users'}
          </button>
          <div className="mt-4">
            {isLoading ? (
              <p className="text-gray-600">Loading...</p>
            ) : data ? (
              <pre className="text-xs font-mono bg-gray-50 p-4 rounded border border-gray-200 overflow-x-auto">
                <code>{JSON.stringify(data, null, 2)}</code>
              </pre>
            ) : (
              <p className="text-gray-500 text-sm">Click the button to fetch users</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
