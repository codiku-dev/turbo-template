'use client';
import { I18nProvider } from './i18n-provider';
import { ReactQueryProvider } from './react-query-provider';
import { TrpcProvider } from './trpc-provider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <TrpcProvider>
            <ReactQueryProvider>
                <I18nProvider>
                    {children}
                </I18nProvider>
            </ReactQueryProvider>
        </TrpcProvider>
    );
};
