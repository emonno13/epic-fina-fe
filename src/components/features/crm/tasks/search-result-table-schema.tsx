import { Col, Divider, Popover, Row, Tag, Tooltip } from 'antd';
import { EyeOutlined, UndoOutlined } from '@ant-design/icons';
import { UserAvatar } from '@components/shared/common/h-avatar';
import { ClickableOpacity } from '@components/shared/utils/clickable-opacity';
import { ViewCustomer } from '@components/shared/view-customer';
import { ViewTimeUpdate } from '@components/shared/view-time-update';
import { ExpandNoteSvg, FileTextSvg } from 'icons';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { HPreviewUser } from '@components/shared/common/h-preview-user';
import { ConverterUtils } from '@lib/converter';
import { RenderInsuranceComponent } from '@components/features/profiles/transactions/deal-insurance/common';
import { CallPhoneFcssSDKConvert } from '@lib/fccs-sdk-convert';
import { useHasPermissions } from '@lib/providers/auth';
import { AnyObject } from '@components/shared/atom/type';
import { mappingStatusOfTask } from './utils';
import { useSetDocumentSelected, useSetVisibleReopenTask } from './hooks';
import { PRODUCT_TYPES } from './constans';
import {
  TASK_STATUSES,
  TASK_STATUSES_COLOR_MAPPING,
  TASK_TYPES,
} from '../../../../constants/crm/task';
import {
  useDeleteDocumentControl,
  useDocumentDetail,
  useEditDocumentControl,
  useSetDocumentDetail,
} from '../../../../schema-form/features/hooks';
import { Link } from '../../../shared/link';
import { DEAL_DOCUMENT_ID_NAME } from '../../fina/deals/loans';

import '../../../../styles/_default_responsive.scss';
import './task.module.scss';

export const ReopenTaskCounsellingAction = ({ documentSelected }) => {
  const { t } = useHTranslation('admin-common');
  const setVisibleReopenTask = useSetVisibleReopenTask();
  const setDocumentSelected = useSetDocumentSelected();

  return (
    <ClickableOpacity
      className="p-r-10 m-b-5"
      tooltip={t('Reopen task counselling', { vn: 'Yêu cầu mở lại' })}
      onClick={() => {
        setVisibleReopenTask?.(true);
        setDocumentSelected?.(documentSelected);
      }}
    >
      <UndoOutlined />
    </ClickableOpacity>
  );
};

export const useTaskAction = () => {
  const hasPermission = useHasPermissions();
  const editControl = useEditDocumentControl();
  const deleteDocumentControl = useDeleteDocumentControl();
  const canEdit = hasPermission(['V_D_TASK']);
  const canDelete = hasPermission(['D_TASK']);

  return {
    title: 'Hành động',
    key: 'action',
    width: 120,
    render: (document) => {
      if (document.type === TASK_TYPES.DEAL_PROCESSING_TASK) {
        const metadata: AnyObject = document.metadata || {};
        const detailLink = `/admin/deals/loans?${DEAL_DOCUMENT_ID_NAME}=${metadata.dealId}`;
        return (
          <div className="d-f-center">
            <Link href={detailLink}>
              <EyeOutlined />
            </Link>
          </div>
        );
      }
      const isCloseTask = document?.status === TASK_STATUSES.DONE;

      return (
        <div className="d-f-center">
          {isCloseTask && (
            <ReopenTaskCounsellingAction documentSelected={document} />
          )}

          {document?.status === TASK_STATUSES.CONSULTED && (
            <ClickableOpacity
              onClick={() => {
                window.open(
                  `${window.location.origin}/thu-chao-tin-dung?taskId=${document.id}`,
                  '_blank',
                );
              }}
              className="p-r-10"
              tooltip={'Xem thư chào tín dụng'}
            >
              <FileTextSvg />
            </ClickableOpacity>
          )}

          {canEdit && <div>{editControl(document)}</div>}

          {canDelete && (
            <div className="p-l-10" color="danger">
              {deleteDocumentControl(document)}
            </div>
          )}
        </div>
      );
    },
  };
};

export const TasksTableSchema = (props: {
  setIsVisibleUserUpdate?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUserUpdate?: React.Dispatch<React.SetStateAction<AnyObject>>;
}) => {
  const { t } = useHTranslation('admin-common');
  const setIsVisibleUserUpdate = props?.setIsVisibleUserUpdate;
  const setSelectedUserUpdate = props?.setSelectedUserUpdate;

  return [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      key: 'code',
      width: 100,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Customer'),
      dataIndex: 'user',
      key: 'user',
      responsive: ['md'],
      width: 150,
      render: (user, record) => {
        return (
          <>
            <ViewCustomer
              onClick={() => {
                setIsVisibleUserUpdate?.(true);
                setSelectedUserUpdate?.(user);
              }}
              user={user}
              document={record}
            />
            <CallPhoneFcssSDKConvert
              phones={user?.tels}
              userInfo={user}
              belongToId={record?.id}
            />
          </>
        );
      },
    }),
    {
      title: t('UpdatedTime', {
        vn: 'Thời gian cập nhập',
        en: 'Updated Time',
      }),
      dataIndex: 'status',
      key: 'status',
      width: 180,
      ellipsis: true,
      responsive: ['md'],
      render: (status, doc) => {
        return (
          <>
            <ViewTimeUpdate
              createdAt={doc?.createdAt}
              updatedAt={doc?.updatedAt}
              isNoPopover={true}
            />
          </>
        );
      },
    },
    TableUtils.createTableColumnConfig({
      title: t('Source'),
      dataIndex: 'source',
      key: 'source',
      responsive: ['md'],
      width: 150,
      ellipsis: true,
      render: (source, document) => {
        return (
          <>
            {/*<div>*/}
            {/*  <b>Nguồn: </b> {MAPPING_ROOT_TEXT[document?.rootTask]}*/}
            {/*</div>*/}
            <div>
              <b>Phân loại: </b>{' '}
              {PRODUCT_TYPES(t)?.find(
                (item) => item?.value === document?.productType,
              )?.label || '_'}
            </div>
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Staff'),
      dataIndex: 'assignee',
      key: 'assignee',
      width: 100,
      ellipsis: true,
      responsive: ['md'],
      render: (assignee) => {
        if (!assignee) {
          return '_';
          // return <Avatar size={40} icon={<UserOutlined />} />;
        }
        return (
          <div className="wrapper-assign">
            <UserAvatar {...{ user: assignee }} />
          </div>
        );
      },
    }),
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      width: 180,
      ellipsis: true,
      responsive: ['md'],
      render: (status, doc) => {
        return (
          <>
            <Tag color={TASK_STATUSES_COLOR_MAPPING[status]}>
              {mappingStatusOfTask({
                t,
                status,
                statusAssign: doc?.statusAssign || '',
              })}
            </Tag>
            {/* <ViewTimeUpdate createdAt={doc?.createdAt} updatedAt={doc?.updatedAt} /> */}
          </>
        );
      },
    },
    TableUtils.createTableColumnConfig({
      title: t('Note'),
      dataIndex: 'note',
      key: 'note',
      width: 200,
      render: (note) =>
        note && (
          <div className="table-note-task">
            <p>{note}</p>
            <Popover
              content={<div className="note-content">{note}</div>}
              overlayClassName="popover-custom-line popover-note"
            >
              <ExpandNoteSvg className="cursor-pointer" />
            </Popover>
          </div>
        ),
    }),
    useTaskAction(),
  ];
};

export const ShortTaskTableSchema = () => {
  const { t } = useHTranslation('common');
  const setDealInsuranceDocumentDetail = useSetDocumentDetail();
  const dealInsuranceDocument = useDocumentDetail();
  return [
    TableUtils.createTableColumnConfig({
      title: t('Task counselling', { vn: 'Yêu cầu tư vấn' }),
      render: (_, taskDocument) => {
        const { user, meta, org, product } = taskDocument || {};
        const PricePacket = meta?.amount || meta?.pricePacket || meta?.price;
        return (
          <div
            className={
              dealInsuranceDocument?.id === taskDocument?.id
                ? 'view-select'
                : ''
            }
            onClick={() => setDealInsuranceDocumentDetail(taskDocument)}
          >
            <Row className={'information-user-profile'}>
              <Col span={6}>
                <Tooltip
                  placement="topLeft"
                  title={
                    <HPreviewUser {...{ user, userTitle: t('Customer') }} />
                  }
                >
                  <UserAvatar {...{ user }} />
                </Tooltip>
              </Col>
              <Col span={18}>
                <div>
                  <h1 className="information-user-name">
                    {user ? ConverterUtils.getFullNameUser(user) : '__'}{' '}
                  </h1>
                  <div className="information-dexcription">{meta?.label} </div>
                </div>
              </Col>
            </Row>
            <Divider />
            <div className="information-deal-insurance-status">
              <a>{taskDocument.code}</a>
              <div>
                <>
                  <Tag
                    color={TASK_STATUSES_COLOR_MAPPING[taskDocument?.status]}
                  >
                    {mappingStatusOfTask({
                      t,
                      status: taskDocument?.status,
                      statusAssign: taskDocument?.statusAssign || '',
                    })}
                  </Tag>
                  <ViewTimeUpdate
                    createdAt={taskDocument?.createdAt}
                    updatedAt={taskDocument?.updatedAt}
                  />
                </>
              </div>
            </div>
            <div>
              <RenderInsuranceComponent
                {...{
                  label: t('Origin', { vn: 'Tổ chức' }),
                  value: org?.name,
                }}
              />
              <RenderInsuranceComponent
                {...{
                  label: t('Product', { vn: 'Sản phẩm' }),
                  value: product?.name,
                }}
              />
              <RenderInsuranceComponent
                {...{
                  label: t('Price packet', { vn: 'Giá bán' }),
                  value: ConverterUtils.formatNumber(PricePacket),
                }}
              />
            </div>
          </div>
        );
      },
    }),
  ];
};
