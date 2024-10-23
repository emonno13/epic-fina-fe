import { UserAvatar } from '@components/shared/common/h-avatar';
import { HPreviewUser } from '@components/shared/common/h-preview-user';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import {
  useDocumentDetail,
  useSetDocumentDetail,
} from '@schema-form/features/hooks';
import { Col, Divider, Row, Tooltip } from 'antd';
import { RenderInsuranceComponent, RenderSubStatus } from './common';

import './deal-insurance.module.scss';

const ShortTableSchema = () => {
  const { t } = useHTranslation('common');
  const setDealInsuranceDocumentDetail = useSetDocumentDetail();
  const dealInsuranceDocument = useDocumentDetail();
  return [
    TableUtils.createTableColumnConfig({
      title: t('Deal insurance', { vn: 'Hồ sơ bảo hiểm' }),
      render: (_, dealDocument) => {
        const { user, meta, org, product } = dealDocument || {};
        const PricePacket = meta?.amount || meta?.pricePacket || meta?.price;
        return (
          <div
            className={
              dealInsuranceDocument?.id === dealDocument?.id
                ? 'view-select'
                : ''
            }
            onClick={() => setDealInsuranceDocumentDetail(dealDocument)}
          >
            <Row className={'information-user-profile'}>
              <Col span={6}>
                <Tooltip
                  placement="topLeft"
                  title={
                    <HPreviewUser {...{ user, userTitle: t('Customer') }} />
                  }
                >
                  <UserAvatar {...{ user }} />
                </Tooltip>
              </Col>
              <Col span={18}>
                <div>
                  <h1 className="information-user-name">
                    {user ? ConverterUtils.getFullNameUser(user) : '__'}{' '}
                  </h1>
                  <div className="information-dexcription">{meta?.label} </div>
                </div>
              </Col>
            </Row>
            <Divider />
            <div className="information-deal-insurance-status">
              <a>{dealDocument.code}</a>
              <div>{RenderSubStatus(dealDocument.status, t)}</div>
            </div>
            <div>
              <RenderInsuranceComponent
                {...{
                  label: t('Origin', { vn: 'Tổ chức' }),
                  value: org?.name,
                }}
              />
              <RenderInsuranceComponent
                {...{
                  label: t('Product', { vn: 'Sản phẩm' }),
                  value: product?.name,
                }}
              />
              <RenderInsuranceComponent
                {...{
                  label: t('Price packet', { vn: 'Giá bán' }),
                  value: ConverterUtils.formatNumber(PricePacket),
                }}
              />
            </div>
          </div>
        );
      },
    }),
  ];
};

export default ShortTableSchema;
