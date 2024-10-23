import { parseListImage } from '@utils';
import { Button, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'; // For typing `UploadFile`
import { UploadChangeParam } from 'antd/lib/upload';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormItem } from '../formItem';

type BaseUploadProps = Omit<UploadProps, 'onChange'>;

interface UploadCropFieldProps extends BaseUploadProps {
  onChange?: (fileList: UploadFile<any>[]) => void;
  required?: boolean;
  fieldError?: any; // Adjust type based on your error structure
  label?: string;
  uploadText?: string;
  helpText?: string;
  maxLength?: number;
  name: string;
}

const UploadCropField: React.FC<UploadCropFieldProps> = ({
  onChange,
  fileList = [],
  name,
  fieldError,
  ...props
}) => {
  const onChangeUpload = async ({
    fileList: newFileList,
  }: UploadChangeParam) => {
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
    <div className="upload-crop-field">
      <Upload
        name="file"
        fileList={fileListProps} // Controlled file list from form context
        onChange={onChangeUpload}
        {...props}
      >
        <Button
          icon={
            <Image
              alt="upload-file-icon"
              width={21.5}
              height={21.5}
              src="/icon/upload-file-icon.svg"
            />
          }
        >
          Upload file
        </Button>
      </Upload>
      {fieldError && (
        <div className="flex items-center gap-x-[6px]">
          <Image
            alt="img-error"
            width={16}
            height={16}
            src="/icon/error-icon.svg"
          />
          <FormItem.ErrorMessage message={fieldError?.message} />
        </div>
      )}
    </div>
  );
};

export const UploadCropFieldControl: React.FC<UploadCropFieldProps> = (
  props,
) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => (
        <UploadCropField
          {...props}
          onChange={onChange}
          fileList={value} // File list from the form state
          fieldError={fieldState.error} // Display error message if exists
        />
      )}
    />
  );
};

export default UploadCropFieldControl;
