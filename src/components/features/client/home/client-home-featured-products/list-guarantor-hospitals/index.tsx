import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { useState } from 'react';
import { CloseIconLargeSvg } from '../../../../../../icons';
import ListGuarantorHospitalDetailSchema from './list-guarantor-hospitals-detial-schema';

const ListGuarantorHospitals = ({ insuranceData }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { t } = useHTranslation('common');

  return (
    <div>
      <HButton onClick={() => setVisible(!visible)} type="ghost" block>
        {t('View list guarantor hospital', {
          vn: 'Xem danh sách bệnh viện bảo lãnh',
        })}
      </HButton>
      <HModal
        {...{
          visible: visible,
          onCancel: () => setVisible(false),
          maskClosable: false,
          footer: () => <span></span>,
          title: t('List guarantor hospital', {
            vn: 'Danh sách bệnh viện bảo lãnh',
          }),
          width: 375,
          className: 'list-guarantor-hospital',
          closeIcon: (
            <CloseIconLargeSvg className="list-guarantor-hospital__close-icon" />
          ),
        }}
      >
        <ListGuarantorHospitalDetailSchema insuranceData={insuranceData} />
      </HModal>
    </div>
  );
};

export default ListGuarantorHospitals;
