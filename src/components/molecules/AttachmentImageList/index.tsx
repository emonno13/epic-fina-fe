'use client';
import { Image, UploadFile } from 'antd';
import React from 'react';

interface AttachmentImageListProps {
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}

const AttachmentImageList: React.FC<AttachmentImageListProps> = ({ fileList, setFileList }) => {
  // Handle file removal
  const handleRemove = (file: UploadFile) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
  };

  return (
    <>
      {fileList.length > 0 && (
        <div className='uploaded-images'>
          <div className='flex flex-row overflow-auto gap-x-[21px] py-4'>
            {fileList.map((file) => (
              <div key={file.uid} className='relative inline-block text-center'>
                {/* Delete button on the image */}
                <div className='absolute z-10  top-[-12px] right-[-12px]'>
                  <Image
                    src='/icon/grey-delete.svg' // Delete icon
                    alt='delete-img'
                    onClick={() => handleRemove(file)}
                    preview={false} // Disable preview for delete button
                    width={24}
                    height={24}
                    style={{ cursor: 'pointer', objectFit: 'cover' }}
                  />
                </div>
                {/* Previewable Image */}
                <Image
                  src={file.url}
                  style={{ objectFit: 'cover', borderRadius: '16px' }} // Display images in a list
                  alt={file.name?.slice(0, 10)}
                  width={66}
                  height={66}
                  preview={{ mask: <span>Xem</span> }} // Enable preview for each image
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AttachmentImageList;
