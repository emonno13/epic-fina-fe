import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { FormUtils } from '@schema-form/utils/form-utils';
import { getProductTypeOptions } from 'types/organization';
import SurveyTabListSelect from './survey-tab-list-select';

export const SurveyTabFormSchema = (
  props: HFormProps,
  {
    setChosenQuestionGroup,
    setProductCategories,
    setQuestionGroups,
    productCategories,
    questionGroups,
  },
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { form } = props;

  const onProductTypeChange = async (productType) => {
    const productCategoriesResponse = await FormUtils.submitForm(
      { filter: { where: { type: productType } } },
      { method: 'get', nodeName: '/categories' },
    );
    setProductCategories(productCategoriesResponse?.data || []);
    setQuestionGroups([]);
    form?.setFieldsValue({
      productCategoryId: '',
      questionGroupId: '',
    });
  };

  const onProductCategoriesChange = async (productCategoryId) => {
    const questionGroupsResponse = await FormUtils.submitForm(
      { filter: { where: { categoryId: productCategoryId } } },
      { method: 'get', nodeName: '/question-groups' },
    );
    setQuestionGroups(questionGroupsResponse?.data || []);
    form?.setFieldsValue({
      questionGroupId: '',
    });
  };

  const onQuestionGroupsChange = async (questionGroupId) => {
    const questionGroupResponse = await FormUtils.submitForm(
      {},
      { method: 'get', nodeName: `/question-groups/${questionGroupId}` },
    );
    setChosenQuestionGroup(questionGroupResponse || {});
  };

  return [
    createSchemaItem({
      Component: SurveyTabListSelect,
      name: 'productType',
      label: 'Loại sản phẩm',
      componentProps: {
        options: getProductTypeOptions(t).map(({ label, value }) => ({
          id: value,
          name: label,
        })),
        onChange: onProductTypeChange,
      },
    }),
    createSchemaItem({
      Component: SurveyTabListSelect,
      name: 'productCategoryId',
      label: 'Danh mục sản phẩm',
      componentProps: {
        options: productCategories,
        onChange: onProductCategoriesChange,
        empty: 'Xin vui lòng chọn loại sản phẩm',
      },
    }),
    createSchemaItem({
      Component: SurveyTabListSelect,
      name: 'questionGroupId',
      label: 'Bộ câu hỏi',
      componentProps: {
        options: questionGroups,
        onChange: onQuestionGroupsChange,
        empty: 'Xin vui lòng chọn danh mục sản phẩm',
      },
    }),
  ];
};
