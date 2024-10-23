import { EnvironmentOutlined, ScheduleOutlined } from '@ant-design/icons';
import HUser from '@components/shared/common/h-user';
import { Link } from '@components/shared/link';
import { ConverterUtils, useGenerateConcealContent } from '@lib/converter';
import { CallPhoneFcssSDKConvert } from '@lib/fccs-sdk-convert';
import { useHTranslation } from '@lib/i18n';
import { Popover, Tag } from 'antd';
import camelCase from 'camelcase';
import { ActionSvg, EditIconSvg } from 'icons';
import { useRouter } from 'next/router';
import { isEmpty } from 'underscore';
import { endpoints } from '../../../../lib/networks/endpoints';
import { TableUtils } from '../../../../lib/table-utils';
import { useDeleteDocumentControl } from '../../../../schema-form/features/hooks';
import {
  useOnDocumentClick,
  useSetDocumentDetail,
} from '../../../../schema-form/features/hooks/table-hooks';
import { ItemViewer } from '../../../shared/common/configuration/item-viewer';
import { ClickableOpacity } from '../../../shared/utils/clickable-opacity';
import { USER_TYPES } from '../../crm/tasks/constans';
import { useFetchRoles } from './utils';

import './advance-search.module.scss';

interface TableProps {
  type: any;
  currentPageBanks: any;
  searchForm?: any;
  defaultFeatureId?: string;
  useQueryParams?: boolean;
}

export const UserResultSchema = ({
  type,
  currentPageBanks,
  searchForm = undefined,
  useQueryParams,
  defaultFeatureId,
}: TableProps) => {
  const { t } = useHTranslation('admin-common');
  const onDocumentClick = useOnDocumentClick();
  const deleteDocumentControl = useDeleteDocumentControl();
  const generateConcealContent = useGenerateConcealContent();
  const { asPath } = useRouter();
  const setDocumentDetail = useSetDocumentDetail(defaultFeatureId);
  const roles = useFetchRoles() || [];

  const handleVisibleDetail = (document) => {
    if (useQueryParams) {
      onDocumentClick(document, {});
    } else {
      setDocumentDetail(document);
    }
  };

  const tempTableColumns = [
    TableUtils.createTableColumnConfig({
      title: t('User', { vn: 'Người dùng' }),
      sortable: true,
      render: (document: any) => {
        // Với trường hợp component này nằm trong detail của một feature khác, không được tác động lên params
        const detailLink = useQueryParams
          ? `${asPath}?documentId=${document.id}`
          : asPath;

        return (
          <div>
            <div className={'profile_customer__action--wrapper flex'}>
              <div className="flex flex-row items-center">
                <ClickableOpacity
                  className="profile_customer"
                  onClick={() => handleVisibleDetail(document)}
                >
                  <HUser
                    {...{
                      user: document,
                    }}
                  />
                </ClickableOpacity>

                <Popover
                  content={
                    <div className="flex items-center">
                      <div
                        className="m-r-5"
                        onClick={() => handleVisibleDetail(document)}
                      >
                        <Link href={detailLink}>
                          <EditIconSvg />
                        </Link>
                      </div>

                      <div>
                        {deleteDocumentControl(
                          document,
                          {
                            endpoint: endpoints.endpointWithApiDomain('/users'),
                          },
                          searchForm,
                        )}
                      </div>
                    </div>
                  }
                >
                  <div className="profile_customer__action">
                    <ActionSvg />
                  </div>
                </Popover>
              </div>

              {/* PHONE */}
              {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {document?.tels?.map(item => {
                    if (!item?.tel?.trim()) return null;
                    return (
                      <div
                        key={item.tel}
                        className={'flex items-center justify-center'}
                        style={{ paddingTop: '12px' }}
                      >
                        <CallPhoneFcssSDKConvert
                          {...{
                            phoneNumber: `${item.tel}`,
                            userInfo: document,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div> */}
            </div>

            {/* ky hop dong hay chua */}
            {/* {[USER_TYPES.collaborator, USER_TYPES.customer].includes(type) ? (
              document?.hasCollaboratorContract ? (
                <Tag color="cyan">Đã ký hợp đồng</Tag>
              ) : (
                <Tag color="red">Chưa ký hợp đồng</Tag>
              )
            ) : (
              <></>
            )} */}

            {/* EMAIL */}
            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                {{ ...document }?.emails?.map(item => {
                  if (!item?.email?.trim()) return null;
                  return (
                    <div key={item.email} className={'wrapper-preview-phone'}>
                      {generateConcealContent(`${item.email}`)}
                    </div>
                  );
                })}
              </div>
            </div> */}

            {document?.idNumber && (
              <ItemViewer
                {...{
                  label: <ScheduleOutlined />,
                  tooltipContent: t('CMND'),
                  value: `${document.idNumber}`,
                  labelClassName: 'm-b-0i',
                }}
              />
            )}
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status', { vn: 'Trạng thái' }),
      sortable: true,
      render: (document: any) => {
        return (
          <div>
            {/* Status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              {/* ky hop dong hay chua */}
              {[USER_TYPES.collaborator, USER_TYPES.customer].includes(type) ? (
                document?.hasCollaboratorContract ? (
                  <Tag color="cyan">Đã ký hợp đồng</Tag>
                ) : (
                  <Tag color="red">Chưa ký hợp đồng</Tag>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Phone', { vn: 'Phone' }),
      sortable: true,
      render: (document: any) => {
        return (
          <div>
            {/* PHONE */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                {document?.tels?.map((item) => {
                  if (!item?.tel?.trim()) return null;
                  return (
                    <div
                      key={item.tel}
                      className={'flex items-center justify-center'}
                      style={{ paddingTop: '12px' }}
                    >
                      <CallPhoneFcssSDKConvert
                        {...{
                          phoneNumber: `${item.tel}`,
                          userInfo: document,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Email', { vn: 'Email' }),
      sortable: true,
      render: (document: any) => {
        return (
          <div>
            {/* EMAIL */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                {{ ...document }?.emails?.map((item) => {
                  if (!item?.email?.trim()) return null;
                  return (
                    <div key={item.email} className={'wrapper-preview-phone'}>
                      {generateConcealContent(`${item.email}`)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      },
    }),
    type !== USER_TYPES.customer
      ? TableUtils.createTableColumnConfig({
          title: t('Organization'),
          dataIndex: 'org',
          sortable: true,
          key: 'orgId',
          width: 300,
          render: (org) => {
            const address = org?.address;
            const fullAddress = ConverterUtils.getAddress({
              address,
            });
            return (
              <div>
                <div className="profile_customer">
                  <HUser
                    {...{
                      user: {
                        ...org,
                        avatar: org?.image?.url,
                        fullName: org?.code + ' - ' + org?.name,
                      },
                      showHasAccount: false,
                    }}
                  />
                </div>
                {address && (
                  <ItemViewer
                    {...{
                      label: <EnvironmentOutlined />,
                      tooltipContent: t('Address'),
                      value: fullAddress,
                      labelClassName: 'm-b-0i',
                    }}
                  />
                )}
              </div>
            );
          },
        })
      : null,
    TableUtils.createTableColumnConfig({
      title: t('Area chain', { vn: 'Khu vực phụ trách' }),
      dataIndex: ['advancedInformation', 'market'],
      sortable: true,
      key: 'market',
      render: (market) => {
        return (
          <div>
            {market?.map((el, index) => {
              return (
                <span key={`market-${index}`}>
                  {index + 1 === market.length ? el : `${el}, `}
                </span>
              );
            })}
          </div>
        );
      },
    }),
    type !== USER_TYPES.customer
      ? TableUtils.createTableColumnConfig({
          title: t('Loan partner', { vn: 'Thông tin ngân hàng' }),
          dataIndex: 'banks',
          render: (banks) => {
            if (!Array.isArray(banks) || banks.length < 1) {
              return null;
            }

            return (
              <div>
                {banks.map((bankItem: any, index: number) => {
                  const { bankId, bankAccount } = bankItem;
                  const bank =
                    currentPageBanks.find(({ id }) => id === bankId) || {};
                  const address = bank?.address || '';
                  const fullAddress = ConverterUtils.getAddress({
                    address,
                  });

                  return (
                    <div key={`bank-${index}`}>
                      <div
                        style={{ paddingLeft: '0' }}
                        className="profile_customer"
                      >
                        <HUser
                          {...{
                            user: {
                              avatar: bank?.image?.url,
                              fullName: bank?.code + ' - ' + bank?.name,
                            },
                            showHasAccount: false,
                          }}
                        />
                      </div>
                      {address && (
                        <ItemViewer
                          {...{
                            label: <EnvironmentOutlined />,
                            tooltipContent: t('Address'),
                            value: fullAddress,
                            labelClassName: 'm-b-0i',
                          }}
                        />
                      )}
                      {bankAccount && (
                        <ItemViewer
                          {...{
                            label: 'STK: ',
                            tooltipContent: t('Bank Account', { vn: 'STK' }),
                            value: bankAccount,
                            labelClassName: 'm-b-0i',
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          },
        })
      : null,
    TableUtils.createTableColumnConfig({
      title: t('Role and position', { vn: 'Vai trò và chức vụ' }),
      key: 'roleAndPosition',
      render: (userRecord) => {
        const roleIds = userRecord?.roleIds || [];
        const rolesNameOfUser = roles
          .filter((role) => roleIds.includes(role.id))
          .map((item) => item?.name || '');

        return (
          <>
            {!isEmpty(rolesNameOfUser) && (
              <ItemViewer
                label={t('Role', { vn: 'Vai trò' })}
                value={rolesNameOfUser.join(', ')}
              />
            )}
            {userRecord?.title && (
              <ItemViewer
                label={t('Position', { vn: 'Chức vụ' })}
                value={t(camelCase(userRecord.title))}
              />
            )}
          </>
        );
      },
    }),

    TableUtils.createTableColumnConfig({
      title: t('Data Source 1', { vn: 'Data Source 1' }),
      key: 'dataSource1',
      render: (userRecord) => {
        const rolesNameOfUser = userRecord?.dataSource1;
        return (
          <>
            {!isEmpty(rolesNameOfUser) && (
              <ItemViewer label={t('', { vn: '' })} value={rolesNameOfUser} />
            )}
          </>
        );
      },
    }),

    TableUtils.createTableColumnConfig({
      title: t('Tag 1', { vn: 'Tag 1' }),
      key: 'tag1',
      render: (userRecord) => {
        const rolesNameOfUser = userRecord?.dataSource1;
        return (
          <>
            {!isEmpty(rolesNameOfUser) && (
              <ItemViewer label={t('', { vn: '' })} value={rolesNameOfUser} />
            )}
          </>
        );
      },
    }),
  ];

  const tableColumns = tempTableColumns.filter(Boolean);

  return tableColumns;
};
