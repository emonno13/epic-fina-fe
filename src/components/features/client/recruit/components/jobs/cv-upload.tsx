import React from 'react';
import { SuccessSvg } from '../../icons';

import './cv-upload.scss';
const note = 'Tên tệp nên đặt: hovaten_vitri | Loại file: pdf, doc, docx | Dung lượng tối đa: 10MB';

const CvUpload = React.memo((props: any)=> {
  const { value, fileList } = props;

  return (
    <div className="cv-upload__container">
      {!value
        ? <div className={'cv-upload__box cv-upload__name cv-upload__browser'}>BROWSER</div> :
        <div className="cv-upload__success">
          <div className="cv-upload__box cv-upload__name">
            {value?.name}
          </div>
          <SuccessSvg style={{ marginLeft: '8px' }}/>
        </div>
      }
      <p className="cv-upload__description">
        {note}
      </p>
    </div>
  );
});

export default CvUpload;
