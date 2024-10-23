import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import { ProgressDetailSchemaForm } from './detail-schema-form';
import { ProgressTableSchema } from './progress-table-schema';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../../schema-form/features/search-form';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';
import { setDocumentDetail } from '../../../../../schema-form/features/actions';
import { getItemActionsByCode } from '../utils';


export const ProgressViewer = () => {
  const dispatch = useDispatch();
  const [searchForm] = Form.useForm();
  const selectedRows = useSelector((state: RootStateOrAny) => {
    return state?.featureStore['progress-template-details']?.dataSource;
  });
  useEffect(() => {searchForm?.submit();}, [selectedRows]);

  const handleBeforeSubmit = (data) => {
    const itemActions = getItemActionsByCode(data?.codeAction);
    data.itemActions = itemActions?.[0]?.actions;
    return data;
  };

  return (
    <HFeature {...{
      featureId: 'progress-items',
      nodeName: 'progress-items',
      documentIdName: 'progressItemId',
      searchForm,
    }}>
      <HSearchFormWithCreateButton {...{
        hiddenValues: {
          filter: {
            where: {
              id: {
                nin: selectedRows.map(el => {
                  return el?.progress?.id;
                }),
              },
            },
          },
        },
      }}/>
      <HDocumentModalPanel>
        <HFeatureForm {...{
          schema: ProgressDetailSchemaForm,
          onDataReadyToSubmit:handleBeforeSubmit,
        }}/>
      </HDocumentModalPanel>
      <HTable {...{
        schema: ProgressTableSchema,
        rowSelection: {
          onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            dispatch(setDocumentDetail({
              featureId: 'progress-selected',
              documentDetail: selectedRows,
              namespace: 'progress',
            }));
          },
        },
      }}/>
    </HFeature>
  );
};