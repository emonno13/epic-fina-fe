import { EmailWithIcon } from '@components/shared/common/configuration/email-icon';
import { HPreviewUser } from '@components/shared/common/h-preview-user';
import { Link } from '@components/shared/link';
import { CallPhoneFcssSDKConvert } from '@lib/fccs-sdk-convert';
import { FormatterUtils } from '@lib/formatter';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { TableUtils } from '@lib/table-utils';
import { CommentUtils } from '@lib/utils/comment';
import { useViewTypeOfDeal } from '@schema-form/features/hooks/document-detail-hooks';
import { useSetDocumentDetailWithoutVisible } from '@schema-form/features/hooks/table-hooks';
import { Button, Col, Row, Tabs, Tag, Tooltip } from 'antd';
import {
  AccessTimeIcon,
  DollarIcon,
  EmailDealIconSvg,
  HomeIcon,
  NoSharingIcon,
  PhoneDealIconSvg,
  PlaceIcon,
  SourceIcon,
  StatusIcon,
  UserIcon,
} from 'icons/icon';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { ConverterUtils } from '../../../../../lib/converter';
import { useIsMobile } from '../../../../../lib/hooks/use-media';
import { useAuth, useCurrentUser } from '../../../../../lib/providers/auth';
import { useSetDocumentDetail } from '../../../../../schema-form/features/hooks';
import { FormUtils } from '../../../../../schema-form/utils/form-utils';
import {
  ORGANIZATION_TYPES,
  USER_TYPES,
} from '../../../../../types/organization';
import { HCommentForDeal } from '../../../../shared/common-form-elements/h-comment';
import { ItemViewer } from '../../../../shared/common/configuration/item-viewer';
import { UserAvatar } from '../../../../shared/common/h-avatar';
import {
  NoComment,
  PreviewUserTable,
} from '../deals-component-common/preview-user-table';
import { DEAL_BANK_STATUS, DEAL_STATUS } from '../utils';
import {
  iconTabLabel,
  TabLabel,
} from './detail/edit-deal-loan/loan-detail-generate-tab-pane';
import { DEAL_DOCUMENT_ID_NAME, VIEW_TYPE_OF_DEAL } from './index';

import './edit-feature.module.scss';

const { TabPane } = Tabs;

export const DealsTableSchema = (props?: any) => {
  const { t } = useHTranslation('admin-common');
  const { currentUser } = useAuth();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const showShort = props?.showShort;
  const isMobile = useIsMobile();
  const handleDocumentSelected = useSetDocumentDetail();
  const [userLoggedIn, setUserLoggedIn] = useState<any>({});

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        nodeName: `/users/${currentUser?.id}`,
        onGotSuccess: (response) => {
          setUserLoggedIn(response || {});
        },
      },
    );
  }, []);

  if (isMobile) {
    return [
      TableUtils.createTableColumnConfig({
        title: t('Profile information'),
        sortable: true,
        width: !showShort ? '20%' : '100%',
        render: (_, document: any) => {
          const { dealDetails = [] } = document;
          const RenderSubStatus = () => {
            if (!document.subStatus) {
              return null;
            }
            if (currentUser?.type === USER_TYPES.staff) {
              return (
                <Tag className={'m-t-10'} color="magenta">
                  {t(document?.subStatus)}
                </Tag>
              );
            }
            return null;
          };
          const EstateInfo = () => {
            if (
              document?.category?.productCategory !=
              ORGANIZATION_TYPES.REAL_ESTATE
            ) {
              return null;
            }
            return (
              <>
                {document?.realEstateInfo?.apartmentCode && (
                  <ItemViewer
                    {...{
                      tooltipContent: t('Apartment code'),
                      label: <SourceIcon />,
                      value: document?.realEstateInfo?.apartmentCode,
                      labelClassName: 'm-b-0i',
                    }}
                  />
                )}
                {document?.realEstateInfo?.address && (
                  <ItemViewer
                    {...{
                      tooltipContent: t('Address'),
                      label: <PlaceIcon />,
                      value: document?.realEstateInfo?.address,
                      labelClassName: 'm-b-0i',
                    }}
                  />
                )}
              </>
            );
          };
          const detailLink = `/admin/deals/loans?${DEAL_DOCUMENT_ID_NAME}=${document.id}`;
          return (
            <div className={'deal'}>
              <Row gutter={[24, 24]}>
                <ItemViewer
                  {...{
                    label: 'Mã hồ sơ vay',
                    value: <a href={detailLink}>#{document.code}</a>,
                    className: 'm-l-10',
                    labelClassName: 'm-b-10',
                    onClick: () => handleDocumentSelected(document),
                  }}
                />
              </Row>
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  {currentUser?.type === USER_TYPES.staff && (
                    <ItemViewer
                      {...{
                        label: <StatusIcon />,
                        value: (
                          <>
                            <Tag color={DEAL_STATUS[document?.status]?.color}>
                              {t(DEAL_STATUS[document?.status]?.name) ||
                                t(document?.status)}
                            </Tag>
                          </>
                        ),
                        labelClassName: 'm-b-10',
                      }}
                    />
                  )}
                  {document.subStatus &&
                    currentUser?.type === USER_TYPES.staff && (
                      <ItemViewer
                        {...{
                          label: <StatusIcon />,
                          value: <RenderSubStatus />,
                          labelClassName: 'm-b-10',
                        }}
                      />
                    )}
                  <ItemViewer
                    {...{
                      label: <UserIcon />,
                      tooltipContent: (
                        <HPreviewUser
                          {...{ user: document?.user, userTitle: 'Khách hàng' }}
                        />
                      ),
                      value: (
                        <div className={'preview-user-full-name'}>
                          {ConverterUtils.getFullNameUser(document?.user)}
                        </div>
                      ),
                      labelClassName: 'm-b-10',
                      style: { textAlign: 'center', justifyContent: 'center' },
                    }}
                  />
                  {!isOrgStaff && (
                    <ItemViewer
                      {...{
                        label: <UserIcon />,
                        tooltipContent: (
                          <HPreviewUser
                            {...{
                              user: document?.assignee,
                              userTitle: 'Nhân viên Fina',
                            }}
                          />
                        ),
                        value: (
                          <div className={'preview-user-full-name'}>
                            {ConverterUtils.getFullNameUser(document?.assignee)}
                          </div>
                        ),
                        labelClassName: 'm-b-10',
                        style: {
                          textAlign: 'center',
                          justifyContent: 'center',
                        },
                      }}
                    />
                  )}
                  {document?.product?.name && (
                    <ItemViewer
                      {...{
                        label: <HomeIcon />,
                        value: document?.product?.name,
                        tooltipContent: t('Product'),
                        labelClassName: 'm-b-0i',
                      }}
                    />
                  )}
                  {document?.apartmentCodeInvestor && (
                    <ItemViewer
                      {...{
                        label: <StatusIcon />,
                        value: document?.apartmentCodeInvestor,
                        tooltipContent: t('Apartment Code Investor', {
                          vn: 'Mã SP CĐT',
                        }),
                        labelClassName: 'm-b-0i',
                      }}
                    />
                  )}
                </Col>
                <Col span={12}>
                  <EstateInfo />
                  <ItemViewer
                    {...{
                      label: <DollarIcon />,
                      tooltipContent: t('Amount to borrow'),
                      value: FormatterUtils.formatAmount(
                        document?.loanMoney || 0,
                        'vnđ',
                      ),
                      labelClassName: 'm-b-0i',
                    }}
                  />
                  <ItemViewer
                    {...{
                      label: <AccessTimeIcon />,
                      tooltipContent: t('Borrow time'),
                      value: `${document?.timeLoan || 0} (${t('year', { vn: 'Năm' })})`,
                      labelClassName: 'm-b-0i',
                    }}
                  />
                </Col>
              </Row>
              <Row gutter={[24, 24]}>
                <ItemViewer
                  {...{
                    label: t('Created At', { vn: 'Thời gian tạo' }),
                    value: ConverterUtils.dateConverter(document?.createdAt),
                    tooltipContent: t('Created At', { vn: 'Thời gian tạo' }),
                    className: 'm-l-10',
                    labelClassName: 'm-b-0i',
                  }}
                />
              </Row>
              <Row gutter={[24, 24]}>
                <ItemViewer
                  {...{
                    label: t('Updated At', { vn: 'Thời gian cập nhật' }),
                    value: ConverterUtils.dateConverter(document?.updatedAt),
                    tooltipContent: t('Created At', { vn: 'Thời gian tạo' }),
                    labelClassName: 'm-b-0i',
                    className: 'm-l-10',
                  }}
                />
              </Row>
              <Tabs defaultActiveKey="1" className={'ellipsis-deal-100'}>
                <TabPane tab={t('Bank', { vn: 'Ngân hàng' })} key="bank">
                  <Tabs defaultActiveKey="1" className={'ellipsis-deal-100'}>
                    {dealDetails && dealDetails.length > 0 ? (
                      dealDetails.map((bank) => {
                        const partnerStaff = bank?.partnerStaff || {};
                        const isCheckSharingWithBank =
                          document?.sharingWithOrgIds?.includes(
                            bank?.partnerId,
                          );
                        const icon = iconTabLabel(
                          bank?.subStatus,
                          isCheckSharingWithBank,
                        );
                        return (
                          <TabPane
                            {...{
                              tab: (
                                <TabLabel
                                  Icon={icon}
                                  twoToneColor="#fd0101"
                                  label={bank?.partnerCodeName}
                                />
                              ),
                              closable: false,
                            }}
                            key={bank?.id}
                          >
                            <ItemViewer
                              {...{
                                label: <StatusIcon />,
                                tooltipContent: t('Status', {
                                  vn: 'Trạng thái',
                                }),
                                value: (
                                  <>
                                    <Tag
                                      color={
                                        DEAL_BANK_STATUS[bank?.status]?.color
                                      }
                                    >
                                      {t(
                                        DEAL_BANK_STATUS[bank?.status]?.name,
                                      ) || t(document?.status)}
                                    </Tag>
                                  </>
                                ),
                                labelClassName: 'm-b-10',
                              }}
                            />
                            <PreviewUserTable
                              {...{
                                user: partnerStaff,
                                document: bank,
                                userTitle: t('Teller'),
                              }}
                            />
                          </TabPane>
                        );
                      })
                    ) : (
                      <NoSharingIcon />
                    )}
                  </Tabs>
                </TabPane>
                <TabPane tab={t('Staff')} key="Staff">
                  <PreviewUserTable
                    {...{
                      user: document.assignee,
                      document,
                      showComment: isOrgStaff,
                    }}
                  />
                </TabPane>
              </Tabs>
            </div>
          );
        },
      }),
    ];
  }

  return [
    TableUtils.createTableColumnConfig({
      title: t('Profile information'),
      // sortable: true,
      width: !showShort ? '30%' : '85%',
      render: (_, document: any) => {
        const detailLink = `/admin/deals/loans?${DEAL_DOCUMENT_ID_NAME}=${document.id}`;
        return (
          <div className="deal-content">
            <div className={'code-status-deal'}>
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
                    labelClassName: 'mb-10',
                  }}
                />
              </Link>
              <StatusDeals {...{ document, currentUser }} />
            </div>

            <ProfileCustomerDeals {...{ document }} />
            <RenderProfileInformation {...{ document }} />
          </div>
        );
      },
    }),
    ...(!showShort
      ? [
          TableUtils.createTableColumnConfig({
            title: t('Bank(s)', { vn: 'Ngân hàng' }),
            dataIndex: 'dealDetails',
            // sortable: true,
            width: 400,
            key: 'dealDetails',
            render: (dealDetails, document) => {
              return (
                <>
                  <Tabs
                    defaultActiveKey="1"
                    style={{ width: 525 }}
                    className="tabs-loan-table"
                  >
                    {dealDetails && dealDetails.length > 0 ? (
                      dealDetails.map((bank) => {
                        const updatedAtStatus = bank?.statusHistories?.find(
                          (el) => el.status === bank.status,
                        );
                        return (
                          <TabPane
                            {...{
                              tab: (
                                <div
                                  style={{
                                    display: 'flex',
                                    gap: '5px',
                                    alignItems: 'center',
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '40px',
                                      height: '40px',
                                      borderRadius: '50%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      backgroundColor: `${bank?.partner?.backgroundColor || '#fff'}`,
                                    }}
                                  >
                                    {bank?.partner?.image?.url ? (
                                      <img
                                        style={{
                                          width: '100%',
                                          height: 'auto',
                                        }}
                                        src={bank.partner.image.url || ''}
                                        alt={'bank icon'}
                                      />
                                    ) : (
                                      'Bank'
                                    )}
                                  </div>
                                </div>
                              ),
                              closable: false,
                            }}
                            key={bank?.id}
                          >
                            <Row>
                              <Col {...{ span: 20 }}>
                                <ItemViewer
                                  {...{
                                    label: <StatusIcon />,
                                    tooltipContent: t('Status', {
                                      vn: 'Trạng thái',
                                    }),
                                    value: (
                                      <>
                                        <Tag
                                          color={
                                            DEAL_BANK_STATUS[bank?.status]
                                              ?.color || 'red'
                                          }
                                        >
                                          {t(
                                            DEAL_BANK_STATUS[bank?.status]
                                              ?.name,
                                          ) || t(document?.status)}
                                        </Tag>
                                        <span className={'updatedAt-status'}>
                                          <Tooltip
                                            title={ConverterUtils.dateConverterToString(
                                              updatedAtStatus?.updatedAt,
                                            )}
                                          >
                                            <span>
                                              {ConverterUtils.dateConverterRelativeTime(
                                                updatedAtStatus?.updatedAt,
                                              )}
                                            </span>
                                          </Tooltip>
                                        </span>
                                      </>
                                    ),
                                    labelClassName: 'm-b-10',
                                  }}
                                />
                              </Col>
                              <Col></Col>
                            </Row>
                            <div className={'wrapper-preview-user__comment'}>
                              <Scrollbars
                                style={{ width: '100%', height: 200 }}
                              >
                                <div className="ui-loan-detail-bank">
                                  <HCommentForDeal
                                    {...{
                                      className: 'm-t-10',
                                      documentId: bank?.id,
                                      inputRows: 1,
                                      defaultContent: <NoComment />,
                                      user: userLoggedIn,
                                      userTitle: t(currentUser?.type),
                                    }}
                                  />
                                </div>
                              </Scrollbars>
                            </div>
                          </TabPane>
                        );
                      })
                    ) : (
                      <div className={'no-sharing'}>
                        <NoSharingIcon />
                      </div>
                    )}
                  </Tabs>
                </>
              );
            },
          }),
        ]
      : []),
    ...(!showShort && isOrgStaff
      ? [
          TableUtils.createTableColumnConfig({
            title: t('Counselor', { vn: 'Nhân viên tư vấn' }),
            dataIndex: 'user',
            // sortable: true,
            key: 'user',
            width: 355,
            responsive: ['md'],
            render: (user, document) => {
              const assignee = document?.assignee;
              return (
                <div className={'wrapper-preview-user__comment'}>
                  <Tooltip
                    placement="topLeft"
                    title={
                      <HPreviewUser
                        {...{ user: document?.assignee, userTitle: t('Staff') }}
                      />
                    }
                  >
                    <div>
                      <UserAvatar
                        {...{ user: assignee, avatarProps: { size: 24 } }}
                      />
                      <span className={'m-l-20'}>
                        {(assignee as any)?.fullName ||
                          ConverterUtils.getFullNameUser(assignee)}{' '}
                      </span>
                    </div>
                  </Tooltip>
                  <Scrollbars style={{ width: '100%', height: 200 }}>
                    <div className="ui-loan-detail-bank">
                      <HCommentForDeal
                        {...{
                          className: 'm-t-10',
                          documentId: document?.id,
                          inputRows: 1,
                          defaultContent: <NoComment />,
                          user: userLoggedIn,
                          userTitle: t(currentUser?.type),
                        }}
                      />
                    </div>
                  </Scrollbars>
                </div>
              );
            },
          }),
        ]
      : []),
  ];
};

export const RenderDealsLoanStatus = (document, currentUser) => {
  const { t } = useHTranslation('admin-common');

  if (!document?.document.subStatus) {
    return null;
  }
  if (document?.currentUser?.type === USER_TYPES.staff) {
    return (
      <Tag className={'m-t-10'} color="magenta">
        {t(document?.document?.subStatus)}
      </Tag>
    );
  }
  return null;
};

export const StatusDeals = ({ currentUser, document }) => {
  const { t } = useHTranslation('admin-common');

  return (
    <div className={'status-deal'}>
      {currentUser?.type === USER_TYPES.staff && (
        <ItemViewer
          {...{
            label: '',
            className: 'status-deal_item',
            value: (
              <>
                <Tag color={DEAL_STATUS[document?.status]?.color}>
                  {t(DEAL_STATUS[document?.status]?.name) ||
                    t(document?.status)}
                </Tag>
              </>
            ),
            labelClassName: 'm-b-10',
          }}
        />
      )}

      {document.subStatus && (
        <ItemViewer
          {...{
            label: '',
            value: <RenderDealsLoanStatus {...{ document, currentUser }} />,
            labelClassName: 'm-b-10',
          }}
        />
      )}
    </div>
  );
};

export const RenderProfileInformation = ({ document }) => {
  const { t } = useHTranslation('admin-common');
  const router = useRouter();
  const { documentTemplateId, objectId, objectType } = router.query as any;

  const ApartmentCode = () => {
    if (document?.category?.productCategory != ORGANIZATION_TYPES.REAL_ESTATE) {
      return <Col></Col>;
    }

    return (
      <Col {...{ span: 12 }}>
        {
          <ItemViewer
            {...{
              tooltipContent: t('Apartment code'),
              label: <SourceIcon />,
              value: document.realEstateInfo?.apartmentCode || '',
              labelClassName: 'm-b-0i',
              className: 'item-viewer text-12',
            }}
          />
        }
      </Col>
    );
  };

  const Address = () => {
    if (document?.category?.productCategory != ORGANIZATION_TYPES.REAL_ESTATE) {
      return null;
    }

    return (
      <Col {...{ span: 12 }}>
        {
          <ItemViewer
            {...{
              tooltipContent: t('Address'),
              label: <PlaceIcon />,
              value: document.realEstateInfo?.address || '',
              labelClassName: 'm-b-0i',
              className: 'item-viewer text-12',
            }}
          />
        }
      </Col>
    );
  };

  const currentUser = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;

  const handleCopyToClipBoard = async () => {
    const currenDomain = location.origin;
    const hrefUploadDocumentTemplateFiles = `document-template-files/upload/${documentTemplateId || document?.documentTemplateId}?objectId=${objectId || document?.id}&objectType=${objectType || 'deal_loan'}&objectSubtype=${undefined}&filter=%5Binclude%5D%5B0%5D%5Brelation%5D=file&filter%5Binclude%5D%5B1%5D%5Brelation%5D=document`;

    const response = await FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.endpointWithApiDomain('/short-urls'),
        hiddenValues: {
          filter: {
            where: {
              fullUrl: hrefUploadDocumentTemplateFiles,
            },
          },
        },
      },
    );

    // navigator.clipboard.writeText(`${currenDomain}/api/v1/short-urls/redirect/${response.shortCode}`)
    // 	.then(() => {
    // 		notification.success({message: t('addToClipBoardSuccessfully')});
    // 	})
    // 	.catch(() => {
    // 		notification.error({message: t('addToClipBoardFailed')});
    // 	});

    CommentUtils.copyToClipboard(
      `${currenDomain}/api/v1/short-urls/redirect/${response.shortCode}`,
      t('addToClipBoardSuccessfully'),
    );
  };

  return (
    <div className="info-customer">
      <Row>
        <ApartmentCode />
        <Col {...{ span: 12 }}>
          <ItemViewer
            {...{
              label: <DollarIcon />,
              tooltipContent: t('Amount to borrow'),
              value: FormatterUtils.formatAmount(
                document?.loanMoney || 0,
                'vnđ',
              ),
              labelClassName: 'm-b-0i',
              className: 'item-viewer text-12',
            }}
          />
        </Col>
      </Row>

      <Row>
        <Address />
        <Col {...{ span: 12 }}>
          <ItemViewer
            {...{
              label: <AccessTimeIcon />,
              tooltipContent: t('Borrow time'),
              value: `${document?.timeLoan || '_'} (${t('month', { vn: 'Tháng' })})`,
              labelClassName: 'm-b-0i',
              className: 'item-viewer text-12',
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col {...{ span: 12 }}>
          {document?.user?.tels?.map(
            ({ tel }, index) =>
              tel && (
                <div
                  key={`${tel}.${index}`}
                  className={'wrapper-preview-phone'}
                >
                  <CallPhoneFcssSDKConvert
                    {...{
                      phoneNumber: `${tel}`,
                      userInfo: document?.user?.tels,
                      icon: <PhoneDealIconSvg />,
                    }}
                  />
                </div>
              ),
          )}
        </Col>
        <Col {...{ span: 12 }}>
          <div className="ui-email-panel">
            {document?.user?.emails?.map(({ email }) => (
              <EmailWithIcon
                email={email}
                key={email}
                icon={<EmailDealIconSvg />}
              />
            ))}
          </div>
        </Col>
      </Row>

      {isOrgStaff && (
        <div className={'deal-panel-header__action-btn'}>
          <Button
            className={'deal-panel-header__action-btn__upload m-r-10'}
            type="default"
            shape="round"
            onClick={handleCopyToClipBoard}
          >
            {t('createLinkUpload')}
          </Button>
        </div>
      )}
    </div>
  );
};

export const ProfileCustomerDeals = ({ document, className = '' }) => {
  const { t } = useHTranslation('admin-common');
  const setDocumentDetail = useSetDocumentDetail();
  const setDocumentDetailWithoutVisible = useSetDocumentDetailWithoutVisible();
  const viewTypeOfDeal = useViewTypeOfDeal('view-type-of-deal');
  const detailLink = useMemo(
    () =>
      `/admin/deals/loans${viewTypeOfDeal === VIEW_TYPE_OF_DEAL.LIST ? `?${DEAL_DOCUMENT_ID_NAME}=${document.id}` : ''}`,
    [viewTypeOfDeal, document],
  );
  const handleDocumentSelected = (documentDetail) => {
    if (viewTypeOfDeal === VIEW_TYPE_OF_DEAL.GRID) {
      setDocumentDetailWithoutVisible(documentDetail);
    }
    if (viewTypeOfDeal === VIEW_TYPE_OF_DEAL.LIST) {
      setDocumentDetail(documentDetail);
    }
  };

  return (
    <div
      onClick={() => handleDocumentSelected(document)}
      className={`profile-customer-for-deal ${className}`}
    >
      <Link href={detailLink}>
        <div className="profile-customer-wrapper">
          <Tooltip
            placement="topLeft"
            title={
              <HPreviewUser
                {...{ user: document?.user, userTitle: t('Customer') }}
              />
            }
          >
            <UserAvatar
              {...{ user: document?.user, avatarProps: { size: 35 } }}
            />
          </Tooltip>
          <div className="profile-customer-name">
            <h1 className={'name'}>
              {ConverterUtils.getFullNameUser(document?.user)}
            </h1>
            {document.product && (
              <Tooltip placement="topLeft" title={t('Product')}>
                <span className="product-name">{document.product?.name}</span>
              </Tooltip>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
