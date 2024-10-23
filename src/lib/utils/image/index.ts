import { endpoints } from '@lib/networks/endpoints';
import { RcFile } from 'antd/lib/upload';
import { isEmpty } from 'underscore';

export const ImageUtils = {
  getThumbnailUrl: (url: string, urls: any) => {
    const { small, medium, large, huge } = urls || {};
    const thumbnailUrl = small || medium || large || huge || url;
    const urlHost = thumbnailUrl?.startsWith('http')
      ? ''
      : endpoints.endpointWithApiDomain('');
    return `${urlHost}${thumbnailUrl}`;
  },
  getOriginalUrl: (url) => {
    const urlHost = url?.startsWith('http')
      ? ''
      : endpoints.endpointWithApiDomain('');
    return `${urlHost}${url}`;
  },
  isDuplicateBaseUrl: (url) => {
    return `${url}`.includes(`${process.env.NEXT_PUBLIC_STATIC_CDN}`);
  },
  limitFileSize: (file: RcFile, limitSize = 20) => {
    return file.size / 1024 / 1024 < limitSize;
  },
  validateFileSize: (MAX_IMAGE_SIZE = 15, t) => ({
    validator: (_, value) => {
      if (isEmpty(value)) return Promise.resolve();
      if (ImageUtils.limitFileSize(value, MAX_IMAGE_SIZE))
        return Promise.resolve();
      return Promise.reject(
        new Error(
          t(`Please enter image size below ${MAX_IMAGE_SIZE}MB`, {
            vn: `Vui lòng nhập ảnh dưới ${MAX_IMAGE_SIZE}MB`,
          }),
        ),
      );
    },
  }),
};
