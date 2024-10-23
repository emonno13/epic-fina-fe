import { Collapse, Divider, Typography } from 'antd';
import moment from 'moment';
import { ArrowDownIconSvg } from 'icons';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { CommentUtils } from '@lib/utils/comment';
import { OPTIONS_RELATIONSHIP } from '../buy-insurance/form-staff';
import { renderPrice } from '../constants';

import '../product-detail-insurance.module.scss';

const { Panel } = Collapse;

const EditIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="material-symbols:edit">
        <path
          id="Vector"
          d="M12.8667 5.95065L10.0333 3.15065L10.9667 2.21732C11.2222 1.96176 11.5362 1.83398 11.9087 1.83398C12.2811 1.83398 12.5949 1.96176 12.85 2.21732L13.7833 3.15065C14.0389 3.40621 14.1722 3.71465 14.1833 4.07598C14.1944 4.43732 14.0722 4.74554 13.8167 5.00065L12.8667 5.95065ZM11.9 6.93398L4.83333 14.0007H2V11.1673L9.06667 4.10065L11.9 6.93398Z"
          fill="#AAADB7"
        />
      </g>
    </svg>
  );
};

const PaymentInsurance = ({
  data,
  formValue,
  totalAmount,
  isCollaborator,
  setStepBuyInsurance,
}) => {
  const { t } = useHTranslation('common');

  const handleCopy = () => {
    CommentUtils.copyToClipboard(
      window.location.href,
      t('Successfully copied href to clipboard', { vn: 'Đã copy link' }),
    );
  };

  const renderRelationship = (user) =>
    OPTIONS_RELATIONSHIP?.find(
      (relationship) => relationship.value === user.relationship,
    )?.label;

  return (
    <>
      <div className="insurance-info">
        <div className="payment-insurance-title">
          <Typography.Text>Thông tin Bảo hiểm</Typography.Text>
          <HButton
            type="text"
            icon={<EditIcon />}
            onClick={() => {
              setStepBuyInsurance(0);
            }}
          />
        </div>
        <Divider style={{ margin: '15px 0' }} />
        <ItemView
          label={t('Nhà bảo hiểm:', {
            vn: 'Nhà bảo hiểm:',
            en: 'Nhà bảo hiểm:',
          })}
          value={data?.category?.name}
        />
        <ItemView
          label={t('Sản phẩm bảo hiểm:', {
            vn: 'Sản phẩm bảo hiểm:',
            en: 'Sản phẩm bảo hiểm:',
          })}
          value={data?.name}
        />
        <ItemView
          label={t('Gói bảo hiểm:', {
            vn: 'Gói bảo hiểm:',
            en: 'Gói bảo hiểm:',
          })}
          value={formValue?.customers?.[0]?.meta?.label}
        />
        <ItemView
          label={t('Thời hạn hợp đồng:', {
            vn: 'Thời hạn hợp đồng:',
            en: 'Thời hạn hợp đồng:',
          })}
          value={'????'}
        />
        <ItemView
          label={t('Tổng số người tham gia:', {
            vn: 'Tổng số người tham gia:',
            en: 'Tổng số người tham gia:',
          })}
          value={formValue?.customers?.length || 0}
        />
        <ItemView
          label={t('Số tiền bảo hiểm:', {
            vn: 'Số tiền bảo hiểm:',
            en: 'Số tiền bảo hiểm:',
          })}
          value={totalAmount.label}
        />
      </div>

      <Collapse
        bordered={false}
        ghost
        expandIcon={() => <ArrowDownIconSvg />}
        expandIconPosition={'right'}
      >
        <Panel header={'Thông tin người mua bảo hiểm'} key="1">
          <div className="insurance-info">
            <div className="payment-insurance-title">
              <Typography.Text>Thông tin người mua bảo hiểm</Typography.Text>
              <HButton
                type="text"
                icon={<EditIcon />}
                onClick={() => {
                  setStepBuyInsurance(0);
                }}
              />
            </div>
            <Divider style={{ margin: '15px 0' }} />
            <ItemViewUser user={formValue?.staffInfo} />
          </div>
        </Panel>
        <Panel header={'Thông tin người được bảo hiểm'} key="2">
          <div className="insurance-info">
            <div className="payment-insurance-title">
              <Typography.Text>Thông tin người được bảo hiểm</Typography.Text>
              <HButton
                type="text"
                icon={<EditIcon />}
                onClick={() => {
                  setStepBuyInsurance(1);
                }}
              />
            </div>
            <Divider style={{ margin: '15px 0' }} />
            {formValue?.customers?.map((user, index) => (
              <div key={index} className="payment-insurance-user">
                <ItemViewUser user={user} key={index} />
                <ItemView
                  label={t('Quan hệ:', {
                    vn: 'Quan hệ với chủ hợp đồng::',
                    en: 'Relationship:',
                  })}
                  value={renderRelationship(user) || '_'}
                />
                <ItemView
                  label={t('Gói bảo hiểm:', {
                    vn: 'Gói bảo hiểm:',
                    en: 'Product name:',
                  })}
                  value={user?.meta?.name || '_'}
                />
                <ItemView
                  label={t('Giá gói:', { vn: 'Giá gói:', en: 'Price:' })}
                  value={FormatterUtils.formatAmount(
                    isCollaborator ? user?.meta?.price : user?.meta?.priceRoot,
                    'vnđ',
                  )}
                />
                <ItemView
                  label={t('Thành tiền:', { vn: 'Thành tiền:', en: 'Price:' })}
                  value={
                    FormatterUtils.formatAmount(
                      renderPrice(user, isCollaborator),
                      'vnđ',
                    ) || '_'
                  }
                />
              </div>
            ))}
          </div>
        </Panel>
      </Collapse>
      <div className="buying-insurance-modal-result-total">
        <span>Tổng tiền:</span>
        <span className="money">{totalAmount?.label}</span>
      </div>

      <div className="buying-insurance-modal-actions">
        <HButton type="ghost" onClick={() => handleCopy()}>
          Chia sẻ
        </HButton>

        <HButton
          type="primary"
          onClick={() => {
            setStepBuyInsurance(3);
          }}
        >
          Tiếp tục
        </HButton>
      </div>
    </>
  );
};

export default PaymentInsurance;

const ItemView = ({ label, value }) => (
  <div className="payment-insurance-item">
    <div className="payment-insurance-item-label">{label}</div>
    <div className="payment-insurance-item-value">{value ? value : '_'}</div>
  </div>
);

const ItemViewUser = ({ user }) => {
  const { t } = useHTranslation('common');

  const renderGender = (value) =>
    value === 'male' ? 'Nam' : value === 'female' ? 'Nữ' : 'Khác';

  return (
    <>
      <ItemView
        label={t('Full name:', { vn: 'Họ và tên:', en: 'Full name:' })}
        value={user?.fullName}
      />
      <ItemView
        label={t('Birthday:', { vn: 'Ngày sinh:', en: 'Birthday:' })}
        value={moment(user?.dateOfBirth).format('DD/MM/YYYY')}
      />
      <ItemView
        label={t('Gender:', { vn: 'Giới tính:', en: 'Gender:' })}
        value={renderGender(user?.gender)}
      />
      <ItemView
        label={t('CCCD / Hộ chiếu:', {
          vn: 'Số CCCD / Hộ chiếu:',
          en: 'Số CCCD / Hộ chiếu:',
        })}
        value={user?.idNumber}
      />
      <ItemView
        label={t('Phone number:', {
          vn: 'Số điện thoại:',
          en: 'Phone number:',
        })}
        value={user?.tel}
      />
      {user?.isInsuranceCard && (
        <ItemView
          label={t('Nhận thẻ bảo hiểm cứng:', {
            vn: 'Nhận thẻ bảo hiểm cứng:',
            en: 'Nhận thẻ bảo hiểm cứng:',
          })}
          value={
            user?.isInsuranceCard === 'Yes'
              ? t('Yes', { vn: 'Có' })
              : t('No', { vn: 'Không' })
          }
        />
      )}
    </>
  );
};
