import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import Link from 'antd/lib/typography/Link';
import { useHTranslation } from '../../../../lib/i18n';
import { ConverterUtils } from '../../../../lib/converter';
import { RouteUtils } from '../../../shared/layout/router-contaner/utils';

import '../profiles.module.scss';

const AccountInformation = ({ userInformation }) => {
  const { t } = useHTranslation('admin-common');
  return (
    <>
      <div className={'basic-information'}>
        <div className="form-person__preview-title">
          <h4>Thông tin cơ bản</h4>
          <div className={'form-person__edit'}>
            <Link
              href={RouteUtils.generatePathWithLocale('/admin/profiles/edit-information?type=base-information')}>Sửa<EditOutlined
                className={'m-l-5'}/></Link>
          </div>
        </div>
        <div className={'wrapper-person-information'}>
          <div className={'form-person__preview'}>
            <div className={'form-person__information'}>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>Email</span>
                <span className={'information-item__value'}>{`${userInformation?.emails?.[0]?.email || '----'}`}</span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>{t('Bank account', { vn: 'Tài khoản ngân hàng' })}</span>
                <span
                  className={'information-item__value'}>{`${userInformation?.banks?.[0]?.bankAccount || '----'}`}</span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>{t('Bank', { vn: 'Ngân hàng' })}</span>
                <span className={'information-item__value'}>{`${userInformation?.banks?.[0]?.name || userInformation?.bankName || '----'}`}</span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>{t('Bank', { vn: 'Chi nhánh' })}</span>
                <span
                  className={'information-item__value'}>{`${userInformation?.banks?.[0]?.branchName || '----'}`}</span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>Địa chỉ liên hệ</span>
                <span className={'information-item__value'}>{`${userInformation?.address || '----'}`}</span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>Phường / Xã</span>
                <span className={'information-item__value'}>{`${userInformation?.subDistrictName || '----'}`}</span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>Quận / Huyện</span>
                <span className={'information-item__value'}>{`${userInformation?.districtName || '----'}`}</span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>Tỉnh / TP trực thuộc TW</span>
                <span className={'information-item__value'}>{`${userInformation?.stateName || '----'}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'identification-information'}>
        <div className="form-person__preview-title">
          <h4>Thông tin định danh</h4>
        </div>
        <div className={'wrapper-person-information'}>
          <div className={'form-person__preview'}>
            <div className={'form-person__information'}>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>Họ tên</span>
                <span
                  className={'information-item__value'}>{ConverterUtils.getFullNameUser(userInformation)}</span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>{t('Tel')}</span>
                <span className={'information-item__value'}>{`${userInformation?.tels?.[0]?.tel || '----'}`}</span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>{t(('Số CMND/CCCD'))}</span>
                <span className={'information-item__value'}>{`${userInformation?.idNumber || '----'}`}</span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>{t('Ngày cấp')}</span>
                <span
                  className={'information-item__value'}>{ConverterUtils.dateConverterToString(userInformation?.identification?.issuedOn)}</span>
              </div>
              <div className={'form-person__information-item'}>
                <span className={'information-item__label'}>{t('Nơi cấp')}</span>
                <span
                  className={'information-item__value'}>{`${userInformation?.identification?.placeOfIssue || '----'}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInformation;
