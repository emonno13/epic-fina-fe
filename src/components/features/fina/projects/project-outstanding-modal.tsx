import { HSelect } from '@components/shared/common-form-elements/select';
import { HModal } from '@components/shared/common/h-modal';
import { HTableDragNDrop } from '@components/shared/common/h-table-drag-n-drop/h-table-drag-n-drop';
import { ClickableOpacity } from '@components/shared/utils/clickable-opacity';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { useTableSourceData } from '@schema-form/features/hooks';
import { createSchemaItem } from '@schema-form/h-types';
import { Form } from 'antd';
import { TrashIconSvg } from 'icons';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { GetIndexPrioritized } from './index';

const ProjectOutstandingModal = ({ isVisible, setIsVisible, searchForm }) => {
  const { t } = useHTranslation('admin-common');
  const [dataSource, setDataSource] = useState<any[]>([]);
  const dataSourceDefault = useTableSourceData();
  const router = useRouter();
  const { query } = router;
  const page = useMemo(() => query?.page || '1', [query]) as string;
  const indexPrioritized = GetIndexPrioritized();
  const [form] = Form.useForm();

  useEffect(() => {
    setDataSource(dataSourceDefault);
  }, [dataSourceDefault]);

  const deleteProjectOutstanding = (projectOutstandingId) => {
    const dataResult = [...dataSource];
    const idNeedRemove = dataResult
      .map((elm: any) => elm?.id)
      .indexOf(projectOutstandingId);
    dataResult?.splice(idNeedRemove, 1);
    setDataSource(dataResult);
  };

  const columnsConfig = [
    {
      title: 'STT',
      key: 'index',
      width: 100,
      render: (value, record, index) => (parseInt(page) - 1) * 10 + index + 1,
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('Action', { vn: 'Hành động' }),
      width: 100,
      key: 'control',
      render: (document) => {
        const projectOutstandingId = document?.id;
        return (
          <ClickableOpacity
            {...{
              onClick: () => deleteProjectOutstanding(projectOutstandingId),
              confirmation: {
                message: t(`Do you want to delete ${document?.name}?`, {
                  vn: `Bạn có muốn xóa ${document?.name}`,
                }),
              },
            }}
          >
            <TrashIconSvg />
          </ClickableOpacity>
        );
      },
    },
  ];

  const handleUpdate = () => {
    form.submit();
  };

  return (
    <HModal
      {...{
        width: '80%',
        onOk: handleUpdate,
        onCancel: () => setIsVisible(false),
        visible: isVisible,
        title: t('Chỉnh sửa gói vay nổi bật'),
      }}
    >
      <HFeatureForm
        {...{
          form,
          endpoint: endpoints.generateNodeEndpoint(
            'projects/update-index-prioritized',
          ),
          onGotSuccess: () => {
            searchForm?.submit();
            setIsVisible(false);
          },
          onDataReadyToSubmit: () => ({
            projectOutstandingPrioritizedIds:
              dataSource?.map((el) => el?.id) || [],
          }),
          schema: () => [
            createSchemaItem({
              Component: HSelect,
              colProps: { span: 12 },
              label: t('Projects Outstanding', { vn: 'Dự án bds nổi bật' }),
              componentProps: {
                placeholder: t('Projects', { vn: 'Dự án bds' }),
                showSearch: true,
                searchWhenHiddenValueChange: true,
                endpoint: 'projects/suggestion',
                hiddenValues: {
                  indexPrioritized: { nin: indexPrioritized },
                  id: { nin: dataSource?.map((el) => el?.id) },
                  active: true,
                },
                optionsConverter: (document) => {
                  document.label = `${document?.name || ''} - ${document?.code || ''}`;
                  return document;
                },
                onChangeSelected: (projectOutstanding) => {
                  setDataSource([
                    ...new Set([...dataSource, projectOutstanding]),
                  ]);
                },
              },
            }),
          ],
          hideControlButton: true,
        }}
      />
      <HTableDragNDrop
        {...{
          dataSource,
          setDataSource,
          columns: columnsConfig,
        }}
      />
    </HModal>
  );
};

export default ProjectOutstandingModal;
