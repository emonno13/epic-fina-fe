import { ConvertUtils } from '@lib/utils/convert';
import { OptionGroupFC } from 'rc-select/lib/OptGroup';
import { OptionFC } from 'rc-select/lib/Option';
import { FC, ReactElement } from 'react';

export const FormElementUtils = {
  getValue: (obj) => obj.value || obj.id || obj._iid,
  getLabel: (obj) => obj.label || obj.name || obj.code,
  getOptions: (
    values: any[] = [],
    SubComponent: FC | OptionFC | OptionGroupFC,
    converter?: Function,
    OptionsComponent?: FC,
  ) => {
    const result: ReactElement[] = [];
    const mapToCheckDuplicate = {};
    Array.isArray(values) &&
      values.map((valueObject) => {
        const convertedValueObject = converter
          ? converter(valueObject)
          : valueObject;
        const value = FormElementUtils.getValue(convertedValueObject);
        const label = FormElementUtils.getLabel(convertedValueObject);
        const keyDuplicate = `${value}.${label}`;
        if (mapToCheckDuplicate[keyDuplicate]) {
          return;
        }
        mapToCheckDuplicate[keyDuplicate] = true;
        result.push(
          <SubComponent key={value} {...{ value }}>
            {!OptionsComponent && label}
            {!!OptionsComponent && <OptionsComponent {...valueObject} />}
          </SubComponent>,
        );
      });
    return result;
  },
};

export const formatNumber = (num) => {
  if (
    (typeof num === 'string' && !num.length) ||
    num === null ||
    num === undefined
  ) {
    return null;
  }

  if (!num) return 0;

  const parts = num.toString().split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const setFormSlugValue = (value, form: any, slugField?: string) => {
  const field = slugField || 'slug';
  if (form) {
    form?.setFieldsValue({
      [field]: ConvertUtils.slugify(value),
    });
  }
};
