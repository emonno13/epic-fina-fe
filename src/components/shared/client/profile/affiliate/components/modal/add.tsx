import { HInput } from '@components/shared/common-form-elements/h-input';
import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Button } from 'antd';
import { modals } from '../..';

export const SCREEN_OPTIONS = [
  {
    label: (
      <div>
        <img
          src={'/assets/images/vina_capital_logo.png'}
          alt=""
          width={24}
          style={{ marginRight: '5px' }}
        />
        VinaCapital
      </div>
    ),
    value: 'VinaCapital',
  },
];

const title = 'Đồng bộ tài khoản liên kết';

const ModalAffiliateAdd = (props) => {
  const { t } = useHTranslation('admin-common');
  const { action } = props;

  return (
    <div className="modal-affiliate-add">
      <h2 className="info-contract-modal-confirm-title">
        {t(title, { vn: title })}
      </h2>
      <HForm
        {...{
          method: 'post',
          hideControlButton: true,
          schema: () => [
            createSchemaItem({
              Component: HSelect,
              label: t('Đơn vị liên kết'),
              name: 'orgId',
              colProps: { span: 24 },
              rowProps: { gutter: { xs: 8, md: 16 } },
              componentProps: {
                modernLabel: true,
                options: SCREEN_OPTIONS,
              },
            }),
            createSchemaItem({
              Component: HInput,
              label: t('Địa chỉ email'),
              colProps: { span: 12 },
              name: 'email',
              rules: [
                {
                  required: true,
                  message: t('Email is required', {
                    vn: 'Xin vui lòng nhập email',
                  }),
                },
                {
                  type: 'email',
                  message: t('Your email is not valid', {
                    vn: 'Không đúng định dạng email',
                  }),
                },
              ],
              componentProps: {
                modernLabel: true,
                placeholder: t('Enter your email', { vn: 'Nhập email' }),
              },
            }),

            createSchemaItem({
              Component: HInput,
              label: 'CMND/CCCD',
              colProps: { span: 12 },
              name: 'email',
              rules: [
                {
                  required: true,
                  message: t('CMND/CCCD is required', {
                    vn: 'Xin vui lòng nhập CMND/CCCD',
                  }),
                },
              ],
              componentProps: {
                modernLabel: true,
                placeholder: t('CMND/CCCD', { vn: 'Nhập CMND/CCCD' }),
              },
            }),
          ],
        }}
      />

      <div className="profile-info-affiliate-modal-button">
        <div className="profile-info-affiliate-modal-button-item left">
          <Button
            className="profile-affiliate-action-button profile-affiliate-action-reject"
            onClick={() => {
              action(undefined);
            }}
            style={{ width: '150px', marginRight: '8px' }}
          >
            Huỷ bỏ
          </Button>
        </div>
        <div className="profile-info-affiliate-modal-button-item">
          <Button
            className="profile-affiliate-action-button profile-affiliate-action-next"
            onClick={() => {
              action(modals?.otp?.name);
            }}
            style={{ width: '185px', marginLeft: '8px' }}
          >
            Xác nhận đồng bộ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalAffiliateAdd;
