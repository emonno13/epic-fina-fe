import { Input } from 'antd';

import { FiledViewer } from '@components/shared/common/configuration/field-viewer';
import { createSchemaItem } from '@schema-form/h-types';
import { useHTranslation } from 'lib/i18n';
import {
  ConverterUtils,
  useGenerateConcealContent,
} from '../../../../lib/converter';
import { useDocumentDetail } from '../../../../schema-form/features/hooks';
import { HSelect } from '../../../shared/common-form-elements/select';
import { CALL_DIRECTION } from '../../../shared/stringee/constant';
import { createTaskSchemaItem } from '../tasks/task-popover';

export const CallLogsDetailSchemaForm = () => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      colProps: { xs: 24, sm: 24, md: 12 },
      Component: GenerateCallLogsInfomation,
    }),
    createTaskSchemaItem(),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'note',
      colProps: { span: 20 },
      label: t('Note', { vn: 'Ghi chú' }),
    }),
  ];
};

const GenerateCallLogsInfomation = () => {
  const callLog = useDocumentDetail();
  return (
    <>
      <ShowUserCall
        {...{
          showSelect: callLog?.direction === CALL_DIRECTION.CALL_IN,
          value:
            callLog?.direction === CALL_DIRECTION.CALL_IN
              ? callLog?.fromNumber
              : callLog?.staffId,
          label: 'Gọi đi từ',
        }}
      />
      <ShowUserCall
        {...{
          showSelect: callLog?.direction !== CALL_DIRECTION.CALL_IN,
          value: callLog?.toNumber,
          label: 'Gọi đến',
        }}
      />
      <FiledViewer
        {...{
          label: 'Thời gian bắt đầu cuộc gọi',
          value:
            callLog?.[
              callLog?.startTimeDatetime ? 'startTimeDatetime' : 'createdAt'
            ],
        }}
      />
      <FiledViewer
        {...{
          label: 'Độ dài cuộc gọi (giây)',
          value:
            callLog?.[
              callLog?.actualAnswerDuration
                ? 'actualAnswerDuration'
                : 'answerDuration'
            ],
        }}
      />
    </>
  );
};

const ShowUserCall = ({ showSelect = true, value = '', label = '' }) => {
  const generateConcealContent = useGenerateConcealContent();
  return (
    <FiledViewer
      {...{
        label,
        value: showSelect ? (
          generateConcealContent(value)
        ) : (
          <HSelect
            {...{
              value: value,
              className: 'call-logs-select-user',
              endpoint: 'users/suggestion',
              disabled: true,
              bordered: false,
              suffixIcon: <></>,
              optionsConverter: (document) => {
                return {
                  ...document,
                  label: ConverterUtils.getFullNameUser(document),
                };
              },
            }}
          />
        ),
      }}
    />
  );
};
