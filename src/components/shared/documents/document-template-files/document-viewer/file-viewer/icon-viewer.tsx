import { FILE_TYPES_MAPPING_VIEWER } from './constant';

export const IconViewer = ({ file }) => {
  return (
    <div className={'ui-img-preview__cover-photo'}>
      <img src={`/assets/images/ic_${FILE_TYPES_MAPPING_VIEWER[file?.type]}.svg`} />
    </div>
  );
};
