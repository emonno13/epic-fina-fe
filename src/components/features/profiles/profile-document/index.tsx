import Cookies from 'js-cookie';

import DocumentManagement from '../../../shared/documents';
import { usePublicEnvironment } from '../../../../system/hooks';
const ProfileDocument = (props) => {
  const currentUser = Cookies.getJSON('h2user');
  const userId = props?.userId || currentUser.id;

  const userProfileTemplateDocumentCode = usePublicEnvironment('USER_DOCUMENT_TEMPLATE_CODE');

  return (
    <DocumentManagement {...{
      objectId: userId,
      objectType: 'user',
      documentTemplateCode: userProfileTemplateDocumentCode,
    }}/>
  );
};

export default ProfileDocument;
