import React, { useEffect, useState } from 'react';
import { AlignLeftOutlined, BankOutlined, PhoneOutlined } from '@ant-design/icons';
import { Col, Divider, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { useHTranslation } from '../../../../lib/i18n';
import { LabelItem } from '../../../shared/common/h-label/h-label-title';
import { ItemViewer } from '../../../shared/common/configuration/item-viewer';
import { PreViewUser } from '../../fina/deals/deals-component-common/preview-user';
import { useCurrentUser } from '../../../../lib/providers/auth';
import { requestInformationOrganizations } from '../../../../store/actions';

import './structure-organization.module.scss';


const StructureOrganization = () => {
  const currentUser = useCurrentUser();
  const dispatch = useDispatch();
  const [organization, setOrganization] = useState() as any;
  const [userAdmins, setUserAdmins] = useState([]) as any;
  const [usersOrg, setUsersOrg] = useState([]) as any;
  useEffect(() => {
    dispatch(requestInformationOrganizations({
      orgId: currentUser?.orgId,
      callback: (response) => {
        setOrganization(response?.organization || {});
        setUserAdmins(response.userAdmins || []);
        setUsersOrg(response?.usersOrg || []);
      },
    }));
  }, []);
  const { t } = useHTranslation('admin-common');
  return (
    <div className={'user-information_form'}>
      <div className={'user-information_form-content'}>
        <div className={'structure-organization'}>
          <div className={'structure-organization__avatar'}>
            <div className={'structure-organization__avatar-image'}
              style={{ backgroundImage: `url(${organization?.avatar?.url || '/assets/images/photo.png'})` }}/>
          </div>
          <div className={'structure-organization__content'}>
            <div className={'structure-organization__content-org'}>
              <LabelItem label={t('Org name', { vn: 'Tên tổ chức' })}
                firstIcon={<AlignLeftOutlined/>} titleTooltip={t('Org name', { vn: 'Tên tổ chức' })}/>
              <p>{organization?.name}</p>
            </div>
            <div className={'structure-organization__content-description'}>
              <LabelItem label={t('Information', { vn: 'Giới thiệu' })}
                firstIcon={<AlignLeftOutlined/>} titleTooltip={t('Information', { vn: 'Giới thiệu' })}/>
              <p>{organization?.note}</p>
            </div>
            <div className={'structure-organization__content-metadata'}>
              <div className={'structure-organization__content-metadata-contact'}>
                <LabelItem label={t('Contact', { vn: 'Thông tin liên hệ' })}
                  firstIcon={<AlignLeftOutlined/>} titleTooltip={t('Contact', { vn: 'Thông tin liên hệ' })}/>
                {organization?.address && <ItemViewer {...{
                  label: <BankOutlined/>,
                  tooltipContent: t('Address'),
                  value: organization.address,
                  className: 'm-t-20',
                  style: { textAlign: 'center', justifyContent: 'center' },
                }}/>}
                {/*<ItemViewer {...{*/}
                {/*	label: <GlobalOutlined/>,*/}
                {/*	tooltipContent: t('Website'),*/}
                {/*	value: 'https://fina.com.vn/vn',*/}
                {/*	style: {textAlign: 'center', justifyContent: 'center'},*/}
                {/*}}/>*/}
                {organization?.tels && <ItemViewer {...{
                  label: <PhoneOutlined/>,
                  tooltipContent: t('Tel'),
                  value: organization.tels?.[0]?.tel || '',
                  style: { textAlign: 'center', justifyContent: 'center' },
                }}/>}
              </div>
            </div>
            <Divider orientation="left">{t('Member', { vn: 'Thành viên' })}</Divider>
            <div className={'structure-organization__content-member'}>
              <div className={'structure-organization__content-member-admin'}>
                <LabelItem label={t('Admin')}
                  firstIcon={<AlignLeftOutlined/>} titleTooltip={t('Admin')}/>
                <div className={'structure-organization__content-member-admin-data'}>
                  <Row gutter={24}>
                    {userAdmins?.map((user: any) => {
                      return <Col key={user?.id} className="gutter-row"
                        xs={{ span: 24 }}
                        sm={{ span: 12 }}
                        md={{ span: 8 }}><PreViewUser {...{ onEditDocument: false, user }}/></Col>;
                    })}
                  </Row>
                </div>
              </div>
              <div className={'structure-organization__content-member-admin'}>
                <LabelItem label={t('Membe', { vn: 'Thành viên' })}
                  firstIcon={<AlignLeftOutlined/>} titleTooltip={t('Membe', { vn: 'Thành viên' })}/>
                <div className={'structure-organization__content-member-admin-data'}>
                  <Row gutter={16}>
                    {usersOrg?.map((user: any) => {
                      return <Col key={user?.id} className="gutter-row"
                        xs={{ span: 24 }}
                        sm={{ span: 12 }}
                        md={{ span: 8 }}><PreViewUser {...{ onEditDocument: false, user }}/></Col>;
                    })}
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructureOrganization;
