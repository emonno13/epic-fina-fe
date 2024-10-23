import React from 'react';
import { TableUtils } from '@lib/table-utils';
import { useHTranslation } from '@lib/i18n';
import { ConverterUtils } from '@lib/converter';
import { QuestionUtils } from '@components/shared/questions/question/question-utils';
import { CommentUtils } from '@lib/utils/comment';
import { CopyOutlined } from '@ant-design/icons';

export const QuestionGroupsTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  const { origin } = window.location;

  const onCopySurveyLink = (document) => {
    const { origin } = window.location;
    CommentUtils.copyToClipboard(
      `${origin}/survey?documentId=${document.id}`,
      t('Copy successfully', {
        en: 'Copy successfully',
        vn: 'Copy thành công',
      }),
    );
  };

  return [
    TableUtils.createTableColumnConfig({
      title: t('Questions group name', {
        en: 'Questions group Name',
        vn: 'Tên bộ câu hỏi',
      }),
      dataIndex: 'name',
      key: 'name',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('QuestionGroupType', {
        en: 'Type',
        vn: 'Loại',
      }),
      dataIndex: 'questionGroupType',
      key: 'questionGroupType',
      render: (questionGroupType) => {
        return <span>{questionGroupType || 'TECHNICAL'}</span>;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      render: (status, item) => (
        <>
          {t('Status')}:{' '}
          <span style={{ fontWeight: 'bold' }}>
            {status || t('active', { en: 'Active', vn: 'Hoạt động' })}
          </span>{' '}
          <br />
          Link: <a>{`${origin}/survey?documentId=${item.id}`}</a>
          <CopyOutlined {...{ onClick: () => onCopySurveyLink(item) }} />
        </>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('createdAt', { en: 'Created At', vn: 'Ngày tạo' }),
      dataIndex: 'createdAt',
      sortable: true,
      key: 'createdAt',
      render: ConverterUtils.dateConverter,
    }),
    TableUtils.createEditAndDeleteControlColumn(
      t('action', { en: 'Action', vn: 'Hành động' }),
      {
        hideDelete: (questionGroup) =>
          QuestionUtils.checkIsCalculationQuestionGroup(questionGroup),
      },
    ),
  ];
};
