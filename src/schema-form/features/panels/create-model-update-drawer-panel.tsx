import { HDocumentDrawerPanel, HDocumentDrawerPanelProps } from './drawer';
import { HDocumentModalPanel, HDocumentModalPanelProps } from './modal';
import { useIsNewDocument } from '../hooks/document-detail-hooks';

export interface CMUDPanelProps extends HDocumentModalPanelProps, HDocumentDrawerPanelProps {
  hiddenModelControls?: boolean,
  hiddenDrawerControls?: boolean,
  hiddenModelSubmitAndContinueButton?: boolean,
  hiddenDrawerSubmitAndContinueButton?: boolean,
  panelType?: 'modal'|'drawer'
}

export const CMUDPanel = ({
  hiddenModelControls,
  hiddenDrawerControls,
  hiddenModelSubmitAndContinueButton,
  hiddenDrawerSubmitAndContinueButton,
  panelType,
  ...props
}: CMUDPanelProps) => {
  const isNewDocument = useIsNewDocument() || panelType === 'modal';
  if (isNewDocument) {
    return (
      <HDocumentModalPanel {...{
        ...props,
        hiddenDocumentButtonControls: hiddenModelControls,
        hideSubmitAndContinueButton: hiddenModelSubmitAndContinueButton,
      }}/>
    );
  }
  return (<HDocumentDrawerPanel {...{
    ...props,
    hiddenDocumentButtonControls: hiddenDrawerControls,
    hideSubmitAndContinueButton: hiddenDrawerSubmitAndContinueButton,
  }}/>);
};

export const CreateModalUpdateDrawerPanel = CMUDPanel;