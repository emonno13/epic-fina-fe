import { useRouter } from 'next/router';
import { memo } from 'react';
import { KIND_OF_PROJECTS } from '@components/features/fina/projects/utils';
import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';

import './real-estate-list-header.module.scss';

const RealEstateListHeader = (props) => {
  const { total } = props;
  const { t } = useHTranslation('admin-common');
  const { locale, push, query } = useRouter();

  return (
    <div className="real-estate-list-header">
      <div className="real-estate-list-header__left">
        <span className="real-estate-list-header__total">{`${total} `}</span>
        <span className="real-estate-list-header__title">
          dự án đang được bảo lãnh từ ngân hàng
        </span>
      </div>
      <div className="real-estate-list-header__right">
        <HSelect
          {...{
            placeholder: 'Loại dự án',
            className: 'custom-style-h-select',
            defaultValue: query?.kindOf || KIND_OF_PROJECTS.ALL,
            options: [
              { label: 'Tất cả', value: KIND_OF_PROJECTS.ALL },
              {
                label: t(KIND_OF_PROJECTS.APARTMENT),
                value: KIND_OF_PROJECTS.APARTMENT,
              },
              {
                label: t(KIND_OF_PROJECTS.ADJOINING_HOUSING),
                value: KIND_OF_PROJECTS.ADJOINING_HOUSING,
              },
            ],
            onChange: async (value) => {
              await push(
                `${locale}/danh-sach-bat-dong-san?page=1&kindOf=${value}`,
              );
            },
          }}
        />
      </div>
    </div>
  );
};

export default memo(RealEstateListHeader);
