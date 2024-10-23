import { useSetFeatureData } from '@schema-form/features/hooks/document-detail-hooks';
import Radio from 'antd/lib/radio';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHTranslation } from '../../../../../../lib/i18n';
import { useFeatureId } from '../../../../../../schema-form/features/hooks';
import { updateDealProgressItem } from '../../actions';
import { NAMESPACES } from '../../utils';

import './progress-action.module.scss';

export const HButtonControlActionProgress = ({ dataSource, items }) => {
  const dispatch = useDispatch();
  const { t } = useHTranslation('admin-common');
  const featureId: string = useFeatureId();
  const setFeatureData = useSetFeatureData(featureId);
  const itemActions = items.progressItem?.itemActions?.map((el) => {
    el.label = t(el?.name);
    el.value = el?.code;
    return el;
  });
  const [currentStatusProgress, setCurrentStatusProgress] = useState(
    items?.currentStatusProgress,
  );

  const onChangeActionProgress = (action) => {
    setCurrentStatusProgress(action.target.value);
    const actionSelected = items?.progressItem?.itemActions?.find(
      (el) => el?.code === action?.target?.value,
    );
    const template = items?.progressItem?.templateNotification?.find(
      (el) => el?.actionCode === actionSelected?.code,
    );
    const requestData = {
      objectId: dataSource?.objectId,
      objectType: dataSource?.objectType,
      action: actionSelected,
      progressId: items?.progressId,
      templateCode: template?.templateCode,
    };
    dispatch(updateDealProgressItem(requestData));
    afterNothing(items, actionSelected);
  };

  const afterNothing = (items, actionSelected) => {
    const itemDealProgress = dataSource?.items?.find(
      (el) => el?.progressId?.toString() === items?.progressId,
    );
    if (!itemDealProgress) {
      return;
    }
    itemDealProgress.currentStatusProgress = actionSelected?.code;
    itemDealProgress.currentWeight = Math.round(
      (itemDealProgress.weight * actionSelected?.percent) / 100,
    );
    setFeatureData(NAMESPACES.dataSource, [dataSource]);
  };
  return (
    <Radio.Group
      options={itemActions}
      value={currentStatusProgress}
      onChange={onChangeActionProgress}
      optionType="button"
      buttonStyle="solid"
      size={'large'}
    />
  );
};
