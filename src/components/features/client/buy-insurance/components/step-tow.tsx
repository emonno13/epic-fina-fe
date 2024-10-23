import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { useAuth } from '@lib/providers/auth';
import { Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import moment from 'moment';
import { useState } from 'react';
import { USER_TYPES } from 'types/organization';

const MaxAge = 65;

export const StepTow = ({ data, form, packages, createTransaction }) => {
  const { t } = useHTranslation('common');
  const { currentUser } = useAuth();
  const isCollaborator =
    currentUser.type === USER_TYPES.collaborator ||
    currentUser.type === USER_TYPES.staff;

  const [formValue] = useState({
    ...form.getFieldsValue(),
    customers: form.getFieldsValue()?.customers?.map((customer) => ({
      ...customer,
      meta: packages.find((el) => el.value === customer?.package),
    })),
  });

  const renderGender = (value) => {
    return value === 'male' ? 'Nam' : value === 'female' ? 'Nữ' : 'Khác';
  };
  const [checked, setChecked] = useState(false);

  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  const ItemView = ({ label, value }) => (
    <div className="item-view">
      <div className="item-view__title">{label}</div>
      <div className="item-view__value">{value ? value : '_'}</div>
    </div>
  );

  const totalAmount = () => {
    let amount = 0;
    formValue?.customers?.forEach((customer) => {
      amount = renderPrice(customer) + amount;
    });

    return {
      value: amount || 0,
      label: FormatterUtils.formatAmount(amount, 'vnđ') || '',
    };
  };

  const checkAge = (user) => {
    const birthday = new Date(user?.dateOfBirth);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const renderPrice = (customer) => {
    const price = isCollaborator
      ? customer?.meta?.price
      : customer?.meta?.priceRoot;
    if (checkAge(customer) > MaxAge) {
      return price * 1.5;
    }

    return price || 0;
  };

  const formatCustomer = () => {
    return {
      ...formValue,
      customers: formValue?.customers?.map((customer) => ({
        ...customer,
        meta: {
          ...customer.meta,
          amount: renderPrice(customer),
        },
      })),
    };
  };

  const ItemViewUser = ({ user }) => {
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
          label={t('CMND / CCCD:', {
            vn: 'Số CMND / CCCD:',
            en: 'CMND / CCCD:',
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
        <ItemView
          label={t('Email:', { vn: 'Email:', en: 'Email:' })}
          value={user?.email || '_'}
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

  return (
    <div className="buy-insurance-page__step-tow step-tow">
      <div className="step-tow__content">
        <div className="step-tow__content-view">
          <div className="step-tow__content-title">Thông tin Bảo hiểm</div>
          <ItemView
            label={t('Nhà cung cấp:', {
              vn: 'Nhà cung cấp:',
              en: 'Nhà cung cấp:',
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
            label={t('Số người tham gia:', {
              vn: 'Số người tham gia:',
              en: 'Số người tham gia:',
            })}
            value={formValue?.customers?.length || 0}
          />
          <ItemView
            label={t('Tổng số tiền:', {
              vn: 'Tổng số tiền:',
              en: 'Tổng số tiền:',
            })}
            value={totalAmount().label}
          />
        </div>

        <div className="step-tow__content-view">
          <div className="step-tow__content-title">Thông tin chủ hợp đồng</div>
          <ItemViewUser user={formValue?.staffInfo} />
        </div>

        <div className="step-tow__content-view">
          <div className="step-tow__content-title">
            Thông tin người hưởng bảo hiểm
          </div>
          {formValue?.customers?.map((user, index) => (
            <>
              <ItemViewUser user={user} key={index} />
              <ItemView
                label={t('Quan hệ:', { vn: 'Quan hệ:', en: 'Link:' })}
                value={user?.relationship || '_'}
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
                  FormatterUtils.formatAmount(renderPrice(user), 'vnđ') || '_'
                }
              />
            </>
          ))}
        </div>
      </div>

      <div className="step-tow__content-payment">
        <div className="step-tow__content-title">
          Các phương thức thanh toán
        </div>

        <div className="step-tow__content-payment__image">
          <img src={'/assets/images/logo-payme.png'} alt="" />
        </div>

        <div className="step-tow__content-payment__bottom"></div>

        <Checkbox
          checked={checked}
          onChange={onChange}
          style={{ fontSize: '16px' }}
        >
          Tôi đã đọc và đồng ý với quy tắc bảo hiểm
        </Checkbox>

        <div className="step-tow__content-payment__amount">
          <div className="step-tow__content-payment__amount__title">
            Gía trị đơn hàng:
          </div>
          <div className="step-tow__content-payment__amount__value">
            {totalAmount().label}
          </div>
        </div>

        <Button
          className="step-tow__content-payment__button"
          disabled={!checked}
          onClick={() =>
            createTransaction({
              amount: totalAmount().value,
              ...formatCustomer(),
            })
          }
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default StepTow;
