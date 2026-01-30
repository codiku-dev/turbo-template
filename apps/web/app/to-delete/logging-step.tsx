'use client';

import { useTranslations } from 'next-intl';

export function LoggingStep() {
  const t = useTranslations('Landing.step9');

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-gray-400 ml-2">apps/api/src/features/users/users.router.ts</span>
          </div>
          <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">
            {t('codeLabel')}
          </span>
        </div>
        <div className="p-6 overflow-x-auto">
          <pre className="text-sm font-mono leading-relaxed text-gray-300">
            <code>
              <span className="text-purple-400">@AuthRouter</span>
              <span className="text-gray-300">({' {'} alias: </span>
              <span className="text-blue-400">'users, </span>
              <span className="border-2 border-green-400 p-1">
                <span className="text-gray-300"> logs: </span>
                <span className="text-amber-400">true</span>
              </span>
              <span className="text-gray-300"> {'}'})</span>
              {'\n'}
              <span className="text-gray-300">export class</span>
              <span className="text-gray-300"> UserRouter </span>
              <span className="text-gray-300">{'{'}</span>
              {'\n'}
              <span className="text-gray-300">  </span>
              <span className="text-gray-300">@Query</span>
              <span className="text-gray-300">(...)</span>
              {'\n'}
              <span className="text-gray-300">  </span>
              <span className="text-gray-300">async</span>
              <span className="text-gray-300"> read</span>
              <span className="text-gray-300">(...) {'{'} ... {'}'}</span>
              {'\n'}
              <span className="text-gray-300">{'}'}</span>
            </code>
          </pre>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-gray-400 ml-2">api:dev</span>
          </div>
          <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">
            {t('terminalLabel')}
          </span>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-xs font-mono leading-relaxed text-gray-300 whitespace-pre">
            <code>
              <span className="text-gray-400">────────────────────────────────────────────────────────</span>
              {'\n  '}
              <span className="text-gray-200">URL</span>
              {'\n'}
              <span className="text-gray-400">────────────────────────────────────────────────</span>
              {'\n  '}
              <span className="text-cyan-300">http://localhost:3090/trpc/users.read</span>
              {'\n\n  '}
              <span className="text-gray-200">META</span>
              {'\n'}
              <span className="text-gray-400">────────────────────────────────────────────────</span>
              {'\n  '}
              <span className="text-gray-500">path       </span>
              <span className="text-gray-300">users.read</span>
              {'\n  '}
              <span className="text-gray-500">type       </span>
              <span className="text-gray-300">query</span>
              {'\n  '}
              <span className="text-gray-500">duration   </span>
              <span className="text-gray-300">40 ms</span>
              {'\n\n  '}
              <span className="text-red-400">RESPONSE (error)</span>
              {'\n'}
              <span className="text-gray-400">────────────────────────────────────────────────</span>
              {'\n  '}
              <span className="text-gray-300">{'{'}</span>
              {'\n    '}
              <span className="text-gray-500">"cause"</span>
              <span className="text-gray-300">: {'{'}</span>
              {'\n      '}
              <span className="text-gray-500">"message"</span>
              <span className="text-gray-300">: </span>
              <span className="text-yellow-300">"User with ID 1 not found"</span>
              <span className="text-gray-300">,</span>
              {'\n      '}
              <span className="text-gray-500">"name"</span>
              <span className="text-gray-300">: </span>
              <span className="text-yellow-300">"NotFoundException"</span>
              {'\n    '}
              <span className="text-gray-300">{'}'},</span>
              {'\n    '}
              <span className="text-gray-500">"code"</span>
              <span className="text-gray-300">: </span>
              <span className="text-yellow-300">"INTERNAL_SERVER_ERROR"</span>
              <span className="text-gray-300">,</span>
              {'\n    '}
              <span className="text-gray-500">"name"</span>
              <span className="text-gray-300">: </span>
              <span className="text-yellow-300">"TRPCError"</span>
              {'\n  '}
              <span className="text-gray-300">{'}'}</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
