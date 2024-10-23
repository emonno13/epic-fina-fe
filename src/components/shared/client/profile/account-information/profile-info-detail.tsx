import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { ConverterUtils } from '@lib/converter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useCurrentUser } from '@lib/providers/auth';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Col, Image, Row } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import './styles.module.scss';

const ProfileInfoDetail = () => {
  const { t } = useHTranslation('common');
  const currentUser: any = useCurrentUser();
  const [initialValues, setInitialValues]: any = useState();
  const { push, locale } = useRouter();
  const isMobile = useIsMobile();

  const fullAddress = ConverterUtils.getAddress({
    address: initialValues?.address,
    subDistrictName: initialValues?.subDistrictName,
    districtName: initialValues?.districtName,
    stateName: initialValues?.stateName,
    country: initialValues?.country,
  });

  const renderGender = (value) =>
    value === 'male' ? 'Nam' : value === 'female' ? 'Nữ' : 'Khác';

  const redirectToEditProfile = () => {
    push(
      `/${locale}/profile/account-management/account-information?screen=edit`,
    );
  };

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain(`/users/${currentUser.id}`),
        method: 'get',
        onGotSuccess: (response) => {
          const initialValues = {
            ...response,
            fullName: ConverterUtils.getFullNameUser(response),
          };
          setInitialValues(initialValues);
        },
      },
    );
  }, []);

  const renderAccountInformation = [
    { label: t('profile.fullName'), value: initialValues?.fullName || '_' },
    {
      label: t('profile.dateOfBirth'),
      value: initialValues?.birthday
        ? moment(initialValues?.birthday).format('DD/MM/YYYY')
        : '_',
    },
    {
      label: t('profile.gender'),
      value: initialValues?.gender ? renderGender(initialValues?.gender) : '_',
    },
    { label: t('profile.phone'), value: initialValues?.tels?.[0]?.tel || '_' },
    {
      label: t('profile.emailAddress'),
      value: initialValues?.emails?.[0]?.email || '_',
    },
    { label: t('profile.contactAddress'), value: fullAddress },
  ];

  const renderBillingInformation = [
    { label: t('profile.bank'), value: initialValues?.bankName || '_' },
    {
      label: t('profile.branch'),
      value:
        (initialValues?.banks && initialValues?.banks[0]?.branchName) || '_',
    },
    {
      label: t('profile.accountNumber'),
      value:
        (initialValues?.banks && initialValues?.banks[0]?.bankAccount) || '_',
    },
  ];

  const renderAccountIdentifier = [
    { label: t('profile.IDNumber'), value: initialValues?.idNumber || '_' },
    {
      label: t('profile.dateRange'),
      value: initialValues?.identification?.issuedOn
        ? moment(initialValues?.identification?.issuedOn).format('DD/MM/YYYY')
        : '_',
    },
    {
      label: t('profile.issuedBy'),
      value: initialValues?.identification?.placeOfIssue || '_',
    },
  ];

  return (
    <div className="profile-info-detail-wrapper">
      <div className="profile-el-wrapper">
        <div className="profile-info-detail">
          <Row gutter={isMobile ? [16, 16] : [40, 40]}>
            <Col
              {...{ xs: 24, sm: 24, md: 16, lg: 16 }}
              className="profile-info-detail-left"
            >
              <div className="profile-title">
                {t('profile.accountInformation')}
              </div>
              {renderAccountInformation?.map((info) => (
                <ProfileInfoViewer
                  key={info?.label}
                  label={info?.label}
                  value={info?.value}
                />
              ))}

              {!isMobile && <br />}
              <div className="profile-title">
                {t('profile.billingInformation')}
              </div>
              {renderBillingInformation?.map((info) => (
                <ProfileInfoViewer
                  key={info?.label}
                  label={info?.label}
                  value={info?.value}
                />
              ))}
            </Col>

            <Col {...{ xs: 24, sm: 24, md: 8, lg: 8 }}>
              <div className="profile-title">
                {t('profile.accountIdentifier')}
              </div>
              {renderAccountIdentifier?.map((info) => (
                <ProfileInfoViewer
                  key={info?.label}
                  label={info?.label}
                  value={info?.value}
                />
              ))}

              <div className="profile-title-black">
                {t('profile.captureFrontAndBack')}
              </div>
              <Row gutter={[8, 8]} className="profile-info-detail-images">
                <Col {...{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <Image
                    width={'100%'}
                    src={
                      initialValues?.identification?.frontPhoto
                        ? initialValues?.identification?.frontPhoto?.url
                        : '/assets/images/cccd-front.svg'
                    }
                  />
                  <p>{t('profile.frontPhoto')}</p>
                </Col>
                <Col {...{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <Image
                    width={'100%'}
                    src={
                      initialValues?.identification?.frontPhoto
                        ? initialValues?.identification?.backSidePhoto?.url
                        : '/assets/images/cccd-back.svg'
                    }
                  />
                  <p>{t('profile.backSidePhoto')}</p>
                </Col>
                <Col {...{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <Image
                    width={'100%'}
                    src={
                      initialValues?.identification?.portrait
                        ? initialValues?.identification?.portrait?.url
                        : '/assets/images/portrait.svg'
                    }
                  />
                  <p>{t('profile.portrait')}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>

      <div className="profile-information-actions">
        <HButton type="primary" onClick={redirectToEditProfile}>
          {t('profile.updateInformation')}
        </HButton>
      </div>
    </div>
  );
};

export default ProfileInfoDetail;

const ProfileInfoViewer = ({ label, value }) => {
  return (
    <div className="profile-info-viewer">
      <span className="profile-info-viewer-label">{label}</span>
      <span className="profile-info-viewer-value">{value}</span>
    </div>
  );
};
