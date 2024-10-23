import { downloadFormURI } from '@components/shared/utils/download';
import { tkManager } from '@lib/networks/http';
import { useCurrentUser } from '@lib/providers/auth';
import { useSearchForm } from '@schema-form/features/hooks';
import { Button, ButtonProps } from 'antd';
import { useCallback } from 'react';
import { USER_TYPES } from 'types/organization';

interface ExportUserButtonProps extends ButtonProps {
  userType?: string;
}

export const ExportUserButton = (props: ExportUserButtonProps) => {
  const { onClick, userType } = props;
  const currentUser = useCurrentUser();
  const searchForm = useSearchForm();
  const onButtonClick = useCallback(
    async (e) => {
      if (onClick) onClick(e);
      const searchFormValues = searchForm?.getFieldsValue() || {};
      const whereFilter: any = {
        ...searchFormValues,
        userType,
      };

      if (userType === USER_TYPES.collaborator) {
        whereFilter.or = [
          { type: userType },
          { positionCodes: 'FINA_COLLABORATOR' },
        ];
      }
      const filter = { where: whereFilter, include: ['org'] };
      const filterQueryParam = encodeURIComponent(JSON.stringify(filter));
      try {
        const token = await tkManager.getToken();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STATIC_CDN}/users/export/${currentUser?.id}?filter=${filterQueryParam}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        downloadFormURI(url, '[FINA][User] Reporting overview.xlsx');
      } catch (error) {
        console.log('download users error', error);
      }
    },
    [onClick, currentUser, userType, searchForm],
  );

  return (
    <Button
      {...{
        ...props,
        onClick: onButtonClick,
      }}
    />
  );
};
