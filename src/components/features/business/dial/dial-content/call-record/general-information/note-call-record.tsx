import { setCallInfo } from '@components/shared/stringee/actions';
import { useHTranslation } from '@lib/i18n';
import { HFeature } from '@schema-form/features';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Form, Input, Space, Typography } from 'antd';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
const { Text } = Typography;

export const NoteCallDetail = () => {
  const { t } = useHTranslation('admin-common');
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const stringee = useSelector((state: RootStateOrAny) => state.stringee);
  const { namespace = '' } = stringee;
  const callDetail = stringee[namespace] || {};
  const callLog = callDetail?.callLog || {};
  const [statusSaveNote, setStatusSaveNote] = useState<string>('');

  useEffect(() => {
    form.resetFields();
    setStatusSaveNote('');
  }, [callLog?.id]);

  const submitCallLog = debounce(({ currentTarget }) => {
    if (!callLog?.id) {
      return;
    }
    setStatusSaveNote('Đang lưu ...');
    dispatch(
      setCallInfo({
        namespace,
        callLog: {
          ...callLog,
          note: currentTarget?.value,
        },
      }),
    );

    FormUtils.submitForm(
      {
        note: currentTarget?.value,
      },
      {
        nodeName: `/call-logs/${callLog.id}`,
        method: 'put',
        onGotSuccess: () => setStatusSaveNote('Đã lưu'),
      },
    );
  }, 1000);

  return (
    <HFeature
      {...{
        featureId: 'note-call-detail',
        useQueryParams: false,
        documentIdName: 'noteCallDetailId',
      }}
    >
      <HForm
        {...{
          form,
          schema: (props) => [
            createSchemaItem({
              Component: Input.TextArea,
              label: (
                <Space>
                  <Text>{t('Note', { vn: 'Ghi chú' })}</Text>
                  <Text italic type={'secondary'}>
                    {statusSaveNote}
                  </Text>
                </Space>
              ),
              name: 'note',
              componentProps: {
                placeholder: t('Note', { vn: 'Ghi chú' }),
                onChange: submitCallLog,
              },
            }),
          ],
          hideSubmitAndContinueButton: true,
          removeControlActions: true,
        }}
      />
    </HFeature>
  );
};
