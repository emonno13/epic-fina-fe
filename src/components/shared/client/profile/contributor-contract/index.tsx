import { TemplateCollaboratorContract } from '@components/features/profiles/collaborator-contract/template-collaborator-contract';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { CloseIconLargeSvg } from '@icons';
import { CheckedGreenIcon } from '@icons/rsvgs/checked-green';
import { InfoOrangeIcon } from '@icons/rsvgs/info-orange';
import { ConverterUtils } from '@lib/converter';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { requestInformationUser } from '@store/actions';
import { Modal } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useDispatch } from 'react-redux';
import AccountIdentifier from './account-identifier';
import { ConfirmSignContractSuccess } from './account-identifier/info-contract';
import { SignatureReSign } from './signature-re-sign';

import './styles.module.scss';

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

const ProfileContributorContract = () => {
  const dispatch = useDispatch();
  const { t } = useHTranslation('common');
  const currentUser = useCurrentUser();
  const [userInformation, setUserInformation]: any = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [isSignContract, setIsSignContract] = useState(false);
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const handleSignAgain = () => setIsVisible(true);

  useEffect(() => {
    dispatch(
      requestInformationUser({
        userId: currentUser.id,
        callback: (response) => {
          const userInformation = {
            ...response,
            email: response?.emails[0].email,
            tel: response?.tels[0].tel,
            address: `${response?.address} ,${response?.subDistrictName}, ${response?.districtName} , ${response?.stateName}`,
            bankAccount: response?.banks?.[0]?.bankAccount,
            branchName: response?.banks?.[0]?.branchName,
            issuedOn: ConverterUtils.dateConverterToString(
              response?.identification?.issuedOn,
            ),
            placeOfIssue: response?.identification?.placeOfIssue,
          };

          setUserInformation(userInformation);
        },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, reload, currentUser]);

  return (
    <div className="profile-contributor-contract">
      <div className="profile-el-wrapper">
        {!isSignContract ? (
          <>
            <h2 className="profile-information-title">
              {t('profile.contributorContract')} &nbsp;
              {userInformation?.hasCollaboratorContract ? (
                <span className="contract-signed">
                  <CheckedGreenIcon />
                  {t('profile.signedContract')}
                </span>
              ) : (
                <span className="contract-not-signed">
                  <InfoOrangeIcon />
                  {t('profile.notSignedContract')}
                </span>
              )}
            </h2>

            <ViewCollaboratorContract {...{ userInformation }} />

            <div className="profile-contributor-contract-actions actions-view-contract">
              {!userInformation?.hasCollaboratorContract ? (
                <HButton type="primary" onClick={() => setIsSignContract(true)}>
                  {t('profile.contract')}
                </HButton>
              ) : (
                <>
                  <HButton type="primary" onClick={handleSignAgain}>
                    {t('profile.reSigned')}
                  </HButton>
                  <SignatureReSign
                    {...{
                      isVisible,
                      setIsVisible,
                      userInformation,
                      setLoading,
                      loading,
                      setReload,
                      reload,
                      setVisibleModalConfirm,
                    }}
                  />
                  <Modal
                    {...{
                      visible: visibleModalConfirm,
                      closeIcon: <CloseIconLargeSvg />,
                      closable: true,
                      onCancel: () => setVisibleModalConfirm(false),
                      width: 400,
                      className:
                        'info-contract-modal-confirm profile-info-modal',
                      footer: null,
                    }}
                  >
                    <ConfirmSignContractSuccess />
                  </Modal>
                </>
              )}
            </div>
          </>
        ) : (
          <AccountIdentifier {...{ setIsSignContract }} />
        )}
      </div>
    </div>
  );
};

export default ProfileContributorContract;
