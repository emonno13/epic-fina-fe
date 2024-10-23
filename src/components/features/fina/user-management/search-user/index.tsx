import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import notification from 'antd/lib/notification';
import { useHTranslation } from '../../../../../lib/i18n';
import { endpoints } from '../../../../../lib/networks/endpoints';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';
import { HSearchForm } from '../../../../../schema-form/features/search-form';
import { RequestAccessPermissionDetailSchemaForm } from './request-access-permisson-detail.schema-form';
import { SearchUserTableSchema } from './search-user.table';
import UserInfoModal from './search-user.user-info-modal';

import './search-user.module.scss';

export const SearchUserDetailForm = () => {
  const { t } = useHTranslation('admin-common');
  const userDocumentDetail = useDocumentDetail();
  return (
    <HFeatureForm
      {...{
        endpoint: endpoints.generateNodeEndpoint('request-access-user'),
        method: 'post',
        hiddenValues: { customerId: userDocumentDetail.id },
        schema: RequestAccessPermissionDetailSchemaForm,
        hideControlButton: true,
        showSuccessMessage: false,
        onGotSuccess: () => {
          notification.info({
            message: t('Request access user', { vn: 'Gửi yêu cầu truy cập' }),
            description: t('Request access user  success.', {
              vn: 'Gửi yêu cầu truy cập thành công.',
            }),
          });
        },
      }}
    />
  );
};

export const SearchUserManagement = () => {
  return (
    <HFeature
      {...{
        featureId: 'search-user',
        nodeName: 'search-user',
        useQueryParams: false,
      }}
    >
      <p>
        Vui lòng nhập chính xác số điện thoại, email hoặc cmnd/cccd để tìm kiếm
        thông tin khách hàng.
      </p>
      <HSearchForm
        {...{
          endpoint: endpoints.endpointWithApiDomain('/users/search'),
          method: 'get',
          resetIfSuccess: false,
          transport: {
            placeholder:
              'Vui lòng nhập chính xác số điện thoại, email hoặc cmnd/cccd để tìm kiếm thông tin khách hàng.',
          },
        }}
      />
      <HDocumentModalPanel
        width="450px"
        {...{
          hideSubmitAndContinueButton: true,
        }}
      >
        <SearchUserDetailForm />
      </HDocumentModalPanel>
      <UserInfoModal />
      <HTable schema={SearchUserTableSchema} />
    </HFeature>
  );
};

export default SearchUserManagement;
