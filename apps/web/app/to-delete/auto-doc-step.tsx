'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function AutoDocStep() {
  const t = useTranslations('Landing.step7');

  return (
    <div className="space-y-6">
      <p className="text-gray-600">{t('description')}</p>
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-lg">
        <Image
          src="/auto-doc.png"
          alt={t('screenshotAlt')}
          width={1200}
          height={800}
          className="w-full h-auto"
          priority={false}
        />
      </div>
    </div>
  );
}
