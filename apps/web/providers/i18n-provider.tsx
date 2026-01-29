import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const I18nProvider = async ({ children }: { children: React.ReactNode }) => {
    const messages = await getMessages();
    return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
};