import { MEDIA_DISPLAY_MODES, MEDIA_RATIO } from '../types';

interface SelectImageActionsSchemaProps {
  t?: Function;
  onDisplayMode: Function;
  onRatio: Function;
  onSelectionMode: Function;
}

export const SelectImageActionsSchema = ({
  t,
  onDisplayMode,
  onRatio,
  onSelectionMode,
}: SelectImageActionsSchemaProps) => {
  return [
    {
      label: 'Media display mode',
      hidden: true,
      subMenu: [
        {
          label: 'Media infront',
          action: () => onDisplayMode(MEDIA_DISPLAY_MODES.MEDIA_IN_FRONT),
        },
        {
          label: 'Media in the back',
          action: () => onDisplayMode(MEDIA_DISPLAY_MODES.MEDIA_IN_THE_BACK),
        },
        {
          label: 'Media above',
          action: () => onDisplayMode(MEDIA_DISPLAY_MODES.MEDIA_ABOVE),
        },
        {
          label: 'Media below',
          action: () => onDisplayMode(MEDIA_DISPLAY_MODES.MEDIA_BELOW),
        },
        {
          label: 'Media below text',
          action: () => onDisplayMode(MEDIA_DISPLAY_MODES.MEDIA_BELOW_TEXT),
        },
      ],
    },
    {
      label: 'Media ratio',
      hidden: true,
      subMenu: [
        {
          label: '1:1',
          action: () => onRatio(MEDIA_RATIO['1:1']),
        },
        {
          label: '4:3',
          action: () => onRatio(MEDIA_RATIO['4:3']),
        },
        {
          label: '16:9',
          action: () => onRatio(MEDIA_RATIO['16:9']),
        },
      ],
    },
    {
      label: 'Selection mode',
      hidden: true,
      subMenu: [
        {
          label: 'Single',
          action: () => onSelectionMode('single'),
        },
        {
          label: 'Multiple',
          action: () => onSelectionMode('multiple'),
        },
      ],
    },
  ];
};
