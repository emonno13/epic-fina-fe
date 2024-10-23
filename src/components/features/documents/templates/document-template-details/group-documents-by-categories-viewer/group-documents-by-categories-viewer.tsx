import { Empty } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

import { DocumentTemplateDetailTableSchema } from './document-template-detail-table-schema';
import { HTable } from '../../../../../../schema-form/features';
import { useSetDocumentFragments } from '../../../../../../schema-form/features/hooks/document-detail-hooks';
import { endpoints } from '../../../../../../lib/networks/endpoints';
import { getDataSourcePaths } from '../../../../../../schema-form/features/data-list/h-table-form';
import { useFeatureId } from '../../../../../../schema-form/features/hooks';

export const DocumentsByCategoryTable = ({
  groupItem = { id: '', documentTemplateDetails: [] },
  isEditableTable = false,
  showRowSelection = false,
  excludeDocumentIds = [''],
  dataSourcePaths,
}) => {
  const setDocumentFragments = useSetDocumentFragments();
  const categoryId = groupItem.id;
  const defaultSelectRows: any[] = useMemo(() => {
    if (excludeDocumentIds.length === 0) {
      return (groupItem as any)?.documentTemplateDetails;
    }

    return groupItem.documentTemplateDetails.filter(
      (detailItem: any) => !excludeDocumentIds.includes(detailItem.documentId),
    );
  }, []);

  useEffect(() => {
    if (!showRowSelection) {
      return;
    }

    setDocumentFragments({ [categoryId]: defaultSelectRows });
  }, []);

  const handleChangeSelection = (keys: React.Key[], selectedRows: any[]) => {
    setDocumentFragments({ [categoryId]: selectedRows });
  };

  const rowSelectionCheckboxProps = (record) => {
    return {
      disabled: excludeDocumentIds.includes(record.documentId),
      key: record.id,
    };
  };

  const rowSelection = showRowSelection ? {
    defaultSelectedRowKeys: defaultSelectRows.map(item => item.id),
    onChange: handleChangeSelection,
    getCheckboxProps: rowSelectionCheckboxProps,
  } : undefined;

  const endpoint = endpoints.endpointWithApiDomain('/document-template-details');

  return (
    <div style={{ marginTop: 16 }}>
      <h3>{(groupItem as any)?.name}</h3>
      <HTable {...{
        endpoint: endpoints.endpointWithApiDomain('/document-template-details'),
        schema: () => DocumentTemplateDetailTableSchema({ isEditableTable, endpoint }),
        pagination: false,
        dataSourcePaths,
        dataSource: [...(groupItem.documentTemplateDetails || [])],
        rowSelection,
      }}/>
    </div>
  );
};

export const GroupDocumentsByCategories = ({
  isEditableTable = false,
  showRowSelection = false,
  excludeDocumentIds = [],
}) => {
  const featureId: string = useFeatureId();
  const dataSource = useSelector((state: RootStateOrAny) => {
    return state?.featureStore[featureId]?.dataSource;
  }) || [];

  if (dataSource.length === 0) {
    return <Empty style={{ marginTop: 16 }}/>;
  }

  return (
    dataSource?.map((item: any, index: number) =>(
      <DocumentsByCategoryTable
        key={index}
        {...{
          groupItem: item,
          showRowSelection: showRowSelection,
          isEditableTable,
          dataSourcePaths: getDataSourcePaths([index, 'documentTemplateDetails']),
          excludeDocumentIds,
        }}/>
    ))
  );
};