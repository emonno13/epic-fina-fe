import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { AnyObject } from '../atom/type';

export function usePutUnclassifiedFile() {
  return ({
    fileDocument,
    onGotSuccess,
    onGotError,
  }: {
    fileDocument: AnyObject;
    onGotSuccess?: (response: AnyObject) => void;
    onGotError?: (error: AnyObject) => void;
  }) => {
    FormUtils.submitForm(
      {
        documentId: 'unSelected',
        objectId: fileDocument.objectId,
        objectType: fileDocument.objectType,
        objectSubType: fileDocument.objectSubType,
      },
      {
        method: 'PUT',
        endpoint: endpoints.endpointWithApiDomain(
          `/document-template-files/${fileDocument.id}`,
        ),
        onGotSuccess: onGotSuccess,
        onGotError: onGotError,
      },
    );
  };
}
