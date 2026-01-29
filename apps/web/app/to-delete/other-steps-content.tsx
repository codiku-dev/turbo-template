'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

type OtherStepsContentProps = {
  activeStep: 2 | 3 | 4;
  activeSubStep3: 1 | 2;
  onSubStep3Change: (step: 1 | 2) => void;
};

export function OtherStepsContent(p: OtherStepsContentProps) {
  const t2 = useTranslations('Landing.step2');
  const t3 = useTranslations('Landing.step3');
  const t4 = useTranslations('Landing.step4');
  if (p.activeStep === 2) {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        {/* UI Package side */}
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 ml-2">packages/ui/src/button/button.tsx</span>
            </div>
            <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">{t2('uiPackageSide')}</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed text-gray-300">
              <code>
                <span className="text-purple-400">export function</span>{' '}
                <span className="text-yellow-400">Button</span>
                <span className="text-gray-300">() {'{'}</span>{'\n'}
                <span className="text-purple-400">  return</span>{' '}
                <span className="text-gray-300">(</span>{'\n'}
                <span className="text-gray-300">    {'<'}</span>
                <span className="text-pink-400">button</span>{' '}
                <span className="text-blue-400">className</span>
                <span className="text-gray-300">=</span>
                <span className="text-green-400">"bg-red-500"</span>
                <span className="text-gray-300">{'>'}</span>{'\n'}
                <span className="text-gray-300">      Button</span>{'\n'}
                <span className="text-gray-300">    {'</'}</span>
                <span className="text-pink-400">button</span>
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
              <span className="text-xs text-gray-400 ml-2">apps/web/app/page.tsx</span>
            </div>
            <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">{t2('nextjsSide')}</span>
          </div>
          <div className="p-4">
            <pre className="text-xs font-mono leading-relaxed text-gray-300">
              <code>
                <span className="text-gray-500">import</span>{' '}
                <span className="text-blue-400">{'{'} Button {'}'}</span>{' '}
                <span className="text-gray-500">from</span>{' '}
                <span className="text-green-400">'@repo/ui/button/button'</span>
                <span className="text-gray-300">;</span>{'\n\n'}
                <span className="text-purple-400">export default function</span>{' '}
                <span className="text-yellow-400">Page</span>
                <span className="text-gray-300">() {'{'}</span>{'\n'}
                <span className="text-purple-400">  return</span>{' '}
                <span className="text-gray-300">(</span>{'\n'}
                <span className="text-gray-300">    {'<'}</span>
                <span className="text-pink-400">Button</span>
                <span className="text-gray-300">{'>'}Mon bouton</span>
                <span className="text-gray-300">{'</'}</span>
                <span className="text-pink-400">Button</span>
                <span className="text-gray-300">{'>'}</span>{'\n'}
                <span className="text-gray-300">  );</span>{'\n'}
                <span className="text-gray-300">{'}'}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    )
  }

  if (p.activeStep === 3) {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        {/* UI Package side */}
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 ml-2">packages/ui/src/button/button.stories.tsx</span>
            </div>
            <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">{t3('uiPackageSide')}</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed text-gray-300">
              <code>
                <span className="text-gray-500">import type</span>{' '}
                <span className="text-blue-400">{'{'} Meta, StoryObj {'}'}</span>{' '}
                <span className="text-gray-500">from</span>{' '}
                <span className="text-green-400">'@storybook/react'</span>
                <span className="text-gray-300">;</span>{'\n'}
                <span className="text-gray-500">import</span>{' '}
                <span className="text-blue-400">{'{'} Button {'}'}</span>{' '}
                <span className="text-gray-500">from</span>{' '}
                <span className="text-green-400">'./button'</span>
                <span className="text-gray-300">;</span>{'\n\n'}
                <span className="text-purple-400">const</span>{' '}
                <span className="text-blue-400">meta</span>
                <span className="text-gray-300">: </span>
                <span className="text-blue-400">Meta</span>
                <span className="text-gray-300">&lt;</span>
                <span className="text-blue-400">typeof</span>{' '}
                <span className="text-yellow-400">Button</span>
                <span className="text-gray-300">&gt; = </span>
                <span className="text-gray-300">{'{'}</span>
                <span className="text-gray-300">{'\n'}</span>
                <span className="text-gray-300">  </span>
                <span className="text-blue-400">title</span>
                <span className="text-gray-300">: </span>
                <span className="text-green-400">'UI/Button'</span>
                <span className="text-gray-300">,</span>{'\n'}
                <span className="text-gray-300">  </span>
                <span className="text-blue-400">component</span>
                <span className="text-gray-300">: </span>
                <span className="text-yellow-400">Button</span>
                <span className="text-gray-300">,</span>{'\n'}
                <span className="text-gray-300">{'}'}</span>
                <span className="text-gray-300">;</span>{'\n\n'}
                <span className="text-purple-400">export default</span>{' '}
                <span className="text-blue-400">meta</span>
                <span className="text-gray-300">;</span>
              </code>
            </pre>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-800 shadow-lg bg-gray-900">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <span className="text-xs text-gray-400">Storybook</span>
          </div>
          <div className="p-0">
            <Image
              src="/sb.png"
              alt="Storybook screenshot"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    );
  }
  if (p.activeStep === 4) {
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
              <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">{t4('typeSafety')}</span>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed text-gray-300">
                <code>
                  <span className="text-gray-500">// ✨ Autocomplétion complète</span>{'\n'}
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">dbUrl</span>{' '}
                  <span className="text-purple-400">=</span>{' '}
                  <span className="text-blue-400">process</span>
                  <span className="text-gray-300">.</span>
                  <span className="text-blue-400">env</span>
                  <span className="text-gray-300">.</span>
                  <span className="text-yellow-400">DATABASE_URL</span>
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
                    <span className="text-green-400">DATABASE_URL</span>
                    <span className="text-gray-500">=</span>
                    <span className="text-yellow-400">postgresql://...</span>
                    {'\n'}
                    <span className="text-green-400">PORT</span>
                    <span className="text-gray-500">=</span>
                    <span className="text-yellow-400">3090</span>
                    {'\n'}
                    <span className="text-gray-500"># BETTER_AUTH_SECRET manquant</span>
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
                  <span className="text-xs text-gray-400 ml-2">Terminal</span>
                </div>
                <span className="text-xs font-semibold text-white bg-indigo-600 px-3 py-1.5 rounded shadow-sm">{t3('result')}</span>
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
                    <span className="text-red-400">  ❌ apps/api: Missing env variable : BETTER_AUTH_SECRET</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
