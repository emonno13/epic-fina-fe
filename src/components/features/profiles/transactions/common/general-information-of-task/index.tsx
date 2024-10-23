import { mappingStatusOfTask } from '@components/features/crm/tasks/utils';
import { FiledViewer } from '@components/shared/common/configuration/field-viewer';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { Tag, Typography } from 'antd';
import classNames from 'classnames';
import { TASK_STATUSES_COLOR_MAPPING } from 'constants/crm/task';
import { memo } from 'react';

import './general-information-of-task.module.scss';

const { Paragraph } = Typography;

interface GeneralInformationOfTaskProps {
  taskData: any;
  onClick?: () => void;
}

const GeneralInformationOfTask = memo(
  (props: GeneralInformationOfTaskProps) => {
    const { taskData, onClick } = props;
    const { t } = useHTranslation('admin-common');
    const { user, status, statusAssign, assignee, updatedAt, code } = taskData;
    const documentDetail = useDocumentDetail() || {};

    return (
      <div
        onClick={onClick}
        className={classNames('general-information-of-task', {
          active: documentDetail?.id === taskData?.id,
        })}
      >
        <div className="m-b-10">
          <a>#{code}</a>
        </div>
        <Tag color={TASK_STATUSES_COLOR_MAPPING[status]}>
          {mappingStatusOfTask({ t, status, statusAssign })}
        </Tag>
        <Paragraph strong>{ConverterUtils.getFullNameUser(user)}</Paragraph>
        <FiledViewer
          label={t('Handling staff', { vn: 'Nhân viên xử lý' })}
          value={ConverterUtils.getFullNameUser(assignee)}
          widthLabel="45%"
        />
        <FiledViewer
          label={t('Updated at', { vn: 'Cập nhật' })}
          value={ConverterUtils.dateConverterToString(updatedAt)}
          widthLabel="45%"
        />
      </div>
    );
  },
);

export default GeneralInformationOfTask;
