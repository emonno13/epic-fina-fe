import { useFetchNavPublicHistoryByProductId } from '@components/shared/client/fund-certificates/hook';
import { createSchemaItem } from '@schema-form/h-types';
import { Table, Tabs, Tag } from 'antd';
import { useState } from 'react';
import { ConverterUtils } from '../../../../../../lib/converter';
import { useHTranslation } from '../../../../../../lib/i18n';
import { HFeatureForm } from '../../../../../../schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '../../../../../../schema-form/features/hooks';
import { ItemViewer } from '../../../../../shared/common/configuration/item-viewer';
import { PRODUCT_TYPE } from '../../utils';
import { TYPE_FEE_MAPPING_COLOR, TYPE_FEE_MAPPING_LABEL } from '../constants';
import { useFetchFee } from '../utils';
import { FundFormDetailSchema } from './fund.form-detail-schema';

const FundDetail = () => {
  const documentDetail = useDocumentDetail();
  const { t } = useHTranslation('admin-common');
  const updateFee = useFetchFee(documentDetail?.id);
  const updateNavHistory = useFetchNavPublicHistoryByProductId(
    documentDetail?.id,
    { skip: undefined, limit: undefined },
  );

  const [tabActive, setTabActive] = useState('detail-information');

  return (
    <Tabs onChange={setTabActive} destroyInactiveTabPane={true}>
      <Tabs.TabPane
        tab={t('Detail information', { vn: 'Thông tin chi tiết' })}
        key={'detail-information'}
      >
        {tabActive === 'detail-information' && (
          <HFeatureForm
            {...{
              hiddenValues: { type: PRODUCT_TYPE.FUND },
              schema: FundFormDetailSchema,
              onDataReadyToSubmit: (values) => {
                delete values?.productDetails;
                return {
                  ...values,
                };
              },
            }}
          />
        )}
      </Tabs.TabPane>

      <Tabs.TabPane tab={t('Fee', { vn: 'Phí' })} key={'fee'}>
        {tabActive === 'fee' && (
          <HFeatureForm
            {...{
              schema: () => [
                createSchemaItem({
                  Component: () => {
                    return (
                      <div style={{ maxWidth: '100%' }}>
                        <Table
                          {...{
                            dataSource: updateFee,
                            columns: [
                              {
                                title: 'Chương trình',
                                dataIndex: 'productProgramName',
                              },
                              {
                                title: t('Type', {
                                  vn: 'Phân loại chương trình',
                                }),
                                dataIndex: 'type',
                                render: (_, document) => (
                                  <div>
                                    <ItemViewer
                                      {...{
                                        label: 'Tên loại phí:',
                                        value: document?.name,
                                        labelClassName: 'm-b-0i',
                                      }}
                                    />
                                    <Tag
                                      color={
                                        TYPE_FEE_MAPPING_COLOR[document?.type]
                                      }
                                    >
                                      {t(
                                        TYPE_FEE_MAPPING_LABEL[document?.type],
                                      )}
                                    </Tag>
                                  </div>
                                ),
                              },
                              {
                                title: 'Giá trị',
                                dataIndex: 'beginValue',
                                render: (_, document) => (
                                  <div>
                                    <ItemViewer
                                      {...{
                                        label: 'Min:',
                                        value: `${document?.beginOperatorCode === '&' ? '' : document?.beginOperatorCode} ${document?.beginValue === -1 ? '_' : document?.beginValue} ngày`,
                                        labelClassName: 'm-b-0i',
                                      }}
                                    />
                                    <ItemViewer
                                      {...{
                                        label: 'Max:',
                                        value: `${document?.endOperatorCode === '&' ? '' : document?.endOperatorCode} ${document?.endValue === -1 ? '_' : document?.endValue} ngày`,
                                        labelClassName: 'm-b-0i',
                                      }}
                                    />
                                  </div>
                                ),
                              },
                              {
                                title: 'Rate',
                                dataIndex: 'rate',
                              },
                            ],
                          }}
                        />
                      </div>
                    );
                  },
                }),
              ],
            }}
          />
        )}
      </Tabs.TabPane>

      <Tabs.TabPane
        tab={t('Price update histories', { vn: 'Lịch sử cập nhật giá' })}
        key={'navs'}
      >
        {tabActive === 'navs' && (
          <HFeatureForm
            {...{
              schema: () => [
                createSchemaItem({
                  Component: () => {
                    return (
                      <div style={{ maxWidth: '100%' }}>
                        <Table
                          {...{
                            dataSource: updateNavHistory,
                            pagination: {
                              position: ['bottomLeft'],
                              defaultPageSize: 10,
                            },
                            columns: [
                              {
                                title: t('Price', { vn: 'Giá' }),
                                dataIndex: 'nav',
                                render: (nav) =>
                                  `${ConverterUtils.formatNumber(nav)} VND`,
                              },
                              {
                                title: t('Update at', { vn: 'Ngày cập nhật' }),
                                dataIndex: 'navDate',
                                render: (navDate) =>
                                  ConverterUtils.dateConverterToString(navDate),
                              },
                            ],
                          }}
                        />
                      </div>
                    );
                  },
                }),
              ],
            }}
          />
        )}
      </Tabs.TabPane>
    </Tabs>
  );
};

export default FundDetail;
