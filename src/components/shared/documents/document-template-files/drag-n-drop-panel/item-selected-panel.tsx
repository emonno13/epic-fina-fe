import { AnyObject } from '@components/shared/atom/type';
import { useFeatureId } from '@schema-form/features/hooks';
import { Badge } from 'antd';
import { ReactNode } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { getDragDropDataBySelector } from './utils';

interface FileDocumentSelectedViewProps {
  fileDocument: AnyObject;
  children: ReactNode;
}

export const FileDocumentSelectedPanel = ({
  fileDocument,
  children,
}: FileDocumentSelectedViewProps) => {
  const featureId = useFeatureId();
  const selectedFileDocumentIds = useSelector((state: RootStateOrAny) => {
    return getDragDropDataBySelector(state, featureId)?.selectedFileDocumentIds;
  });
  const draggingfileDocumentId = useSelector((state: RootStateOrAny) => {
    return getDragDropDataBySelector(state, featureId)?.fileDocumentId;
  });
  const isDraggingFileDocumentId = draggingfileDocumentId === fileDocument.id;

  return (
    <Badge
      count={isDraggingFileDocumentId ? selectedFileDocumentIds?.length : 0}
    >
      {children}
    </Badge>
  );
};
