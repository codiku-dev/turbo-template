'use client';

import { useTranslations } from 'next-intl';
import { trpc } from '@web/libs/trpc-client';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error != null && 'message' in error) return String((error as { message: unknown }).message);
  return String(error);
}

function isAuthError(error: unknown): boolean {
  const msg = getErrorMessage(error).toLowerCase();
  return msg.includes('unauthorized') || msg.includes('unauthenticated') || msg.includes('401');
}

export function ApiProtetionStep() {
  const t = useTranslations('Landing.step6');

  const publicQuery = trpc.app.hello.useQuery(undefined, { enabled: false });
  const protectedQuery = trpc.app.protectedHello.useQuery(undefined, { enabled: false });

  const publicErrorText = publicQuery.error != null
    ? (isAuthError(publicQuery.error) ? t('unauthorized') : getErrorMessage(publicQuery.error))
    : null;
  const protectedErrorText = protectedQuery.error != null
    ? (isAuthError(protectedQuery.error) ? t('unauthorized') : getErrorMessage(protectedQuery.error))
    : null;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-gray-400 ml-2">apps/api/src/app.router.ts</span>
            </div>
            <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">
              {t('backendSide')}
            </span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed text-gray-300">
              <code>

                {'\n\n'}
                <span className="text-purple-400">@AuthRouter</span>
                <span className="text-gray-300">({' {'} alias: </span>
                <span className="text-blue-400">'app'</span>
                <span className="text-gray-300"> {'}'})</span>
                <span className="ml-4 text-green-400 border-2 p-1 border-green-400" > {'// Protect the entire router'}</span>
                {'\n'}
                <span className="text-gray-500">export class</span>{' '}
                <span className="text-gray-500">AppRouter</span>
                <span className="text-gray-500"> {'{'}</span>
                {'\n'}
                <span className="text-gray-500">  </span>
                <span className="text-gray-500">@Query</span>
                <span className="text-gray-500">(...)</span>
                {'\n'}
                <span className="text-gray-300">  </span>
                <span className="text-purple-400">@Public</span>
                <span className="text-gray-300">()</span>
                <span className="ml-4 text-green-400 border-2 p-1 border-green-400" > {'// Public route'}</span>
                {'\n'}
                <span className="text-gray-300">  </span>
                <span className="text-purple-400">async</span>{' '}
                <span className="text-yellow-400">hello</span>
                <span className="text-gray-300">() {'{'} ... {'}'}</span>
                {'\n\n'}
                <span className="text-gray-300">  </span>
                <span className="text-purple-400">@Query</span>
                <span className="text-gray-300">(...)</span>
                <span className="ml-4 text-green-400 border-2 p-1 border-green-400" > {'// Private route'}</span>
                {'\n'}
                <span className="text-gray-300">  </span>
                <span className="text-purple-400">async</span>{' '}
                <span className="text-yellow-400">protectedHello</span>
                <span className="text-gray-300">(</span>
                <span className="text-purple-400">@Session</span>
                <span className="text-gray-300">() session: </span>
                <span className="text-blue-400">UserSession</span>

                <span className="text-gray-300">) {'{'} ... {'}'}</span>

                {'\n'}
                <span className="text-gray-300">{'}'}</span>
              </code>
            </pre>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-xs font-medium text-gray-300">{t('publicFetch')}</span>
            </div>
            <div className="p-6 bg-white">
              <button
                type="button"
                onClick={() => publicQuery.refetch()}
                disabled={publicQuery.isFetching}
                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors text-sm font-medium"
              >
                {publicQuery.isFetching ? t('loading') : t('fetchPublic')}
              </button>
              <div className="min-h-[80px]">
                {publicQuery.data != null && (
                  <pre className="text-xs font-mono bg-green-50 text-green-800 p-4 rounded border border-green-200 overflow-x-auto">
                    {JSON.stringify(publicQuery.data, null, 2)}
                  </pre>
                )}
                {publicErrorText != null && (
                  <pre className="text-xs font-mono bg-red-50 text-red-800 p-4 rounded border border-red-200 overflow-x-auto">
                    {publicErrorText}
                  </pre>
                )}
                {!publicQuery.data && !publicQuery.error && !publicQuery.isFetching && (
                  <p className="text-gray-500 text-sm">{t('clickToFetch')}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-xs font-medium text-gray-300">{t('protectedFetch')}</span>
            </div>
            <div className="p-6 bg-white">
              <button
                type="button"
                onClick={() => protectedQuery.refetch()}
                disabled={protectedQuery.isFetching}
                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors text-sm font-medium"
              >
                {protectedQuery.isFetching ? t('loading') : t('fetchProtected')}
              </button>
              <div className="min-h-[80px]">
                {protectedQuery.data != null && (
                  <pre className="text-xs font-mono bg-green-50 text-green-800 p-4 rounded border border-green-200 overflow-x-auto">
                    {JSON.stringify(protectedQuery.data, null, 2)}
                  </pre>
                )}
                {protectedErrorText != null && (
                  <pre className="text-xs font-mono bg-red-50 text-red-800 p-4 rounded border border-red-200 overflow-x-auto">
                    {protectedErrorText}
                  </pre>
                )}
                {!protectedQuery.data && !protectedQuery.error && !protectedQuery.isFetching && (
                  <p className="text-gray-500 text-sm">{t('clickToFetch')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
