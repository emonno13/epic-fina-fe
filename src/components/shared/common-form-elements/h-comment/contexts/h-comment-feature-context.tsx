import { useIsAdminOrSuperAdmin } from '@lib/providers/auth';
import {
  setDocumentFragments,
  setNamespaceFeature,
} from '@schema-form/features/actions';
import {
  useDocumentDetail,
  useFeatureId,
  useTableSourceData,
} from '@schema-form/features/hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { cloneDeep } from 'lodash';
import React, { createContext, useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
const COMMENT_MANAGEMENT = 'COMMENT_MANAGEMENT';
export type CommentFeatureContextType = {
  commentManagement?: string;
};

export const HCommentFeatureContext = createContext<CommentFeatureContextType>(
  {},
);

export const HCommentManagementByFeature = ({
  commentManagement = COMMENT_MANAGEMENT,
  children,
}: {
  children: any;
  commentManagement?: string;
}) => {
  const dataSource = useTableSourceData();
  const dispatch = useDispatch();
  const featureId = useFeatureId();
  const isSupperAdmin = useIsAdminOrSuperAdmin();
  const documentDetail = useDocumentDetail();
  const documentId = documentDetail?.id;
  //const isUsePermissions = usePermissions(['V_FILE', 'V_D_FILE']);
  useEffect(() => {
    if (documentId) {
      callApiGetCommentByDataSource();
    }
  }, [documentId]);

  useEffect(() => {
    callApiGetCommentByDataSource();
  }, [dataSource]);

  const callApiGetCommentByDataSource = () => {
    if ((!Array.isArray(dataSource) || !dataSource?.length) && !isSupperAdmin) {
      return;
    }
    const ids: string[] =
      dataSource
        ?.filter((item) => item?.id || item?._id)
        .map((item) => item?.id || item?._id) || [];
    if (!ids?.length) {
      return;
    }
    FormUtils.submitForm(
      {
        filter: {
          limit: 1000,
          order: ['createdAt ASC'],
          where: {
            belongToId: { inq: ids },
          },
        },
      },
      {
        nodeName: 'comments',
        method: 'get',
        onGotSuccess: (result) => {
          const documentFragments: any = {};
          ids.map((id) => {
            const documentFileList: any[] =
              result?.data?.filter((item) => {
                if (item?.belongToId?.includes(id)) {
                  return true;
                }
                return false;
              }) || [];
            documentFragments[id] = documentFileList;
          });
          dispatch(
            setNamespaceFeature({
              featureId,
              documentFragments,
              namespace: commentManagement,
            }),
          );
        },
      },
    );
  };
  return (
    <HCommentFeatureContext.Provider
      value={{
        commentManagement,
      }}
    >
      {children}
    </HCommentFeatureContext.Provider>
  );
};

export const HCommentByFeatureUtils = {
  useContext: (): CommentFeatureContextType => {
    const context = React.useContext(HCommentFeatureContext);
    return context;
  },
  useGetCommentManagement: () => {
    const featureId = useFeatureId();
    return useSelector((state: RootStateOrAny) => {
      return state?.featureStore[featureId]?.COMMENT_MANAGEMENT || {};
    });
  },
  useGetCommentByDocumentId: (documentId: string) => {
    const featureId = useFeatureId();
    return useSelector((state: RootStateOrAny) => {
      return (
        state?.featureStore[featureId]?.COMMENT_MANAGEMENT?.[documentId] || []
      );
    });
  },
  useSetCommentByDocumentId: () => {
    const featureId = useFeatureId();
    const { commentManagement } = HCommentByFeatureUtils.useContext();
    const commentManagementList =
      HCommentByFeatureUtils.useGetCommentManagement() || {};
    const dispatch = useDispatch();
    return (documentId, data) => {
      commentManagementList[documentId] = data;
      dispatch(
        setDocumentFragments({
          featureId,
          documentFragments: cloneDeep(commentManagementList),
          namespace: commentManagement,
        }),
      );
    };
  },
  useCommentList: (documentId) => {
    const { commentManagement } = HCommentByFeatureUtils.useContext();
    const getCommentByDocumentId =
      HCommentByFeatureUtils.useGetCommentByDocumentId(documentId);
    const setCommentByDocumentId =
      HCommentByFeatureUtils.useSetCommentByDocumentId();
    if (commentManagement && documentId) {
      return [
        getCommentByDocumentId,
        (data) => setCommentByDocumentId(documentId, data),
      ];
    }
    return useState<any[]>([]);
  },
};
