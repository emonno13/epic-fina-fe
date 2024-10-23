import { useHTranslation } from '@lib/i18n';
import { HSubForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Input, Tabs } from 'antd';
import { compact } from 'lodash';
import { useMemo } from 'react';
import { HSelect } from '../../../shared/common-form-elements/select';
const { TabPane } = Tabs;
const { TextArea } = Input;

export const HOTLINE_IVR_TYPE = {
  IVR: 'IVR',
  QUEUE: 'QUEUE',
  SOUND: 'SOUND',
};

export const HOTLINE_PLAY_MODE = {
  PLAY: 'play',
  TALK: 'talk',
};

export const CreateSchemaItemTabIVRHotline = ({
  onChange,
  value: typeIVr,
  ...props
}) => {
  const { t } = useHTranslation('admin-common');

  return (
    <>
      <Tabs
        {...{
          defaultActiveKey: props?.defaultValue,
          activeKey: typeIVr,
          onChange,
          ...props,
        }}
      >
        <TabPane tab="Sử dụng kịch bản IVR" key={HOTLINE_IVR_TYPE.IVR}>
          <HSubForm
            {...{
              schema: () => [
                createSchemaItem({
                  Component: HSelect,
                  name: 'ivrTreeId',
                  colProps: { span: 24 },
                  label: t('IVR'),
                  rules:
                    !typeIVr || typeIVr === HOTLINE_IVR_TYPE.IVR
                      ? [
                          {
                            required: true,
                            message: t('IVR is require', {
                              vn: 'IVR là bắt buộc',
                            }),
                          },
                        ]
                      : [],
                  componentProps: {
                    showSearch: true,
                    searchWhenHiddenValueChange: true,
                    endpoint: 'scenario-ivr-trees/suggestion',
                    optionsConverter: (option) => ({
                      ...option,
                      label: `${option?.code} - ${option?.name}`,
                    }),
                  },
                }),
              ],
            }}
          />
        </TabPane>
        <TabPane tab="Sử dụng hàng đợi" key={HOTLINE_IVR_TYPE.QUEUE}>
          <HSubForm
            {...{
              schema: () => [
                createSchemaItem({
                  Component: HSelect,
                  name: 'queueId',
                  rowProps: { gutter: { xs: 24, md: 24 } },
                  colProps: { span: 24 },
                  label: t('Queue', { vn: 'Hàng đợi' }),
                  rules:
                    typeIVr === HOTLINE_IVR_TYPE.QUEUE
                      ? [
                          {
                            required: true,
                            message: t('Queue is require', {
                              vn: 'Hàng đợi là bắt buộc',
                            }),
                          },
                        ]
                      : [],
                  componentProps: {
                    showSearch: true,
                    searchWhenHiddenValueChange: true,
                    endpoint: 'queues/suggestion',
                    nameSubForm: 'actionValue',
                  },
                }),
              ],
            }}
          />
        </TabPane>
        <TabPane tab="Sử dụng một file âm thanh" key={HOTLINE_IVR_TYPE.SOUND}>
          <HSubForm
            {...{
              schema: () => [
                createSchemaItem({
                  Component: PlayModeFileHotline,
                  name: 'playMode',
                  rowProps: { gutter: { xs: 24, md: 24 } },
                  colProps: { span: 24 },
                  label: t('Play mode', { vn: 'Chế độ phát' }),
                  rules:
                    typeIVr === HOTLINE_IVR_TYPE.SOUND
                      ? [
                          ({ getFieldsValue }) => ({
                            validator: (rule, playMode) => {
                              const { greetingFileId, playContentText } =
                                getFieldsValue();
                              if (
                                (playMode !== HOTLINE_PLAY_MODE.TALK &&
                                  !greetingFileId) ||
                                (playMode == HOTLINE_PLAY_MODE.TALK &&
                                  !playContentText)
                              ) {
                                return Promise.reject(
                                  t('Play content is required', {
                                    vn: 'Nội dung phát là bắt buộc',
                                  }),
                                );
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]
                      : [],
                }),
              ],
            }}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export const ContentHotlineRecord = (_, record) => {
  const { t } = useHTranslation('admin-common');
  const content = useMemo(() => {
    return getContentHotline(record, t);
  }, [record]);

  return <>{content}</>;
};

const getContentHotline = (record, t) => {
  const { typeIVr, queue, playMode, playContent, playContentText, ivrTree } =
    record;
  if (typeIVr == HOTLINE_IVR_TYPE.IVR) {
    return ivrTree?.name || '';
  }
  if (typeIVr == HOTLINE_IVR_TYPE.QUEUE && queue) {
    return compact([t('Queue', { vn: 'Hàng đợi' }), queue?.name]).join(' - ');
  }
  if (typeIVr == HOTLINE_IVR_TYPE.SOUND && playMode == HOTLINE_PLAY_MODE.PLAY) {
    const { name: fileName, originalName } = playContent?.file;
    return compact([
      t('Play mode', { vn: 'Âm thanh' }),
      playContent?.description,
      originalName || fileName,
    ]).join(' - ');
  }
  if (typeIVr == HOTLINE_IVR_TYPE.SOUND && playMode == HOTLINE_PLAY_MODE.TALK) {
    return compact([t('Play mode', { vn: 'Văn bản' }), playContentText]).join(
      ' - ',
    );
  }
  return '';
};

const PlayModeFileHotline = ({ onChange, value: playMode, ...props }) => {
  const { t } = useHTranslation('admin-common');

  return (
    <Tabs
      {...{
        defaultActiveKey: props?.defaultValue,
        activeKey: playMode,
        onChange,
        ...props,
      }}
    >
      <TabPane tab="Sử dụng file âm thanh" key="play">
        <HSubForm
          {...{
            schema: () => [
              createSchemaItem({
                Component: HSelect,
                name: 'greetingFileId',
                rowProps: { gutter: { xs: 24, md: 24 } },
                colProps: { span: 24 },
                label: t('Play content', { vn: 'Nội dung phát' }),
                componentProps: {
                  showSearch: true,
                  searchWhenHiddenValueChange: true,
                  endpoint: 'greeting-files/suggestion',
                  withRelations: ['file'],
                  nameSubForm: 'playContent',
                  optionsConverter: (option) => {
                    return {
                      ...option,
                      label: option?.description || '',
                    };
                  },
                },
              }),
            ],
          }}
        />
      </TabPane>
      <TabPane tab="Sử dụng văn bản (Chuyển đổi giọng nói)" key="talk">
        <HSubForm
          {...{
            schema: () => [
              createSchemaItem({
                Component: TextArea,
                name: 'playContentText',
                colProps: { span: 24 },
                label: t('Play content', { vn: 'Nội dung phát' }),
              }),
            ],
          }}
        />
      </TabPane>
    </Tabs>
  );
};
