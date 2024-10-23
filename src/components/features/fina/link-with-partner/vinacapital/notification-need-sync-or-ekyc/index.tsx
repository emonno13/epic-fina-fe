import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Spin } from 'antd';
import { createContext, useContext, useEffect, useState } from 'react';
import { vinaCapitalTabPaneKeys } from '../../constants';
import { VinaCapitalManagementContext } from '../context/context';

import './notification-need-sync-or-ekyc.module.scss';

export const NotificationNeedSyncOrEkycLayoutContext = createContext<{
  investmentNumber: string | undefined;
  contractFileUrlMio: string | undefined;
  setContractFileUrlMio: Function;
}>({
  investmentNumber: undefined,
  contractFileUrlMio: undefined,
  setContractFileUrlMio: (value: string) => {},
});
export const NotificationNeedSyncOrEkycLayout = ({
  children,
  noEkycContent = <NotificationNeedSyncOrEkyc />,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [investmentNumber, setInvestmentNumber] = useState();
  const [contractFileUrlMio, setContractFileUrlMio] = useState();

  useEffect(() => {
    setLoading(true);
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.endpointWithApiDomain('/me'),
        onGotSuccess: (response) => {
          setLoading(false);
          setInvestmentNumber(response?.investmentNumber);
          setContractFileUrlMio(response?.contractFileUrlMio);
        },
        onGotError: () => {
          setLoading(false);
          setInvestmentNumber(undefined);
          setContractFileUrlMio(undefined);
        },
        hiddenValues: {
          filter: {
            fields: ['id', 'investmentNumber', 'contractFileUrlMio'],
          },
        },
      },
    );
  }, []);

  if (loading)
    return (
      <Spin spinning={loading}>
        <div style={{ width: '100%', height: '100px' }} />
      </Spin>
    );

  return (
    <NotificationNeedSyncOrEkycLayoutContext.Provider
      value={{ investmentNumber, contractFileUrlMio, setContractFileUrlMio }}
    >
      {investmentNumber && contractFileUrlMio ? children : noEkycContent}
    </NotificationNeedSyncOrEkycLayoutContext.Provider>
  );
};

export default NotificationNeedSyncOrEkycLayout;

const NotificationNeedSyncOrEkyc = () => {
  const { t } = useHTranslation('admin');
  const { setTabActive } = useContext(VinaCapitalManagementContext);

  return (
    <>
      <div className="notification-need-sync-or-ekyc">
        <div className="notification-need-sync-or-ekyc__msg">
          {t(
            'Please do E-KYC or sync your account with Vina Capital system to see this information',
            {
              vn: 'Tài khoản chưa được xác thực. Quý khách vui lòng thực hiện E-KYC & Ký hợp đồng điện tử hoặc đồng bộ tài khoản với hệ thống Vina Capital để thấy thông tin này',
            },
          )}
        </div>
        <div className="notification-need-sync-or-ekyc__group-btn">
          <Button
            type="primary"
            onClick={() => {
              setTabActive(vinaCapitalTabPaneKeys.EKYC);
            }}
          >
            {t('Go to E-KYC page/E-sign', {
              vn: 'Tới trang E-KYC & Ký hợp đồng điện tử',
            })}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setTabActive(vinaCapitalTabPaneKeys.ACCOUNT_SYNC);
            }}
          >
            {t('Go to account sync page', { vn: 'Tới trang đồng bộ TK' })}
          </Button>
        </div>
      </div>
    </>
  );
};
