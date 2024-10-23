import { useState } from 'react';
import { Button, Checkbox, notification } from 'antd';
import Scrollbars from 'react-custom-scrollbars-2';
import { useRouter } from 'next/router';
import { useHTranslation } from '../../../../../lib/i18n';
import { endpoints } from '../../../../../lib/networks/endpoints';

import { HModal } from '../../../../shared/common/h-modal';
import { FormUtils } from '../../../../../schema-form/utils/form-utils';

import HomeLoanListItem from '../../../../shared/client/home-loan-list/home-loan-list.item';
import {
  useClientDataSource,
  useClientDocumentDetail,
} from '../../../../../schema-form/client-features/hooks/client-feature-hook';
import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';
import ClientFeatureProvider from '../../../../../schema-form/client-features/providers/client-feature-provider';
import ClientFeatureSearchForm from '../../../../../schema-form/client-features/search-form/client-feature-search-form';

export const CreditOfferLetterModal = (props) => {
  const { push } = useRouter();
  const { t } = useHTranslation('admin-common');
  const { isVisibleCreateDeal = false, setIsVisibleCreateDeal ,searchForm } = props;
  const taskData = useClientDocumentDetail();
  const [selectedLoanProduct, setSelectedLoanProduct] = useState<any>([]);

  const handleCreateDeal = (task) => {
    FormUtils.submitForm({ task: taskData, dealDetails: selectedLoanProduct }, {
      showSuccessMessage: false,
      onGotSuccess: () => {
        notification.success({
          message: t('You have successfully created a loan application. Fina staff will contact you as soon as possible.', {
            vn: 'Bạn đã tạo hồ sơ vay thành công. Nhân viên Fina sẽ liên lạc với bạn trong thời gian sớm nhất.',
          }),
        });
        push('/thu-chao-tin-dung/thanh-cong');
      },
      method: 'post',
      nodeName: 'deals/public/create-deal-for-client',
    });
  };

  return (
    <HModal{...{
      title: t('Đánh giá khả năng cho vay'),
      visible: isVisibleCreateDeal,
      onCancel: () => {
        setIsVisibleCreateDeal(false);
      },
      centered: true,
      width: '1200px',
      onOk: () => {
        setIsVisibleCreateDeal(false);
        handleCreateDeal(taskData);
      },
      footer: (
        <Button {...{
          type: 'primary',
          onClick: () => {handleCreateDeal(taskData);},
        }}>
						Xác nhận
        </Button>
      ),
    }}>
      <CreditOfferLetterBankRecommendation {...{
        taskId: taskData?.id,
        setSelectedLoanProduct,
      }}/>
    </HModal>
  );
};


const CreditOfferLetterBankRecommendationList = ({ setSelectedLoanProduct }) => {
  const dataSource = useClientDataSource();

  return (
    <Checkbox.Group onChange={setSelectedLoanProduct} className="credit-offer-letter-bank-recomend-list">
      {dataSource?.map((loanData, index) => (
        <div key={`home-loan-list-item-${index}`}>
          <HomeLoanListItem  {...{
            loanData,
            className: 'credit-offer-letter-loan-item',
          }} />
          <div className={'flex justify-center m-t-10 m-b-10'}>
            <Checkbox value={loanData} />
          </div>
        </div>
      ))}
    </Checkbox.Group>
  );
};

const CreditOfferLetterBankRecommendation = ({ taskId, setSelectedLoanProduct }) => {
  return (
    <CreditOfferLetterBodyContainer title="Gói vay đề xuất">
      <ClientFeatureProvider {...{
        endpoint: endpoints.endpointWithApiDomain(`/product-details/public/banks-feed-backs/${taskId}`),
        initialFetching: true,
      }}>
        <ClientFeatureSearchForm {...{
          withRelations: ['product', 'org'],
          hideControlButton: true,
        }} />
        <Scrollbars {...{
          autoHeight: true,
          autoHeightMax: 300,
        }}>
          <CreditOfferLetterBankRecommendationList {...{
            setSelectedLoanProduct,
          }}/>
        </Scrollbars>
      </ClientFeatureProvider>
    </CreditOfferLetterBodyContainer>
  );
};
