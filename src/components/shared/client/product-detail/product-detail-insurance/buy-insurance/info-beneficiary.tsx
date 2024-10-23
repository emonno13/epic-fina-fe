import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Form } from 'antd';
import { useEffect } from 'react';
import { InfoBeneficiaryListSchemaForm } from './form-staff';

import '../product-detail-insurance.module.scss';

const InfoBeneficiary = ({
  setStepBuyInsurance,
  customers,
  setCustomers,
  packages,
  customerDetail,
  setCustomerDetail,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (customers?.length) {
      const employeeBuy = customers?.[0]?.employeeBuy;
      const packageC = customers?.[0]?.package;
      const subCustomers = customers;

      form.setFieldsValue({ employeeBuy, package: packageC, subCustomers });
    }
  }, [form, customers, customerDetail]);

  const handleUpdateCustomers = async () => {
    try {
      const values = await form.validateFields();

      const newCustomers = values?.subCustomers?.map((c) => ({
        dateOfBirth: c?.dateOfBirth,
        dateOfIdentifyCard: c?.dateOfIdentifyCard,
        employeeBuy: values?.employeeBuy,
        fullName: c?.fullName,
        gender: c?.gender,
        idNumber: c?.idNumber,
        package: values?.package,
        relationship: c?.relationship,
        tel: c?.tel,
        whereOfIdentifyCard: c?.whereOfIdentifyCard,
      }));

      if (!customerDetail) {
        setCustomers([...newCustomers]);
      } else {
        const itemsChanged = customers.map((customer, i) =>
          i === customerDetail?.index
            ? { ...values, id: customer?.id }
            : customer,
        );
        setCustomers([...itemsChanged]);
      }
      setStepBuyInsurance(2);
    } catch (e) {
      FormUtils.showFormValidateFailMessage();
    }
  };

  return (
    <>
      <HForm
        {...{
          form,
          schema: InfoBeneficiaryListSchemaForm,
          hideControlButton: true,
          transport: { packages },
        }}
      />

      <div className="buying-insurance-modal-actions">
        <HButton type="primary" onClick={() => handleUpdateCustomers()}>
          Tiếp tục
        </HButton>
      </div>
    </>
  );
};

export default InfoBeneficiary;
