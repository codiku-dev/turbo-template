'use client';

import { useTranslations } from 'next-intl';

export function I18nExample() {
  const t = useTranslations('I18nExample');

  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">{t('title')}</h3>
      <p className="text-gray-600">{t('description')}</p>
    </div>
  );
}
