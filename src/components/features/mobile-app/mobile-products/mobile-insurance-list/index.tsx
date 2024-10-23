import { MobileUtils } from '@lib/utils/mobile';
import { useTableSourceData } from '@schema-form/features/hooks';
import { useEffect } from 'react';
import MobileProductItem from './mobile-insurance-item';

const MobileInsuranceList = () => {
  const dataSource = useTableSourceData();
  const checkShouldDisplayData = MobileUtils.checkDisplayInsurances();

  if (!checkShouldDisplayData) {
    return null;
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderData = dataSource?.map((data, index) => {
    return (
      <MobileProductItem
        key={`insurance-item-${index}-${data.id}`}
        data={data}
      />
    );
  });

  return <div>{renderData}</div>;
};

export default MobileInsuranceList;
