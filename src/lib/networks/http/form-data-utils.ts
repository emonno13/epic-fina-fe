/**
 * Created by Peter Hoang Nguyen on 4/5/2017.
 */

import { ConvertUtils } from '@lib/utils/convert';
import moment from 'moment';

export const FormDataUtils = {
  convertObjectToUri: (params) => {
    const formData = FormDataUtils.createFrom(params);
    return FormDataUtils.convertFormDataToString(formData);
  },
  convertObjectUriParamsObject: (params) => {
    const formData: any = FormDataUtils.createFrom(params);
    const dataOfForm = [...formData.entries()];
    const result = {};
    dataOfForm.map((fieldDetail) => (result[fieldDetail[0]] = fieldDetail[1]));
    return result;
  },
  convertFormDataToString: (formData) => {
    const dataOfForm = [...formData.entries()];
    return dataOfForm
      .map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
      .join('&');
  },
  createFrom: (params, form = new FormData()) => {
    if (!params) {
      return form;
    }
    Object.keys(params).forEach((key) => {
      FormDataUtils.simplifyParamsWithForm(form, key, params[key]);
    });
    return form;
  },
  simplifyParamsWithForm: (form, key, param) => {
    if (
      typeof param === 'undefined' ||
      // || param === null
      key.indexOf('@@ignore@@') !== -1 ||
      key === 'featureNames'
    )
      return;

    if (typeof param !== 'object' || param instanceof File || param === null) {
      if (`${key}`.includes('_q')) {
        param = ConvertUtils.escapeRegex(param);
      }
      form.append(key, param);
      return;
    }

    if (Array.isArray(param)) {
      param.forEach((value, i) => {
        FormDataUtils.simplifyParamsWithForm(form, `${key}[${i}]`, value);
      });
    } else {
      Object.keys(param).forEach((subKey) => {
        FormDataUtils.simplifyParamsWithForm(
          form,
          `${key}[${subKey}]`,
          param[subKey],
        );
      });
    }
  },
  simplifyParams: (data = {}, key, param) => {
    if (
      typeof param === 'undefined' ||
      // || param === null
      `${key}`.indexOf('@@ignore@@') !== -1 ||
      key === 'featureNames'
    )
      return;

    const isInstanceOfFile = global.window && param instanceof File;
    if (
      typeof param !== 'object' ||
      isInstanceOfFile ||
      moment(param).isValid() ||
      param === null
    ) {
      if (`${key}`.includes('_q')) {
        param = ConvertUtils.escapeRegex(param);
      }
      data[key] = param;
      return;
    }

    if (Array.isArray(param)) {
      data[key] = [...param];
      param.forEach((value, i) => {
        FormDataUtils.simplifyParams(data[key], i, value);
      });
    } else {
      data[key] = {};
      Object.keys(param).forEach((subKey) => {
        FormDataUtils.simplifyParams(data[key], `${subKey}`, param[subKey]);
      });
    }
  },
};
