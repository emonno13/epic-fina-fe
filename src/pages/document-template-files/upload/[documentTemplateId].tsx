import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Empty } from 'antd';
import dynamic from 'next/dynamic';
import { AnyObject } from '@components/shared/atom/type';
import { useGetDealData } from '@components/features/fina/deals/hooks';
import { useHTranslation } from '@lib/i18n';
import { LightlyClientLayout } from 'layouts/admin/lightly/client';
import { PublicDocumentUploadHeader } from '@components/features/fina/deals/loans/detail/edit-deal-loan/customer-upload/public-document-upload-header';

import './document-template-files.module.scss';

const ManagerLoanCustomerUploadDocument = dynamic(
  () =>
    import(
      'components/features/fina/deals/loans/detail/edit-deal-loan/customer-upload'
    ),
  { ssr: false },
);

export const UploadDocumentTemplateFilesPage = () => {
  const { query } = useRouter();
  const { documentTemplateId, objectId, objectType, objectSubType } =
    query as AnyObject;
  const dealData = useGetDealData(objectId);
  const { t } = useHTranslation('common');

  if (!objectId) {
    return (
      <Empty>
        {t('The link is not correct', { vn: 'Đường link không chính xác' })}
      </Empty>
    );
  }

  return (
    <div className="document-template-files">
      <PublicDocumentUploadHeader dealData={dealData} />
      <ManagerLoanCustomerUploadDocument
        documentTemplateId={documentTemplateId}
        objectId={objectId}
        objectSubType={objectSubType}
        objectType={objectType}
      />
    </div>
  );
};

UploadDocumentTemplateFilesPage.layout = LightlyClientLayout;

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'admin-common'])),
  },
});

export default UploadDocumentTemplateFilesPage;
