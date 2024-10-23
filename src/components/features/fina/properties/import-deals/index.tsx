import { ImportData } from '@components/shared/common/import-data';
import UserPreview from './preview';

export default (props) => {
  return (
    <div className="deals-loans-import-deals">
      <ImportData
        {...{
          ...props,
          model: 'Property',
          endpoint: '/properties/import',
          PreviewComponent: UserPreview,
        }}
      />
    </div>
  );
};
