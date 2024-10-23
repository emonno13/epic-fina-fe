import { Link } from '@components/shared/link';
import { ClickableOpacity } from '@components/shared/utils/clickable-opacity';
import { EditIconSvg } from '@icons';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { FormDataUtils } from '@lib/networks/http/form-data-utils';
import { TableUtils } from '@lib/table-utils';
import { callApi } from '@schema-form/common/actions';
import { HTable } from '@schema-form/features';
import { useSetDocumentDetailWithoutVisible } from '@schema-form/features/hooks/table-hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface ListReferrerProps {
  canEdit?: boolean;
  documentDetail: any;
}

export const ListReferrer = memo((props: ListReferrerProps) => {
  const { canEdit = false, documentDetail } = props;
  const { t } = useHTranslation('admin-common');
  const setDocumentDetailVisibility = useSetDocumentDetailWithoutVisible();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const dispatch = useDispatch();

  const getParamsToFetchUserByRefCode = (refCode: string, code: string) => {
    return {
      filter: {
        where: {
          referralCode: { inq: [refCode, code] },
        },
        include: [{ relation: 'org' }],
      },
    };
  };

  const handleEditDocument = (document) => {
    if (documentDetail === document.id) return;
    setDocumentDetailVisibility(document);
  };

  const formSchemaDetail = useReferralUsersSchemaDetailForm(
    canEdit,
    handleEditDocument,
  );

  const fetchUsersChildren = (user, cb) => {
    const { refCode, code } = user;

    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.generateNodeEndpoint('users/referral'),
        method: 'get',
        hiddenValues: getParamsToFetchUserByRefCode(refCode, code),
        onGotSuccess: (res) => {
          const users = res?.data || [];
          const userIds = users.map((user) => user.id);
          const params = {
            filter: {
              where: {
                userIds,
              },
            },
          };
          const endpoint = endpoints.endpointWithApiDomain(
            `/users/with-children?${FormDataUtils.convertObjectToUri(params)}`,
          );

          dispatch(callApi({ method: 'get', params, endpoint, callback: cb }));
        },
      },
    );
  };

  useEffect(() => {
    fetchUsersChildren(documentDetail, setDataSource);
  }, [documentDetail]);

  return (
    <div className="list-referrer">
      <h2>
        {t('List person referred', { vn: 'Danh sách người đã giới thiệu' })}
      </h2>
      <HTable
        schema={formSchemaDetail}
        dataSource={dataSource}
        pagination={false}
        expandable={{
          onExpand: (expanded, record) => {
            if (!expanded) return;

            fetchUsersChildren(record, (res) => {
              const data = res || undefined;
              record.children = data;
              setDataSource([...dataSource, {}]);
            });
          },
        }}
      />
    </div>
  );
});

export const useReferralUsersSchemaDetailForm = (
  canEdit = false,
  handleEditDocument = (document: any) => {},
) => {
  const { t } = useHTranslation('admin-common');

  const schema = [
    TableUtils.createTableColumnConfig({
      title: t('Full name', { vn: 'Họ và tên' }),
      dataIndex: 'fullName',
      key: 'fullName',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Email'),
      dataIndex: 'emails',
      key: 'emails',
      render: ConverterUtils.showUserEmail,
    }),
    TableUtils.createTableColumnConfig({
      title: t('SDT'),
      dataIndex: 'tels',
      key: 'tels',
      render: ConverterUtils.showOrgPhone,
    }),
    TableUtils.createTableColumnConfig({
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Create at', { vn: 'Ngày tạo' }),
      dataIndex: 'createdAt',
      sortable: true,
      key: 'createdAt',
      render: ConverterUtils.fullDatetimeConverter,
    }),
  ];

  if (canEdit) {
    schema.push(
      TableUtils.createTableColumnConfig({
        title: t('Action'),
        render: (document) => {
          return (
            <Link
              href={`${location.pathname.replace('/vn', '').replace('/en', '')}?documentId=${document.id}`}
            >
              <ClickableOpacity onClick={() => handleEditDocument}>
                <EditIconSvg />
              </ClickableOpacity>
            </Link>
          );
        },
      }),
    );
  }

  return schema;
};
