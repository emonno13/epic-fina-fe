import { parseListImage } from '@utils';
import { Upload, UploadProps, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { useMemo, useState } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import * as S from './UploadCropField.styles';

type BaseUploadProps = Omit<UploadProps, 'onChange'>;

interface UploadCropFieldProps extends BaseUploadProps {
  onChange?: (fileList: UploadFile<any>[]) => void;
  required?: boolean;
  fieldError?: FieldError;
  label?: string;
  uploadText?: string;
  helpText?: string;
  helpTextMore?: string;
  maxLength?: number;
  name: string;
}

const MAX_5M = 5242880; // Max file size 5M : 5 * 1024 * 1024
// const MAX_5M = 2097152; // Max file size 2M Test

const IMAGE_ONLY_REGEX = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i;

function checkAcceptImageType(fileType: string) {
  return IMAGE_ONLY_REGEX.test(`.${fileType.split('/').pop()}`);
}

const getBase64 = (file: RcFile) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const beforeCropProps = {
  beforeCrop: (file: RcFile) => {
    const isLtSize = file.size / MAX_5M < 1;

    const isValidType = checkAcceptImageType(file.type);
    if (!isValidType) {
      message.warning('Tệp hình ảnh không hợp lệ');
      return Upload.LIST_IGNORE;
    }
    if (!isLtSize) {
      message.warning(`Kích thước file ${file.name} quá lớn`);
      return Upload.LIST_IGNORE;
    }
    return true;
  },
};

const draggerProps = {
  showUploadList: false,
  customRequest: ({ onSuccess }: { onSuccess: (body: any, xhr?: XMLHttpRequest) => void }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  },
  onDrop: () => {
    //
  },
};

const UploadCropField: React.FC<UploadCropFieldProps> = (props) => {
  const [imageUrl, setImageUrl] = useState<string>();

  const { onChange, fileList = [], iconRender, name, fieldError } = props;

  const hasError = !!fieldError;
  const onChangeUpload = async ({ fileList: newFileList }: UploadChangeParam) => {
    const [selectedFile] = newFileList;
    if (selectedFile.originFileObj) {
      const preview = await getBase64(selectedFile.originFileObj).catch(() => false);
      setImageUrl(preview as string);
    }
    console.log('newFileList:', newFileList);
    onChange && onChange([...newFileList]);
  };

  const fileListProps = useMemo(() => {
    return parseListImage(fileList);
  }, [fileList]);

  const deleteHandler = async () => {
    return true;
  };

  return (
    <div className='upload-crop-field'>
      <S.UploadWrapper>
        <S.PreviewImageWrapper>{imageUrl && <img alt='img' src={imageUrl} />}</S.PreviewImageWrapper>
        <S.UploadBody>
          <S.UploadButtonGroup className='upload-btn-group'>
            <div>
              <ImgCrop
                modalTitle='Cắt ảnh'
                modalOk='Ok'
                modalCancel='Huỷ'
                aspect={16 / 9}
                quality={1}
                minZoom={1}
                {...beforeCropProps}
              >
                <Upload
                  {...(draggerProps as UploadProps)}
                  showUploadList={false}
                  fileList={fileListProps || []}
                  onChange={onChangeUpload}
                  multiple={false}
                  iconRender={iconRender}
                  accept={`image/png, image/jpeg, image/jpg`}
                  onRemove={deleteHandler}
                  maxCount={1}
                  name={name}
                >
                  <S.UploadSelectBtn>Chọn ảnh</S.UploadSelectBtn>
                </Upload>
              </ImgCrop>
            </div>
            <S.UploadRemoveBtn>Xoá ảnh</S.UploadRemoveBtn>
          </S.UploadButtonGroup>
          <div className='text-[15px] text-[#5F656C] mt-2'>Định dạng hình ảnh JPEG, PNG, tối đa 2MB</div>
        </S.UploadBody>
      </S.UploadWrapper>

      {hasError && (
        <div style={{ textAlign: 'left' }}>
          <span style={{ color: '#ff4d4f' }}>{fieldError?.message as string}</span>
        </div>
      )}
    </div>
  );
};

export const UploadCropFieldControl: React.FC<UploadCropFieldProps> = (props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const internalProps = {
    ...props,
    errors,
  };

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => (
        <UploadCropField {...internalProps} onChange={onChange} fileList={value} fieldError={fieldState.error} />
      )}
    />
  );
};

export default UploadCropField;
