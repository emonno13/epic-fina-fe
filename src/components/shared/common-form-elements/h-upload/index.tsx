import { endpoints } from '@lib/networks/endpoints';
import { ImageUtils } from '@lib/utils/image';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Upload } from 'antd';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import { UploadProps } from 'antd/lib/upload';
import { UploadListType } from 'antd/lib/upload/interface';
import cls from 'classnames';
import update from 'immutability-helper';
import Cookies from 'js-cookie';
import { isArray, isString } from 'lodash';
import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ReactImageGalleryItem } from 'react-image-gallery';
import { HGallery } from '../h-gallery';
import { DragableListItem } from './dragable-list-item';

import 'antd/lib/slider/style';

import './h-upload.module.scss';

export interface HUploadProps extends UploadProps {
  useImageCrop?: boolean;
  multiple?: boolean;
  listType?: UploadListType;
  accept?: string;
  buttonUpload?: any;
  width?: any;
  height?: any;
  value?: any;
  onChange?: any;
  label?: any;
  name?: any;
  propsImageCrop?: ImgCropProps;
  renderChild?: (value: any | any[], fileList: any[]) => ReactNode;
  itemRender?: (
    originNode: ReactNode,
    file: any,
    currFileList: any[],
    value?: any | any[],
  ) => ReactNode;
}

export const uploadListFileSchemaItem = (
  props: HFormProps,
  uploadProps?: HUploadProps,
): HFormItemProps[] => {
  const label = uploadProps?.label || 'Images';
  const name = uploadProps?.name || 'images';
  return [
    createSchemaItem({
      Component: HUpload,
      label,
      name,
      colProps: { span: 24 },
      componentProps: {
        ...uploadProps,
      },
    }),
  ];
};

const ImageCrop = ({ useImageCrop = false, propsImageCrop, children }) => {
  if (!useImageCrop) {
    return <>{children}</>;
  }
  return <ImgCrop {...propsImageCrop}>{children}</ImgCrop>;
};

export const HUploadImage = (props: HUploadProps) => {
  return (
    <HUploadImages
      {...{
        ...props,
        multiple: false,
        maxCount: 1,
      }}
    />
  );
};

export const HUploadImages = (props: HUploadProps) => {
  return (
    <HUpload
      {...{
        ...props,
        propsImageCrop: {
          rotate: true,
          ...(props.propsImageCrop || {}),
        },
        useImageCrop:
          props.useImageCrop === undefined ? true : props.useImageCrop,
        accept: 'image/*',
      }}
    />
  );
};

export const HUploadDocument = (props: HUploadProps) => {
  return (
    <HUpload
      {...{
        ...props,
        multiple: false,
        accept:
          '.doc,.docx,.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      }}
    />
  );
};

export const HUpload = (props: HUploadProps) => {
  const {
    multiple = true,
    onChange = (f) => f,
    listType = 'picture-card',
    accept,
    width,
    height,
    buttonUpload = '+ Upload',
    value,
    maxCount,
    propsImageCrop,
    renderChild,
    itemRender = (originNode, file, currFileList): ReactElement => (
      <DragableListItem
        originNode={originNode}
        file={file}
        fileList={currFileList}
        moveRow={moveRow}
      />
    ),
    className,
  } = props;

  const [fileList, setFileList] = useState<any[]>([]);
  const [visibleHGallery, setVisibleHGallery] = useState(false);
  const moveRow = useCallback(
    (drag, hoverIndex) => {
      const dragIndex = drag.index;
      const dragRow = fileList[drag.index];
      const newList = update(fileList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      });
      handleDataWhenFileListChange(newList);
    },
    [fileList],
  );

  const onListChange = ({ fileList: newFileList, file }) => {
    handleDataWhenFileListChange(newFileList);
  };
  const isShowButtonUpload =
    (maxCount && fileList.length < maxCount) || multiple;

  const handlePreview = async (file) => {
    if (file?.isImage || file?.response?.[0]?.isImage) {
      setVisibleHGallery(true);
      return;
    }

    window.open(file?.url, '_blank');
  };

  const getImageForGalery = () => {
    const newImagesGalery: ReactImageGalleryItem[] = [];
    for (const file of fileList) {
      const { response }: { response?: object[] } = file;
      const { url, urls }: { url?: string; urls?: string[] } = response?.length
        ? response[0]
        : file;

      newImagesGalery.push({
        original: ImageUtils.getOriginalUrl(url),
        thumbnail: ImageUtils.getThumbnailUrl(url || '', urls),
      });
    }

    return newImagesGalery;
  };

  useEffect(() => {
    handleDataFirst();
  }, [value]);

  const handleDataFirst = () => {
    let valuesDefault = value;
    if (fileList.length || !valuesDefault) return;
    if (typeof value === 'string') {
      valuesDefault = [{ url: value }];
    }
    if (!!value && !Array.isArray(value) && typeof value !== 'string') {
      valuesDefault = [value];
    }

    if (isArray(value) && isString(value?.[0])) {
      valuesDefault = value?.map((item) => ({ url: item }));
    }

    const newFileList = valuesDefault.map((file) => {
      const { id, url, urls } = file;

      return {
        ...file,
        thumbUrl: ImageUtils.getThumbnailUrl(url, urls),
        url: ImageUtils.getOriginalUrl(url),
        uid: id,
      };
    });
    setFileList(newFileList);
  };

  const handleDataWhenFileListChange = (newFileList) => {
    const files: object[] = [];
    newFileList.forEach((file) => {
      const { status, response } = file;
      if (status === 'done' && !!response) {
        files.push(...response);
      }
      if (!status && !response) {
        const newData = { ...file };
        newData.url = newData.url?.replaceAll(
          process.env.NEXT_PUBLIC_STATIC_CDN,
          '',
        );
        delete newData.thumbUrl;
        delete newData.uid;
        files.push(newData);
      }
    });
    setFileList(newFileList);
    if (
      newFileList.some(({ status }) => status === 'uploading') ||
      JSON.stringify(fileList) === JSON.stringify(files)
    ) {
      return;
    }
    if (multiple) {
      onChange(files);
    } else {
      if (files.length > 0) {
        onChange(files[0]);
      } else {
        onChange(undefined);
      }
    }
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <ImageCrop
          useImageCrop={props?.useImageCrop}
          propsImageCrop={propsImageCrop}
        >
          <Upload
            {...props}
            action={endpoints.endpointWithApiDomain('/files')}
            headers={{ Authorization: `Bearer ${Cookies.get('h2token')}` }}
            accept={accept}
            className={cls('upload-list-drag-drog', 'huploader', className, {
              'hidden-ant-upload': !renderChild && !isShowButtonUpload,
            })}
            listType={listType}
            fileList={fileList}
            onChange={onListChange}
            multiple={multiple}
            onPreview={handlePreview}
            itemRender={(originNode, file, currFileList) =>
              itemRender(originNode, file, currFileList, value)
            }
          >
            {renderChild && renderChild(value, fileList)}
            {!renderChild && isShowButtonUpload && buttonUpload}
            <style jsx>{`
              .huploader .ant-upload {
                width: ${width} ${height ?? `height: ${height}`};
              }
            `}</style>
          </Upload>
        </ImageCrop>
      </DndProvider>
      <HGallery
        {...{
          visible: visibleHGallery,
          onClose: () => setVisibleHGallery(false),
          items: getImageForGalery(),
          showThumbnails: true,
          showPlayButton: false,
          showFullscreenButton: false,
        }}
      />
    </>
  );
};
