import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import {
  HButton,
  HButtonProps,
} from '@components/shared/common-form-elements/h-confirmation-button';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '../../../../../../lib/networks/endpoints';
import { callApi } from '../../../../../../schema-form/common/actions';

export const FetchTemplateButton = (props: HButtonProps) => {
  const { t } = useHTranslation('common');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleResponse = () => {
    setLoading(false);
  };

  const handleFetchLatestTemplates = () => {
    setLoading(true);

    const endpoint = endpoints.endpointWithApiDomain(
      '/external-email-templates/templates',
    );

    dispatch(
      callApi({
        method: 'get',
        endpoint,
        callback: handleResponse,
      }),
    );
  };

  return (
    <HButton
      {...{
        children: t('Fetch latest templates', {
          vn: 'Lấy mẫu gửi email mới nhất',
        }),
        onClick: handleFetchLatestTemplates,
        type: 'primary',
        loading: loading,
      }}
    />
  );
};
