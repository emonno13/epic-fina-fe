import React from 'react';
import { GridSvg, ListSvg } from '../../icons';
import { useHTranslation } from '../../../../../../lib/i18n';

import './changing-view.module.scss';

interface ChangingViewProps{
  view: 'grid' | 'list'
  setView(e: 'grid' | 'list'): void
  total: number
}
const ChangingView = React.memo(({ view, setView, total }: ChangingViewProps)=> {
  const { t } = useHTranslation('recruit');
  return (
    <div className="changing-view__container">
      <p className="changing-view__title changing-view__row">
        {t('jobs.found')}&nbsp;
        <p className="changing-view__blue">
          {total}
        </p>
				&nbsp;{t('jobs.job')}
      </p>
      <div className="changing-view__row changing-view__hide">
        <p className="changing-view__view">Xem dạng</p>
        <div className="changing-view__row">
          <GridSvg className={`${view === 'grid' && 'changing-view__fill'}`} style={{ marginRight: '5px' }} onClick={()=>setView('grid')}/>
          <ListSvg className={`${view === 'list' && 'changing-view__fill'}`} onClick={()=>setView('list')}/>
        </div>
      </div>
    </div>
  );
});
export default ChangingView;
