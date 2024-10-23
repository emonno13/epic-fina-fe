import { endpoints } from '@lib/networks/endpoints';
import { HForm } from '@schema-form/h-form';
import { useTranslation } from 'react-i18next';
import { InfoCustomer, StaffSchemaForm } from './form-staff';

export const StepOne = (props) => {
  const { t } = useTranslation('common');
  const { data, form } = props;
  const { listPackageStaff, listPackageRelative } = props?.package;

  const changeTypePackage = (value, index) => {
    const formValue = { ...form.getFieldsValue() };
    const customers = [...formValue?.customers];
    const customer = formValue?.customers[index];

    if (value !== customer?.employeeBuy) {
      delete customer?.package;
    }

    const newCustomer = { ...customer, employeeBuy: value };
    customers.splice(index, 1, newCustomer);
    form.setFieldsValue({
      ...formValue,
      customers,
    });
  };

  return (
    <div>
      <HForm
        {...{
          endpoint: endpoints.endpointWithApiDomain(
            '/participate-insurances/public',
          ),
          method: 'post',
          useDefaultMessage: true,
          form,
          schema: () => {
            return [
              ...StaffSchemaForm(),
              ...InfoCustomer(
                t,
                { listPackageStaff, listPackageRelative },
                changeTypePackage,
                form,
              ),
            ];
          },
          removeControlActions: true,
          transport: {
            form,
          },
          onDataReadyToSubmit: (value) => {
            return value;
          },
          onGotSuccess: () => {
            //
          },
        }}
      />
    </div>
  );
};

export default StepOne;
