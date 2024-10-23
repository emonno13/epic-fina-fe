import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useHTranslation } from '@lib/i18n';
import { useSubmitSearchForm } from '@schema-form/features/hooks';
import React from 'react';

export const ApplyFilterButton = ({
  onSubmit,
}: {
  onSubmit?: (e: React.FormEvent) => void;
}) => {
  const { t } = useHTranslation('admin-common');
  const advanceSearch = useSubmitSearchForm();
  const handleSubmit = (e: React.FormEvent) => {
    if (onSubmit) {
      onSubmit(e);
    } else {
      advanceSearch();
    }
  };

  return (
    <HButton type="primary" onClick={handleSubmit}>
      {t('Apply filter')}
    </HButton>
  );
};
