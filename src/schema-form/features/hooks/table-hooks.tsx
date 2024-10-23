import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { FormOutlined, CopyOutlined } from '@ant-design/icons';
import { isEqual } from 'underscore';
import { RouteUtils } from '@components/shared/layout/router-contaner/utils';
import { EditIconSvg, TransferSvg, TrashIconSvg } from 'icons';
import { ClickableOpacity } from '@components/shared/utils/clickable-opacity';
import { httpRequester } from '@lib/networks/http';
import { useHTranslation } from '@lib/i18n';
import { SVGIcon } from '@components/shared/atom/svg-icon';
import {
  useApiEndpoint,
  useFeature,
  useFeatureData,
  useFeatureId,
} from './feature-hooks';
import { useSearchForm } from './search-form-hooks';
import { useGetDocumentDetail } from './common';
import { useIsNewDocument } from './document-detail-hooks';
import { setDataSource, setDocumentDetail } from '../actions';

export function useSetDocumentDetailWithoutVisible(
  featureIdDefault?: string,
): Function {
  const dispatch = useDispatch();
  const featureIdFromHook = useFeatureId();
  const featureId = featureIdDefault || featureIdFromHook;
  return (documentDetail) => {
    dispatch(setDocumentDetail({ featureId, documentDetail }));
  };
}

export function useSetDocumentDetail(featureId?: string): Function {
  const dispatch = useDispatch();
  const featureData = useFeature();
  const { documentDetailNamespaceViaId } = featureData;
  const documentFeatureId = featureId || featureData.featureId;
  return (
    document,
    documentDetailVisibility = true,
    optionParams = { workingWithDocumentDetail: true },
  ) => {
    const namespace = documentDetailNamespaceViaId
      ? document.id
      : 'documentDetail';
    dispatch(
      setDocumentDetail({
        featureId: documentFeatureId,
        documentDetail: document,
        optionParams,
        namespace,
        documentDetailVisibility,
      }),
    );
  };
}

export function useReloadDocumentDetailWithChildren(): Function {
  const reloadDocumentDetail = useGetDocumentDetail();
  const isNewDocument = useIsNewDocument();
  return (documentDetail) => {
    if (
      documentDetail?.id &&
      !isNewDocument &&
      documentDetail?.hasChildren &&
      documentDetail?.children === undefined
    ) {
      reloadDocumentDetail({ documentId: documentDetail?.id });
    }
  };
}

export function useClearDocumentDetail(): Function {
  const dispatch = useDispatch();
  const { featureId, documentDetailNamespaceViaId } = useFeature();
  return (document, documentDetailVisibility = false) => {
    const namespace = documentDetailNamespaceViaId
      ? document.id
      : 'documentDetail';
    dispatch(
      setDocumentDetail({
        featureId,
        documentDetail: document,
        namespace,
        documentDetailVisibility,
      }),
    );
  };
}

export function usePagination(featureId?: string): any {
  const fid: string = featureId || useFeatureId();
  const pagination = useSelector((state: RootStateOrAny) => {
    return state?.featureStore[fid]?.pagination;
  }, isEqual);
  return pagination;
}

export function useTableMetadata(): any {
  const { metadata } = useFeatureData();
  return metadata || {};
}

export function useIsLoadingData(featureId?: string): any {
  const fid: string = featureId || useFeatureId();
  const loading = useSelector((state: RootStateOrAny) => {
    return state?.featureStore[fid]?.loading;
  }, isEqual);
  return loading;
}

export function useTableSourceData(featureId?: string): any {
  const fid: string = featureId || useFeatureId();
  const dataSource = useSelector((state: RootStateOrAny) => {
    return state?.featureStore[fid]?.dataSource;
  }, isEqual);
  return dataSource;
}

export function useSetDataSource(featureIdDefault?: string): Function {
  const dispatch = useDispatch();
  const featureId = featureIdDefault || useFeatureId();
  return (dataSource) => {
    dispatch(setDataSource({ featureId, dataSource }));
  };
}

export function useOnDocumentClick(
  documentDefault: any = {},
  optionParamsDefault: any = {},
): any {
  const handleDocumentSelected = useSetDocumentDetail();
  const { useQueryParams, documentIdName } = useFeature();
  return (document = documentDefault, optionParams = optionParamsDefault) => {
    handleDocumentSelected(document, true, optionParams);
    useQueryParams &&
      RouteUtils.redirectToDocumentDetail(
        document.id,
        documentIdName,
        optionParams,
      );
  };
}

export function useOnEventMessageWorkflowClick(
  document,
  optionParams: any = {},
): any {
  const handleDocumentSelected = useSetDocumentDetail();
  const { useQueryParams, documentIdName } = useFeature();
  return () => {
    handleDocumentSelected(document, optionParams);
    useQueryParams &&
      RouteUtils.redirectToDocumentDetail(
        document.eventId,
        documentIdName,
        optionParams,
      );
  };
}

export function useEditEventMessageWorkflowControl(
  documentDefault: any = {},
  optionParamsDefault: any = {},
  icon = <FormOutlined />,
): any {
  const onDocumentClick = useOnDocumentClick();
  return (document = documentDefault, optionParams = optionParamsDefault) => (
    <ClickableOpacity onClick={() => onDocumentClick(document, optionParams)}>
      <a>{document?.code}</a>
    </ClickableOpacity>
  );
}

export function useEditDocumentControl(
  documentDefault: any = {},
  optionParamsDefault: any = {},
  iconDefault = <EditIconSvg />,
): any {
  const onDocumentClick = useOnDocumentClick();
  return (
    document = documentDefault,
    optionParams = optionParamsDefault,
    icon = iconDefault,
  ) => (
    <ClickableOpacity onClick={() => onDocumentClick(document, optionParams)}>
      {icon}
    </ClickableOpacity>
  );
}

export function useCloneDocumentControl(document): any {
  const recordName = document.name || document.code || document.id;
  const handleDocumentSelected = useSetDocumentDetail();
  const { useQueryParams, documentIdName } = useFeature();
  const apiEndpoint = useApiEndpoint();
  const searchForm = useSearchForm();
  const handleCloneDocument = async () => {
    const newDocument = await httpRequester.postToApi({
      url: apiEndpoint + '/clone',
      params: {
        clonedFromId: document.id,
      },
    });
    handleDocumentSelected(newDocument);
    searchForm && searchForm.submit();
    useQueryParams &&
      RouteUtils.redirectToDocumentDetail(newDocument.id, documentIdName);
  };
  return (
    <ClickableOpacity
      {...{
        onClick: handleCloneDocument,
        confirmation: {
          message: (
            <span>
              Do you want to clone from <strong>{recordName}?</strong>
            </span>
          ),
        },
      }}
    >
      <CopyOutlined />
    </ClickableOpacity>
  );
}

export function useDeleteDocumentControl(
  documentDefault: any = {},
  optionsDefault: any = {},
  message = '',
  icon = <TrashIconSvg />,
): any {
  const { t } = useHTranslation('admin-common');
  const endpointDefault = useApiEndpoint();
  const searchFormDefault = useSearchForm();

  return (
    document = documentDefault,
    options = optionsDefault,
    searchForm = searchFormDefault,
  ) => {
    const recordName =
      document?.name || document?.code || t('record', { vn: 'bản ghi' });
    const apiEndpoint = options.endpoint || endpointDefault;
    const handleDeletingDocument = async () => {
      const detailEndpoint = `${apiEndpoint}/${document.id || document._iid}`;
      await httpRequester.deleteFromApi({ url: detailEndpoint });
      searchForm && searchForm.submit();
    };
    return (
      <ClickableOpacity
        {...{
          onClick: handleDeletingDocument,
          confirmation: {
            message:
              message ||
              t(`Do you want to delete ${recordName}?`, {
                vn: `'Bạn có muốn xóa ${recordName}`,
              }),
          },
        }}
      >
        {icon}
      </ClickableOpacity>
    );
  };
}

// TODO: should move this one to context call transfer
export function useCallTransferDocumentControl(
  document,
  options: any = {},
  message = '',
): any {
  const { t } = useHTranslation('admin-common');
  const recordName = document.name || document.fullName || document.code;
  const defaultApiEndpoint = useApiEndpoint();
  const apiEndpoint = options.endpoint || defaultApiEndpoint;
  const params = options.params || {};
  const searchForm = useSearchForm();
  const handleCallTransferDocument = async () => {
    await httpRequester.postToApi({ url: apiEndpoint, params });
    searchForm && searchForm.submit();
  };

  return (
    <ClickableOpacity
      {...{
        onClick: handleCallTransferDocument,
        confirmation: {
          message:
            message ||
            t(`Do you want to transfer to ${recordName}?`, {
              vn: `'Bạn có muốn chuyển tiếp tới ${recordName}`,
            }),
        },
      }}
    >
      <span>{<SVGIcon svg={<TransferSvg />} />}</span>
    </ClickableOpacity>
  );
}

export function useUpdateDocumentControl(document, options: any = {}): any {
  const apiEndpoint = options.endpoint || useApiEndpoint();
  const message = options?.message || '';
  const Icon = options?.icon || CopyOutlined;
  const dataUpdate = options?.data || {};

  const searchForm = useSearchForm();
  const handleUpdateDocument = async () => {
    const detailEndpoint = `${apiEndpoint}/${document.id || document._iid}`;
    await httpRequester.putToApi({ url: detailEndpoint, params: dataUpdate });
    searchForm && searchForm.submit();
  };

  return (
    <ClickableOpacity
      {...{
        onClick: handleUpdateDocument,
        confirmation: {
          message,
        },
      }}
    >
      <Icon />
    </ClickableOpacity>
  );
}

export function useEditDocumentSelected(): Function {
  const handleDocumentSelected = useSetDocumentDetail();
  const { useQueryParams, documentIdName } = useFeature();
  return (document) => {
    handleDocumentSelected(document);
    useQueryParams &&
      RouteUtils.redirectToDocumentDetail(document.id, documentIdName);
  };
}
