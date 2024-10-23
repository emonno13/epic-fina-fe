import { Popover } from 'antd';
import HColorPalette from '../../h-color-palette';
import { COLOR_PALETTES } from '../constants';

interface ColorPalettePopoverProps {
  value: string;
  children: any;
  onColorChange?: (color: string) => void;
  placement?: string | any;
}

const ColorPalettePopover = ({
  value,
  children,
  onColorChange,
  placement = 'left',
}: ColorPalettePopoverProps) => {
  if (!onColorChange) {
    return children;
  }
  return (
    <Popover
      overlayClassName="color-palette"
      placement={placement}
      content={
        <HColorPalette
          value={value}
          schema={COLOR_PALETTES}
          onChange={onColorChange}
        />
      }
    >
      {children}
    </Popover>
  );
};

export default ColorPalettePopover;
