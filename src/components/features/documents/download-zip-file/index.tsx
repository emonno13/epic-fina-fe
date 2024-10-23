import { useHTranslation } from '@lib/i18n';
import { Button, notification } from 'antd';
import axios from 'axios';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

const zip = new JSZip();

const DownloadZipFileDocument = ({
  fileName = 'download',
  files = [],
  documentTemplateId = '',
}) => {
  const { t } = useHTranslation('admin-common');
  const fileStore = useSelector(
    (state: RootStateOrAny) =>
      state?.featureStore?.[`${documentTemplateId}`]?.uploadedDocuments,
  );
  const [fileDownload, setFileDownload] = useState([]);

  useEffect(() => {
    if (fileStore) {
      const files: any = [];
      for (const property in fileStore) {
        const item = fileStore[property];

        item.forEach((element) => {
          if (element?.file) {
            files.push({
              name: element?.document?.name || 'Chưa phân loại',
              file: {
                name: element?.file?.originalName || element?.file?.name,
                url: element?.file?.url,
              },
            });
          }
        });
      }
      setFileDownload(files);
    }
  }, [fileStore]);

  const download = (item) => {
    return axios
      .get(item?.file?.url, {
        responseType: 'blob',
      })
      .then((resp) => {
        zip.file(`${item?.name} ${item?.file?.name}`, resp.data);
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  const downloadAllFile = (e) => {
    e.stopPropagation();
    if (isEmpty(fileDownload)) {
      notification.error({ message: 'Không có tài liệu để tải!' });
      return;
    }
    // todo

    const arrOfFiles = fileDownload.map((item) => download(item));
    Promise.all(arrOfFiles)
      .then(() => {
        zip.generateAsync({ type: 'blob' }).then(function (blob) {
          FileSaver.saveAs(blob, `${fileName}.zip`);
        });
      })
      .catch((err) => {
        notification.error({ message: 'Đã xảy ra lỗi! Vui lòng thử lại' });
        console.log(err);
      });
  };

  return (
    <Button
      className={'deal-panel-header__action-btn__upload m-l-10'}
      type="default"
      shape="round"
      onClick={downloadAllFile}
    >
      {t('download all file', { vn: 'Tải về tất cả' })}
    </Button>
  );
};

export default DownloadZipFileDocument;
