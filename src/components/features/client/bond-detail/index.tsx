import ClientBondDetail from '@components/shared/client/bond-detail';
import ClientDetailPageCover from '@components/shared/client/detail-page-cover';
import ClientLeaveInfoForm from '@components/shared/client/leave-info-form';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { useHTranslation } from '@lib/i18n';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Spin } from 'antd';
import Head from 'next/head';
import { useCallback, useEffect, useMemo, useState } from 'react';

import './bond-detail.module.scss';

const ClientBonds = () => {
  const { t } = useHTranslation('common');
  const [loading, setLoading] = useState<boolean>(false);
  const [bonds, setBonds] = useState<any>([]);
  const [bond, setBond] = useState<any>({});
  const slug = useMemo(() => RouteUtils.getAdminFeatureNames(), []);

  const onGotSuccess = (response) => {
    if (response) {
      setBonds(response.data);
    }
  };

  const onGotSuccessDetail = (response) => {
    if (response) {
      setBond(response);
    }
  };

  const fetchProductDetail = useCallback(async () => {
    setLoading(true);
    const options = {
      featureId: 'products',
      nodeName: `products/public/by-slug/${slug[1]}`,
      withRelations: ['org', 'category'],
      method: 'get',
      onGotSuccess: (response) => {
        onGotSuccessDetail({ ...response });
      },
    };
    await FormUtils.submitForm({}, { ...options, isSearchForm: true });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail]);

  return (
    <Spin spinning={loading}>
      <div className="client-bonds">
        <Head>
          <title>Trái phiếu</title>
        </Head>
        <ClientDetailPageCover
          homeRoute="/dau-tu"
          breadCrumbRoutes={[
            {
              path: '/danh-sach-trai-phieu',
              breadcrumbName: t('List of bonds', {
                vn: 'Danh sách trái phiếu',
              }),
            },
            {
              path: '#',
              breadcrumbName: `${bond ? bond.name : ''}`,
            },
          ]}
        />
        <ClientLeaveInfoForm isNew={true} />
        <div className="max-w-1100 client-bond-detail__list m-auto">
          <ClientBondDetail bonds={bonds} bondDetail={bond} />
        </div>
      </div>
    </Spin>
  );
};

export default ClientBonds;
