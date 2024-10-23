/* eslint-disable @next/next/no-img-element */
import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { eSignatureStep } from './detail/constants';

import './client-fund-certificate.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const ContractPreview = ({
  setCurrentStepESignature,
  contractUrl,
  setVisibleESignature,
}) => {
  const { t } = useHTranslation('common');
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);

  const onSuccess = (sample?: any) => {
    setPageNumber(1);
  };

  return (
    <div className="contract-preview">
      <div className="contract-preview__header">
        <div className="header--left">
          <img src={'/assets/images/vina_capital_logo.png'} alt="logo-mio" />
          <span>VINA CAPITAL</span>
        </div>
        <div className="header--right">
          <span className="header--right__content">{t('unsigned')}</span>
        </div>
      </div>
      <div className="contract-preview__body">
        <Document
          file={contractUrl}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
            onSuccess();
          }}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
      <div className="contract-preview__footer">
        <Button onClick={() => setVisibleESignature(false)}>
          {t('cancel')}
        </Button>
        <Button
          type="primary"
          onClick={() => setCurrentStepESignature(eSignatureStep.SIGNATURE)}
        >
          {t('agree')}
        </Button>
      </div>
    </div>
  );
};
