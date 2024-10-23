import React from 'react';
import { useDispatch } from 'react-redux';
import { Tag } from 'antd';
import {
  BankOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Tooltip from 'antd/lib/tooltip';

import { ItemViewer } from '@components/shared/common/configuration/item-viewer';
import { TableUtils } from '@lib/table-utils';
import { useHTranslation } from '@lib/i18n';
import {
  HomeIcon,
  SourceIcon,
  StatusIcon,
  UserIcon,
} from '../../../../../icons';
import { Link } from '../../../../shared/link';
import { HPreviewUser } from '../../../../shared/common/h-preview-user';
import { ConverterUtils } from '../../../../../lib/converter';
import {
  useEditDocumentControl,
  useSearchForm,
} from '../../../../../schema-form/features/hooks';
import { ClickableOpacity } from '../../../../shared/utils/clickable-opacity';
import { FormatterUtils } from '../../../../../lib/formatter';
import { PreViewUser } from '../deals-component-common/preview-user';
import {
  TRANSACTION_DETAIL_STATUS,
  TRANSACTION_DETAIL_STATUS_COLOR_MAPPING,
  TRANSACTION_DETAIL_STATUS_LABEL_MAPPING,
} from '../../transaction/constant';
import { endpoints } from '../../../../../lib/networks/endpoints';
import { callApi } from '../../../../../schema-form/common/actions';
import { useCurrentUser } from '../../../../../lib/providers/auth';

export const ForControlDisbursementTableSchema = (props) => {
  const { t } = useHTranslation('admin-common');
  const searchForm = useSearchForm();
  const dispatch = useDispatch();
  const currentUser = useCurrentUser();

  const handleResponse = (res) => {
    searchForm?.submit();
  };

  const handleActionUpdate = (transactionDetail, status) => {
    const updateData = {
      updatedById: currentUser.id,
      status,
    };

    const endpoint = endpoints.endpointWithApiDomain(
      `/transactions/update-transaction-deal/${transactionDetail.id}`,
    );
    dispatch(
      callApi({
        method: 'put',
        params: updateData,
        endpoint,
        callback: handleResponse,
      }),
    );
  };

  return [
    TableUtils.createTableColumnConfig({
      title: t('Hồ sơ'),
      dataIndex: 'dealDetail',
      sortable: true,
      key: 'dealDetail',
      render: (dealDetail, transactionDetail) => {
        const customer = transactionDetail?.transaction?.customer || {};
        const staff = transactionDetail?.staff;
        const deal = dealDetail?.deal;
        const productDetailPartner = dealDetail?.productDetailPartner;
        const transaction = transactionDetail?.transaction;

        return (
          <>
            <ItemViewer
              {...{
                label: <StatusIcon />,
                tooltipContent: t('Mã HSV'),
                value: (
                  <Link href={`/admin/deals/loans?dealId=${deal?.id}`}>
                    {deal?.code}
                  </Link>
                ),
                labelClassName: 'm-b-10',
              }}
            />
            <ItemViewer
              {...{
                label: <StatusIcon />,
                tooltipContent: t('Mã Giao dịch'),
                value: (
                  <Link
                    href={`/admin/transaction?documentId=${transaction.id}`}
                  >{`${transaction?.code}`}</Link>
                ),
                labelClassName: 'm-b-10',
              }}
            />
            <ItemViewer
              {...{
                label: <UserIcon />,
                tooltipContent: (
                  <HPreviewUser
                    {...{ user: customer, userTitle: 'Khách hàng' }}
                  />
                ),
                value: (
                  <div className={'preview-user-full-name'}>
                    {ConverterUtils.getFullNameUser(customer)}
                  </div>
                ),
                labelClassName: 'm-b-10',
                style: { textAlign: 'center', justifyContent: 'center' },
              }}
            />
            <ItemViewer
              {...{
                tooltipContent: t('Sản phẩm vay'),
                label: <HomeIcon />,
                value: productDetailPartner?.name || '',
                labelClassName: 'm-b-10',
              }}
            />
            <ItemViewer
              {...{
                tooltipContent: t('Apartment code'),
                label: <SourceIcon />,
                value: deal?.realEstateInfo?.apartmentCode,
                labelClassName: 'm-b-10',
              }}
            />
            <PreViewUser user={staff} userTitle={t('Nhân viên xử lý')} />
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Thông tin ngân hàng'),
      dataIndex: 'dealDetail',
      sortable: true,
      key: 'dealDetail',
      render: (dealDetail, transactionDetail) => {
        const partnerStaff = transactionDetail?.partnerStaff || {};
        const partner = dealDetail?.partner || {};

        return (
          <>
            <ItemViewer
              {...{
                tooltipContent: t('Partner'),
                label: <BankOutlined />,
                value: partner?.name || '',
                labelClassName: 'm-b-10',
              }}
            />
            <ItemViewer
              {...{
                label: <StatusIcon />,
                tooltipContent: t('Mã HSV (đối tác)'),
                value: dealDetail?.info?.codeBankProfile,
                labelClassName: 'm-b-10',
              }}
            />
            <ItemViewer
              {...{
                label: <UserIcon />,
                tooltipContent: t('Mã KH (đối tác)'),
                value: dealDetail?.info?.codeBankCustomer,
                labelClassName: 'm-b-10',
              }}
            />
            <PreViewUser
              user={partnerStaff}
              userTitle={t('Nhân viên ngân hàng')}
            />
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Số tiền giải ngân'),
      dataIndex: 'amount',
      sortable: true,
      key: 'amount',
      render: (amount) => FormatterUtils.formatAmount(amount, 'VND'),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Ngày giải ngân'),
      dataIndex: 'paymentDate',
      sortable: true,
      key: 'paymentDate',
      render: (paymentDate) =>
        ConverterUtils.dateConverterToString(paymentDate),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
      render: (status) => (
        <Tag color={TRANSACTION_DETAIL_STATUS_COLOR_MAPPING[status]}>
          {TRANSACTION_DETAIL_STATUS_LABEL_MAPPING[status] || ''}
        </Tag>
      ),
    }),
    {
      title: t('Action'),
      dataIndex: 'status',
      width: 100,
      responsive: ['md'],
      render: (status, transactionDetail) => {
        const editControl = useEditDocumentControl(transactionDetail);

        return (
          <div className="d-f-center">
            {(!status ||
              status === TRANSACTION_DETAIL_STATUS.NOT_FOR_CONTROL) && (
              <>
                <Tooltip title={'Chỉnh sửa'}>
                  <div>{editControl()}</div>
                </Tooltip>
                <Tooltip title={'Đối soát'}>
                  <div className={'p-l-10'}>
                    <ClickableOpacity
                      {...{
                        className: 'm-t-10 m-l-5 m-r-5',
                        onClick: () =>
                          handleActionUpdate(
                            transactionDetail,
                            TRANSACTION_DETAIL_STATUS.FOR_CONTROL,
                          ),
                        confirmation: {
                          message: t(
                            'Bạn có chắc muốn đối soát giải ngân này?',
                          ),
                        },
                      }}
                    >
                      <CheckCircleOutlined />
                    </ClickableOpacity>
                  </div>
                </Tooltip>

                <Tooltip title={'Huỷ bỏ'}>
                  <div className={'p-l-10'}>
                    <ClickableOpacity
                      {...{
                        className: 'm-t-10 m-l-5 m-r-5',
                        onClick: () =>
                          handleActionUpdate(
                            transactionDetail,
                            TRANSACTION_DETAIL_STATUS.CANCELLED,
                          ),
                        confirmation: {
                          message: t('Bạn có chắc muốn huỷ giải ngân này?'),
                        },
                      }}
                    >
                      <DeleteOutlined />
                    </ClickableOpacity>
                  </div>
                </Tooltip>
              </>
            )}
          </div>
        );
      },
    },
  ];
};
