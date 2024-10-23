import BenefitSection from '@components/landing/enterprise-sections/benefit-section';
import FeatureSection from '@components/landing/enterprise-sections/feature-section';
import IntroductionSection from '@components/landing/enterprise-sections/introduction-section';
import PackageSection from '@components/landing/enterprise-sections/package-section';
import Footer from '@components/landing/footer';
import Header from '@components/landing/header';
const CompanySignUpModal = dynamic(
  () => import('@components/landing/molecules/company-signup-modal'),
  { ssr: false },
);

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export default function IndexPage() {
  return (
    <Suspense>
      <div className="flex flex-col overflow-auto">
        <Header />
        <CompanySignUpModal />
        <div className="my-[8px] flex flex-col gap-y-[8px]">
          <IntroductionSection />
          <BenefitSection />
          <PackageSection />
          <FeatureSection />
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}
