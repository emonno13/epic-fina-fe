import { useHTranslation } from '@lib/i18n';
import { message } from 'antd';
import Button from 'antd/lib/button';
import Form, { FormProps } from 'antd/lib/form';
import { Col } from 'antd/lib/grid';
import Row from 'antd/lib/grid/row';
import { RowProps } from 'antd/lib/row';
import { memo } from 'react';
import { isEqual } from 'underscore';
import {
  HDatePicker,
  HTimePicker,
} from '../components/shared/common-form-elements/date-picker';
import {
  HInput,
  HInputNumber,
  HInputReferral,
  HTextArea,
} from '../components/shared/common-form-elements/h-input';
import { HSelect } from '../components/shared/common-form-elements/select';
import {
  useSetGlobalMessages,
  useSubmitAndContinueDocumentButtonRef,
  useSubmitDocumentButtonRef,
} from './features/hooks';
import {
  HFormItemProps,
  HFormProps,
  HPropsSerializer,
  SubmitButtonStyle,
} from './h-types';
import { FormUtils } from './utils/form-utils';

import './h-form.module.scss';

const { Item } = Form;

const generateNewRow = (
  rowProps: RowProps = {},
  children,
  key = new Date().getTime().toString(),
) => {
  return (
    <Row id={key} key={key} {...rowProps} className={rowProps?.className || ''}>
      {children}
    </Row>
  );
};

export const FormItemWithComponent = (formItem: HFormItemProps) => {
  const {
    Component,
    componentProps = {},
    ignore,
    componentRef,
    label,
    rules = [],
  } = formItem;

  const { t } = useHTranslation('common');

  const componentsSupportModernLabel = [
    HSelect,
    HInput,
    HDatePicker,
    HTimePicker,
    HInputNumber,
    HTextArea,
    HInput.Password,
    HInputReferral,
  ];

  const questionId = componentProps?.questions?.[0]?.id;
  const isRequiredField = componentProps?.questions?.[0]?.required;
  const isHighlightError = componentProps?.isHighlightError;
  const isValidateFormItem = questionId && isHighlightError && isRequiredField;

  const FormItem = ({ formItem, componentProps, componentRef }) => (
    <Item
      {...HPropsSerializer.item({ ...formItem })}
      name={FormUtils.getFormItemName(formItem)}
      {...(isValidateFormItem && {
        rules: [
          {
            validator: async (_, value) => {
              const valueTest = value?.find(
                (item) => item?.questionId === questionId,
              );
              if (
                valueTest?.content ||
                (Array.isArray(valueTest?.selectedOptions) &&
                  valueTest?.selectedOptions?.length > 0)
              ) {
                return Promise.resolve();
              } else {
                message.error(
                  t('Required survey question error', {
                    en: 'You must answer this answer',
                    vn: 'Bạn phải trả lời câu hỏi này',
                  }),
                  2,
                );
                return Promise.reject(new Error('The form validation error'));
              }
            },
          },
        ],
        help: '',
      })}
    >
      <Component ref={componentRef} {...componentProps} />
    </Item>
  );
  if (formItem?.label?.length === 0) {
    return <Component ref={componentRef} {...componentProps} />;
  }
  if (
    componentsSupportModernLabel.includes(Component) &&
    !!componentProps?.modernLabel
  ) {
    const ruleRequired: any = rules.find((item: any) => item.required);
    return FormItem({
      formItem: {
        ...formItem,
        label: undefined,
        style: { marginBottom: '24px' },
      },
      componentProps: {
        ...componentProps,
        required: !!ruleRequired?.required,
        label,
      },
      componentRef,
    });
  }
  return FormItem({ formItem, componentProps, componentRef });
};

/**
 *
 * @param formElements
 */
const buildFormItems = ({ formElements }) => {
  const formElementsSchema = new Array<any>();
  let elementsInRow = new Array<any>();
  let newRowProps: RowProps = {};
  let columnNames = new Array<any>();
  formElements.map((formItem: HFormItemProps, index) => {
    const { rowProps, isNewRow, colProps = {}, ignore, rendering } = formItem;
    if (rendering === false) {
      return;
    }
    const formItemName = FormUtils.getFormItemName(formItem);
    colProps.span ||= 24;
    columnNames.push(formItemName || index);

    const newColumn = (
      <Col
        key={`col_${formItemName || index} ${formItem.className}`}
        {...colProps}
      >
        <FormItemWithComponent {...formItem} />
      </Col>
    );

    if (rowProps || isNewRow) {
      // in the case a new row is first config, we just want to get the rowProps
      newRowProps = rowProps || { gutter: { xs: 8, md: 16 } };
      if (elementsInRow.length > 0) {
        formElementsSchema.push(
          generateNewRow(newRowProps, elementsInRow, columnNames.join('.')),
        );
        elementsInRow = [];
        columnNames = [];
      }
    }
    elementsInRow.push(newColumn);
  });

  elementsInRow.length > 0 &&
    formElementsSchema.push(generateNewRow(newRowProps, elementsInRow));
  return formElementsSchema;
};

export const HForm = memo((props: HFormProps) => {
  const [form] = Form.useForm();
  const handleReset = props.onReset || (() => formProps.form?.resetFields());
  const formProps: FormProps | any = { form, ...props };
  const { t } = useHTranslation('common');
  const {
    schema = (props) => [],
    hideControlButton,
    hideSubmitAndContinueButton = true,
    beforeSubmit = (form, props) => form,
    submitButtonLabel = t('submit'),
    iconBtnSubmit,
    removeControlActions = false,
    resetButtonLabel = t('reset'),
    submitAndContinueButtonLabel = t('submit_and_continue'),
    beforeSubmitAndContinue = (form, props) => form,
    onGotError,
  } = props;
  const submitRef = props.submitRef || useSubmitDocumentButtonRef();
  const submitAndContinueRef =
    props.submitAndContinueRef || useSubmitAndContinueDocumentButtonRef();

  const setGlobalMessages = useSetGlobalMessages();

  const customOnGotError = (response) => {
    if (onGotError) onGotError(response);
    setGlobalMessages({ error: true, errorMessage: response?.error?.message });
  };

  const onFinish = async (values, isSubmitAndContinue = false) => {
    const form: any = formProps.form;
    if (beforeSubmit(form, props) === false) {
      return;
    }
    await FormUtils.submitForm(
      values,
      { ...props, onGotError: customOnGotError, t },
      isSubmitAndContinue,
    );
  };

  const handleSubmitAndContinue = async () => {
    const form: any = formProps.form;
    if (beforeSubmitAndContinue(form, props) === false) {
      return;
    }
    try {
      const values = await form.validateFields();
      await onFinish(values, true);
    } catch (e) {
      FormUtils.showFormValidateFailMessage();
    }
  };

  return (
    <Form
      layout={formProps.layout || 'vertical'}
      {...{
        ...HPropsSerializer.form(formProps),
        onFinish,
        onReset: handleReset,
        onFinishFailed: ({ values, errorFields, outOfDate }) => {
          if (errorFields && errorFields.length > 0) {
            FormUtils.showFormValidateFailMessage();
          }
        },
      }}
    >
      {props.preFormElements}
      {buildFormItems({ formElements: schema(props) })}
      {!removeControlActions && (
        <Form.Item
          label={' '}
          className={`hform-btn-panel ${
            hideControlButton ? 'display-none-i' : ''
          }`}
        >
          <div className="hform-btns">
            {props.showResetButton && (
              <Button
                {...{
                  // type: "primary",
                  htmlType: 'reset',
                  size: 'large',
                  className: 'm-r-10',
                }}
              >
                {resetButtonLabel}
              </Button>
            )}
            <Button
              ref={submitRef}
              {...{
                type: 'primary',
                size: 'large',
                htmlType: 'submit',
                className: `${
                  props.submitButtonClassName ??
                  SubmitButtonStyle(props) + ' m-l-10'
                } `,
              }}
            >
              {submitButtonLabel} {iconBtnSubmit}
            </Button>
            <Button
              ref={submitAndContinueRef}
              {...{
                type: 'primary',
                size: 'large',
                onClick: handleSubmitAndContinue,
                className: `${SubmitButtonStyle(props)} m-l-10 ${
                  hideSubmitAndContinueButton ? 'display-none-i' : ''
                }`,
              }}
            >
              {submitAndContinueButtonLabel}
            </Button>
          </div>
        </Form.Item>
      )}

      {props.children}
    </Form>
  );
}, isEqual);

export const HSubForm = (props: HFormProps) => (
  <>
    {buildFormItems({ formElements: props.schema ? props.schema(props) : [] })}
  </>
);
