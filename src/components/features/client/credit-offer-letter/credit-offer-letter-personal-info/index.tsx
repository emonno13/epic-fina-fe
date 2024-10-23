import { ConverterUtils } from '@lib/converter';
import { useClientDocumentDetail } from '@schema-form/client-features/hooks/client-feature-hook';
import { useMemo } from 'react';

import './credit-offer-letter-personal-info.module.scss';

const CreditOfferLetterPersonalInfo = () => {
  const taskData = useClientDocumentDetail();
  const { assignee } = taskData;

  const { email, tel } = useMemo(() => {
    const result = {
      email: '',
      tel: '',
    };
    if (assignee) {
      result.email = assignee?.emails?.[0]?.email;
      result.tel = assignee?.tels?.[0]?.tel;
    }
    return result;
  }, [assignee]);

  return (
    <div className="credit-offer-letter-personal-info">
      <p className="regards">Trân trọng,</p>
      <p className="name">
        <strong>{ConverterUtils.getFullNameUser(assignee)}</strong>
      </p>
      <p className="position">Chuyên gia tài chính</p>
      <p>
        Số điện thoại: <a href={`tel:${tel}`}>{tel}</a>
      </p>
      <p>
        Email: <a href={`mailto:${email}`}>{email}</a>
      </p>
    </div>
  );
};

export default CreditOfferLetterPersonalInfo;
