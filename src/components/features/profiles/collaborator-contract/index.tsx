import { useIsMobile } from '@lib/hooks/use-media';
import { SuccessIcon } from '@lib/icon';
import { Button } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDispatch } from 'react-redux';
import { useCurrentUser } from '../../../../lib/providers/auth';
import { requestInformationUser } from '../../../../store/actions';
import { RouteUtils } from '../../../shared/layout/router-contaner/utils';
import { USER_TYPES } from '../../crm/tasks/constans';
import { SignatureReSign } from './signature-re-sign';
import { TemplateCollaboratorContract } from './template-collaborator-contract';

import '../profiles.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const ViewCollaboratorContract = ({ userInformation }) => {
  const [numPages, setNumPages] = useState(null);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const isMobile = useIsMobile();
  const contractUrl = useMemo(() => {
    try {
      const { pathname, search } = new URL(userInformation?.contract?.url);
      return `${process.env.NEXT_PUBLIC_API_SERVER}${pathname}${search}`;
    } catch (error) {
      return '';
    }
  }, [userInformation]);
  return (
    <>
      {!userInformation?.hasCollaboratorContract && (
        <div className={'contract-collaborator'}>
          <div className={'contract-collaborator-content'}>
            <TemplateCollaboratorContract {...userInformation} />
          </div>
        </div>
      )}
      {userInformation?.hasCollaboratorContract && (
        <>
          {isMobile && (
            <div className={'contract-collaborator'}>
              <div className={'contract-collaborator-content'}>
                {userInformation?.hasCollaboratorContract && (
                  <Document
                    file={contractUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                  </Document>
                )}
              </div>
            </div>
          )}
          {!isMobile && (
            <iframe
              src={contractUrl}
              width={'100%'}
              height={'650'}
              title="hdctv"
            />
          )}
        </>
      )}
    </>
  );
};
const CollaboratorContract = () => {
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();
  const [userInformation, setUserInformation] = useState() as any;
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const handleSignAgain = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    dispatch(
      requestInformationUser({
        userId: currentUser.id,
        callback: (response) => {
          setUserInformation(response);
        },
      }),
    );
  }, [loading, reload]);
  return (
    <div className={'wrapper-contact'}>
      {userInformation?.hasCollaboratorContract && (
        <>
          <div className={'success-signed'}>
            <SuccessIcon />
            Ký hợp đồng Cộng tác viên với FINA thành công
          </div>
          <Button
            style={{ width: '30%', marginTop: '15px' }}
            type="primary"
            shape="round"
            size="large"
            disabled={[USER_TYPES.staff, USER_TYPES.teller].includes(
              currentUser.type,
            )}
            onClick={handleSignAgain}
          >
            Ký hợp đồng lại
          </Button>
          <SignatureReSign
            {...{
              isVisible,
              setIsVisible,
              userInformation,
              setLoading,
              loading,
              setReload,
              reload,
            }}
          />
        </>
      )}
      <div className={'wrapper-person-information'}>
        <div className={'content-contact'}>
          <ViewCollaboratorContract {...{ userInformation }} />
          {!userInformation?.hasCollaboratorContract && (
            <Button
              style={{ width: '100%' }}
              type="primary"
              shape="round"
              size="large"
              disabled={[USER_TYPES.staff, USER_TYPES.teller].includes(
                currentUser.type,
              )}
              onClick={async () => {
                RouteUtils.redirect('/admin/profiles/account-identifier');
              }}
            >
              Ký hợp đồng
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaboratorContract;
