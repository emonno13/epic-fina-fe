import { ItemViewer } from '@components/shared/common/configuration/item-viewer';
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { notification } from 'antd';

export const RegisterInsuranceUtils = {
  renderUser: ({ fullName, email, phone, sex, t }: any) => {
    const userDocuments = [
      { label: `${t('Full name')}: `, value: fullName },
      { label: `${t('Email')}: `, value: email },
      { label: `${t('Phone')}: `, value: phone },
      { label: `${t('Gender')}: `, value: sex },
    ];
    return (
      <div>
        {userDocuments?.map((el, index) => {
          return el?.value ? (
            <ItemViewer
              key={`${el?.label}-${index}`}
              {...{
                value: el.value,
                label: el?.label,
              }}
            />
          ) : (
            <></>
          );
        })}
      </div>
    );
  },
};

export const createCertificateByDealInsurance = async (
  deal,
  setDocumentDetail,
) => {
  await FormUtils.submitForm(deal, {
    endpoint: endpoints.generateNodeEndpoint(
      `deals/${deal?.id}/create-certificate`,
    ),
    method: 'put',
    onGotSuccess: (deal) => {
      setDocumentDetail(deal);
      notification.success({
        message: 'Thành công',
        description: 'Đã tạo giấy chứng nhận',
      });
    },
  });
};
