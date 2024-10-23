import { HSchemaActions } from '@components/shared/common/h-item-actions';
import { SelectImageActionsSchema } from './select-image-actions-schema';

interface SelectImageActionsProps {
  onDisplayMode: Function;
  onRatio: Function;
  onSelectionMode: Function;
}

const SelectImageActions = ({
  onDisplayMode,
  onRatio,
  onSelectionMode,
}: SelectImageActionsProps) => {
  return (
    <HSchemaActions
      schema={SelectImageActionsSchema({
        onDisplayMode,
        onRatio,
        onSelectionMode,
      })}
    />
  );
};

export default SelectImageActions;
