import { AlignLeftOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import {
  DEAL_STATUS,
  DEAL_STATUSES,
  mergeArrayObjects,
} from '@components/features/fina/deals/utils';
import { HComment } from '@components/shared/common-form-elements/h-comment';
import { LabelItem } from '@components/shared/common/h-label/h-label-title';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { useDocumentDetail } from '../../../../../../../../schema-form/features/hooks';
import {
  ORGANIZATION_TYPES,
  USER_TYPES,
} from '../../../../../../../../types/organization';
import { CustomerInformation } from '../../component-deal-loan-common/customer-infomation';
import { HandlingStaff } from '../../component-deal-loan-common/handling-staff';
import { DealLoanProfile } from '../../component-deal-loan-common/loan-profile';
import { RenderDealSteps } from '../../deal-steps';

import './manager-loan-with-fina.scss';

export const ViewLoanInformationDetail = ({
  isEdit,
  onEditDocument,
  currentStep,
  isPublicUpload,
}) => {
  const { t } = useHTranslation('admin-common');
  const currentUser = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const detail = useDocumentDetail();

  if (isEdit) {
    return null;
  }

  let steps = Object.values(DEAL_STATUS).filter(
    (item: any) => !['Cancel'].includes(item?.name),
  );
  if (detail?.status === DEAL_STATUSES.CANCELLED) {
    steps = Object.values(DEAL_STATUS)
      .filter((item: any) => !['Cancel'].includes(item?.name))
      .map((el) => {
        return { ...el, status: 'error' };
      });
  }
  const result = mergeArrayObjects(steps, detail?.statusHistories);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <RenderDealSteps
          {...{
            currentStep,
            steps: result,
          }}
        />
      </Col>
      <Col span={24}>
        <DealLoanProfile
          {...{ detail, onEditDocument, type: ORGANIZATION_TYPES.SUB_ORG }}
        />
      </Col>

      <Col span={12}>
        <HandlingStaff {...{ detail, onEditDocument }} />
        <br />
        <CustomerInformation {...{ detail, onEditDocument }} />
      </Col>

      <Col xs={24} sm={24} lg={12}>
        {isOrgStaff && !isPublicUpload && (
          <>
            <LabelItem
              label={t('Note')}
              firstIcon={<AlignLeftOutlined />}
              titleTooltip={t('Note')}
            />

            <div className="view-loan-information-detail-note">
              <HComment {...{ className: 'm-t-10' }} />
            </div>
          </>
        )}
      </Col>
    </Row>
  );
};
