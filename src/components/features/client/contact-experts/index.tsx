import { TITLE_OF_STAFF } from '@components/features/organizations/users/constants';
import ClientPageCover from '@components/shared/client/page-cover';
import { useHTranslation } from '@lib/i18n';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Pagination } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import ContactExpertsList from './contact-experts.list';

import './contact-experts.module.scss';

const ClientContactExperts = () => {
  const [experts, setExperts] = useState<any>({
    data: [],
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { query, push, locale } = useRouter();
  const { t } = useHTranslation('admin-common');
  const fetchExperts = useCallback(async (query) => {
    const { page } = query;
    setLoading(true);
    await FormUtils.submitForm(
      {},
      {
        nodeName: 'users/public-bankers',
        isSearchForm: true,
        hiddenValues: {
          filter: {
            limit: 8,
            skip: (Number(page || 1) - 1) * 8,
            where: {
              isPublicInformation: true,
              or: [
                { title: TITLE_OF_STAFF.FINANCIAL_EXPERT },
                { title: { $exists: false } },
              ],
            },
          },
        },
        onGotSuccess: (response) => {
          console.log('response', response);
          setExperts(response);
        },
      },
    );
    setLoading(false);
  }, []);
  const onPaginationChange = async (page) => {
    await push(`/${locale}/lien-he?page=${page}`);
  };

  useEffect(() => {
    fetchExperts(query);
  }, [query]);

  return (
    <div className="client-contact-experts">
      <Head>
        <title>Liên hệ</title>
      </Head>
      <ClientPageCover
        {...{
          title: t('client_contact_experts_cover_title', {
            en: 'Get in touch with an expert',
            vn: 'Liên hệ với chuyên gia',
          }),
          description: t('client_contact_experts_cover_desc', {
            en: 'If you have requests, suggestions, compliments or feedback please feel free to contact us.',
            vn: 'Nếu Quý Khách có yêu cầu, góp ý, khen ngợi hoặc ý kiến phản hồi xin vui lòng liên hệ với chúng tôi.',
          }),
          breadCrumbRoutes: [
            {
              path: '/lien-he',
              breadcrumbName: t('Contact', { vn: 'Liên hệ' }),
            },
          ],
        }}
      />
      <div className="max-w-1100 client-contact-experts__list m-auto">
        <ContactExpertsList {...{ data: experts?.data || [], loading }} />
        <Pagination
          {...{
            className: 'client-contact-experts__list__pagination',
            current: Number(query.page || 1),
            pageSize: 8,
            total: experts.total,
            onChange: onPaginationChange,
            showSizeChanger: false,
          }}
        />
      </div>
    </div>
  );
};

export default ClientContactExperts;
