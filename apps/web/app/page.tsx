'use client';
import { Button } from '@repo/ui/button/button';
import { trpc } from '@web/libs/trpc-client';
import { useState } from 'react';
import { Step1Content } from './components/step-1-content';
import { OtherStepsContent } from './components/other-steps-content';

export default function Home() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [activeSubStep, setActiveSubStep] = useState<1 | 2>(1);
  const [activeSubStep3, setActiveSubStep3] = useState<1 | 2>(1);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2">Turbo Nest Template Trpc Next</h1>
          <p className="text-gray-600">Monorepo moderne avec NestJS, tRPC, Next.js et TypeScript</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Features Navigation */}
        <div className="flex gap-2 mb-12 overflow-x-auto pb-4">
          {[
            { num: 1, emoji: '🛡️', label: 'Fullstack type safety' },
            { num: 2, emoji: '📦', label: 'Partager des ressources' },
            { num: 3, emoji: '📚', label: 'Storybook' },
            { num: 4, emoji: '🔐', label: 'Env typés et validés' },
          ].map((step) => (
            <button
              key={step.num}
              onClick={() => {
                setActiveStep(step.num as 1 | 2 | 3 | 4);
                if (step.num === 1) setActiveSubStep(1);
              }}
              className={`px-6 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeStep === step.num
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {step.emoji} {step.label}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {activeStep === 1 && '🛡️ Fullstack type safety'}
              {activeStep === 2 && '📦 Partagez vos ressources'}
              {activeStep === 3 && '📚 Storybook'}
              {activeStep === 4 && '🔐 Variables d\'environnement typées et validées'}
            </h2>
            <p className="text-gray-600 mb-6">
              {activeStep === 1 && 'Créez un endpoint NestJS et appelez-le côté front avec une sécurité de types complète.'}
              {activeStep === 2 && 'Créez un composant React simple et partagez-le entre vos apps.'}
              {activeStep === 3 && 'Créez vos stories et développez vos composants en isolation.'}
              {activeStep === 4 && 'Variables d\'environnement typées et validées au démarrage.'}
            </p>
          </div>

          {activeStep === 1 ? (
            <Step1Content />
          ) : (
            <OtherStepsContent
              activeStep={activeStep}
              activeSubStep3={activeSubStep3}
              onSubStep3Change={setActiveSubStep3}
            />
          )}
        </div>
      </div>
    </div>
  );
}
