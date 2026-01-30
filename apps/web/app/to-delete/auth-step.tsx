'use client';

import { useTranslations } from 'next-intl';

export function AuthStep() {
  const t = useTranslations('Landing');

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">
        {t('step8.title')}
      </h3>
      <p className="text-gray-600">
        {t('descriptions.authentication')}
      </p>
    </div>
  );
}
