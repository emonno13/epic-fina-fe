import { FC, memo } from 'react';
import ReorderAnswer from '../../question/reorder-answer';

const PreviewReorderQuestion: FC<any> = memo(({ data }) => {
  return <ReorderAnswer value={data} isEdit={false} />;
});

export default PreviewReorderQuestion;
