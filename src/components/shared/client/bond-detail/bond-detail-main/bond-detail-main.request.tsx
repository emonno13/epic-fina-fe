import { Button, Col, Divider, Row } from 'antd';
import Image from 'next/image';
import { FC, useState } from 'react';
import { useHTranslation } from '@lib/i18n';
import { useSelectedProductProgram } from '@components/features/client/fund-certificate/detail/hooks';
import BuyFundAction from '@components/features/client/fund-certificate/buy-fund-action';
import { useNoProgramSelectNotification } from '@components/features/client/fund-certificate/detail/common';
import { ClientFundCertificateRequestCounselling } from '@components/features/client/fund-certificate/detail/client-fund-certificate-request-counselling';
import ClientBondTransactionForm from '../../bond-list/bond-list-main/bond-list-main.form-transaction';

import './bond-detail-main.request.module.scss';

export const TYPE_REQUEST_COUNSELLING = {
  BOND: 'BOND',
  FUND: 'FUND',
};

interface ClientBondDetailRequestProps {
  type: string;
  data: any;
}

const ClientRequestCounselling: FC<ClientBondDetailRequestProps> = ({
  data,
  type,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { t } = useHTranslation('common');
  const selectedProductProgram = useSelectedProductProgram();
  const noProductProgramNotification = useNoProgramSelectNotification();

  const handleClickBuy = () => {
    const selectProductProgramNode = document.querySelector(
      '#select-product-program',
    );
    if (!selectedProductProgram) {
      selectProductProgramNode?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      noProductProgramNotification();
      return false;
    }
    return true;
  };

  return (
    <>
      <div className={'bond-detail--request'}>
        <div className={'bond-detail--request__header'}>
          <Row gutter={[16, 16]}>
            <Col span={7.5} className={'bond-detail--request__header__logo'}>
              <Image
                src={'/assets/images/bond.fina-logo.png'}
                layout={'responsive'}
                width={1}
                height={1}
                alt={'fina-logo'}
              />
            </Col>
            <Col span={16.5} className={'bond-detail--request__header__title'}>
              <h2 className={'bond-detail--request__header__title--main'}>
                {t('Contact', { vn: 'Liên hệ tư vấn' })}
              </h2>
              <div
                className={'bond-detail--request__header__title--description'}
              >
                {t('Consultants are ready to help', {
                  vn: 'Chuyên viên tư vấn đã sẵn sàng hỗ trợ',
                })}
              </div>
            </Col>
          </Row>
        </div>
        <div className={'bond-detail--request-actions'}>
          {type === TYPE_REQUEST_COUNSELLING.FUND && (
            <>
              <BuyFundAction
                {...{
                  data,
                  text: 'Đầu tư ngay',
                  beforeHandleClickBuy: handleClickBuy,
                  className: 'w-full form-info-fund-action-buy',
                }}
              />
              <Divider orientation="center">{t('Or', { vn: 'Hoặc' })}</Divider>
            </>
          )}
          <Button
            className={'form-info-fund-action-buy w-full'}
            onClick={() => setVisible(true)}
            size="large"
          >
            {t('Request consultation', { vn: 'Yêu cầu tư vấn' })}
          </Button>
        </div>
      </div>

      {type === TYPE_REQUEST_COUNSELLING.BOND && (
        <ClientBondTransactionForm
          visible={visible}
          closeModal={() => setVisible(false)}
          bondData={data}
        />
      )}
      {type === TYPE_REQUEST_COUNSELLING.FUND && (
        <ClientFundCertificateRequestCounselling
          visible={visible}
          closeModal={() => setVisible(false)}
          fundData={data}
        />
      )}
    </>
  );
};

export default ClientRequestCounselling;
