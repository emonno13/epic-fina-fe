import {
  ContainerOutlined,
  EditOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { SCREEN_ADD_GUARANTEE_HOSPITAL } from '@components/features/crm/guarantee-hospital/constants';
import { GuaranteeHospitalDetailSchemaForm } from '@components/features/crm/guarantee-hospital/detail-schema/guarantee-hospital.detail-schema-form';
import { HCommentWithLabel } from '@components/shared/common-form-elements/h-comment';
import { LabelItem } from '@components/shared/common/h-label/h-label-title';
import { endpoints } from '@lib/networks/endpoints';
import { HSubForm } from '@schema-form/h-form';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';
import { Col, Form, notification, Row, Tabs } from 'antd';
import { useMemo, useState } from 'react';
import { useHTranslation } from '../../../../../lib/i18n';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';
import { HDocumentDrawerPanel } from '../../../../../schema-form/features/panels';
import { InsuranceProductCommissionSettingSchemaForm } from '../../commission/settings/insurance-product/detail-schema-form';
import { PRODUCT_TYPE } from '../utils';
import { InsurancesContentDetailSchemaForm } from './insurances-content.detail-schema-form';
import {
  InsurancesSchemaFormShort,
  PackageItemSchemaDetail,
} from './insurances-detail-schema-form';

const { TabPane } = Tabs;
const TabLabel = ({ Icon, label }) => (
  <>
    <Icon /> {label}{' '}
  </>
);
const TAB_KEYS = {
  INFORMATION: 'information',
  COMMISSION: 'commission',
  PACKAGE_ITEM: 'package_item',
  PRODUCT_CONTENT: 'product_content',
  GUARANTEE_HOSPITAL: 'guarantee_hospital',
};

export const InsurancesDetailSchemaForm = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  const [form] = Form.useForm();
  const [tabActive, setTabActive] = useState<string>(TAB_KEYS.INFORMATION);
  const [attachedOrganizationProducts, setAttacheOrganizationProducts] =
    useState<any[]>([]);
  const [removedOrganizationProducts, setRemovedOrganizationProducts] =
    useState<any[]>([]);
  const insurancesDetail = useDocumentDetail();
  const documentId = useMemo(() => insurancesDetail?.id, [insurancesDetail]);

  const hFeatureFormProps =
    tabActive === TAB_KEYS.GUARANTEE_HOSPITAL
      ? {
          endpoint: endpoints.generateNodeEndpoint(
            `organization-products/${insurancesDetail?.id}}`,
          ),
          onDataReadyToSubmit: (dataSubmit) => {
            return {
              ...dataSubmit,
              attachedOrganizationProducts,
              removedOrganizationProducts,
            };
          },
        }
      : {};

  const handleBeforeSubmit = (form: any) => {
    const formulaSetting = form.getFieldValue('commissionSettingSpend') || {};
    let totalPercentSpend = 0;

    for (let l = 1; l <= (formulaSetting.level || 0); l++) {
      totalPercentSpend += formulaSetting[`collaborator${l}`] || 0;
    }

    if (totalPercentSpend > 100) {
      notification.error({
        message: 'Tổng phần trăm chi cho các đối tượng không được lớn hơn 100%',
      });
      return false;
    }

    return true;
  };

  return (
    <HDocumentDrawerPanel>
      <HFeatureForm
        {...{
          hiddenValues: { type: PRODUCT_TYPE.INSURANCE },
          form,
          hideControlButton: true,
          beforeSubmit: handleBeforeSubmit,
          ...hFeatureFormProps,
          schema: () => [
            createSchemaItem({
              Component: () => {
                return (
                  <Tabs defaultActiveKey={tabActive} onChange={setTabActive}>
                    <TabPane
                      tab={
                        <span>
                          <ContainerOutlined />
                          {t('Thông tin bảo hiểm')}
                        </span>
                      }
                      key={TAB_KEYS.INFORMATION}
                    >
                      {tabActive === TAB_KEYS.INFORMATION && (
                        <>
                          <Row gutter={24}>
                            <Col md={24} lg={24}>
                              <HSubForm
                                schema={() =>
                                  InsurancesSchemaFormShort({ ...props, form })
                                }
                              />
                            </Col>
                          </Row>
                          <Row gutter={24}>
                            <Col span={24}>
                              <HCommentWithLabel
                                label={
                                  <LabelItem
                                    label="Note"
                                    firstIcon={<EditOutlined />}
                                  />
                                }
                                placeholder={t(
                                  'CRM_TASK_FORM_CONTROL_COMMENT_PLACEHOLDER',
                                )}
                                documentId={documentId}
                              />
                            </Col>
                          </Row>
                        </>
                      )}
                    </TabPane>
                    <TabPane
                      key={TAB_KEYS.COMMISSION}
                      {...{
                        tab: (
                          <TabLabel
                            Icon={SettingOutlined}
                            label={t('Cài đặt hoa hồng')}
                          />
                        ),
                        closable: false,
                        disabled: !insurancesDetail?.id,
                      }}
                    >
                      {tabActive === TAB_KEYS.COMMISSION && (
                        <HSubForm
                          schema={() => [
                            ...InsuranceProductCommissionSettingSchemaForm(
                              'commissionSettings',
                              true,
                              true,
                            ),
                          ]}
                        />
                      )}
                    </TabPane>
                    <TabPane
                      key={TAB_KEYS.PACKAGE_ITEM}
                      {...{
                        tab: (
                          <TabLabel
                            Icon={SettingOutlined}
                            label={t('Package item', {
                              vn: 'Gói sản phẩm bảo hiểm',
                            })}
                          />
                        ),
                        closable: false,
                        className: 'package-item-wrapper',
                      }}
                    >
                      {tabActive === TAB_KEYS.PACKAGE_ITEM && (
                        <HSubForm
                          {...{
                            schema: PackageItemSchemaDetail,
                          }}
                        />
                      )}
                    </TabPane>
                    <TabPane
                      key={TAB_KEYS.PRODUCT_CONTENT}
                      {...{
                        tab: (
                          <TabLabel
                            Icon={SettingOutlined}
                            label={t('Content product insurance', {
                              vn: 'Nội dung sản phẩm bảo hiểm',
                            })}
                          />
                        ),
                        closable: false,
                      }}
                    >
                      {tabActive === TAB_KEYS.PRODUCT_CONTENT && (
                        <HSubForm
                          {...{
                            schema: InsurancesContentDetailSchemaForm,
                          }}
                        />
                      )}
                    </TabPane>
                    <TabPane
                      key={TAB_KEYS.GUARANTEE_HOSPITAL}
                      {...{
                        tab: (
                          <TabLabel
                            Icon={SettingOutlined}
                            label={t('Guarantee hospital', {
                              vn: 'Bệnh viện bảo lãnh',
                            })}
                          />
                        ),
                        closable: false,
                      }}
                    >
                      {tabActive === TAB_KEYS.GUARANTEE_HOSPITAL && (
                        <HSubForm
                          {...{
                            schema: GuaranteeHospitalDetailSchemaForm,
                            transport: {
                              setAttacheOrganizationProducts,
                              setRemovedOrganizationProducts,
                              type: SCREEN_ADD_GUARANTEE_HOSPITAL.PRODUCT,
                            },
                          }}
                        />
                      )}
                    </TabPane>
                  </Tabs>
                );
              },
            }),
          ],
        }}
      />
    </HDocumentDrawerPanel>
  );
};
