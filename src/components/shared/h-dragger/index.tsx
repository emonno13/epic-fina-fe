import { InboxOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { message } from 'antd';
import Dragger, { DraggerProps } from 'antd/lib/upload/Dragger';
import Cookies from 'js-cookie';
import React, { ReactNode } from 'react';
import { AnyObject } from '../atom/type';

export interface HDraggerProps extends DraggerProps {
  uploadContent?: string | ReactNode;
  objectId?: string;
  documentTemplateId?: string;
  objectType?: string;
  objectSubType?: string;
  onGotSuccess?: (response: AnyObject) => {};
  onGotResult?: (response: AnyObject) => {};
  onGotError?: (response: AnyObject) => {};
}

function HDragger(props: HDraggerProps) {
  const {
    uploadContent = <UploadContent />,
    documentTemplateId,
    objectId,
    objectType,
    onGotSuccess,
    objectSubType,
    onGotResult,
    onGotError,
    ...restProps
  } = props;

  const onChange = (info) => {
    const { status, response } = info.file;
    onGotResult?.(info);

    if (status === 'done') {
      onGotSuccess?.(response);
      message.success(`${info.file.name} file uploaded successfully.`);
      return;
    }

    if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      onGotError?.(response);
    }
  };

  return (
    <Dragger
      method="POST"
      multiple={true}
      name="file"
      listType="picture-card"
      headers={{ Authorization: `Bearer ${Cookies.get('h2token')}` }}
      action={endpoints.endpointWithApiDomain(
        `/document-template-files/${documentTemplateId}/upload?objectId=${objectId}&objectType=${objectType}&objectSubType=${objectSubType}`,
      )}
      onChange={onChange}
      {...restProps}
    >
      {uploadContent}
    </Dragger>
  );
}
export default React.memo(HDragger);

export function UploadContent() {
  const { t } = useHTranslation('common');
  return (
    <div>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        {t('Click or drag file to this area to upload', {
          vn: 'Click hoặc kéo tệp để tải lên',
        })}
      </p>
      <p className="ant-upload-hint">
        {t(
          `Support for a single or bulk upload. Strictly prohibit 
        from uploading company data or other band files`,
          {
            vn: `Hỗ trợ tải lên một lần hoặc hàng 
        loạt. Nghiêm cấm tải lên dữ liệu công ty hoặc các tệp ban nhạc khác`,
          },
        )}
      </p>
    </div>
  );
}
