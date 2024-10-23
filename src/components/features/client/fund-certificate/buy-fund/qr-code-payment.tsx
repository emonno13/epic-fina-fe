import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useEffect, useState } from 'react';

const PaymentQRCode = ({ data }) => {
  const [link, setLink] = useState();

  useEffect(() => {
    FormUtils.submitForm(
      { ...data },
      {
        method: 'post',
        endpoint: endpoints.endpointWithApiDomain(
          '/transactions/create-qr-transaction-buy-fund',
        ),
        onGotSuccess: (response) => {
          const linkqr = response?.data?.qrDataURL;
          setLink(linkqr);
        },
      },
    );
  }, []);

  return (
    <>
      <img src={link} alt="" style={{ width: '100%' }} />
    </>
  );
};

export default PaymentQRCode;
