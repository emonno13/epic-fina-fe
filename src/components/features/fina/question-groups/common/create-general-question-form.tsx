import {
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons/lib/icons';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { HInput } from '@components/shared/common-form-elements/h-input';
import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import {
  useDocumentDetail,
  useIsNewDocument,
} from '@schema-form/features/hooks/document-detail-hooks';
import Form from 'antd/es/form';
import { cloneDeep } from 'lodash';
import { memo, useEffect } from 'react';
import { useQuestionGroupsContext } from './../question-groups-provider';

import './create-general-question.module.scss';

export const CreateGeneralQuestionFooter = () => {
  const { t } = useHTranslation('common');
  const { onModalClose, onModalSubmit, onModalSubmitAndContinue } =
    useQuestionGroupsContext();

  return (
    <>
      <HButton onClick={onModalClose} className="m-r-10">
        {t('close')}
      </HButton>
      <HButton onClick={onModalSubmit} type="primary" className="m-r-10">
        {t('submit')}
      </HButton>
      <HButton
        loading={false}
        onClick={onModalSubmitAndContinue}
        type="primary"
      >
        {t('submit_and_continue')}
      </HButton>
    </>
  );
};

const CreateGeneralQuestionForm = memo(() => {
  const { t } = useHTranslation('common');

  const { createGeneralQuestionForm } = useQuestionGroupsContext();

  const questionGroup = useDocumentDetail();

  const isCreateNew = useIsNewDocument();

  useEffect(() => {
    // WHEN EDIT MODE FOR GENERAL QUESTION GROUP => SET INIT RESPONSE VALUES
    if (!isCreateNew) {
      const questions = cloneDeep(questionGroup?.children)?.map((item) => {
        return {
          description: item?.description,
          value: item?.value,
          answers: item?.answers?.map((a) => ({
            value: a?.content,
            code: [...a?.pairingQuestionGroupIds],
          })),
        };
      });
      createGeneralQuestionForm.setFieldsValue({
        name: questionGroup?.name,
        description: questionGroup?.description,
        questions,
      });
    }
    return () => {
      createGeneralQuestionForm.resetFields();
    };
  }, [createGeneralQuestionForm, isCreateNew, questionGroup]);

  return (
    <>
      <Form
        form={createGeneralQuestionForm}
        initialValues={{
          name: '',
          description: '',
          questions: [
            { value: '', description: '', answers: [{ value: '', code: [] }] },
          ],
        }}
        className="question-group-containter"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        {/* QUESTION NAME */}
        <Form.Item
          name="name"
          label={t('question-groups_name', {
            vn: 'Tên bộ câu hỏi',
            en: 'Name',
          })}
          rules={[
            {
              required: true,
              message: t('Question groups name required message', {
                vn: 'Tên bộ câu hỏi là bắt buộc',
                en: 'Question groups name is required',
              }),
            },
          ]}
        >
          <HInput
            placeholder={t('Question groups name placeholder', {
              en: 'Enter question groups name',
              vn: 'Nhập tên bộ câu hỏi',
            })}
          />
        </Form.Item>

        {/* QUESTION DESCRIPTION */}
        <Form.Item
          name="description"
          label={t('question-groups_description', {
            vn: 'Mô tả',
            en: 'Description',
          })}
        >
          <HInput
            placeholder={t('Question groups description placeholder', {
              en: 'Enter question groups description',
              vn: 'Nhập mô tả',
            })}
          />
        </Form.Item>

        {/* QUESTION FORM LIST */}
        <Form.List name="questions">
          {(questions, { add, remove }, { errors }) => (
            <>
              {questions.map((q, qidx) => (
                <Form.Item
                  key={q.key}
                  label={qidx === 0 ? 'Câu hỏi' : ''}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  required
                >
                  <div className="question-container">
                    <Form.Item
                      {...q}
                      name={[q.name, 'value']}
                      fieldKey={[q.fieldKey, 'value']}
                      // validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Vui lòng nhập câu hỏi',
                        },
                      ]}
                      // noStyle
                    >
                      <HInput placeholder="Nhập câu hỏi" />
                    </Form.Item>
                    {questions.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-button"
                        onClick={() => remove(q.name)}
                      />
                    ) : null}
                    {qidx === questions.length - 1 ? (
                      <PlusCircleOutlined
                        className="dynamic-button"
                        onClick={() => {
                          add({
                            value: '',
                            answers: [{ value: '', code: [] }],
                          });
                        }}
                      />
                    ) : null}
                  </div>
                  <div className="question-container">
                    <Form.Item
                      {...q}
                      name={[q.name, 'description']}
                      fieldKey={[q.fieldKey, 'description']}
                      // validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Vui lòng nhập mô tả câu hỏi',
                        },
                      ]}
                      // noStyle
                    >
                      <HInput placeholder="Nhập mô tả câu hỏi" />
                    </Form.Item>
                  </div>
                  <div className="answer-group-container">
                    <Form.List name={[q.name, 'answers']}>
                      {(answers, { add, remove }, { errors }) => (
                        <>
                          {answers.map((answer, index) => (
                            <Form.Item
                              key={answer.key}
                              label={index === 0 ? 'Đáp án' : ''}
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              required
                            >
                              <div className="answer-container">
                                <Form.Item
                                  {...answer}
                                  name={[answer.name, 'value']}
                                  fieldKey={[answer.fieldKey, 'value']}
                                  rules={[
                                    {
                                      required: true,
                                      whitespace: true,
                                      message: 'Vui lòng nhập đáp án',
                                    },
                                  ]}
                                  // noStyle
                                >
                                  <HInput placeholder="Nhập đáp án" />
                                </Form.Item>
                                <Form.Item
                                  {...answer}
                                  name={[answer.name, 'code']}
                                  fieldKey={[answer.fieldKey, 'code']}
                                >
                                  {/* <HInput placeholder="Nhập code bộ câu hỏi" /> */}
                                  <HSelect
                                    id="pairingQuestionGroupIds"
                                    showSearch
                                    allowClear
                                    endpoint="question-groups/suggestion"
                                    placeholder={t('Select question groups', {
                                      vn: 'Chọn bộ câu hỏi tính toán',
                                    })}
                                    mode="multiple"
                                    hiddenValues={{
                                      questionGroupType: {
                                        nin: Object.values(['GENERAL']),
                                      },
                                    }}
                                    optionsConverter={(document) => {
                                      return {
                                        ...document,
                                        label: `${document?.name} - ${
                                          document?.code
                                        } - ${
                                          document?.questionGroupType ||
                                          'TECHNICAL'
                                        }`,
                                      };
                                    }}
                                    optionFilterProp="children"
                                  />
                                </Form.Item>
                                {answers.length > 1 ? (
                                  <MinusCircleOutlined
                                    className="dynamic-button"
                                    onClick={() => remove(answer.name)}
                                  />
                                ) : null}
                                {index === answers.length - 1 ? (
                                  <PlusCircleOutlined
                                    className="dynamic-button"
                                    onClick={() => add({ value: '', code: [] })}
                                  />
                                ) : null}
                              </div>
                            </Form.Item>
                          ))}
                        </>
                      )}
                    </Form.List>
                  </div>
                </Form.Item>
              ))}
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
});

export default CreateGeneralQuestionForm;
