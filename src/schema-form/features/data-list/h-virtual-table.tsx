import useMobileDetect from '@lib/hooks/use-mobile-detect';
import { memo, useEffect, useMemo } from 'react';
import { useVT } from 'virtualizedtableforantd4';
import { HTable } from '..';
import { useTableSourceData } from '../hooks';
import { EditableCell } from './editable-table/editable-cell';
import { EditableRow } from './editable-table/editable-row';
import { HTableProps } from './h-table-form';
export interface HVirtualTableProps extends HTableProps {
  scrollY: number;
  scrollToTop?: boolean;
}

export const HVirtualTable = memo(
  ({ scroll, scrollY, scrollToTop, ...props }: HVirtualTableProps) => {
    const [vt, setComponent, ref] = useVT(
      () => ({
        scroll: { y: scrollY },
      }),
      [],
    );
    const currentDevice = useMobileDetect();
    const dataSource =
      props.dataSource || useTableSourceData(props.featureId) || [];
    const vizualeProps = !currentDevice.isMobile()
      ? {
          scroll: { y: scrollY },
          components: vt,
        }
      : {};

    useEffect(() => {
      scrollToTop && ref?.current.scrollTo(0);
    }, [dataSource?.[0]]);

    useMemo(
      () => setComponent({ body: { row: EditableRow, cell: EditableCell } }),
      [setComponent],
    );

    return <HTable {...{ ...props, ...vizualeProps }} />;
  },
);
