import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useEffect, useState } from 'react';
import { IS_INSURED } from '../constants';
import { StaffSchemaForm } from './form-staff';

import '../product-detail-insurance.module.scss';

const ContractHolderInformation = ({
  form,
  customers,
  setCustomers,
  setStepBuyInsurance,
  setCustomerDetail,
  totalAmount,
  isCollaborator,
}) => {
  const { t } = useHTranslation('common');
  const [isInsured, setIsInsured] = useState(false);
  const [isDisabledCheckbox, setIsDisabledCheckbox] = useState(true);
  const handleChangeInsured = (e) => setIsInsured(e.target.checked);

  useEffect(() => {
    const valueInsured = {
      ...form.getFieldsValue()?.staffInfo,
      id: IS_INSURED,
    };
    const indexInsured = customers?.findIndex(
      (customer) => customer?.id === IS_INSURED,
    );

    if (isInsured && indexInsured < 0) {
      setCustomers([valueInsured, ...customers]);
    } else {
      const newCustomers = customers.filter(
        (customer) => customer?.id !== IS_INSURED,
      );
      setCustomers([...newCustomers]);
    }
  }, [isInsured]);

  const handleBuyInsurance = async () => {
    try {
      const values = await form.validateFields();
      if (values) {
        setStepBuyInsurance(1);
      }
    } catch (e) {
      FormUtils.showFormValidateFailMessage();
    }
  };

  const onValuesChange = (_, allValues) => {
    const mustValidatedArray = [
      'fullName',
      'dateOfBirth',
      'gender',
      'idNumber',
      'email',
      'tel',
    ];
    const isValid = mustValidatedArray.every((field) => {
      const value = allValues?.staffInfo?.[field] || '';
      return !!value?.toString().trim();
    });

    setIsDisabledCheckbox(!isValid);
    setIsInsured(isValid);
  };

  return (
    <>
      <h2 className="buying-insurance-modal-title">Thông tin chủ hợp đồng</h2>
      <HForm
        {...{
          form,
          schema: () => [...StaffSchemaForm()],
          removeControlActions: true,
          transport: { form },
          onValuesChange: onValuesChange,
        }}
      />

      <div className="buying-insurance-modal-actions">
        <HButton type="primary" onClick={() => handleBuyInsurance()}>
          Tiếp tục
        </HButton>
      </div>
    </>
  );
};

export default ContractHolderInformation;
