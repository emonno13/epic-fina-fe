import React, { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { ItemViewer } from '../common/configuration/item-viewer';
import { Phones } from '../stringee';

import './detail-viewer.module.scss';

export const DetailViewer = ({ value = {}, belongToId }: { value?: any, belongToId?: string}) => {
  if (typeof value === 'string') {
    return value;
  }
  const valueKeys = useMemo(() => {
    return Object.keys(value);
  }, [value]);
  const { t } = useTranslation('admin-common');
  if (valueKeys.length === 0) return null;

  return (
    <span className="ui-detail-viewer">
      {valueKeys.map(key => {
        const valueOfKey = typeof value[key] === 'object' ? JSON.stringify(value[key]) : value[key];
        if (key === 'tels') {
          return  <ItemViewer className="ui-phones" key={key} {...{ label: t(key), value: <Phones {...{ phones: value.tels, belongToId }}/> }}/>;
        }
        if (key === 'emails') {
          const emails = value.emails || [];
          return emails.map(({ email }) => (<ItemViewer className="ui-phones" key={email} {...{ label: t(key), value: email }}/>));
        }
        return <ItemViewer key={key} {...{ label: t(key), value: valueOfKey }}/>;
      })}
    </span>
  );
};