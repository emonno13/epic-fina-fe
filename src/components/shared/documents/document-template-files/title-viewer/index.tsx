import { Tooltip } from 'antd';

export const TitleViewer = ({ title }) => {
  if (!title) {
    return null;
  }
  return (
    <Tooltip title={title} className="ellipsis-100">
      <h3 style={{ position: 'absolute' }}>{title}</h3>
    </Tooltip>
  );
};