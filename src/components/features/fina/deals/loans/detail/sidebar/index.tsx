import { useTranslation } from 'next-i18next';
import {
  PlusOutlined, FileAddOutlined, EditOutlined,
  CheckOutlined, HistoryOutlined,
} from '@ant-design/icons';
import React, { useMemo } from 'react';
import { Button } from 'antd';
import Progress from 'antd/lib/progress/progress';
import { RootStateOrAny, useSelector } from 'react-redux';
import Tag from 'antd/lib/tag';
import { calculatePercentComplete } from '../../../deals-component-common/statistics-progress';
import { useDocumentDetail } from '../../../../../../../schema-form/features/hooks';
import { usePublicEnvironment } from '../../../../../../../system/hooks';
import { WithPermission } from '../../../../../../shared/accessibility/with-permission';
import { PERMISSION_BANK, PERMISSION_DEAL } from '../../../utils';
import { LabelItem } from '../../../../../../shared/common/h-label/h-label-title';
import { useHTranslation } from '../../../../../../../lib/i18n';
import { USER_TYPES } from '../../../../../../../types/organization';
import { useCurrentUser } from '../../../../../../../lib/providers/auth';

import './sidebar.module.scss';

export const SidebarViewer = ({ onShowPartners, activeKey }) => {
  const { t } = useTranslation('admin-common');
  const currentUser: any = useCurrentUser();
  const documentDetail = useDocumentDetail();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const maxPercent = +usePublicEnvironment('MAX_PERCENT_DOCUMENT_COMPLETE_NOT_APPROVED');
  const dataSource = useSelector((state: RootStateOrAny) => {
    return state?.featureStore[`deal-progress-${activeKey}`]?.dataSource;
  }) || [];
  const deal = useDocumentDetail();
  const dealTemplateInfo = useSelector((state: RootStateOrAny) => {
    return state?.featureStore[deal.documentTemplateId] || {};
  });

  const percentTaskComplete = calculatePercentComplete(dataSource?.[0]) || 0;

  const percentDocumentsCompleted = useMemo(() => {
    const requiredDocumentIds: string[] = [];

    dealTemplateInfo?.dataSource?.forEach((item: any) => {
      const documentIds = item.documentTemplateDetails
        .filter(item => item.isRequired)
        .map(itemDetail => itemDetail.documentId.toString());

      requiredDocumentIds.push(...documentIds);
    });

    if (requiredDocumentIds.length === 0) {
      return 0;
    }

    const uploadedDocumentIds = Object.keys(dealTemplateInfo?.uploadedDocuments || {})
      .filter(item => item !== 'unSelected' && requiredDocumentIds.includes(item.toString()));

    const percentNumber = Math.round((uploadedDocumentIds.length / requiredDocumentIds.length) * 100);

    return percentNumber === 100 && !deal.isDocumentsCompleted ? maxPercent : percentNumber;
  }, [dealTemplateInfo, deal]);

  return (
    <div className={'sidebar-viewer'}>
      <div className={'sidebar-viewer-label'}>
        <LabelItem className={'custom-label-item m-b-10'} label={t('Loans profile')} firstIcon={<FileAddOutlined/>}/>
        <WithPermission {...{
          permissions: [PERMISSION_DEAL.VIEW_ALL],
        }}>
          {isOrgStaff && <RenderDealStatus status={deal?.subStatus}/>}
        </WithPermission>
      </div>
      <div className={'sidebar-border'}></div>
      <WithPermission {...{
        permissions: [PERMISSION_BANK.CREATE],
      }}>
        <Button className={'custom-button-add-loan'}
          type="primary" icon={<PlusOutlined/>}
          size={'middle'}
          onClick={onShowPartners}
        >
          {t('Add loan packages')}
        </Button>
      </WithPermission>
      {documentDetail?.taskId && <Button {...{
        type: 'default',
        onClick: () => {
          window.open(`${window.location.origin}/admin/tasks/task?documentId=${documentDetail.taskId}`, '_blank');
        },
        className: 'w-full m-b-15 m-t-15',
      }}>Yêu cầu tư vấn</Button>}
      <LabelItem className={'custom-label-item-info'} label={t('Information')} firstIcon={<FileAddOutlined/>}/>
      <div className={'sidebar-task'}>
        <LabelItem className={'custom-label-item-task'} label={t('Task')}
          firstIcon={<span><CheckOutlined/><CheckOutlined/></span>}/>
        <Progress percent={percentTaskComplete} status="active"/>
      </div>

      <div className={'sidebar-document'}>
        <LabelItem className={'custom-label-item-document'} label={t('Documents')}
          firstIcon={<span><CheckOutlined/><CheckOutlined/></span>}/>
        <Progress percent={percentDocumentsCompleted} status="active"/>
      </div>

      <div className={'sidebar-history'}>
        <LabelItem label={t('History')} firstIcon={<HistoryOutlined/>}/>
      </div>

      <div className={'sidebar-note'}>
        <LabelItem label={t('Note')} firstIcon={<EditOutlined/>}/>
      </div>
    </div>
  );
};

export const RenderDealStatus = ({ status }) => {
  const { t } = useHTranslation('admin-common');
  if (!status) {
    return <></>;
  }
  return (
    <Tag color="magenta">{t(status)}</Tag>
  );
};
