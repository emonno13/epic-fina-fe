import React from 'react';
import {
  FooterControls,
  HFooterControlProps,
} from '../../../../../../schema-form/features/panels/popover-footer-controls';
import { useHTranslation } from '../../../../../../lib/i18n';
import { HButton } from '../../../../../shared/common-form-elements/h-confirmation-button';
import { TASK_STATUSES, TASK_STATUSES_ASSIGNED } from '../../../../../../constants/crm/task';
import { useDocumentDetail } from '../../../../../../schema-form/features/hooks';
import { TASK_PRODUCT_TYPES } from '../../utils';

import './finish-request-counselling.module.scss';

interface FooterControlWithEndCounsellingRequestProps extends HFooterControlProps {
  setIsVisibleFinishRequestCounselling?: Function;
  setIsVisibleComposeLetter?: Function;
  isVisibleButtonComposeLetter?: boolean;
  isShowShareInfoButton?: boolean;
  setVisibleShareInfoWithBank?: (value: boolean) => void;
  setIsVisibleCreateLoan?: Function;
}

export const FooterControlWithEndCounsellingRequest = (props: FooterControlWithEndCounsellingRequestProps) => {
  const {
    setIsVisibleFinishRequestCounselling = f => f, 
    setIsVisibleComposeLetter = f => f, 
    isVisibleButtonComposeLetter, 
    isShowShareInfoButton,
    setVisibleShareInfoWithBank = (value: boolean) => {},
    setIsVisibleCreateLoan = (value: boolean) => {},
    ...footerControlProps
  } = props;
  const { t } = useHTranslation('admin-common');
  const handleFinishRequestCounselling = () => {
    setIsVisibleFinishRequestCounselling(true);
  };
  const documentDetail = useDocumentDetail();

  const statusUnallowed = [TASK_STATUSES.CREATED, TASK_STATUSES.DONE];
  const statusAssignedUnallowed = [TASK_STATUSES_ASSIGNED.CREATE_PROFILE, TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS];

  return (
    <div className="footer-control-custom">
      {isVisibleButtonComposeLetter &&
				<HButton {...{
				  onClick: () => setIsVisibleComposeLetter(true),
				  className: 'm-r-10',
				}}>
					Soạn thư chào tín dụng
				</HButton>
      }
      {/* {documentDetail?.productType === TASK_PRODUCT_TYPES.loan && ( */}
      <HButton onClick={handleFinishRequestCounselling} className={'m-r-10'} type={'ghost'} danger>
        {t('finishCounsellingRequest')}
      </HButton>
      {/* )} */}
      {isShowShareInfoButton && <HButton {...{
        className: 'm-r-10',
        onClick: () => {setVisibleShareInfoWithBank(true);},
      }}>
        {t('Share information', { vn: 'Chia sẻ thông tin' })}
      </HButton>}
      {documentDetail && documentDetail?.productType === TASK_PRODUCT_TYPES.loan && (!statusUnallowed.includes(documentDetail?.status) && !statusAssignedUnallowed.includes(documentDetail?.statusAssign)) &&
				<HButton {...{
				  onClick: () => setIsVisibleCreateLoan(true),
				  type: 'primary',
				  className: 'm-r-10',
				}}>
				Tạo hồ sơ vay
				</HButton>
      }
      <FooterControls {...footerControlProps}/>
    </div>
  );
};

export default FooterControlWithEndCounsellingRequest;
