import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { ClickableOpacity } from '@components/shared/utils/clickable-opacity';
import { useHasPermissions } from '@lib/providers/auth';
import { AnyObject } from '@components/shared/atom/type';

export const ConverterUtils = {
  dateConverter: (dateString: string) => {
    const dateWithMoment = moment(dateString);
    if (!dateString) return null;
    return (
      <Tooltip
        placement="topLeft"
        title={dateWithMoment.format('MMMM Do YYYY, HH:mm:ss')}
      >
        {dateWithMoment.format('DD/MM/YYYY')}
      </Tooltip>
    );
  },
  dateConverterToString: (
    dateString: string | Date,
    formatString = 'DD/MM/YYYY',
  ) => {
    if (!dateString) return '';
    const dateWithMoment = moment(dateString);
    return dateWithMoment.format(formatString);
  },
  fullDatetimeConverter: (dateString: string) => {
    if (!dateString) return undefined;
    const dateWithMoment = moment(dateString);
    return dateWithMoment.format('DD/MM/YYYY, HH:mm:ss');
  },
  dateConverterRelativeTime: (dateString: string | any) => {
    if (!dateString) return;
    const dateWithMoment = moment(dateString);
    return (
      <Tooltip
        placement="topLeft"
        title={dateWithMoment.format('MMMM Do YYYY, HH:mm:ss')}
      >
        {dateWithMoment.startOf('minutes').fromNow()}
      </Tooltip>
    );
  },
  dateFormatter: (date: string, format: string) => {
    return moment(date).format(format);
  },
  showUserConverter: (user) => {
    const title = `${ConverterUtils.showUserEmail(user?.emails || [])} ${ConverterUtils.showOrgPhone(user?.tels)}`;
    return (
      <Tooltip placement="topLeft" title={title}>
        {ConverterUtils.getFullNameUser(user)}
      </Tooltip>
    );
  },
  showOrgConverter: (org) => {
    if (!org) {
      return 'unknow';
    }
    if (!org?.email) return `${org?.code || ''} ${org?.name || ''}`;
    return (
      <Tooltip
        placement="topLeft"
        title={`#${org?.code || ''} ${org?.email || ''}`}
      >
        {org?.name || '-'}
      </Tooltip>
    );
  },
  columnWithTooltip: (value, tooltip) => {
    if (!tooltip) return value;
    return (
      <Tooltip placement="topLeft" title={tooltip}>
        {value}
      </Tooltip>
    );
  },
  showOrgEmail: (contacts: any[] = []) => {
    if (!contacts?.length) {
      return '';
    }
    const email: string =
      contacts.find((item) => item?.main === true)?.email || contacts[0]?.email;
    return `(${email})`;
  },
  showUserEmail: (contacts: any[] = []) => {
    if (!contacts?.length) {
      return '';
    }
    const email: string =
      contacts.find((item) => item?.main === true)?.email || contacts[0]?.email;
    return email;
  },
  showOrgPhone: (contacts: any[] = []) => {
    if (!contacts?.length) {
      return '';
    }
    const phone: string =
      contacts.find((items) => items?.main === true)?.tel || contacts[0]?.tel;
    return phone;
  },
  showOrgAddress: (addresses: any[] = []) => {
    if (!addresses?.length) {
      return '';
    }
    const address: string =
      addresses.find((items) => items?.main === true)?.address ||
      addresses[0]?.address;
    return address;
  },
  // key: lấy key nào trong contact email || tel
  // typeGet: all lấy tất cả contact, main lấy tất cả contact có field main = true, only lấy contact mà field main = true đầu tiên và nếu ko có main = true thì lấy contact đầu tiên
  getOrgItemContactList: (
    contacts: any[] = [],
    key: 'tel' | 'email',
    typeGet: 'all' | 'main' | 'only' = 'only',
  ): string[] => {
    if ((key !== 'tel' && key !== 'email') || !contacts?.length) {
      return [];
    }
    if (typeGet === 'all') {
      return contacts?.map((item) => item[key]) || [];
    }
    if (typeGet === 'main') {
      return (
        contacts
          ?.filter((item) => item?.main === true)
          .map((item) => item[key]) || []
      );
    }
    if (typeGet === 'only') {
      const contact =
        contacts.find((item) => item?.main === true) || contacts[0];
      return [contact[key] || ''];
    }
    return [];
  },
  getOrgItemContactOption: (
    contacts: any[] = [],
    key: 'tel' | 'email',
    labeConvert?: any,
  ): any[] => {
    if ((key !== 'tel' && key !== 'email') || !contacts?.length) {
      return [];
    }

    const list: any[] = contacts.map((item) => {
      const department = item?.department;
      const valueOfKey = item[key];
      const name = item?.name;

      return {
        value: valueOfKey,
        label: labeConvert
          ? labeConvert(item)
          : `${department} / ${name} : ${valueOfKey}`,
      };
    });
    return list;
  },
  getOrgItemContactOptionPromise: async (
    contacts: any[] = [],
    key: 'tel' | 'email',
    labeConvert?: (f: any) => Promise<any>,
  ) => {
    if ((key !== 'tel' && key !== 'email') || !contacts?.length) {
      return [];
    }

    const list: any[] =
      (await Promise.all(
        contacts?.map(async (item) => {
          const valueOfKey = item[key];
          const name = item?.name;
          let label = `${name} : ${valueOfKey}`;
          if (labeConvert) {
            label = await labeConvert(item);
          }
          return {
            value: valueOfKey,
            label,
          };
        }),
      )) || [];
    return list;
  },
  showCategoryConverter: (category) => {
    if (!category) {
      return 'unknow';
    }
    return (
      <Tooltip placement="topLeft" title={`#${category?.code || ''}`}>
        {category?.name || '-'}
      </Tooltip>
    );
  },
  validURL: (url: string) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(url);
  },
  getFullNameUser: (user: any, defaultName = ''): string => {
    if (user?.fullName) {
      return user?.fullName;
    }
    if (user?.firstName || user?.lastName) {
      return `${user?.firstName || ''} ${user?.lastName || ''}`;
    }
    return defaultName;
  },
  formatNumber: (num) => {
    if (
      (typeof num === 'string' && !num.length) ||
      num === null ||
      num === undefined
    ) {
      return null;
    }

    if (!num) return 0;

    const parts = num.toString().split('.');

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  },
  formatIntNumber: (num: number | string) => {
    if (
      (typeof num === 'string' && !num.length) ||
      num === null ||
      num === undefined
    ) {
      return null;
    }

    if (!num) return 0;

    const parts = num.toString().split('.');

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts[0];
  },
  convertQueryParamToNumber(value: string | string[] | undefined) {
    if (Array.isArray(value) || undefined) {
      return undefined;
    }
    return Number(value || 0);
  },
  getMoneyLabel: (money, t) => {
    const oneMilion = 1000 * 1000;
    const oneBillion = 1000 * 1000 * 1000;
    const numberLength = money.toString().length;
    const billionText = t('billion', { vn: 'tỷ' });
    const millionText = t('million', { vn: 'triệu' });
    if (numberLength >= 10) {
      return `${ConverterUtils.formatNumber(money / oneBillion)} ${billionText}`;
    }
    if (numberLength < 10 && numberLength >= 7) {
      return `${ConverterUtils.formatNumber(money / oneMilion)} ${millionText}`;
    }
    return '';
  },
  getAddress: ({
    address = '',
    subDistrictName = '',
    districtName = '',
    stateName = '',
    country = '',
  }) => {
    const fullAddress: string[] = [];

    if (address) fullAddress.push(address);
    if (subDistrictName) fullAddress.push(subDistrictName);
    if (districtName) fullAddress.push(districtName);
    if (stateName) fullAddress.push(stateName);
    if (country) fullAddress.push(country);

    return fullAddress.length ? fullAddress.join(', ') : '__';
  },
  showUserPhone: (user: any = {}) => {
    const { tels = [] } = user;
    let phones = '';

    tels?.forEach((item) => item?.tel && (phones += `${item.tel}\n`));

    return phones;
  },
  showUserAddress: (document) => {
    const fullAddress: string[] = [];
    const { state, district, subDistrict, address } = document;

    if (address) fullAddress.push(address);
    if (subDistrict) fullAddress.push(subDistrict.description);
    if (district) fullAddress.push(district.description);
    if (state) fullAddress.push(state.description);

    return fullAddress.length ? fullAddress.join(', ') : '';
  },
  renderGender: (value) => {
    return value === 'male' ? 'Nam' : value === 'female' ? 'Nữ' : 'Khác';
  },
  toBase64: (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }),
};

export const DateTimeHelper = {
  getDateTimeBySeconds: (secondTime: number) => {
    const t = new Date();
    t.setSeconds(t.getSeconds() + secondTime);
    return t.getTime();
  },
};

export const useGenerateConcealContent = (
  defaultValue = '',
  defaultPrefixString = '****',
  defaultPrefixStringLength = 4,
  defaultIsShowFullViewAction = true,
) => {
  const hasPermission = useHasPermissions();
  const showFullPhoneAndEmailPermission = hasPermission([
    'SHOW_FULL_PHONE_NUMBER_AND_EMAIL',
  ]);
  const [showFullList, setShowFullList] = useState<AnyObject>({});

  return (
    value = defaultValue,
    prefixString = defaultPrefixString,
    prefixStringLength = defaultPrefixStringLength,
    isShowFullViewAction = defaultIsShowFullViewAction,
  ) => {
    if (!value) return value;

    const hiddenTel = ` ${prefixString}${`${value}`.substr(`${value}`.length - (prefixStringLength || prefixString.length))}`;
    if (!showFullPhoneAndEmailPermission) return hiddenTel;

    return (
      <span>
        {showFullList?.[value] ? value : hiddenTel}
        {isShowFullViewAction && (
          <ClickableOpacity
            className="m-l-5"
            onClick={() =>
              setShowFullList((prevState) => {
                const state = { ...prevState };
                state[value] = !prevState?.[value];
                return state;
              })
            }
          >
            {showFullList?.[value] ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </ClickableOpacity>
        )}
      </span>
    );
  };
};
