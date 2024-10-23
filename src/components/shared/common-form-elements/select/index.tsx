import { PlusCircleOutlined } from '@ant-design/icons';
import { HForm, HSubForm } from '@schema-form/h-form';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';
import { getFilterWithRelations } from '@schema-form/utils/form-utils';
import { Button, Divider, Form, Input, Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { debounce } from 'lodash';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DropDownSvg } from '../../../../icons';
import { endpoints } from '../../../../lib/networks/endpoints';
import { httpRequester } from '../../../../lib/networks/http';
import { ObjectUtils } from '../../../../lib/object';
import { HModal, HModalProps } from '../../common/h-modal';
import { getPropertiesOfFloatLabel, ModernLabel } from '../h-input';
import { FormElementUtils } from '../utils';
import { SelectUtils } from './Utils';

export interface NewItemProps {
  formProps?: HFormProps;
  modalProps?: HModalProps;
  title?: string;
  label?: string;
  nodeName?: string;
  endpoint?: string;
  closeButtonLabel?: string;
  submitButtonLabel?: string;
}

const NEW_ITEM_VALUE = 'addANewItem';

export interface HSelectProps extends SelectProps<any> {
  endpoint?: string;
  hiddenValues?: any;
  fieldsValues?: any;
  newItemOption?: NewItemProps;
  optionValues?: any[];
  refValue?: object;
  nodeName?: string;
  optionsConverter?: Function;
  withRelations?: any[];
  isLoadFirst?: boolean;
  nameSubForm?: string;
  onChangeSelected?: any;
  searchWhenHidenValueChange?: boolean;
  searchWhenValueChange?: boolean;
  setValueSubForm?: (document) => Promise<any>;
  OptionsComponent?: FC;
  isNewDropdown?: boolean;
  modernLabel?: boolean;
  label?: string;
  required?: boolean;
}

const { Option } = Select;

export const HSelect = (props: HSelectProps) => {
  const [showNewPopup, setShowNewPopup] = useState(false);
  const mounted = useRef(true);
  const {
    optionValues = [],
    newItemOption,
    onChange,
    optionsConverter,
    endpoint,
    refValue,
    nodeName,
    mode,
    value,
    hiddenValues,
    withRelations = [],
    nameSubForm,
    onChangeSelected,
    searchWhenHidenValueChange = false,
    searchWhenValueChange = false,
    setValueSubForm,
    OptionsComponent,
    isNewDropdown,
    fieldsValues,
    modernLabel,
    label,
    required,
  } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation('common');
  const refInputSubForm = useRef<any>(null);
  const submitRef = useRef<any>(null);
  const submitAndContinueRef = useRef<any>(null);
  const isMultiMode = mode === 'multiple';

  const initOptionValues = useMemo(() => {
    return refValue ? [refValue, ...optionValues] : optionValues;
  }, []);
  const [optionDataSource, setOptionDataSource] = useState(initOptionValues);
  const [optionSelected, setOptionSelected] = useState<any[]>([]);

  useEffect(() => {
    handleInitOptionValues();
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    searchWhenHidenValueChange && onSuggestion('');
  }, [hiddenValues]);

  useEffect(() => {
    searchWhenValueChange &&
      onSuggestion('', { _id: Array.isArray(value) ? { inq: value } : value });
  }, [value]);

  const handleInitOptionValues = debounce(() => {
    if (
      !mounted.current ||
      (optionValues && optionValues.length > 0 && !props.isLoadFirst)
    ) {
      return;
    }
    if (props.endpoint) {
      onSuggestion('');
    }
  }, 400);

  const handleCreateNewItem = () => {
    setShowNewPopup(true);
  };

  const onSuggestion = debounce(
    async (input, alwaysReturnWithConditions?: any) => {
      if (!mounted.current) {
        return;
      }
      const toppedOrgId = hiddenValues?.toppedOrgId;
      const hiddenValueWithoutToppedOrgId = { ...hiddenValues };
      delete hiddenValueWithoutToppedOrgId.toppedOrgId;
      const filterValues: any = {
        filter: {
          include: getFilterWithRelations(withRelations),
          where: {
            _q: input,
            ...hiddenValueWithoutToppedOrgId,
            alwaysReturnWithConditions: alwaysReturnWithConditions || {
              _id: Array.isArray(value) ? { inq: value } : value,
            },
          },
        },
      };
      if (fieldsValues) {
        filterValues.filter.fields = fieldsValues;
      }
      const url = endpoints.generateNodeEndpoint(endpoint) || [];
      const result =
        (await httpRequester.getDataFromApi({
          url,
          params: { ...filterValues, toppedOrgId },
        })) || [];
      if (!mounted) {
        return;
      }
      if (!refValue || FormElementUtils.getValue(refValue) !== value) {
        return setOptionDataSource(result);
      }
      setOptionDataSource([...result, refValue]);
    },
    400,
  );
  const selectProps = Object.assign({}, props);

  if (isNewDropdown) {
    selectProps.suffixIcon = selectProps?.suffixIcon || <DropDownSvg />;
  }

  ObjectUtils.deleteProperties(selectProps, [
    'refValue',
    'endpoint',
    'optionValues',
    'newItemOption',
    'optionsConverter',
    'hiddenValues',
    'nodeName',
    'uppercase',
    'lowercase',
    'withRelations',
    'nameSubForm',
    'onChangeSelected',
    'searchWhenHidenValueChange',
  ]);

  const options = useMemo(() => {
    return FormElementUtils.getOptions(
      optionDataSource,
      Option,
      optionsConverter,
      OptionsComponent,
    );
  }, [optionDataSource, OptionsComponent]);

  if (endpoint) {
    selectProps.onSearch = onSuggestion;
  }
  const newItemConfigOption: NewItemProps = useMemo(() => {
    return newItemOption || {};
  }, []);

  const handleCreateNewSuccess = (data) => {
    if (!data || data.error) {
      return;
    }
    const { onGotSuccess } = newItemOption?.formProps || {};
    const convertedValueObject = optionsConverter
      ? optionsConverter(data)
      : data;
    const newValue = FormElementUtils.getValue(convertedValueObject);
    const label = FormElementUtils.getLabel(convertedValueObject);
    setOptionDataSource([...optionDataSource, data]);
    let componentValue = newValue;
    if (isMultiMode) {
      componentValue = value || [];
      componentValue = [...componentValue, newValue];
    }
    onChange &&
      onChange(componentValue, {
        children: label,
        key: newValue,
        value: newValue,
        label,
      });
    setShowNewPopup(false);
    onGotSuccess && onGotSuccess(data);
    onChangeSelected && onChangeSelected(data);
  };

  const handleCloseNewItemModel = () => {
    setShowNewPopup(false);
  };

  const generateSubForm = () => {
    return (
      <div style={{ display: 'none' }}>
        <HSubForm
          schema={() => [
            createSchemaItem({
              Component: Input,
              name: nameSubForm,
              componentProps: {
                ref: refInputSubForm,
              },
            }),
          ]}
        />
      </div>
    );
  };

  const handleChangeSelect = (value, option) => {
    if (!value && !option) {
      onChange && onChange(value, option);
      return;
    }

    if (Array.isArray(value)) {
      handleChangeSelectedByValueArray(value);
    } else {
      handleChangeSelectedByValue(value);
    }
    onChange && onChange(value, option);
  };

  const handleChangeSelectedByValueArray = async (values: any[]) => {
    const documents: any[] =
      [...optionSelected, ...optionDataSource].filter(
        (item) =>
          values.includes(item.id) ||
          values.includes(item._iid) ||
          values.includes(item?.value),
      ) || [];
    if (nameSubForm) {
      setOptionSelected(documents);
      const propsInput = refInputSubForm?.current?.props;
      const valueSubForm: any = setValueSubForm
        ? await setValueSubForm(documents)
        : [...documents];
      propsInput?.onChange &&
        propsInput?.onChange(!value ? value : valueSubForm);
    }
    onChangeSelected && onChangeSelected([...documents]);
  };

  const handleChangeSelectedByValue = async (value: any) => {
    const document: any = optionDataSource.find(
      (item) =>
        item.id === value || item._iid === value || item.value === value,
    );
    if (nameSubForm) {
      const propsInput = refInputSubForm?.current?.props;
      const valueSubForm: any = setValueSubForm
        ? await setValueSubForm(document)
        : { ...document };
      propsInput?.onChange &&
        propsInput?.onChange(!value ? value : valueSubForm);
    }
    onChangeSelected && onChangeSelected(document);
  };
  const formProps = newItemOption?.formProps || {};
  const transport = formProps.transport || {};
  transport.isNewDocument = true;
  formProps.transport = transport;

  const { requiredMark, labelClass } = getPropertiesOfFloatLabel(required);

  const DropDown = (menu) => (
    <div>
      {menu}
      {!!newItemOption && (
        <>
          <Divider style={{ margin: '5px 0' }} />
          <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
            <a
              onClick={handleCreateNewItem}
              style={{
                flex: 'none',
                padding: '0 8px',
                display: 'block',
                cursor: 'pointer',
              }}
            >
              <PlusCircleOutlined />{' '}
              {newItemOption?.label || t('create_a_item')}
            </a>
          </div>
        </>
      )}
    </div>
  );

  const Component = () => (
    <>
      {generateSubForm()}
      <Select
        allowClear
        {...{
          ...(props.endpoint ? { filterOption: () => true } : {}),
          ...selectProps,
        }}
        dropdownRender={DropDown}
        onChange={handleChangeSelect}
      >
        {options}
      </Select>
      {!!newItemOption && showNewPopup && (
        <HModal
          {...(newItemConfigOption.modalProps || {})}
          visible={showNewPopup}
          destroyOnClose
          footer={
            <div>
              <Button onClick={handleCloseNewItemModel} className="m-r-10">
                {newItemConfigOption.closeButtonLabel || 'Cancel'}
              </Button>
              <Button
                onClick={() => form.submit()}
                type="primary"
                className="m-r-10"
              >
                {newItemConfigOption.submitButtonLabel || 'Create'}
              </Button>
            </div>
          }
          onCancel={handleCloseNewItemModel}
        >
          <HForm
            {...{
              ...formProps,
              form,
              method: newItemOption.formProps?.method || 'post',
              onGotSuccess: handleCreateNewSuccess,
              submitRef,
              submitAndContinueRef,
              hideControlButton: true,
            }}
          />
        </HModal>
      )}
    </>
  );

  return (
    <div className={'h-select'}>
      {Component()}
      {modernLabel && (
        <ModernLabel
          label={label}
          labelClass={labelClass}
          requiredMark={requiredMark}
        />
      )}
    </div>
  );
};

export const createOrganizationSuggestionElement =
  SelectUtils.createOrganizationSuggestionElement;
export const createProductModelSuggestionElement =
  SelectUtils.createProductModelSuggestionElement;
export const createCategorySuggestionElement =
  SelectUtils.createCategorySuggestionElement;
export const createPermissionsSelectionElement =
  SelectUtils.createPermissionsSelectionElement;
export const createRoleSelectionElement =
  SelectUtils.createRoleSelectionElement;
