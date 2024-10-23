import Head from 'next/head';
import { isEmpty, pick } from 'underscore';
import { AnyObject } from '@components/shared/atom/type';
import { Title } from '@components/shared/typography/title';
import { ConverterUtils } from '@lib/converter';

export const PublicDocumentUploadHeader = ({
  dealData,
}: {
  dealData?: AnyObject;
}) => {
  if (!dealData || isEmpty(dealData)) {
    return <></>;
  }

  const fullNameCustomer = ConverterUtils.getFullNameUser(
    pick(dealData.user, ['firstName', 'lastName', 'fullName']),
  );

  return (
    <div className="public-document-upload-header">
      <Head>
        <title>{fullNameCustomer}</title>
      </Head>
      <div className="public-document-upload-header__logo">
        <img src="/assets/images/fina_logo.png" height={40} />
      </div>
      <div className="public-document-upload-header__title">
        <Title level={4}>{`${dealData.code} - ${fullNameCustomer}`}</Title>
      </div>
    </div>
  );
};
