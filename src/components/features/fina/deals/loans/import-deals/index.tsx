import { ImportData } from '@components/shared/common/import-data';
import UserPreview from './preview';

import './import-deals.scss';

export default (props) => {
  return (
    <div className="deals-loans-import-deals">
      <ImportData
        {...{
          ...props,
          model: 'Deal',
          endpoint: '/deals/import',
          PreviewComponent: UserPreview,
        }}
      />
    </div>
  );
};
