import Footer from '@components/landing/footer';
import Header from '@components/landing/header';
import FeatureSection from '@components/landing/home-sections/feature-section';
import InformationSection from '@components/landing/home-sections/information-section';
import IntroductionSection from '@components/landing/home-sections/introduction-section';
const CompanySignUpModal = dynamic(
  () => import('@components/landing/molecules/company-signup-modal'),
  { ssr: false },
);

import PartnerSection from '@components/landing/home-sections/partner-section';
import { NavigateToResource } from '@refinedev/nextjs-router';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export default function IndexPage() {
  return (
    <Suspense>
      <NavigateToResource />
      <div className="flex flex-col overflow-auto">
        <Header />
        <CompanySignUpModal />
        <div className="my-[8px] flex flex-col gap-y-[8px]">
          <IntroductionSection />
          <InformationSection />
          <FeatureSection />
          <PartnerSection />
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}
