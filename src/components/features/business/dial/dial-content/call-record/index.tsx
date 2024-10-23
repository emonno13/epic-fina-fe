import { Form, Tabs } from 'antd';
import { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

import HFeature from '@schema-form/features/feature';
import { useHTranslation } from '../../../../../../lib/i18n';
import { endpoints } from '../../../../../../lib/networks/endpoints';
import { HTable } from '../../../../../../schema-form/features';
import { HSearchFormHiddenAble } from '../../../../../../schema-form/features/search-form';
import {
  UserInfoInsuranceTableSchema,
  UserInfoLoanDealsTableSchema,
} from '../../../../fina/user-management/search-user/search-user.table';
import GeneralInformation from './general-information';
import TaskDetailSurveyForm from './information-survey/detail';

import './call-record.module.scss';

const { TabPane } = Tabs;

export const CallRecordDetailView = () => {
  const { t } = useHTranslation('admin-common');
  const stringee = useSelector((state: RootStateOrAny) => state.stringee);
  const { namespace = '', isShortViewMode } = stringee;
  const callDetail = stringee[namespace] || {};
  const userInfo = callDetail?.userInfo || {};
  const callLog = callDetail?.callLog || {};
  const phoneNumber = userInfo?.tels ? userInfo?.tels[0]?.tel : '';

  const [surveyQuestionForm] = Form.useForm();
  const [formShare] = Form.useForm();
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  return (
    <div className={'call-record'}>
      <span className={'call-record__title'}>
        Phiếu ghi cuộc gọi - <strong>{callLog?.callId || ''}</strong>
      </span>
      <Tabs destroyInactiveTabPane={true}>
        <TabPane tab={t('Information', { vn: 'Thông tin chung' })} key="info">
          <GeneralInformation />
        </TabPane>

        {/* <TabPane tab={t('Information confirm', {vn: 'Thông tin khảo sát'})} key="form_information">
					<InformationSurvey phoneNumber={phoneNumber} />
				</TabPane> */}

        <TabPane
          tab={t('Loans transaction history', {
            vn: 'Lịch sử giao dịch hồ sơ vay',
          })}
          key="loan_transaction_history"
        >
          <HFeature
            {...{
              featureId: 'userLoans',
              endpoint: endpoints.endpointWithApiDomain(
                `/deals/customers/phone/${phoneNumber}`,
              ),
            }}
          >
            <HSearchFormHiddenAble />

            <HTable
              scroll={{ x: 1500 }}
              schema={() => UserInfoLoanDealsTableSchema(t)}
            />
          </HFeature>
        </TabPane>

        <TabPane
          tab={t('Insurances transaction history', {
            vn: 'Lịch sử giao dịch bảo hiểm',
          })}
          key="insurances_transaction_history"
        >
          <HFeature
            {...{
              featureId: 'userInsurances',
              endpoint: endpoints.endpointWithApiDomain(
                `/transactions/insurances/customers/phone/${phoneNumber}`,
              ),
            }}
          >
            <HSearchFormHiddenAble />

            <HTable
              scroll={{ x: 1500 }}
              schema={() => UserInfoInsuranceTableSchema(t)}
            />
          </HFeature>
        </TabPane>

        {userInfo?.id && (
          <TabPane
            tab={t('Contact history', { vn: 'Thu thập thông tin' })}
            key="contact-history"
          >
            <TaskDetailSurveyForm
              {...{
                setIsShowShareInfoButton: false,
                visibleShareInfoWithBank: false,
                setVisibleShareInfoWithBank: false,
                surveyQuestionForm,
                setSelectedProductId,
                selectedProductId,
                formShare,
                userInfoId: userInfo?.id,
              }}
            />
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};
