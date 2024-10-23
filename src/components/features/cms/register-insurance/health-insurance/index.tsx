import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { HTextArea } from '@components/shared/common-form-elements/h-input';
import { HModal } from '@components/shared/common/h-modal';
import { HFeature, HTable } from '@schema-form/features';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import {
  useDocumentDetail,
  useSetDocumentDetail,
  useSubmitSearchForm,
} from '@schema-form/features/hooks';
import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import {
  HSearchFormHiddenAble,
  HSearchFormWithCreateButton,
} from '@schema-form/features/search-form';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Form, Tabs } from 'antd';
import classNames from 'classnames';
import { CloseIconSvg, FilterIconSvg } from 'icons';
import { useHTranslation } from 'lib/i18n';
import { endpoints } from 'lib/networks/endpoints';
import { useState } from 'react';
import {
  DEAL_INSURANCE_STATUSES,
  dealInsuranceSteps,
  TABS_DEAL_INSURANCE,
} from '../constants';
import { AdvanceSearchSchema } from './advance-search-schema';
import ButtonActionInsurance from './button-action-insurance';
import { HealthInsuranceStaffSchemaDetail } from './health-insurance-staff-schema-detail';
import { HealthInsuranceTableSchemaDetail } from './health-insurance-table-schema-detail';
import { createCertificateByDealInsurance } from './utils';

interface HealthInsuranceProps {
  featureId?: string;
  employeeBuy?: string;
  status?: string;
}

const { TabPane } = Tabs;

const HealthInsurance = (props: HealthInsuranceProps) => {
  const { t } = useHTranslation('admin-common');
  const { featureId, employeeBuy = undefined, status } = props;
  const [searchForm] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);

  return (
    <HFeature
      {...{
        featureId: featureId || 'deals',
        nodeName: 'deals',
        documentRelations: ['org', 'user', 'product', 'source', 'company'],
      }}
    >
      <HSearchFormWithCreateButton
        {...{
          withRelations: ['org', 'user', 'product', 'source', 'company'],
          hiddenFields: {
            type: 'insurances',
            status,
          },
          className: 'search-task-form',
          renderLeftSuffix: (
            <HButton
              {...{
                onClick: () => setIsShowFilter(!isShowFilter),
                className: 'btn-filter',
              }}
            >
              <FilterIconSvg />
            </HButton>
          ),
          resetIfSuccess: false,
        }}
      />

      <HealthInsuranceDetail
        {...{
          currentStep,
          setCurrentStep,
          searchForm,
        }}
      />

      <div className="manager-table">
        {isShowFilter && (
          <div className="tasks-filter">
            <HSearchFormHiddenAble
              {...{
                schema: AdvanceSearchSchema,
                resetIfSuccess: false,
                withRelations: ['org', 'user', 'product', 'source', 'company'],
                hiddenFields: {
                  type: 'insurances',
                  status,
                },
                onDataReadyToSubmit: (values) => ({
                  ...values,
                  createdAt: FormUtils.getQueryBetweenDays(
                    values?.createdAt?.[0],
                    values?.createdAt?.[1],
                  ),
                  updatedAt: FormUtils.getQueryBetweenDays(
                    values?.updatedAt?.[0],
                    values?.updatedAt?.[1],
                  ),
                }),
                renderLeftSuffix: (
                  <div className="title-advanced-filter">
                    <div className="title">{t('advancedFilter')}</div>
                    <CloseIconSvg
                      onClick={() => setIsShowFilter(!isShowFilter)}
                      className="cursor-pointer"
                    />
                  </div>
                ),
              }}
            />

            <div className="wrapper-btn-apply-filter">
              <ApplyFilterButton />
            </div>
          </div>
        )}
        <div
          className={classNames('table-of-task', {
            'width-full': !isShowFilter,
          })}
        >
          <HTable
            scroll={{ x: 'max-content' }}
            schema={() => HealthInsuranceTableSchemaDetail({ employeeBuy })}
          />
        </div>
      </div>
    </HFeature>
  );
};

export const HealthInsuranceDetail = ({
  currentStep,
  setCurrentStep,
  searchForm,
}) => {
  const documentDetail = useDocumentDetail();
  const setDocumentDetail = useSetDocumentDetail();
  const [visible, setVisible] = useState<boolean>(false);
  const { t } = useHTranslation('admin-common');

  const checkHiddenButton =
    documentDetail?.status !== DEAL_INSURANCE_STATUSES.CANCELLED &&
    documentDetail?.status !== DEAL_INSURANCE_STATUSES.CERTIFICATED;

  const handleNextStep = async () => {
    const statusCurrent = dealInsuranceSteps[currentStep + 1];
    if (statusCurrent === DEAL_INSURANCE_STATUSES.CANCELLED) {
      return;
    }
    setCurrentStep(currentStep + 1);
    await FormUtils.submitForm(
      { status: statusCurrent },
      {
        nodeName: `deals/${documentDetail?.id}`,
        method: 'put',
        onGotSuccess: async (deal) => {
          setDocumentDetail(deal);
          if (statusCurrent === DEAL_INSURANCE_STATUSES.CERTIFICATED) {
            await createCertificateByDealInsurance(deal, setDocumentDetail);
          }
        },
      },
    );
  };

  return (
    <HDocumentDrawerPanel
      {...{
        hideSubmitAndContinueButton: true,
        hiddenDocumentButtonControls: checkHiddenButton ? false : true,
        customButton: checkHiddenButton ? (
          <ButtonActionInsurance
            {...{
              setVisible,
              visible,
              handleNextStep,
            }}
          />
        ) : (
          <></>
        ),
      }}
    >
      <HFeatureForm
        {...{
          schema: () =>
            HealthInsuranceStaffSchemaDetail({ currentStep, setCurrentStep }),
          hideSubmitAndContinueButton: true,
        }}
      />
      <ModalCancelDealInsurance
        {...{
          visible,
          setVisible,
        }}
      />
    </HDocumentDrawerPanel>
  );
};

export const ModalCancelDealInsurance = ({ visible, setVisible }) => {
  const { t } = useHTranslation('admin-common');
  const [form] = Form.useForm();
  const documentDetail = useDocumentDetail();
  const setDocumentDetail = useSetDocumentDetail();

  const handleOk = () => {
    form?.submit();
  };

  return (
    <HModal
      {...{
        visible,
        title: t('Cancel deal', { vn: 'Hủy hồ sơ' }),
        onCancel: () => setVisible(false),
        onOk: handleOk,
        width: 700,
      }}
    >
      <HForm
        {...{
          form,
          schema: () => [
            createSchemaItem({
              Component: HTextArea,
              rowProps: { gutter: { xs: 24, sm: 24, md: 24 } },
              colProps: { xs: 24, sm: 24, md: 24 },
              name: 'note',
              label: t('Note', { vn: 'Ghi chú' }),
              rules: [{ required: true, message: 'Ghi chú là bắt buộc' }],
              componentProps: {
                placeholder: t('Note', { vn: 'Ghi chú' }),
                rows: 3,
              },
            }),
          ],
          endpoint: endpoints.endpointWithApiDomain(
            `/deals/${documentDetail?.id}`,
          ),
          method: 'put',
          onDataReadyToSubmit: () => ({
            status: DEAL_INSURANCE_STATUSES.CANCELLED,
          }),
          resetIfSuccess: false,
          onGotSuccess: async (res) => {
            setDocumentDetail(res);
            await FormUtils.submitForm(
              {
                content: form?.getFieldValue('note'),
                belongToId: documentDetail?.id,
              },
              {
                endpoint: endpoints.endpointWithApiDomain('/comments'),
                method: 'post',
              },
            );
            setVisible(false);
          },
          hideControlButton: true,
        }}
      />
    </HModal>
  );
};

const TabsInsurance = () => {
  return (
    <Tabs destroyInactiveTabPane={true} className="tabs-custom-filter">
      {TABS_DEAL_INSURANCE?.map((tab) => (
        <TabPane tab={tab?.name} key={tab?.status}>
          <HealthInsurance status={tab?.status} />
        </TabPane>
      ))}
    </Tabs>
  );
};

export default TabsInsurance;

const ApplyFilterButton = () => {
  const { t } = useHTranslation('admin-common');
  const advanceSearch = useSubmitSearchForm();

  return (
    <HButton type="primary" onClick={() => advanceSearch()}>
      {t('Apply filter')}
    </HButton>
  );
};
