// information survey
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { BASE_QUESTION_CODE } from '@components/shared/questions/question/types';
import { endpoints } from '@lib/networks/endpoints';
import { createSchemaItemWithNewLabel } from '@schema-form/h-types';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useTranslation } from 'react-i18next';
import { HForm } from '../../../../../../../schema-form/h-form';

const InformationSurvey = ({ phoneNumber = '' }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation('admin-common');

  useEffect(() => {
    if (phoneNumber) {
      FormUtils.submitForm(
        {},
        {
          method: 'GET',
          endpoint: endpoints.endpointWithApiDomain(
            `/users/phone/${phoneNumber}`,
          ),
          onGotSuccess: (response) => {
            console.log('response', response);
          },
        },
      );
    }
  }, [phoneNumber]);

  return (
    <div>
      <Scrollbars style={{ height: 500 }}>
        <HForm
          {...{
            form,
            schema: () => [
              createSchemaItemWithNewLabel({
                Component: Input,
                name: BASE_QUESTION_CODE?.QUESTION_LC_INCOME,
                label: t('Tổng thu nhập hiện tại (vnđ)'),
                colProps: { xs: 24, sm: 24, md: 11 },
                rowProps: { gutter: { xs: 12, md: 12 } },
                componentProps: {
                  modernLabel: true,
                  formatter: (value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  parser: (value) => value.replace(/(,*)/g, ''),
                  style: { width: '100%' },
                  placeholder: t('vd: 100,000'),
                },
              }),
              createSchemaItemWithNewLabel({
                Component: Input,
                name: BASE_QUESTION_CODE?.QUESTION_LC_COST_PER_MONTH,
                label: t('Tổng chi tiêu hiện tại (vnđ)'),
                colProps: { xs: 24, sm: 24, md: 11 },
                componentProps: {
                  modernLabel: true,
                  formatter: (value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  parser: (value) => value.replace(/(,*)/g, ''),
                  style: { width: '100%' },
                  placeholder: t('vd: 100,000'),
                },
              }),
              createSchemaItemWithNewLabel({
                Component: Input,
                name: BASE_QUESTION_CODE?.QUESTION_LC_ACCUMULATED_ASETS,
                label: t('Tài sản tích luỹ (vnđ)'),
                colProps: { xs: 24, sm: 24, md: 11 },
                componentProps: {
                  modernLabel: true,
                  formatter: (value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  parser: (value) => value.replace(/(,*)/g, ''),
                  style: { width: '100%' },
                  placeholder: t('vd: 100,000'),
                },
              }),
              createSchemaItemWithNewLabel({
                Component: Input,
                name: BASE_QUESTION_CODE?.QUESTION_LC_CREDIT_HISTORY,
                label: t('Lịch sử tín dụng'),
                colProps: { xs: 24, sm: 24, md: 22 },
                componentProps: {
                  modernLabel: true,
                  formatter: (value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  parser: (value) => value.replace(/(,*)/g, ''),
                  style: { width: '100%' },
                },
              }),
              createSchemaItemWithNewLabel({
                Component: Input,
                name: BASE_QUESTION_CODE?.INFO_LC_INCOME,
                label: t('Mô tả nguồn thu'),
                colProps: { xs: 24, sm: 24, md: 22 },
                rowProps: { gutter: { xs: 24, md: 24 } },
                componentProps: {
                  modernLabel: true,
                  formatter: (value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  parser: (value) => value.replace(/(,*)/g, ''),
                  style: { width: '100%' },
                },
              }),
              createSchemaItemWithNewLabel({
                Component: Input,
                name: BASE_QUESTION_CODE?.QUESTION_LC_EVALUATE_PLAN,
                label: t('Phương án vay'),
                colProps: { xs: 24, sm: 24, md: 22 },
                rowProps: { gutter: { xs: 24, md: 24 } },
                componentProps: {
                  modernLabel: true,
                  formatter: (value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  parser: (value) => value.replace(/(,*)/g, ''),
                  style: { width: '100%' },
                },
              }),
              createSchemaItemWithNewLabel({
                Component: Input,
                name: BASE_QUESTION_CODE?.QUESTION_LC_EVALUATE_MORTAGE,
                label: t('Tài sản thế chấp hiện tại'),
                colProps: { xs: 24, sm: 24, md: 22 },
                rowProps: { gutter: { xs: 24, md: 24 } },
                componentProps: {
                  modernLabel: true,
                  formatter: (value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  parser: (value) => value.replace(/(,*)/g, ''),
                  style: { width: '100%' },
                },
              }),
              createSchemaItemWithNewLabel({
                Component: Input,
                name: BASE_QUESTION_CODE?.LIST_BANK_SUPPORT,
                label: t('Các Ngân hàng đang cho vay'),
                colProps: { xs: 24, sm: 24, md: 22 },
                componentProps: {
                  modernLabel: true,
                  formatter: (value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  parser: (value) => value.replace(/(,*)/g, ''),
                  style: { width: '100%' },
                },
              }),
              createSchemaItemWithNewLabel({
                Component: Input,
                name: BASE_QUESTION_CODE?.QUESTION_LC_LOAN_DEMAND,
                label: t('Tổng số tiền vay đã'),
                colProps: { xs: 24, sm: 24, md: 22 },
                rowProps: { gutter: { xs: 24, md: 24 } },
                componentProps: {
                  modernLabel: true,
                  formatter: (value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                  parser: (value) => value.replace(/(,*)/g, ''),
                  style: { width: '100%' },
                  placeholder: t('vd: 100,000'),
                },
              }),
            ],
            hideSubmitAndContinueButton: true,
            removeControlActions: true,
          }}
        />
      </Scrollbars>
      <div
        style={{
          display: 'flex',
          width: '100%',
          marginBottom: '10px',
          justifyContent: 'end',
          paddingRight: '70px',
        }}
      >
        <HButton type="primary" onClick={() => {}}>
          Lưu
        </HButton>
      </div>
    </div>
  );
};

export default InformationSurvey;
