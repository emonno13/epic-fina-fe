import { setGlobalMessages } from '@store/actions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getDocument } from '../../common/actions';
import { FormUtils, getFilterWithRelations } from '../../utils/form-utils';
import { setDocumentDetail } from '../actions';
import { useDocumentDetail } from './document-detail-hooks';
import { useApiEndpoint, useFeature } from './feature-hooks';

interface GetApiDataParamsProps {
  endpoint?: string;
  nodeName?: string;
  withRelations?: string[];
  params?: object;
  featureId?: string;
  documentId?: string;
  callback?: any;
  namespace?: string;
  filter?: object;
  documentDetailVisibility?: boolean;
}

export function useGetApiData() {
  const dispatch = useDispatch();
  const feature = useFeature();
  const featureApiEndpoint = useApiEndpoint();
  const documentDetail = useDocumentDetail();
  return (props?: GetApiDataParamsProps) => {
    const {
      endpoint,
      nodeName,
      withRelations,
      params = {},
      documentId = documentDetail?.id,
      featureId,
      callback = (data) => {},
      namespace,
      documentDetailVisibility = true,
    } = props || {};
    const onSuccess = (data) => {
      callback(data);
      if (!feature.featureId && !featureId) {
        return;
      }
      dispatch(
        setDocumentDetail({
          featureId: featureId || feature.featureId,
          documentDetail: data,
          namespace,
          documentDetailVisibility,
        }),
      );
    };
    let apiEndpoint = FormUtils.getNodeEndpoint(
      {
        documentId,
        nodeName: nodeName || feature.nodeName,
        endpoint: endpoint || feature.endpoint,
      },
      true,
    );
    apiEndpoint = apiEndpoint || featureApiEndpoint || '';
    const allParams = {
      ...params,
      filter: { include: getFilterWithRelations(withRelations) },
    };
    dispatch(
      getDocument({
        params: allParams,
        endpoint: apiEndpoint,
        callback: onSuccess,
      }),
    );
  };
}

export const useGetDocumentDetail = useGetApiData;

export const useGlobalMessages = () => {
  return useSelector((state: RootStateOrAny) => state?.common?.globalMessages);
};

export const useSetGlobalMessages = () => {
  const dispatch = useDispatch();

  return (payload: any) => {
    dispatch(setGlobalMessages(payload));
  };
};

export const useClearGlobalMessage = () => {
  const setGlobalMessages = useSetGlobalMessages();
  return () => {
    setGlobalMessages({
      error: false,
      errorMessage: '',
      successMessage: '',
    });
  };
};
