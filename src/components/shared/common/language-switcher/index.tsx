import { Col, Dropdown, Menu, Row } from 'antd';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { useRouter } from 'next/router';
import { LanguageUtils } from '../../../../lib/language-utils';

import './language-switcher.scss';

const SUPPORTED_LANGUAGES = {
  en: {
    flagCode: 'US',
    languageName: 'English',
  },
  vn: {
    flagCode: 'vn',
    languageName: 'Việt Nam',
  },
};

const LanguageItem = ({ flag, languageName, className = '' }) => {
  return (
    <span className={`fn-language-switcher ${className}`}>
      <span className={'d-inline-flex cursor-pointer'}>
        <span className="m-r-5 p-t-2 ">{flag}</span>
        <span className={'fn-language-switcher__name'}>{languageName}</span>
      </span>
    </span>
  );
};

const LanguageMenu = () => {
  const {
    locales = [],
    push,
    basePath = '',
    asPath = '',
    pathname,
  } = useRouter();
  const routeRegex = new RegExp(`[\\/]?(${locales.join('|')})?(.*)`);
  const paths: string[] = asPath.match(routeRegex) as string[];
  let currentPath = new RegExp('^/').test('/') ? paths[2] : `/${paths[2]}`;
  currentPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;

  const handleChangeLanguage = locale => {
    push(currentPath, currentPath, { locale });
  };
  return (
    <Menu>
      <Menu.Item onClick={() => handleChangeLanguage('vn')}>
        <LanguageItem
          {...{
            flag: getUnicodeFlagIcon('vn'),
            languageName: 'Vietnam',
            className: 'fn-language-switcher--dropdown',
          }}
        />
      </Menu.Item>
      <Menu.Item onClick={() => handleChangeLanguage('en')}>
        <LanguageItem
          {...{
            flag: getUnicodeFlagIcon('US'),
            languageName: 'English',
            className: 'fn-language-switcher--dropdown',
          }}
        />
      </Menu.Item>
    </Menu>
  );
};

export const LanguageSwitcher = ({ className = '' }) => {
  const languageConfig = SUPPORTED_LANGUAGES[LanguageUtils.getCurrentCountry()];
  return (
    <Dropdown overlay={<LanguageMenu />} placement="bottomRight" arrow>
      <Row justify="space-around" align="middle" className={className}>
        <Col>
          {!!languageConfig && (
            <LanguageItem
              {...{
                flag: getUnicodeFlagIcon(languageConfig.flagCode),
                languageName: languageConfig.languageName,
              }}
            />
          )}
        </Col>
      </Row>
    </Dropdown>
  );
};
