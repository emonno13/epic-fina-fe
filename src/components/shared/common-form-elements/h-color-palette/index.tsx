import { CheckCircleFilled } from '@ant-design/icons';

import './h-color-palette.module.scss';

type ColorSchemaData = {
  color: string;
  value: string;
};

interface HColorPaletteProps {
  value: string;
  schema: ColorSchemaData[];
  onChange: (color: string) => void;
  type?: 'horizontal' | 'vertical';
  wrapperProps?: any;
}

const HColorPalette = ({
  schema,
  onChange,
  type = 'vertical',
  wrapperProps = {},
  value,
}: HColorPaletteProps) => {
  if (!(schema.length > 0)) {
    return null;
  }
  return (
    <div {...wrapperProps} className={`h-color-palette h-color-palette__${type}`}>
      {schema.map(({ color, value: colorValue }, index) => (
        <div
          key={`color-palette-item-${colorValue}-${index}`}
          {...{
            className: `color-palette-item color-palette-item__${type} `,
            style: { background: color },
            onClick: (e) => {
              e.stopPropagation();
              onChange(colorValue);
            },
          }}
        >
          {value === colorValue && (
            <CheckCircleFilled
              style={{
                color: color === '#ffffff' ? 'var(--primary-color)' : '#fff',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default HColorPalette;
