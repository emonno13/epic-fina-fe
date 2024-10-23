import { useHTranslation } from '@lib/i18n';
import { HVirtualTable } from '@schema-form/features/data-list/h-virtual-table';
import { memo, ReactNode } from 'react';

import './table-with-grid-mode.module.scss';

interface TableWithGridModeProps {
  tableSchemaDetail: (props: any) => any[] | any[];
  children: ReactNode;
  scrollY?: number;
}

const TableWithGridMode = memo((props: TableWithGridModeProps) => {
  const { tableSchemaDetail, children, scrollY = 600 } = props;
  const { t } = useHTranslation('admin-common');

  return (
    <div className="deal-loan-management-wrapper">
      <div className="deal-loan-management-wrapper__left">
        <HVirtualTable
          scrollY={scrollY}
          scrollToTop={true}
          bordered={true}
          className="deal-loan-management-wrapper__left--table"
          schema={tableSchemaDetail}
        />
      </div>

      <div className="deal-loan-management-wrapper__right">
        <div className="deal-loan-management-wrapper__right--header">
          <p>{t('Detail information', { vn: 'Thông tin chi tiết' })}</p>
        </div>

        <div className="deal-loan-management-wrapper__right--content">
          {children}
        </div>
      </div>
    </div>
  );
});

export default TableWithGridMode;
