import { DownloadOutlined, InboxOutlined } from '@ant-design/icons';
import { downloadBlobFile } from '@components/shared/utils/download';
import { useHaveDownloadPermission } from '@dynamic-configuration/hooks';
import { message, Upload } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { usePrivateEnvironment } from 'system/hooks';

import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { endpoints } from '../../../../lib/networks/endpoints';
import { RouteUtils } from '../../layout/router-contaner/utils';
import { RenderStepper } from '../stepper';

const { Dragger } = Upload;

enum ImportDataTypeEnum {
  USERS = 'users',
  CONTACTS = 'contacts',
  DEALS = 'deals',
  PROPERTIES = 'properties',
}

export const UploadFile = ({ onSuccess = (f) => f, DBModel, endpoint }) => {
  const { t } = useHTranslation('admin-common');

  // Info: define API import to Import Table with new ID
  const configs = {
    name: 'file',
    multiple: false,
    action: endpoints.endpointWithApiDomain(endpoint),
    headers: { Authorization: `Bearer ${Cookies.get('h2token')}`, DBModel },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        onSuccess(info);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  return (
    <Dragger {...configs}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        {t('Click or drag file to this area to upload', {
          vn: 'Nhấp hoặc kéo tệp vào khu vực này để tải lên',
        })}
      </p>
      <p className="ant-upload-hint">
        {t(
          'Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files',
          {
            vn: 'Hỗ trợ tải lên hàng loạt hoặc đơn lẻ. Nghiêm cấm tải lên dữ liệu công ty hoặc dữ liệu khác tập tin ban nhạc',
          },
        )}
      </p>
    </Dragger>
  );
};

export const DownloadTemplateButton = memo((props: any) => {
  const { t } = useHTranslation('common');
  const { query } = useRouter();
  const currentUser = useCurrentUser();
  const handleDownloadTemplate = async () => {
    if (query?.featureNames?.[0] === ImportDataTypeEnum.USERS) {
      try {
        await downloadBlobFile({
          nodeName: 'users/template-export/60e0533857d9f6f0f3381788',
          filter: { where: { userType: 'general' }, include: ['org'] },
          fileName: '[FINA][User] Template Data.xlsx',
        });
      } catch (error) {
        console.log(error);
      }

      props?.onNext();
      return;
    }

    (window as any).open(
      `${process.env.NEXT_PUBLIC_STATIC_CDN}/deals/export/${currentUser.id}`,
    );
    props?.onNext();
  };
  const haveDownloadPermission = useHaveDownloadPermission();

  if (!haveDownloadPermission) {
    return <></>;
  }

  if (
    query?.featureNames?.[0] === 'business' &&
    query?.featureNames?.[1] === 'import-contact'
  ) {
    return <></>;
  }

  return (
    <HButton
      {...{
        ...props,
        size: 'large',
        shape: 'round',
        className: 'control-btn m-l-10',
        onClick: handleDownloadTemplate,
        icon: <DownloadOutlined />,
      }}
    >
      {t('Export Template ', { vn: 'Tải file mẫu', en: 'Download Template' })}
    </HButton>
  );
});

export const ImportData = ({
  model,
  PreviewComponent,
  endpoint,
  fileNameExample,
}) => {
  const [importId, setImportId] = useState<any>();
  const { query } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Old code for download example file
  const domain = usePrivateEnvironment('domain');
  const uploadFolder = usePrivateEnvironment('uploadFolder');
  const urlExampleFile =
    domain && uploadFolder && fileNameExample
      ? `${domain}api/v1${uploadFolder}/${fileNameExample}`
      : '';

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    RouteUtils.redirect(RouteUtils.getAdminBasePathFromRoute());
  };

  useEffect(() => {
    if (query.importId) {
      setImportId(query.importId);
      setCurrentStep(1);
    }
  }, []);

  const onUploadSuccess = async (info) => {
    const importObject = info.file?.response || {};
    setImportId(importObject.id);
    RouteUtils.redirectToDocumentDetail(importObject.id, 'importId');
    handleNext();
  };

  const steps: string[] = ['Example File', 'Upload File', 'Review Data'];

  return (
    <RenderStepper
      {...{ currentStep, steps, onNext: handleNext, onPrev: handlePrev }}
    >
      <>
        {/* STEP 01: Get example file */}
        {currentStep === 0 && (
          <div className="download-template__container">
            <DownloadTemplateButton onNext={handleNext} />
          </div>
        )}

        {/* STEP 02: Upload file to Import Table */}
        {currentStep === 1 && (
          <>
            {urlExampleFile && (
              <a
                className="download-example-file"
                href={urlExampleFile}
                target="_blank"
                rel="noreferrer"
              >
                Download the example file
              </a>
            )}
            <UploadFile
              onSuccess={(info) => onUploadSuccess(info)}
              DBModel={model}
              endpoint={endpoint}
            />
          </>
        )}

        {/* STEP 03: Get data from ImportDetail Table */}
        {currentStep === 2 && (
          <PreviewComponent
            importId={importId}
            model={model}
            onConfirmSuccess={handlePrev}
          />
        )}
      </>
      <style jsx>{`
        .download-template__container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .download-example-file {
          display: block;
          margin-bottom: 8px;
        }

        .download-example-file:hover {
          text-decoration: underline;
        }
      `}</style>
    </RenderStepper>
  );
};
