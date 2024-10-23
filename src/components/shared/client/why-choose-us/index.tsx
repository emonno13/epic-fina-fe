import ClientWhyChooseUsBottom from './why-choose-bottom';
import ClientWhyChooseUsTop from './why-choose-us.top';

import './why-choose-us.module.scss';

const ClientWhyChooseUs = () => {
  return (
    <div className="client-why-choose-us">
      <ClientWhyChooseUsTop />
      <ClientWhyChooseUsBottom />
    </div>
  );
};

export default ClientWhyChooseUs;