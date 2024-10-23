import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { HForm, HSubForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Form, notification } from 'antd';
import { useContext } from 'react';
import { SellActionContext } from './context';

export const SelectProductAndProgram = ({ handleNextStep }) => {
  const { t } = useHTranslation('common');
  const { product, setProduct, productProgram, setProductProgram } =
    useContext(SellActionContext);
  const [form] = Form.useForm();

  return (
    <div>
      <HForm
        form={form}
        hideControlButton={true}
        initialValues={{
          productId: product?.id,
          productProgramId: productProgram?.id,
        }}
        schema={() => [
          createSchemaItem({
            Component: HSelect,
            name: 'productId',
            label: t('Product', { vn: 'Sản phẩm' }),
            rules: [
              {
                required: true,
                message: t('Please select product', {
                  vn: 'Vui lòng chọn sản phẩm',
                }),
              },
            ],
            colProps: { xs: 24, sm: 24, md: 24 },
            rowProps: { gutter: { xs: 8, md: 12 } },
            componentProps: {
              placeholder: t('Select product', { vn: 'Chọn sản phẩm' }),
              modernLabel: true,
              endpoint: 'users/asset-management-product',
              onChangeSelected: (value) => {
                setProduct(value);
              },
            },
          }),
          createSchemaItem({
            Component: ({ value: productId }) => {
              return (
                <HSubForm
                  schema={() => [
                    createSchemaItem({
                      Component: HSelect,
                      name: 'productProgramId',
                      label: t('Product program', { vn: 'Chương trình' }),
                      rules: [
                        {
                          required: true,
                          message: t('Please select program', {
                            vn: 'Vui lòng chọn chương trình',
                          }),
                        },
                      ],
                      colProps: { xs: 24, sm: 24, md: 24 },
                      rowProps: { gutter: { xs: 8, md: 12 } },
                      componentProps: {
                        placeholder: t('Select program', {
                          vn: 'Chọn chương trình',
                        }),
                        modernLabel: true,
                        hiddenValues: { productId },
                        disabled: !productId,
                        searchWhenHidenValueChange: true,
                        endpoint: 'products/load-asset-program',
                        onChangeSelected: (value) => {
                          setProductProgram(value);
                        },
                      },
                    }),
                  ]}
                />
              );
            },
            name: 'productId',
            className: 'm-b-0i',
          }),
        ]}
      />
      <div className="form-info-fund-action">
        <HButton
          {...{
            className: 'form-info-fund-action-sell',
            type: 'primary',
            size: 'large',
            onClick: async () => {
              try {
                await form?.validateFields();
                handleNextStep();
              } catch (e) {
                notification.error({
                  message: t('Form value is not correct', {
                    vn: 'Giá trị của biểu mẫu không chính xác',
                  }),
                  description: t(
                    'Please double check your form value and submit again.',
                    {
                      vn: 'Vui lòng kiểm tra kỹ giá trị biểu mẫu của bạn và gửi lại.',
                    },
                  ),
                });
              }
            },
          }}
        >
          {t('Next', { vn: 'Tiếp tục' })}
        </HButton>
      </div>
    </div>
  );
};
