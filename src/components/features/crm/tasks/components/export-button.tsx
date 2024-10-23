import { DownloadOutlined } from '@ant-design/icons';
import {
  HButton,
  HButtonProps,
} from '@components/shared/common-form-elements/h-confirmation-button';
import { downloadFormURI } from '@components/shared/utils/download';
import { tkManager } from '@lib/networks/http';
import { useCurrentUser } from '@lib/providers/auth';
import { FormUtils } from '@schema-form/utils/form-utils';
import { FormInstance } from 'antd';
import moment from 'moment';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface ExportTasksButton extends HButtonProps {
  searchForm?: FormInstance;
  status?: string;
  statusAssign?: string;
}

export const ExportTaskButton = memo((props: ExportTasksButton) => {
  const { searchForm, status, statusAssign, ...hButtonProps } = props;
  const { t } = useTranslation('common');
  const currentUser = useCurrentUser();
  const handleExportTask = async () => {
    const searchFormValues = searchForm?.getFieldsValue() || {};
    const { createdAt, updatedAt } = searchFormValues;

    if (createdAt)
      searchFormValues.createdAt = FormUtils.getQueryBetweenDays(
        createdAt?.[0],
        createdAt?.[1],
      );

    if (updatedAt)
      searchFormValues.updatedAt = FormUtils.getQueryBetweenDays(
        updatedAt?.[0],
        updatedAt?.[1],
      );

    const filter = {
      where: { ...searchFormValues, status, statusAssign },
    };
    const filterQueryParam = encodeURIComponent(JSON.stringify(filter));

    try {
      const token = await tkManager.getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STATIC_CDN}/tasks/export/${currentUser.id}?filter=${filterQueryParam}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      downloadFormURI(
        url,
        `[FINA][Tasks] Dữ liệu YCTV ngày ${moment().format('DD MM YYYY')}.xlsx`,
      );
    } catch (err: any) {
      console.log('download users error', err.message);
    }
  };

  return (
    <HButton
      {...{
        ...hButtonProps,
        size: 'large',
        shape: 'round',
        className: 'control-btn m-l-10',
        onClick: handleExportTask,
        icon: <DownloadOutlined />,
      }}
    >
      {t('Export')}
    </HButton>
  );
});
