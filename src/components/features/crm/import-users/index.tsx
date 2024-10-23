import UserPreview from './preview';
import { ImportData } from '../../../shared/common/import-data';

const ImportUsersData = props => {
  return (
    <ImportData
      {...{
        ...props,
        model: 'User',
        endpoint: '/users/import-template',
        PreviewComponent: UserPreview,
      }}
    />
  );
};

export default ImportUsersData;
