import React from 'react';
import { TFunctionKeys } from 'i18next';

interface LabelProps{
  t: TFunctionKeys
}

const CustomLabel = React.memo(({ t } : LabelProps)=> {
  return (
    <div style={{ color: 'white' }}>{t}</div>
  );
});
export default CustomLabel;
