import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';
import { setDocumentFragments } from '@schema-form/features/actions';
import { notification } from 'antd';

export const CommentUtils = {
  addCommentWithDocumentHasRelation: async (
    document: any,
    featureId: string,
    dispatch,
  ) => {
    if (!document?.id) return;
    const data = await httpRequester.getDataFromApi({
      url: endpoints.endpointWithApiDomain(
        `/comments/${featureId}/${document.id}`,
      ),
    });
    if (data.error) return;
    dispatch(
      setDocumentFragments({
        featureId,
        documentFragments: { comments: data },
      }),
    );
  },
  copyToClipboard: (value: string, msgSuccess?: string) => {
    const textareaTemporary = document.createElement('textarea');
    textareaTemporary.value = value;
    document.body.appendChild(textareaTemporary);
    textareaTemporary.select();
    document.execCommand('copy');
    document.body.removeChild(textareaTemporary);
    notification.success({ message: msgSuccess || 'copied!' });
  },
};
