import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { useSubmitSearchForm } from '@schema-form/features/hooks';
import { useFeatureData } from '@schema-form/features/hooks/feature-hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { FilterIconSvg } from 'icons';
import { useState } from 'react';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '../../../../schema-form/features/panels';
import {
  HSearchFormHiddenAble,
  HSearchFormWithCreateButton,
} from '../../../../schema-form/features/search-form';
import { AdvanceSearch } from './advance-search-schema-form';
import { useNewsDetailWithSeoSchemaForm } from './news.detail-schema-form';
import { NewsTableSchema } from './news.table-schema';

import './new.module.scss';

const NewsManagement = ({ ...props }) => {
  const { t } = useHTranslation('admin-common');
  const [isShowFilter, setIsShowFilter] = useState(false);
  const endpoint = endpoints.endpointWithApiDomain('/news');
  const featureData = useFeatureData('news');
  const newsSchemaDetailWithSeo = useNewsDetailWithSeoSchemaForm();

  return (
    <HFeature
      {...{
        featureId: 'news',
        nodeName: 'news',
        documentRelations: ['category', 'newHashtags'],
      }}
    >
      <HSearchFormWithCreateButton
        withRelations={['category', 'newHashtags']}
        placeholder={t(
          'Enter information about: customer, handler, profile code',
          { vn: 'Nhập thông tin về: tiều đề và người tạo' },
        )}
        renderLeftSuffix={
          <HButton
            {...{
              onClick: () => setIsShowFilter(!isShowFilter),
              className: 'btn-new-filter',
            }}
          >
            <FilterIconSvg />
          </HButton>
        }
      />

      <div className="news-management-component">
        {isShowFilter && (
          <div
            className="news-management-component_filter"
            style={{
              marginTop:
                featureData?.dataSource?.length === 0 ? '20px' : '55px',
            }}
          >
            <HSearchFormHiddenAble
              {...{
                endpoint,
                schema: AdvanceSearch,
                resetIfSuccess: false,
                isAppendData: true,
                hiddenFields: { status: props?.status },
                withRelations: ['category'],
                onDataReadyToSubmit: (values) => ({
                  ...values,
                  createdAt: FormUtils.getQueryBetweenDays(
                    values?.createdAt?.[0],
                    values?.createdAt?.[1],
                  ),
                }),
              }}
            />

            <div className="wrapper-btn-apply-filter">
              <ApplyFilterButton />
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: featureData?.dataSource?.length === 0 ? '20px' : '0px',
          }}
          className={
            isShowFilter
              ? 'news-management-component_table-filter'
              : 'news-management-component_table-no-filter'
          }
        >
          <HTable schema={NewsTableSchema} />
        </div>
      </div>

      <HDocumentDrawerPanel>
        <HFeatureForm
          {...{
            schema: newsSchemaDetailWithSeo,
            hideSubmitAndContinueButton: true,
          }}
        />
      </HDocumentDrawerPanel>
    </HFeature>
  );
};

export default NewsManagement;

const ApplyFilterButton = () => {
  const { t } = useHTranslation('admin-common');
  const advanceSearch = useSubmitSearchForm();

  return (
    <HButton type="primary" onClick={() => advanceSearch()}>
      {t('Apply filter')}
    </HButton>
  );
};
