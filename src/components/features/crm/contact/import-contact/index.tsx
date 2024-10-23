import { ImportData } from '@components/shared/common/import-data';
import UserPreview from './preview';
const FILE_NAME_EXAMPLE_CONTACT_IMPORT = 'import-contact-example.xlsx';
const ImportContacts = (props) => {
  return (
    <ImportData
      {...{
        ...props,
        model: 'Contact',
        endpoint: '/contacts/import',
        PreviewComponent: UserPreview,
        fileNameExample: FILE_NAME_EXAMPLE_CONTACT_IMPORT,
      }}
    />
  );
};

export default ImportContacts;
