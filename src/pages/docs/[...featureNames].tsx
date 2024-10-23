import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LightlyClientLayoutForDocPage } from '../../layouts/admin/lightly/client';
import { RenderDocComponentByPath } from '../../components/features/docs/utils';

const DocumentationPage = () => {
  return (
    <RenderDocComponentByPath />
  );
};

DocumentationPage.Layout = LightlyClientLayoutForDocPage;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'second-page'])),
    },
  };
};

export default DocumentationPage;
