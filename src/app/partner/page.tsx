import Footer from '@components/landing/footer';
import Header from '@components/landing/header';
import IntroductionSection from '@components/landing/partner-sections/introduction-section';
import PartnerSection from '@components/landing/partner-sections/partner-section';
import PartnerTypeSection from '@components/landing/partner-sections/partner-type-section';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const PartnerSignUpModal = dynamic(
  () => import('@components/landing/molecules/partner-signup-modal'),
  { ssr: false },
);
const CompanySignUpModal = dynamic(
  () => import('@components/landing/molecules/company-signup-modal'),
  { ssr: false },
);

export default function IndexPage() {
  return (
    <Suspense>
      <div className="flex flex-col overflow-auto">
        <Header />
        <CompanySignUpModal />
        <PartnerSignUpModal />
        <div className="my-[8px] flex flex-col gap-y-[8px]">
          <IntroductionSection />
          <PartnerTypeSection />
          <PartnerSection />
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}
