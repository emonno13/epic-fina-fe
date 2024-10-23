import { EditOutlined } from '@ant-design/icons';
import { LabelItem } from '@components/shared/common/h-label/h-label-title';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { createSchemaItem, HFormItemProps } from '@schema-form/h-types';
import { Col, Divider, Row, Tooltip } from 'antd';
import cls from 'classnames';
import { FC, ReactNode, useMemo } from 'react';
import { UserAvatar } from '../../common/h-avatar';
import { HPreviewUser } from '../../common/h-preview-user';
import {
  HCommentProvider,
  useHCommentProps,
} from './contexts/h-comment-context';
import { HCommentInput } from './hcomment-input';
import { HCommentListViewer } from './hcomment-list-viewer';

import './h-comment.module.scss';

export interface HCommentProps {
  placeholder?: string;
  className?: string;
  maxDepthReply?: number;
  replyLabel?: string;
  inputRows?: number;
  sendIcon?: any;
  documentId?: string;
  documentIds?: string[];
  defaultContent?: any;
}
export interface HFormItemCommentProps extends HFormItemProps {
  componentProps?: HCommentProps;
}

export const CommentViewer = () => {
  const hcommentProps = useHCommentProps();
  return (
    <div className={`h-comment-list ${hcommentProps?.className}`}>
      <HCommentListViewer />
      <Divider />
      <HCommentInput />
    </div>
  );
};
export const CommentViewerForDeal = ({ user, userTitle }: any) => {
  const hcommentProps = useHCommentProps();
  return (
    <div className={`h-comment-list ${hcommentProps?.className}`}>
      <HCommentListViewer />
      <Divider />
      <Row>
        <Col span={2}>
          <Tooltip
            placement="topLeft"
            title={<HPreviewUser {...{ user, userTitle }} />}
          >
            <div>
              <UserAvatar {...{ user }} />
            </div>
          </Tooltip>
        </Col>
        <Col span={22}>
          <HCommentInput />
        </Col>
      </Row>
    </div>
  );
};

export const commentDetailSchema = (
  props?: HFormItemCommentProps,
): HFormItemProps[] => {
  const documentDetail = useDocumentDetail();
  const documentId = props?.componentProps?.documentId || documentDetail?.id;
  const currentDocumentId = useMemo(() => documentId, [documentId]);
  const documentIds = props?.componentProps?.documentIds;
  if (!currentDocumentId && !documentIds?.length) {
    return [];
  }

  return [
    createSchemaItem({
      ...props,
      label: props?.label || 'Comment',
      componentProps: props?.componentProps,
      Component: (hcommentProps) => (
        <HCommentProvider
          {...{
            documentId: currentDocumentId,
            hcommentProps,
          }}
        >
          <CommentViewer />
        </HCommentProvider>
      ),
    }),
  ];
};

export const HComment = (commentProps: HCommentProps) => {
  const documentDetail = useDocumentDetail();
  const documentId = commentProps?.documentId || documentDetail?.id;
  const hcommentProps = useMemo(() => commentProps, [commentProps]);

  if (!documentId) {
    return null;
  }

  return (
    <HCommentProvider
      {...{
        documentId,
        hcommentProps,
      }}
    >
      <CommentViewer />
    </HCommentProvider>
  );
};

export const HCommentForDeal = (props: any) => {
  const documentDetail = useDocumentDetail();
  const documentId = props?.documentId || documentDetail?.id;
  const hcommentProps = useMemo(() => props, [props]);

  if (!documentId) {
    return null;
  }

  return (
    <HCommentProvider
      {...{
        documentId,
        hcommentProps,
      }}
    >
      <CommentViewerForDeal
        {...{ user: props?.user, userTitle: props?.userTitle }}
      />
    </HCommentProvider>
  );
};

interface HCommentWithLabelProps extends HCommentProps {
  label?: ReactNode;
}

export const HCommentWithLabel: FC<HCommentWithLabelProps> = ({
  label = <LabelItem label={'Ghi chú'} firstIcon={<EditOutlined />} />,
  className,
  ...HCommentProps
}) => {
  return (
    <div className={cls({ className: !!className })}>
      {label}
      <HComment {...HCommentProps} />
    </div>
  );
};
