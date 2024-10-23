import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Tooltip } from 'antd';

const type = 'DragableUploadList';

export const DragableListItem = ({ originNode, moveRow, file, fileList }) => {
  const ref = useRef<any>(null);
  const index = fileList.indexOf(file);

  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex }: any = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      moveRow(item, index);
    },
  });

  const [collected, drag, dragPreview] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drop(drag(ref));

  const errorNode = (
    <Tooltip title="Upload Error" getPopupContainer={() => document.body}>
      {originNode.props.children}
    </Tooltip>
  );

  return (
    <div
      ref={ref}
      className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`}
    >
      {file.status === 'error' ? errorNode : originNode}
    </div>
  );
};