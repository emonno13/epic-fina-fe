'use client';
import { Button, Image, message, Modal } from 'antd';
import { gapi } from 'gapi-script';
import { ReactNode, useEffect, useState } from 'react';

interface GoogleDriveLoaderProps {
  children?: ReactNode;
  handleFileSelection: (selectedImages: ImageFile[]) => void;
  isOpenGooleDrive: boolean;
  setIsOpenGooleDrive: (value: boolean) => void;
}

interface ImageFile {
  id: string;
  uid: string;
  name: string;
  url: string; // Changed from webContentLink to url
}

const GoogleDriveLoader: React.FC<GoogleDriveLoaderProps> = ({
  children,
  handleFileSelection,
  isOpenGooleDrive,
  setIsOpenGooleDrive,
}) => {
  const [startSignIn, setStartSignIn] = useState<boolean>(false);

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);

  const CLIENT_ID = '757286111875-ha4vf4bllmnir0t1fmd3ldad02q4ak6q.apps.googleusercontent.com'; // Replace with your client ID
  const API_KEY = 'AIzaSyA7Bfwh2Tb6fWJonXu6qPhUZoADwb-cFx0'; // Replace with your API key
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
  const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

  // Load Google API client library
  useEffect(() => {
    const loadGapi = () => {
      gapi.load('client:auth2', initClient);
    };

    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          // Listen for sign-in state changes
          gapi.auth2.getAuthInstance().isSignedIn.listen(setIsSignedIn);
          // Handle the initial sign-in state
          setIsSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());

          console.log('gapi init');
          setStartSignIn(true);
        })
        .catch((error: any) => {
          console.log('gapi-init-error', error);
        });
    };

    loadGapi();
  }, [CLIENT_ID, API_KEY, DISCOVERY_DOCS]);

  useEffect(() => {
    if (startSignIn) handleSignIn();
  }, [startSignIn]);

  // Sign in to Google account
  const handleSignIn = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then((result: any) => console.log(result))
      .catch((err: any) => {
        message.error('Kết nối thất bại');
        handleSignOut();
      });
  };

  // Sign out of Google account
  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
    setSelectedImages([]); // Clear selected images on sign out
    setIsOpenGooleDrive(false); // Close modal on sign out
    console.log('gapi sign out');
  };

  // Fetch images from Google Drive
  const fetchImages = async () => {
    const response = await gapi.client.drive.files.list({
      q: "mimeType='image/jpeg' or mimeType='image/png' or mimeType='image/gif'",
      fields: 'files(id, name)',
    });

    const files = response.result.files;
    if (files && files.length > 0) {
      const modifiedFiles: ImageFile[] = files.map((file: ImageFile) => ({
        id: file.id,
        uid: file.id,
        name: file.name,
        url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`, // Change webContentLink to url
      }));
      setImages(modifiedFiles);
      setIsOpenGooleDrive(true); // Show modal when images are fetched
    } else {
      console.log('No files found.');
    }
  };

  // Load images when user is signed in
  useEffect(() => {
    if (isSignedIn) {
      fetchImages();
    }
  }, [isSignedIn]);

  // Handle image selection
  const handleImageSelect = (image: ImageFile) => {
    const updatedSelection = selectedImages.map((item: ImageFile) => item.id).includes(image.id)
      ? selectedImages.filter((selected) => selected.id !== image.id) // Deselect the image
      : [...selectedImages, image]; // Select the image

    setSelectedImages(updatedSelection);
  };

  // Handle Done and Cancel actions (auto sign out)
  const handleDone = () => {
    handleFileSelection(selectedImages);
    handleSignOut(); // Sign out and close modal
  };

  const handleCancel = () => {
    handleSignOut(); // Sign out and close modal
  };

  return (
    <div>
      {isSignedIn ? (
        <Modal
          title='Select Images from Google Drive'
          open={isOpenGooleDrive}
          onCancel={handleCancel}
          height={300}
          className='z-50'
          footer={[
            <Button key='cancel' onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key='done' type='primary' onClick={handleDone}>
              Done
            </Button>,
          ]}
        >
          {images?.length === 0 ? <div className='w-full'>Bạn chưa có tấm hình nào trong Google Drive</div> : null}
          <div className='images-container grid grid-cols-4 overflow-auto max-h-[400px]'>
            {images.map((image) => (
              <div key={image.id} style={{ display: 'inline-block', margin: '5px' }}>
                <input
                  type='checkbox'
                  checked={selectedImages.map((item) => item.id).includes(image.id)}
                  onChange={() => handleImageSelect(image)}
                />
                <Image
                  src={image.url} // Changed from webContentLink to url
                  alt={image.name?.slice(0, 10)}
                  width={100}
                  height={100}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default GoogleDriveLoader;
