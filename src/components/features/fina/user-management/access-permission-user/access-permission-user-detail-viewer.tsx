import { AlignLeftOutlined } from '@ant-design/icons';
import { ConverterUtils } from '@lib/converter';
import { Col, Row, Tag } from 'antd';
import { useHTranslation } from '../../../../../lib/i18n';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';
import { FiledViewer } from '../../../../shared/common/configuration/field-viewer';
import { LabelItem } from '../../../../shared/common/h-label/h-label-title';
import { PreViewUser } from '../../deals/deals-component-common/preview-user';
import {
  REQUEST_ACCESS_MAPPING_STATUS,
  REQUEST_ACCESS_USER_COLOR_MAPPING,
} from './constan';

export const AccessPermissionUserDetailViewer = () => {
  const documentDetail = useDocumentDetail();
  const { t } = useHTranslation('admin-common');
  const tels = documentDetail?.customer?.tels || [];
  const emails = documentDetail?.customer?.emails || [];
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} lg={12}>
        <LabelItem
          label={t('Customer profile', { vn: 'Thông tin khách hàng' })}
          firstIcon={<AlignLeftOutlined />}
          titleTooltip={t('Customer profile', { vn: 'Thông tin khách hàng' })}
        />
        <FiledViewer
          {...{
            className: 'm-t-20',
            label: t('Họ tên khách'),
            value: ConverterUtils.getFullNameUser(documentDetail?.customer),
          }}
        />
        <FiledViewer
          {...{
            label: t('Tels'),
            value: tels?.map(
              ({ tel }, index) =>
                tel && (
                  <div
                    key={`${tel}.${index}`}
                    className={'wrapper-preview-phone'}
                  >
                    {tel}
                  </div>
                ),
            ),
          }}
        />
        <FiledViewer
          {...{
            label: t('Emails'),
            value: emails?.map(
              ({ email }, index) =>
                email && (
                  <div
                    key={`${email}.${index}`}
                    className={'wrapper-preview-phone'}
                  >
                    {email}
                  </div>
                ),
            ),
          }}
        />
        <FiledViewer
          {...{
            label: t('Id number', { vn: 'CMND/CCCD' }),
            value: documentDetail?.customer?.idNumber,
          }}
        />
        <FiledViewer
          {...{
            label: t('user manager', { vn: 'Nhân viên quản lý' }),
            value: <PreViewUser {...{ user: documentDetail?.user }} />,
          }}
        />
      </Col>
      <Col xs={24} sm={24} lg={12}>
        <div>
          <LabelItem
            label={t('INFORMATION APPLYING FOR FEMALE RIGHTS', {
              vn: 'Thông tin xin cấp quyền',
            })}
            firstIcon={<AlignLeftOutlined />}
            titleTooltip={t('INFORMATION APPLYING FOR FEMALE RIGHTS', {
              vn: 'Thông tin xin cấp quyền',
            })}
          />
          <FiledViewer
            {...{
              className: 'm-t-20',
              label: t('Sender', { vn: 'Người xin cấp quyền' }),
              value: <PreViewUser {...{ user: documentDetail?.sender }} />,
            }}
          />
          <FiledViewer
            {...{
              label: t('Created_', { vn: 'Thời gian yêu cầu' }),
              value: ConverterUtils.fullDatetimeConverter(
                documentDetail.createdAt,
              ),
            }}
          />
          <FiledViewer
            {...{
              label: t('Content'),
              value: documentDetail?.requestContent,
            }}
          />
        </div>
        <div>
          <LabelItem
            label={t('Information licensing\n', { vn: 'Thông tin cấp phép' })}
            firstIcon={<AlignLeftOutlined />}
            titleTooltip={t('Information licensing\n', {
              vn: 'Thông tin cấp phép',
            })}
          />
          <FiledViewer
            {...{
              className: 'm-t-20',
              label: t('Status'),
              value: (
                <Tag
                  color={
                    REQUEST_ACCESS_USER_COLOR_MAPPING[documentDetail.status]
                  }
                >
                  {t(REQUEST_ACCESS_MAPPING_STATUS[documentDetail.status])}
                </Tag>
              ),
            }}
          />
          <FiledViewer
            {...{
              label: t('Handler', { vn: 'Người xử lý' }),
              value: <PreViewUser {...{ user: documentDetail?.approve }} />,
            }}
          />
          <FiledViewer
            {...{
              label: t('Content'),
              value: documentDetail?.approvedContent,
            }}
          />
        </div>
      </Col>
    </Row>
  );
};
