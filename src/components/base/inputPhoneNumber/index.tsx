import { PhoneInputProps } from 'react-international-phone';
import * as S from './InputPhoneNumber.styles';

export interface BasePhoneInputProps extends PhoneInputProps {
  error?: boolean;
}

export const InputPhoneNumber: React.FC<BasePhoneInputProps> = ({
  error,
  ...props
}) => {
  return (
    <S.StyledPhoneInput
      {...props}
      $isError={error}
      defaultCountry="vn"
      dialCodePreviewStyleProps={{ className: 'code-preview-selector' }}
      countrySelectorStyleProps={{ className: 'country-selector' }}
      disableDialCodeAndPrefix
      showDisabledDialCodeAndPrefix
    />
  );
};
