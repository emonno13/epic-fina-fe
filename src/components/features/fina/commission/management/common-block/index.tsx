import { LabelItem } from '../../../../../shared/common/h-label/h-label-title';

import './common-block.module.scss';

export const GroupInformation = ({ title = '', children }) => {
  return (
    <div className={'group-information'}>
      <LabelItem {...{
        label: title,
        titleTooltip: title,
      }}/>
      <div className={'group-information__content m-t-10'}>{children}</div>
    </div>
  );
};

export const GroupInformationItem = ({ label = '', value }) => {
  return (
    <p><strong>{label}:</strong> {value}</p>
  );
};
