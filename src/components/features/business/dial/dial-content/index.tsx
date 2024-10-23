import { RootStateOrAny, useSelector } from 'react-redux';

import { useState } from 'react';
import { CallRecordDetailView } from './call-record';
import { CallHandle } from './call-handle';

import './dial-content.module.scss';

export const PhoneCallContent = () => {
  const showDetailCallRecord = useSelector((state: RootStateOrAny) => state.dial.showDetailCallRecord);
  const isVisibleCallRecordDetail = useSelector((state: RootStateOrAny) => state.dial.isVisibleCallRecordDetail);
  const [hiddenLayout, setHiddenLayout] = useState(false);
  // todo show
  return (
    <div className="ui-call-panel">
      <div className={`ui-calling-detail ${(!showDetailCallRecord) ? 'display-none' : 'show'} ${(hiddenLayout) ? 'height-display-none' : 'height-show'}`}>
        <CallHandle setHiddenLayout={() => { setHiddenLayout(!hiddenLayout); }} hiddenLayout={hiddenLayout} />
        <div style={hiddenLayout ? { display: 'none' } : { display: 'block' }}>
          {isVisibleCallRecordDetail && <CallRecordDetailView />}
        </div>
      </div>
    </div>
  );
};

export default PhoneCallContent;