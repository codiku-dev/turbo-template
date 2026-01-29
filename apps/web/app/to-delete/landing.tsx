'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TypeSafetyStep } from './type-safety-step';
import { ShareResourcesStep } from './share-resources-step';
import { StorybookStep } from './storybook-step';
import { EnvStep } from './env-step';
import { InternationalizationStep } from './internationalization-step';
import { AuthStep } from './auth-step';
import { AutoDocStep } from './auto-doc-step';

export default function Home() {
    const t = useTranslations('Landing');
    const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <div className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-xl tracking-tight">TT</span>
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-12 border-l-transparent border-t-12 border-t-indigo-400 rounded-tl-lg"></div>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-1">
                                TenTen
                            </h1>
                            <p className="text-sm text-gray-500 font-medium">{t('templateSubtitle')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Features grid – all visible at a glance */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
                    {[
                        { num: 1, emoji: '🛡️', label: t('steps.fullstackTypeSafety') },
                        { num: 2, emoji: '📦', label: t('steps.shareResources') },
                        { num: 3, emoji: '📚', label: t('steps.storybook') },
                        { num: 4, emoji: '🔐', label: t('steps.typedEnv') },
                        { num: 5, emoji: '🌍', label: t('steps.internationalisation') },
                        { num: 6, emoji: '🔑', label: t('steps.authBetterAuth') },
                        { num: 7, emoji: '📄', label: t('steps.autoDoc') },
                    ].map((step) => {
                        const isActive = activeStep === step.num;
                        return (
                            <button
                                key={step.num}
                                type="button"
                                onClick={() => setActiveStep(step.num as 1 | 2 | 3 | 4 | 5 | 6 | 7)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all
                                    ${isActive
                                        ? 'bg-gray-900 text-white shadow-md ring-2 ring-gray-900 ring-offset-2'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }
                                `}
                            >
                                <span className="text-2xl shrink-0" aria-hidden>{step.emoji}</span>
                                <span className="text-sm font-medium leading-tight">{step.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Step Content */}
                <div className="space-y-6">
                    <div className="min-h-[100px]">
                        <h2 className="text-2xl font-bold mb-2">
                            {activeStep === 1 && `🛡️ ${t('step1.title')}`}
                            {activeStep === 2 && `📦 ${t('step2.title')}`}
                            {activeStep === 3 && `📚 ${t('step3.title')}`}
                            {activeStep === 4 && `🔐 ${t('step4.title')}`}
                            {activeStep === 5 && `🌍 ${t('step5.title')}`}
                            {activeStep === 6 && `🔑 ${t('step6.title')}`}
                            {activeStep === 7 && `📄 ${t('step7.title')}`}
                        </h2>
                        <p className="text-gray-600">
                            {activeStep === 1 && t('descriptions.fullstackTypeSafety')}
                            {activeStep === 2 && t('descriptions.shareResources')}
                            {activeStep === 3 && t('descriptions.storybook')}
                            {activeStep === 4 && t('descriptions.typedEnv')}
                            {activeStep === 5 && t('descriptions.internationalisation')}
                            {activeStep === 6 && t('descriptions.authBetterAuth')}
                            {activeStep === 7 && t('descriptions.autoDoc')}
                        </p>
                    </div>

                    <div className="min-h-[400px] transition-all duration-300">
                        {activeStep === 1 && <TypeSafetyStep />}
                        {activeStep === 2 && <ShareResourcesStep />}
                        {activeStep === 3 && <StorybookStep />}
                        {activeStep === 4 && <EnvStep />}
                        {activeStep === 5 && <InternationalizationStep />}
                        {activeStep === 6 && <AuthStep />}
                        {activeStep === 7 && <AutoDocStep />}
                    </div>
                </div>
            </div>
        </div>
    );
}
