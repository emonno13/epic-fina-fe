import classNames from 'classnames';
import { memo, useMemo } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { CALL_STATUS } from '@components/shared/stringee/constant';
import { USER_TYPES } from '@components/shared/user/constants';
import { ClickableOpacity } from '@components/shared/utils/clickable-opacity';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { TableUtils } from '@lib/table-utils';
import { HFeature, HTable } from '@schema-form/features';
import HSearchForm from '@schema-form/features/search-form';
import { Space } from 'antd';
import { useSetCurrentControl } from '../../../hooks';

import './call-transfer.module.scss';

const CallTransfer = (props: { callDetail: any; currentUser: any }) => {
  const { callDetail, currentUser } = props;
  const callId = useMemo(
    () => callDetail?.callLog?.callId || '',
    [callDetail?.callLog],
  );
  const { t } = useHTranslation('admin-common');
  const setCurrentControl = useSetCurrentControl();

  const filterCondition = {
    filter: {
      where: {
        type: USER_TYPES.STAFF,
        id: {
          neq: currentUser.id,
        },
        isAgent: true,
        code: {
          neq: 'FINA_OWNER_SYSTEM', // TODO: should not hard code here
        },
      },
    },
  };
  const detailSchemaTable = [
    TableUtils.createTableColumnConfig({
      title: t('Name', { vn: 'Tên' }),
      dataIndex: 'fullName',
      sortable: true,
      key: 'fullName',
      render: (fullName, document) => (
        <div
          className={classNames('call-status', {
            available: document?.callStatus === CALL_STATUS.AVAILABLE,
            busy: document?.callStatus === CALL_STATUS.BUSY,
          })}
        >
          {fullName || ''}
        </div>
      ),
    }),
    TableUtils.createCallTransferControlColumn(t('Action'), {
      endpoint: endpoints.endpointWithApiDomain('/agents/transfer-to-member'),
      params: {
        callId,
        fromUserId: currentUser?.id || '',
      },
    }),
  ];

  return (
    <div className={'call-transfer'}>
      <HFeature
        {...{
          featureId: 'transfer-members',
          nodeName: 'users',
        }}
      >
        <Space>
          <ClickableOpacity onClick={() => setCurrentControl(undefined)}>
            <ArrowLeftOutlined />
          </ClickableOpacity>
          <HSearchForm
            {...{
              hiddenValues: filterCondition,
              pagination: {
                filter: {
                  limit: 100,
                },
              },
            }}
          />
        </Space>
        <HTable
          {...{
            schema: detailSchemaTable,
          }}
        />
      </HFeature>
    </div>
  );
};

export default memo(CallTransfer);
