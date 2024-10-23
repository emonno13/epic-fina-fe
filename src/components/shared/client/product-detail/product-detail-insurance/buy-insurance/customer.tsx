import { ClickableOpacity } from '@components/shared/utils/clickable-opacity';
import { IconTrackLargeSvg } from 'icons';
import { PenIcon } from 'icons/rsvgs/pen-icon';
import { IS_INSURED } from '../constants';

import '../product-detail-insurance.module.scss';

const Customer = ({
  data,
  index,
  customers,
  setCustomers,
  setStepBuyInsurance,
  setCustomerDetail,
  setIsInsured,
}) => {
  const removeCustomer = () => {
    const newCustomers = customers.filter((customer, i) => i !== index);

    if (data?.id === IS_INSURED) {
      setIsInsured(false);
    }

    setCustomers([...newCustomers]);
  };

  const editCustomer = () => {
    setStepBuyInsurance(1);
    setCustomerDetail({ ...data, index });
  };

  return (
    <div className="buy-insurance-customer">
      <div className="buy-insurance-customer-name">
        {data?.fullName}
        <ClickableOpacity onClick={() => editCustomer()}>
          <PenIcon />
        </ClickableOpacity>
      </div>
      <IconTrackLargeSvg onClick={() => removeCustomer()} />
    </div>
  );
};

export default Customer;
