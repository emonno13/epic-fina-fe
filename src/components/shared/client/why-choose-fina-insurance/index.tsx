import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import ClientWhyChooseFinaInsuranceContent from './why-choose-fina-insurance.content';

import './why-choose-fin-insurance.module.scss';

const ClientWhyChooseFinaInsurance = () => {
  const { t } = useHTranslation('common');
  const isMobile = useIsMobile();
  return (
    <div className="client-why-choose-fina-insurance">
      <div className="max-w-1100 m-auto">
        <h3 className="client-why-choose-fina-insurance__title">
          {t('client_why_choose_fina_insurance_title', {
            vn: 'Vì sao nên lựa chọn bảo hiểm tại FINA',
            en: 'Why choose insurance at FINA',
          })}
        </h3>
        <ClientWhyChooseFinaInsuranceContent />
      </div>
    </div>
  );
};

export default ClientWhyChooseFinaInsurance;
