import { ItemViewer } from '@components/shared/common/configuration/item-viewer';
import { Link } from '@components/shared/link';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { TableUtils } from '@lib/table-utils';
import { useDocumentDetail, useFeatureId } from '@schema-form/features/hooks';
import { useViewTypeOfDeal } from '@schema-form/features/hooks/document-detail-hooks';
import { useSetDocumentDetailWithoutVisible } from '@schema-form/features/hooks/table-hooks';
import cls from 'classnames';
import { DEAL_DOCUMENT_ID_NAME, VIEW_TYPE_OF_DEAL } from '.';
import {
  ProfileCustomerDeals,
  RenderProfileInformation,
  StatusDeals,
} from './deals.table-schema';

const ShortTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  const documentDetail = useDocumentDetail();
  const currentUser = useCurrentUser();
  const featureId = useFeatureId() || 'deals';
  const setDocumentDetailWithoutVisible =
    useSetDocumentDetailWithoutVisible(featureId);
  const viewTypeOfDeal = useViewTypeOfDeal('view-type-of-deal');
  const handelDataShowViewDetail = (document) => {
    setDocumentDetailWithoutVisible(document);
  };

  return [
    TableUtils.createTableColumnConfig({
      title: t('Profile information'),
      // sortable: true,
      className: 'deal-short-table',
      render: (document) => {
        const detailLink =
          viewTypeOfDeal === VIEW_TYPE_OF_DEAL.GRID
            ? '/admin/deals/loans'
            : `/admin/deals/loans?${DEAL_DOCUMENT_ID_NAME}=${document?.id}`;
        return (
          <div
            className={cls('deal-loan-information', {
              active: document?.id === documentDetail?.id,
            })}
          >
            <div className={'item-profile-info'}>
              <div className="short-table-profile">
                <ProfileCustomerDeals {...{ document }} />
                <div>
                  <Link href={detailLink}>
                    <ItemViewer
                      {...{
                        label: '',
                        value: (
                          <span
                            style={{
                              color: '#0B51D7',
                            }}
                          >
                            #{document.code}
                          </span>
                        ),
                        className: 'text-12',
                        onClick: () => handelDataShowViewDetail(document),
                      }}
                    />
                  </Link>
                  <StatusDeals {...{ document, currentUser }} />
                </div>
              </div>
            </div>
            <RenderProfileInformation {...{ document }} />
          </div>
        );
      },
    }),
  ];
};

export default ShortTableSchema;
