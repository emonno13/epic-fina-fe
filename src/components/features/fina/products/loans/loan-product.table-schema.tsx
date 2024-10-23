import { FileSearchOutlined, FormOutlined } from '@ant-design/icons';
import { TableUtils } from '@lib/table-utils';
import { Tag, Tooltip } from 'antd';
import { ConverterUtils } from '../../../../../lib/converter';
import { useHTranslation } from '../../../../../lib/i18n';
import { useSetDocumentDetail } from '../../../../../schema-form/features/hooks';
import { ItemViewer } from '../../../../shared/common/configuration/item-viewer';
import { Link } from '../../../../shared/link';
import {
  LOAN_STATUS,
  LOAN_STATUSES_COLOR_MAPPING,
  LOAN_STATUSES_LABEL_MAPPING,
} from '../utils';

import '../../../../../styles/_default_responsive.scss';

export const LoanProductTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    TableUtils.createTableColumnConfig({
      title: t('Organizations', {
        en: 'Organization',
        vn: 'Tổ chức',
      }),
      dataIndex: 'org',
      sortable: true,
      key: 'orgId',
      render: (_, document: any) => {
        const GroupAction = () => {
          const detailLink = `/admin/products/loans?documentId=${document.id}`;
          const handleDocumentSelected = useSetDocumentDetail();
          return (
            <div className="d-f-center common-responsive__mobile-action">
              <div
                className={'m-l-5 m-r-5'}
                onClick={() => handleDocumentSelected(document)}
              >
                <Link href={detailLink}>
                  <FormOutlined />
                </Link>
              </div>
            </div>
          );
        };
        const totalLoan = document?.productDetails?.length || 0;
        let totalLoanActive = 0;
        let totalLoanInActive = 0;
        let totalLoanPending = 0;
        document?.productDetails?.forEach((el) => {
          totalLoanActive += el?.status === LOAN_STATUS.ACTIVE ? 1 : 0;
          totalLoanInActive += el?.status === LOAN_STATUS.INACTIVE ? 1 : 0;
          totalLoanPending += el?.status === LOAN_STATUS.PENDING ? 1 : 0;
        });
        return (
          <div className={'product common-responsive'}>
            <GroupAction />
            <div className={'common-responsive__mobile'}>
              <Tooltip placement="topLeft" title={document.description || ''}>
                <ItemViewer
                  {...{
                    label: t('Code'),
                    value: (
                      <Tag color={'rgb(0, 104, 255)'}>#{document?.code}</Tag>
                    ),
                    labelClassName: 'm-b-0i',
                  }}
                />
                <ItemViewer
                  {...{
                    label: t('Name'),
                    value: document?.name,
                    labelClassName: 'm-b-0i',
                  }}
                />
                <ItemViewer
                  {...{
                    label: t('Description'),
                    value: <FileSearchOutlined />,
                    labelClassName: 'm-b-0i',
                  }}
                />
              </Tooltip>
            </div>
            <ItemViewer
              {...{
                label: t('Organizations'),
                value: ConverterUtils.showOrgConverter(document?.org),
                labelClassName: 'm-b-0i',
              }}
            />
            <div className={'common-responsive__mobile'}>
              <ItemViewer
                {...{
                  label: t('Total'),
                  value: totalLoan,
                  labelClassName: 'm-b-0i',
                }}
              />
              <ItemViewer
                {...{
                  label: t('Active'),
                  value: totalLoanActive,
                  labelClassName: 'm-b-0i',
                }}
              />
              <ItemViewer
                {...{
                  label: t('Pending'),
                  value: totalLoanPending,
                  labelClassName: 'm-b-0i',
                }}
              />
              <ItemViewer
                {...{
                  label: t('InActive'),
                  value: totalLoanInActive || 0,
                  labelClassName: 'm-b-0i',
                }}
              />
              <ItemViewer
                {...{
                  label: t('Creator', {
                    en: 'Creator',
                    vn: 'Người tạo',
                  }),
                  value: ConverterUtils.getFullNameUser(document?.createdBy),
                  labelClassName: 'm-b-0i',
                }}
              />
            </div>
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product title'),
      dataIndex: 'name',
      sortable: true,
      responsive: ['md'],
      render: (_, document: any) => {
        const content = (
          <div>
            <ItemViewer
              {...{
                label: t('Code'),
                value: <Tag color={'rgb(0, 104, 255)'}>#{document?.code}</Tag>,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Status'),
                value: (
                  <Tag color={LOAN_STATUSES_COLOR_MAPPING[document?.status]}>
                    {t(LOAN_STATUSES_LABEL_MAPPING[document?.status])}
                  </Tag>
                ),
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Name'),
                value: document?.name,
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
        return (
          <Tooltip placement="topLeft" title={document.description || ''}>
            {content}
            <ItemViewer
              {...{
                label: t('Description '),
                value: <FileSearchOutlined />,
                labelClassName: 'm-b-0i',
              }}
            />
          </Tooltip>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Number of loan packages', {
        en: 'Number of loan packages',
        vn: 'Số lượng gói vay',
      }),
      dataIndex: 'name',
      sortable: true,
      responsive: ['md'],
      render: (_, document: any) => {
        const totalLoan = document?.productDetails?.length || 0;
        let totalLoanActive = 0;
        let totalLoanInActive = 0;
        let totalLoanPending = 0;
        document?.productDetails?.forEach((el) => {
          totalLoanActive += el?.status === LOAN_STATUS.APPROVED ? 1 : 0;
          totalLoanInActive += el?.status === LOAN_STATUS.INACTIVE ? 1 : 0;
          totalLoanPending +=
            el?.status === LOAN_STATUS.PENDING ||
            el?.status === LOAN_STATUS.ACTIVE
              ? 1
              : 0;
        });

        return (
          <div>
            <ItemViewer
              {...{
                label: t('Total'),
                value: totalLoan,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Active'),
                value: totalLoanActive,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Pending'),
                value: totalLoanPending,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('InActive'),
                value: totalLoanInActive || 0,
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Creator', {
        en: 'Creator',
        vn: 'Người tạo',
      }),
      responsive: ['md'],
      dataIndex: 'name',
      sortable: true,
      render: (_, document: any) => {
        return (
          <div>
            <ItemViewer
              {...{
                label: t('Full name'),
                value: ConverterUtils.getFullNameUser(document?.createdBy),
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createColumnUpdatedAt(),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
