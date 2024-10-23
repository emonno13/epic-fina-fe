import React, { useEffect, useState } from 'react';
import { DatePicker, Form } from 'antd';
import { ItemViewer } from '@components/shared/common/configuration/item-viewer';
import { QUESTION_TYPES } from '@components/shared/questions/question/types';
import { FormatterUtils } from '@lib/formatter';
import { ConverterUtils } from '@lib/converter';
import { modifyDataSource } from './utils';

import { TaskTellerViewTable } from './task-teller-view-table';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import { HSearchFormHiddenAble } from '../../../../../schema-form/features/search-form';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { endpoints } from '../../../../../lib/networks/endpoints';
import { usePublicEnvironment } from '../../../../../system/hooks';

const { RangePicker } = DatePicker;

const TaskTeller = ({ status, featureId, ...props }) => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const currentUser: any = useCurrentUser();
  const [searchForm] = Form.useForm();
  const [endTime, setEndTime] = useState<any>('');
  const [startTime, setStartTime] = useState<any>('');
  const maxPeopleReceived = +usePublicEnvironment('MAX_TELLER_RECEIVED');

  useEffect(() => {
    searchForm.submit();
  }, [maxPeopleReceived]);

  const handleDataReadyToSubmit = (data) => {
    if (startTime && endTime) {
      data.sharedAt = {
        between: [
          new Date(startTime).toISOString(),
          new Date(endTime).toISOString(),
        ],
      };
    }
  };

  const onChange = (value, dateString) => {
    setStartTime(dateString[0]);
    setEndTime(dateString[1]);
    searchForm?.submit();
  };

  return (
    <HFeature
      {...{
        featureId: 'survey-results',
        nodeName: 'survey-results',
        endpoint: endpoints.endpointWithApiDomain(
          '/survey-results/search-for-teller',
        ),
        documentRelations: ['task'],
        searchForm,
      }}
    >
      <HSearchFormHiddenAble
        {...{
          resetIfSuccess: false,
          withRelations: [
            {
              relation: 'task',
              scope: {
                include: [{ relation: 'bankFeedbacks' }],
              },
            },
          ],
          layout: 'horizontal',
          hiddenValues: {
            filter: {
              order: ['sharedAt desc'],
              where: { status },
            },
          },
          onDataReadyToSubmit: handleDataReadyToSubmit,
          onGotSuccess: (res) =>
            setDataSource(
              modifyDataSource(
                res?.data || [],
                currentUser?.id,
                maxPeopleReceived,
              ),
            ),
        }}
      />
      <div>
        <RangePicker onChange={onChange} />
      </div>
      <HTable
        {...{
          dataSource,
          scroll: { x: 'max-content' },
          schema: () => TaskTellerViewTable({ searchForm, maxPeopleReceived }),
        }}
      />
    </HFeature>
  );
};

export default TaskTeller;

export const SurveyResultBase = (surveyDetails: any) => {
  return (
    <>
      {surveyDetails?.surveyDetails?.length ? (
        surveyDetails.surveyDetails.map((el, index) => {
          const questionData = el?.questionData || {};
          const type = el?.type;
          switch (type) {
            case QUESTION_TYPES.IMAGE_SELECTION:
              return (
                <ItemViewer
                  key={`${questionData?.code}.${index}`}
                  {...{
                    label: questionData.content.blocks[0].text + ':',
                    value: (
                      <span className="item-view__content">{`${el?.content || ''} ${questionData?.suffix || ''}`}</span>
                    ),
                  }}
                />
              );
            case QUESTION_TYPES.DATE:
              return (
                <ItemViewer
                  key={`${questionData?.code}.${index}`}
                  {...{
                    label: questionData.content.blocks[0].text + ':',
                    value: (
                      <span className="item-view__content">{`${el?.content ? ConverterUtils.fullDatetimeConverter(el.content) : ''} ${questionData?.suffix || ''}`}</span>
                    ),
                  }}
                />
              );
            case QUESTION_TYPES.OPEN_ENDED:
              return (
                <ItemViewer
                  key={`${questionData?.code}.${index}`}
                  {...{
                    label: questionData.content.blocks[0].text + ':',
                    value: (
                      <span className="item-view__content">{`${el?.content || ''} ${questionData?.suffix || ''}`}</span>
                    ),
                  }}
                />
              );
            case QUESTION_TYPES.OPEN_ENDED_NUMBER:
              return (
                <ItemViewer
                  key={`${questionData?.code}.${index}`}
                  {...{
                    label: questionData.content.blocks[0].text + ':',
                    value: (
                      <span className="item-view__content">{`${el?.content ? FormatterUtils.formatAmount(+el.content) : ''} ${questionData?.suffix || ''}`}</span>
                    ),
                  }}
                />
              );
            case QUESTION_TYPES.TEXT_SELECTION:
              return (
                <ItemViewer
                  key={`${questionData?.code}.${index}`}
                  {...{
                    label: questionData.content.blocks[0].text + ':',
                    value: (
                      <span className="item-view__content">{`${el?.selectedOptions[0]?.content || ''} ${questionData?.suffix || ''}`}</span>
                    ),
                  }}
                />
              );
            case QUESTION_TYPES.REORDER:
              return (
                <ItemViewer
                  key={`${questionData?.code}.${index}`}
                  {...{
                    label: questionData.content.blocks[0].text + ':',
                    value: (
                      <span className="item-view__content">{`${el?.content || ''} ${questionData?.suffix || ''}`}</span>
                    ),
                  }}
                />
              );
          }
        })
      ) : (
        <></>
      )}
      <style jsx>{`
        .item-view__content {
          max-width: 500px;
          display: block;
        }
      `}</style>
    </>
  );
};
