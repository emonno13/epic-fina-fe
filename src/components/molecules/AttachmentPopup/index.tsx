'use client';

import useScreen from '@hooks/useScreen';
import useWindowSize from '@hooks/useWindowSize';
import { Image } from 'antd';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import './style.scss';

interface MenuItem {
  label: string;
  logo?: string;
  subContent?: string;
  children?: MenuItem[]; // Optional children for nested menus
  isFileUpload?: boolean; // Flag for file upload
}

interface AttachmentPopupProps {
  isPopupOpen: boolean; // Control popup open state
  setIsOpenGooleDrive: (value: boolean) => void;
  setIsPopupOpen: (isOpen: boolean) => void; // Function to set popup open state
  onFileSelection: (files: any[]) => void; // Function to pass selected files to parent
  menuData?: MenuItem[]; // Accepts menu data as props
  children?: ReactNode;
}

const AttachmentPopup = ({
  isPopupOpen,
  setIsPopupOpen,
  setIsOpenGooleDrive,
  onFileSelection,
  children,
}: AttachmentPopupProps) => {
  const [activeParentIndex, setActiveParentIndex] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const screens = useScreen();
  const windowSize = useWindowSize();
  const [childrenPos, setChildrenPos] = useState<{ top: number; left: number } | null>({ top: 0, left: 0 });

  const menuData: MenuItem[] = useMemo(() => {
    const arr =
      screens.isMobile || screens.isTablet
        ? [
            {
              label: 'Microsoft OneDrive (cá nhân)',
              children: [],
            },
            {
              label: 'Microsoft OneDrive (cơ quan/trường học)',
              subContent: 'Bao gồm cả SharePoint',
              children: [],
            },
            {
              label: 'Kết nối với Google Drive',
              logo: '/logo/google-drive-logo.svg',
              children: [],
            },
            {
              label: 'Tải lên từ máy tính',
              logo: '/icon/document-upload.svg',
              children: [],
              isFileUpload: true, // Flag to indicate this menu item triggers file upload
            },
          ]
        : [
            {
              label: 'Kết nối với Microsoft OneDrive',
              logo: '/logo/one-drive-logo.svg',
              children: [
                {
                  label: 'Microsoft OneDrive (cá nhân)',
                },
                {
                  label: 'Microsoft OneDrive (cơ quan/trường học)',
                  subContent: 'Bao gồm cả SharePoint',
                },
              ],
            },
            {
              label: 'Kết nối với Google Drive',
              logo: '/logo/google-drive-logo.svg',
              children: [],
            },
            {
              label: 'Tải lên từ máy tính',
              logo: '/icon/document-upload.svg',
              children: [],
              isFileUpload: true, // Flag to indicate this menu item triggers file upload
            },
          ];
    return arr;
  }, [screens.isMobile, screens.isTablet]);

  useEffect(() => {
    const updatePosition = async () => {
      const attachmentElement = document?.getElementById('attachment-id');
      await new Promise((r) => setTimeout(r, 1000));
      if (attachmentElement) {
        const rect = attachmentElement.getBoundingClientRect();
        setChildrenPos({
          top: rect.bottom - (screens.isMobile || screens.isTablet ? 260 : 210), // Adjust as necessary
          left: rect.left,
        });
      }
    };
    updatePosition();
  }, [windowSize.width, windowSize.height, screens.isMobile, screens.isTablet]);

  // Function to handle closing when clicking outside the popup
  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false); // Close the popup if clicking outside
      setActiveParentIndex(null); // Reset active parent index
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Clean up
    };
  }, [isPopupOpen]);

  // Handle mouse enter for parent menu
  const handleParentMouseEnter = (index: number) => {
    setActiveParentIndex(index); // Set the active parent index
  };

  // Handle menu item click
  const handleMenuItemClick = (item: MenuItem) => {
    if (item.label === 'Kết nối với Google Drive') {
      setIsOpenGooleDrive(true);
      setIsPopupOpen(false);
      setActiveParentIndex(null);
      return;
    }
    if (item.isFileUpload) {
      handleUploadClick(); // Trigger file upload if "Tải lên từ máy tính" is clicked
    } else {
      setIsPopupOpen(false); // Close the entire popup for other menu items
    }
    setActiveParentIndex(null); // Reset active parent index
  };

  // Function to open file input for uploading images
  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true; // Allow multiple file selection
    input.accept = 'image/*'; // Accept only image files
    input.onchange = (event: Event) => {
      const files = Array.from((event?.target as HTMLInputElement)?.files || []).map((file: any, index) => ({
        uid: `${index}`,
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(file), // Create a URL for the image
        originFileObj: file,
      }));
      onFileSelection(files); // Pass selected files to parent component
      setIsPopupOpen(false); // Close the popup after selection
    };
    input.click(); // Open the file dialog
  };

  // Recursive function to render menus and submenus
  const renderMenu = (menu: MenuItem[], level = 0) => {
    return menu.map((item, index) => (
      <div
        key={index}
        className={`popup-item level-${level}`}
        onMouseEnter={() => item.children && handleParentMouseEnter(index)} // Keep submenu open on hover
      >
        {item.logo ? <Image src={item.logo} alt='logo' preview={false} /> : null}

        <span className='flex flex-col gap-y-[6px]' onClick={() => handleMenuItemClick(item)}>
          {item.label}
          {item.subContent ? <span className='sub-content'>{item.subContent}</span> : null}
        </span>
        {item.children && item?.children?.length > 0 ? (
          <Image src='/icon/arrow-right-1-1.svg' alt='arrow-right' preview={false} />
        ) : null}
        {item.children && item?.children?.length && activeParentIndex === index ? (
          <div className='submenu'>{renderMenu(item.children, level + 1)}</div>
        ) : null}
      </div>
    ));
  };

  return (
    <div className='attachment-wrapper'>
      {isPopupOpen && childrenPos && (
        <div className='attachment-popup' ref={popupRef} style={{ top: childrenPos?.top, left: childrenPos?.left }}>
          {renderMenu(menuData)}
        </div>
      )}
      {children}
    </div>
  );
};

export default AttachmentPopup;
