import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';
import { FormInstance } from 'antd/lib/form';
import notification from 'antd/lib/notification';
import { omit, pick, union } from 'lodash';
import clonedeep from 'lodash.clonedeep';
import moment from 'moment';
import { HFormItemProps, HFormProps } from '../h-types';
const addRelationFilterWithStringRelation = (
  relations: any[] = [],
  relation,
  relationFilters,
) => {
  if (relationFilters[relation]) {
    relations.push({
      relation,
      scope: {
        where: relationFilters[relation],
      },
    });
  } else {
    relations.push({ relation });
  }
};

const addRelationFilterWithObjectRelation = (
  relations: any[] = [],
  relation,
  relationFilters,
) => {
  const relationName = relation.relation;
  if (relationFilters[relationName]) {
    const where = relation.scope?.where || {};
    relation.scope ||= {};
    relation.scope.where = { ...where, ...relationFilters[relationName] };
    relations.push(relation);
  } else {
    relations.push(relation);
  }
};

export const getFilterWithRelations = (
  withRelations: any[] = [],
  relationFilters = {},
) => {
  const relations: any[] = [];
  try {
    withRelations.map((relation: any) => {
      if (typeof relation === 'string') {
        return addRelationFilterWithStringRelation(
          relations,
          relation,
          relationFilters,
        );
      }
      addRelationFilterWithObjectRelation(relations, relation, relationFilters);
    });
  } catch (e) {
    console.log(e);
  }
  return relations;
};

export const getFilterSearchFieldWithRelations = (values: any = {}) => {
  try {
    const fields: string[] = Object.keys(values);
    const valuesWithOutRelations = {};
    const relations = {};
    fields.map((field: string) => {
      if (!field.startsWith('R_')) {
        valuesWithOutRelations[field] = values[field];
        return;
      }
      if (!values[field]) return;
      const paths = field.split('_');
      // R_relationName_fieldName
      const fieldName = field.substring(
        field.indexOf('_', 2) + 1,
        field.length,
      );
      relations[paths[1]] ||= {};
      relations[paths[1]][fieldName] = values[field];
    });
    return {
      values: valuesWithOutRelations,
      relations,
    };
  } catch (e) {
    console.log(e);
  }
  return {
    values,
    relations: {},
  };
};

export const FormUtils = {
  getFormItemName: (formItem: HFormItemProps) => {
    const { relation, ignore, name } = formItem;
    if (ignore) return `${name}@@ignore@@`;
    if (relation) {
      return `R_${relation}_${name}`;
    }
    return name;
  },
  createSearchHiddenValues: (formValues: any = {}) => {
    return {
      filter: {
        where: formValues,
      },
    };
  },
  showResponseDefaultMessage: (response: any, formProps?: HFormProps) => {
    const { useDefaultMessage } = formProps || { useDefaultMessage: false };
    const { showSuccessMessage } = formProps || { showSuccessMessage: true };
    const isSuccess = !response?.error;
    const successMessageIsFunction: boolean =
      typeof formProps?.successMessage == 'function';
    const errorMessageIsFunction: boolean =
      typeof formProps?.errorMessage == 'function';
    const showSuccessCustomMessage =
      !useDefaultMessage && formProps?.successMessage;
    const showCustomMessageError =
      !useDefaultMessage && formProps?.errorMessage;
    if (isSuccess && showSuccessCustomMessage) {
      const successMessage = successMessageIsFunction
        ? (formProps?.successMessage as Function)(response)
        : formProps?.successMessage;
      return notification.info(successMessage);
    }
    if (!isSuccess && showCustomMessageError) {
      const errorMessage = errorMessageIsFunction
        ? (formProps?.errorMessage as Function)(response)
        : formProps?.errorMessage;
      return notification.error(errorMessage);
    }
    if (showSuccessMessage && isSuccess && useDefaultMessage) {
      FormUtils.showResponseDefaultSuccessMessage(formProps);
    }
  },
  showResponseDefaultSuccessMessage: (formProps?: HFormProps) => {
    const method = formProps?.method;
    switch (method) {
      case 'patch':
      case 'put': {
        notification.info({
          message: 'Dữ liệu được cập nhật',
          description: 'Dữ liệu đã cập nhật thành công.',
        });
        return;
      }
      case 'post': {
        notification.info({
          message: 'Dữ liệu được tạo',
          description: 'Dữ liệu đã tạo thành công.',
        });
        return;
      }
      case 'delete': {
        notification.info({
          message: 'Dữ liệu đã được xóa.',
          description: 'Dữ liệu đã được xóa thành công.',
        });
        return;
      }
    }
  },
  showFormValidateFailMessage: (
    message = 'Form value is not correct',
    description = 'Please double check your form value and submit again.',
  ) => {
    notification.error({ message, description });
  },
  getFormFieldIgnoredValue: (form: FormInstance, fieldName: string) => {
    return form.getFieldValue(`${fieldName}@@ignore@@`);
  },
  getNodeEndpoint: (
    { endpoint, nodeName, featureId, documentId }: HFormProps | any,
    silentWhenException = false,
  ) => {
    if (!endpoint && !nodeName && !featureId) {
      if (!silentWhenException) {
        notification.error({
          message: 'Endpoint not found!',
          description:
            'Sorry, the server api is maintaining. Please wait a minute.',
        });
        throw 'endpoint not found!';
      }
    }
    const nodeEndPoint =
      endpoint || endpoints.generateNodeEndpoint(nodeName || `${featureId}s`);
    return `${nodeEndPoint}${documentId ? `/${documentId}` : ''}`;
  },
  getHttpRequestMethod: (values, formProps?: HFormProps | any) => {
    if (!formProps) {
      if (values?.id || values?._id) {
        return httpRequester.putToApi;
      }
      return httpRequester.postToApi;
    }
    const method = formProps.method ? formProps.method.toLowerCase() : 'get';
    switch (method) {
      case 'put':
        return httpRequester.putToApi;
      case 'post':
        return httpRequester.postToApi;
      case 'delete':
        return httpRequester.deleteFromApi;
      case 'get':
        return httpRequester.getDataFromApi;
    }
    return httpRequester.getDataFromApi;
  },
  handleDataReadyToSubmit: async (
    values: any,
    cb: Function = (f: any) => ({}),
  ) => {
    let submittingValues = await cb(values);
    if (submittingValues && typeof submittingValues === 'object') {
      submittingValues = { ...values, ...submittingValues };
    } else {
      submittingValues = values;
    }
    return submittingValues;
  },

  submitForm: async (
    values: any,
    formProps?: HFormProps,
    isSubmitAndContinue = false,
  ) => {
    const {
      onGotError = (f) => f,
      onGotSuccess = (f) => f,
      onGotSuccessAndContinue = (f) => f,
      onDataReadyToSubmit = (f) => f,
      onDataAttachToSubmitAndContinue = (f) => f,
      resetIfSuccess = true,
      withRelations = [],
      onReceivedResponse = (f) => f,
      showSuccessMessage = true,
      useDefaultMessage = false,
    } = formProps || {};

    try {
      const hiddenValues = clonedeep(formProps?.hiddenValues || {});
      const hiddenFields = clonedeep(formProps?.hiddenFields || {});
      let submittingValues = await FormUtils.handleDataReadyToSubmit(
        values,
        onDataReadyToSubmit,
      );
      if (isSubmitAndContinue) {
        submittingValues = await FormUtils.handleDataReadyToSubmit(
          submittingValues,
          onDataAttachToSubmitAndContinue,
        );
      }

      if (submittingValues && typeof submittingValues === 'object') {
        submittingValues = { ...values, ...submittingValues };
      } else {
        submittingValues = values;
      }
      submittingValues = clonedeep({ ...hiddenFields, ...submittingValues });
      let submitData: any = { ...submittingValues, ...hiddenValues };
      if (formProps?.isSearchForm) {
        const filter: any = submitData.filter || {};
        filter.where = filter.where ?? {};
        const relationOnFieldsAndValues =
          getFilterSearchFieldWithRelations(submittingValues);
        submittingValues = relationOnFieldsAndValues.values;
        const relations = getFilterWithRelations(
          withRelations,
          relationOnFieldsAndValues.relations,
        );
        if (relations.length > 0) {
          filter.include = filter.include ?? [];
          filter.include = [...filter.include, ...relations];
        }
        if (!submittingValues._q || !submittingValues._q.trim()) {
          delete submittingValues._q;
        }
        filter.where = {
          ...filter.where,
          ...omit(submittingValues, ['filter[skip]', 'page', 'filter[order]']),
        };
        submitData.filter = filter;
        submitData = {
          ...submitData,
          ...pick(submittingValues, ['filter[skip]', 'page', 'filter[order]']),
        };
      } else {
        submitData = { ...hiddenFields, ...submittingValues, ...hiddenValues };
      }

      const urlEndpoint = FormUtils.getNodeEndpoint(
        Object.assign({}, formProps),
      );

      const response = await FormUtils.getHttpRequestMethod(
        submitData,
        formProps,
      )({
        url: urlEndpoint,
        params: submitData,
        options: { useDefaultMessage },
      });
      if (response?.error) {
        onGotError(response);
        // await ErrorProcessing(response?.error)
      }
      if (!response?.error) {
        resetIfSuccess && formProps?.form?.resetFields(formProps.resetFields);
        onGotSuccess(response, isSubmitAndContinue);
        isSubmitAndContinue && onGotSuccessAndContinue(response);
      }
      FormUtils.showResponseDefaultMessage(response, {
        ...formProps,
        showSuccessMessage,
      });
      onReceivedResponse(response);
      // if (isSubmitToServer) {
      //   Store.dispatch(actionCreator.handleSummitForm(urlEndpoint, method, submitData, submitOptions));
      // }
      return response;
    } catch (e) {
      console.log(e);
      onGotError(e);
      return {
        error: e,
      };
    }
  },
  getQueryBetweenDays: (startDate: string, endDate: moment.MomentInput = 1) => {
    if (!startDate) {
      return {
        between: [],
      };
    }
    if (typeof endDate === 'number') {
      endDate = moment(startDate).add('days', endDate).format('YYYY/MM/DD');
    } else {
      endDate = moment(endDate).format('YYYY/MM/DD');
    }
    return {
      between: [moment(startDate).format('YYYY/MM/DD'), endDate],
    };
  },
};

export const RelationUtils = {
  entity: (fieldName: string, showFields: string[] = []) => ({
    relation: fieldName,
    scope: {
      fields: {
        id: true,
        ...showFields?.reduce((result, item) => {
          result[item] = true;
          return result;
        }, {}),
      },
    },
  }),
  fieldsInUserRelation: (fields: string[] = []): string[] =>
    union([
      'id',
      'fullName',
      'firstName',
      'lastName',
      'tels',
      'avatar',
      'emails',
      ...fields,
    ]),
};
