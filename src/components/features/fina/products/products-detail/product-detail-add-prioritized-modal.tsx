import { HTableDragNDrop } from '@components/shared/common/h-table-drag-n-drop/h-table-drag-n-drop';
import { ClickableOpacity } from '@components/shared/utils/clickable-opacity';
import { TrashIconSvg } from '@icons';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useHTranslation } from '../../../../../lib/i18n';
import { endpoints } from '../../../../../lib/networks/endpoints';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { useTableSourceData } from '../../../../../schema-form/features/hooks';
import { createSchemaItem } from '../../../../../schema-form/h-types';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { HModal } from '../../../../shared/common/h-modal';
import { GetIndexPrioritized } from './index';
import { PRODUCT_DETAIL_STATUS } from './utils';

const ProductDetailAddPrioritizedModal = ({
  isVisible,
  setIsVisible,
  searchForm,
}) => {
  const { t } = useHTranslation('admin-common');
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const dataSourceDefault = useTableSourceData();
  const router = useRouter();
  const { query } = router;
  const page = useMemo(() => query?.page || '1', [query]) as string;
  const indexPrioritized = GetIndexPrioritized();

  useEffect(() => {
    setDataSource(dataSourceDefault);
  }, [dataSourceDefault]);

  const handleUpdate = () => {
    form.submit();
  };

  const handleDeleteProductDetailIndexPrioritized = (productDetailId) => {
    const dataResult = [...dataSource];
    const idNeedRemove = dataResult
      .map((elm: any) => elm?.id)
      .indexOf(productDetailId);
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
        const productDetailId = document?.id;
        return (
          <ClickableOpacity
            {...{
              onClick: () =>
                handleDeleteProductDetailIndexPrioritized(productDetailId),
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
            'product-details/update-index-prioritized',
          ),
          onGotSuccess: () => {
            setIsVisible(false);
            searchForm?.submit();
          },
          onDataReadyToSubmit: () => ({
            productDetailsPrioritizedIds: dataSource?.map((el) => el?.id) || [],
          }),
          schema: () => [
            createSchemaItem({
              Component: HSelect,
              colProps: { span: 12 },
              label: t('Outstanding product detail', { vn: 'Gói vay nổi bật' }),
              componentProps: {
                placeholder: t('Product detail', { vn: 'Gói vay' }),
                showSearch: true,
                searchWhenHiddenValueChange: true,
                endpoint: 'product-details/product-detail-loan/suggestion',
                hiddenValues: {
                  indexPrioritized: { nin: indexPrioritized },
                  status: PRODUCT_DETAIL_STATUS.APPROVED,
                  id: { nin: dataSource?.map((el) => el?.id) },
                },
                optionsConverter: (document) => {
                  document.label = `${document?.name || ''} - ${document?.code || ''}`;
                  return document;
                },
                onChangeSelected: (productDetail) => {
                  setDataSource([...new Set([...dataSource, productDetail])]);
                },
              },
            }),
          ],
          hideSubmitAndContinueButton: true,
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

export default ProductDetailAddPrioritizedModal;
