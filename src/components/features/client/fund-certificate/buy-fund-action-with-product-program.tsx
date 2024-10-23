import { HModal } from '@components/shared/common/h-modal';
import { Button } from 'antd';
import { useState } from 'react';
import BuyFundAction from './buy-fund-action';
import { ProgramsFund } from './detail/client-fund-certificate-detail';
import { useNoProgramSelectNotification } from './detail/common';
import { useSelectedProductProgram } from './detail/hooks';

export const BuyFundActionWithProductProgram = ({ text = 'Mua', data }) => {
  const [isShowPrograms, setIsShowPrograms] = useState(false);
  const selectedProductProgram = useSelectedProductProgram();
  const noSelectedProductProgramNotification = useNoProgramSelectNotification();

  const handleBeforeBuy = () => {
    if (!selectedProductProgram) {
      noSelectedProductProgramNotification();
      return false;
    }
    setIsShowPrograms(false);
    return true;
  };

  return (
    <>
      <Button
        type={'primary'}
        className={'buy-fund-action'}
        onClick={() => setIsShowPrograms(true)}
      >
        {text ? text : 'Mua'}
      </Button>
      <HModal
        onCancel={() => setIsShowPrograms(false)}
        visible={isShowPrograms}
        footer={null}
        maskClosable={false}
      >
        <ProgramsFund fund={data} />
        <div className="buy-btn-select">
          <BuyFundAction
            {...{
              data,
              text: 'Chọn chương trình',
              className: 'form-info-fund-action-buy m-t-20',
              beforeHandleClickBuy: handleBeforeBuy,
            }}
          />
        </div>
      </HModal>
      <style jsx>{`
        .buy-btn-select {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};
