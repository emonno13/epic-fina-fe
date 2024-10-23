import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';
import { useAuth } from '@lib/providers/auth';
import React, { createContext, useEffect, useState } from 'react';
import { HCommentProps } from '../index';
import { HCommentByFeatureUtils } from './h-comment-feature-context';

export type CommentContextType = {
  documentId?: string;
  documentIds?: string[];
  hcommentProps?: HCommentProps;
  getCommentList?: (t: any) => Promise<any>;
  commentList: any[];
  addNewComment?: (t: any) => Promise<any>;
  setNewReplyComment: (t: any) => any;
  newReplyComment?: any;
};

export const HCommentContext = createContext<CommentContextType>({
  documentId: undefined,
  documentIds: [],
  hcommentProps: undefined,
  getCommentList: async (f) => f,
  commentList: [],
  addNewComment: async (f) => f,
  setNewReplyComment: (f) => f,
  newReplyComment: undefined,
});

export function useHCommentList(): any[] {
  const context = React.useContext(HCommentContext);
  return context?.commentList;
}

export function useHCommentProps() {
  const context = React.useContext(HCommentContext);
  return context?.hcommentProps as HCommentProps;
}

export function useHCommentAddNewComment() {
  const context = React.useContext(HCommentContext);
  return context?.addNewComment;
}

export function useHCommentSetNewReply() {
  const context = React.useContext(HCommentContext);
  return context?.setNewReplyComment;
}

export function useHCommentNewReply() {
  const context = React.useContext(HCommentContext);
  return context?.newReplyComment;
}

export function useCommentContext() {
  const context = React.useContext(HCommentContext);
  return context as CommentContextType;
}

export type HCommentProviderProps = {
  documentId?: string;
  hcommentProps?: HCommentProps;
  children: any;
};

export const HCommentProvider = ({
  documentId,
  hcommentProps,
  children,
}: HCommentProviderProps) => {
  const { commentManagement } = HCommentByFeatureUtils.useContext();
  const [commentList, setCommentList] =
    HCommentByFeatureUtils.useCommentList(documentId);
  const [newReply, setNewReply] = useState<any>();
  const documentIds = hcommentProps?.documentIds;
  const { currentUser } = useAuth();

  useEffect(() => {
    if (documentId && !commentManagement) {
      getCommentData();
    }
  }, [documentId, commentManagement]);

  const handleAddNewCommentByDocumentId = async (comment: any) => {
    if (documentId) {
      comment.belongToId = documentId;
    }

    if (newReply?.id) {
      comment.replyToId = newReply.id;
    }

    const data = await httpRequester.postToApi({
      url: endpoints.endpointWithApiDomain('/comments'),
      params: comment,
    });

    if (!!data && !data?.error) {
      getCommentData();
      setNewReply(undefined);
    }
  };

  const handleAddNewCommentsByDocumentIds = async (comment: any) => {
    const data = await httpRequester.postToApi({
      url: endpoints.endpointWithApiDomain('/comments/batch'),
      params: {
        belongToIds: documentIds,
        ...comment,
      },
    });

    if (!!data && !data?.error) {
      const newData = data[0];
      newData.currentUser = currentUser;
      setCommentList([...commentList, ...[newData]]);
    }
  };

  const handleAddNewComment = async (comment: any) => {
    if (documentIds?.length) {
      handleAddNewCommentsByDocumentIds(comment);
    } else if (documentId) {
      handleAddNewCommentByDocumentId(comment);
    }
  };

  const getCommentData = async () => {
    const commentResult = await httpRequester.getDataFromApi({
      url: endpoints.endpointWithApiDomain('/comments'),
      params: {
        filter: {
          where: {
            belongToId: documentId,
          },
          limit: 200,
          order: ['createdAt asc'],
        },
      },
    });

    if (!!commentResult?.data && !commentResult?.error) {
      setCommentList(commentResult?.data);
    }
  };

  return (
    <HCommentContext.Provider
      value={{
        documentId,
        hcommentProps,
        commentList,
        addNewComment: handleAddNewComment,
        getCommentList: getCommentData,
        setNewReplyComment: setNewReply,
        newReplyComment: newReply,
      }}
    >
      {children}
    </HCommentContext.Provider>
  );
};
