import LinkWithVinaCapital from '@components/features/fina/link-with-partner';
import { ReactNode } from 'react';
import { AdvancedInformation } from '../advanced';
import ChangePassword from '../change-password';
import { PROFILE_SCREEN } from '../constanst';
import Investment from '../investment';
import { MyTransaction } from '../my-transaction';
import ProfileDocument from '../profile-document';
import { CollaboratorContract } from '../profile-routes';
import Referrer from '../referrer';
import SettingManager from '../settings';
import StructureOrganization from '../structure-organization';
import TransactionManagement from '../transaction-management';
import Transactions from '../transactions';
import { UserInformation } from '../user-information';
import { UserRating } from '../user-rating';

export const ProfileTitle = ({
  children,
  description,
}: {
  description?: string | ReactNode;
  children: any;
}) => {
  return (
    <h3>
      {children}
      <span>{description}</span>
      <style jsx>{`
        h3 {
          font-size: 24px;
          line-height: 32px;
          font-weight: 600;
          border-bottom: 3px solid #333;
          margin-bottom: 24px;
          padding: 8px 0;
        }
        span {
          font-size: 14px;
          line-height: 22px;
        }
      `}</style>
    </h3>
  );
};

export const PlayerScreen = ({ screen }) => {
  switch (screen) {
    case PROFILE_SCREEN.INFORMATION:
      return (
        <>
          <div className={'user-information'}>
            <UserInformation />
          </div>
        </>
      );
    case PROFILE_SCREEN.INVEST_TRANSACTION:
      return (
        <>
          <ProfileTitle>
            <div>Quản lý tài sản</div>
          </ProfileTitle>
          <Investment />
        </>
      );
    case PROFILE_SCREEN.LINK_INFORMATION:
      return (
        <>
          <LinkWithVinaCapital />
        </>
      );
    case PROFILE_SCREEN.HISTORY_TRANSACTION:
      return (
        <>
          <ProfileTitle>
            <div>{'Giao dịch của tôi'}</div>
          </ProfileTitle>
          <TransactionManagement />
        </>
      );
    case PROFILE_SCREEN.CHANGE_PASSWORD:
      return (
        <>
          {/* <ProfileTitle>
            <div>{'Thông tin bảo mật'}</div>
          </ProfileTitle> */}
          <ChangePassword />
        </>
      );
    case PROFILE_SCREEN.DOCUMENT:
      return (
        <>
          <ProfileTitle>
            <div>{'Tài liệu của tôi'}</div>
          </ProfileTitle>
          <ProfileDocument />
        </>
      );
    case PROFILE_SCREEN.CONTRACT:
      return (
        <>
          <CollaboratorContract />
        </>
      );
    case PROFILE_SCREEN.ORGANIZATION:
      return (
        <>
          <ProfileTitle>
            <div>{'Thông tin tổ chức'}</div>
          </ProfileTitle>
          <StructureOrganization />
        </>
      );
    case PROFILE_SCREEN.SETTING:
      return (
        <>
          <ProfileTitle>
            <div>{'Cài đặt'}</div>
          </ProfileTitle>
          <div className={'user-information'}>
            <UserInformation />
          </div>
          <SettingManager />
        </>
      );
    case PROFILE_SCREEN.PROFESSIONAL:
      return (
        <>
          <ProfileTitle>
            <div>{'Thông tin nâng cao'}</div>
          </ProfileTitle>
          <AdvancedInformation />
        </>
      );
    case PROFILE_SCREEN.RATE:
      return (
        <>
          <ProfileTitle>
            <div>{'Thống kê đánh giá'}</div>
          </ProfileTitle>
          <UserRating />
        </>
      );
    case PROFILE_SCREEN.TRANSACTION:
      return (
        <>
          <ProfileTitle>
            <div>{'Quản lý hồ sơ'}</div>
          </ProfileTitle>
          <MyTransaction />
        </>
      );
    case PROFILE_SCREEN.REFERRER:
      return (
        <>
          <ProfileTitle>
            <div>{'Thông tin người giới thiệu'}</div>
          </ProfileTitle>
          <Referrer />
        </>
      );
    case PROFILE_SCREEN.TRANSACTIONS:
      return (
        <>
          <ProfileTitle>
            <div>{'Giao dịch của tôi'}</div>
          </ProfileTitle>
          <Transactions />
        </>
      );
    default:
      return <></>;
  }
};
