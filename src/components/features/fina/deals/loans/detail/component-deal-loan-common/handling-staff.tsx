import HCard from '@components/shared/common/h-card';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Col, Row } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { USER_TYPES } from 'types/organization';
import { useCurrentUser } from '../../../../../../../lib/providers/auth';
import { FiledViewer } from '../../../../../../shared/common/configuration/field-viewer';
import { PreViewUser } from '../../../deals-component-common/preview-user';

export const HandlingStaff = (props: any) => {
  const { detail, onEditDocument } = props;
  const currentUser: any = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const { t } = useHTranslation('admin-common');
  const [staffCoprocessors, setStaffCoprocessors] = useState<any[]>([]);

  const staffCoprocessorIds = useMemo(
    () => detail?.staffCoprocessorIds,
    [detail?.staffCoprocessorIds],
  );
  useEffect(() => {
    if (!staffCoprocessorIds?.length) {
      setStaffCoprocessors([]);
      return;
    }
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.generateNodeEndpoint('/users'),
        method: 'get',
        hiddenValues: {
          filter: { where: { id: { inq: staffCoprocessorIds } } },
        },
        onGotSuccess: (res) => setStaffCoprocessors(res?.data || []),
      },
    );
  }, [staffCoprocessorIds]);

  return (
    <HCard
      {...{
        title: t('Handling staff'),
        titleProps: {
          style: {
            color: '#064DD6',
            fontWeight: 700,
          },
          tooltip: t('Handling staff'),
        },
        className: 'loan-profile',
      }}
    >
      <Row>
        <Col {...{ xs: 24, sm: 24, md: 24 }}>
          <FiledViewer
            {...{
              label: t('Staff Fina'),
              value: (
                <PreViewUser
                  {...{
                    onEditDocument,
                    user: detail?.assignee,
                    showContactInfo: false,
                  }}
                />
              ),
            }}
          />
          <FiledViewer
            {...{
              label: t('Presenter', { vn: 'Người giới thiệu' }),
              value: isOrgStaff ? (
                <PreViewUser
                  {...{
                    onEditDocument,
                    user: detail?.source,
                    showContactInfo: false,
                  }}
                />
              ) : (
                ''
              ),
            }}
          />

          <FiledViewer
            {...{
              label: t('Staff Co processor'),
              value: (
                <>
                  {staffCoprocessors?.map((staff) => (
                    <PreViewUser
                      {...{
                        onEditDocument,
                        user: staff,
                        showContactInfo: false,
                      }}
                      key={staff.id}
                    />
                  ))}
                </>
              ),
            }}
          />
        </Col>
      </Row>
    </HCard>
  );
};
