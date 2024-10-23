import { useIsMobile } from '@lib/hooks/use-media';
import { useCurrentUser } from '@lib/providers/auth';
import { HFeature, HTable } from '@schema-form/features';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import moment from 'moment';
import { useState } from 'react';
// import { CommissionAdvanceFormSchema } from '@components/features/fina/commission/management/commission-advance-form-schema';
import { FormatterUtils } from '@lib/formatter';
import { FormUtils } from '@schema-form/utils/form-utils';
import { relations, SREENS } from '.';
import { IconBack } from '../affiliate/components/icons/icon-back';
import { MyCommissionSearchResultTableSchema } from './my-commission-search-result-table-schema';

const ProfileEarningsCommissionsAll = (props) => {
  const { setScreen } = props;
  const isMobile = useIsMobile();
  const currentUser = useCurrentUser();
  const [totalNotForControl, setTotalNotForControl] = useState(0);

  const handleDataReadyToSubmit = (data) => {
    if (data?.from) {
      data.createdAt = FormUtils.getQueryBetweenDays(
        data?.from,
        data?.to || moment().add(1, 'days').format('YYYY/MM/DD'),
      );
      delete data.from;
      delete data.to;
    }
  };

  const onGotSearchResult = (searchResult) => {
    const { metadata } = searchResult;
    setTotalNotForControl(metadata?.totalNotForControl?.toFixed(0) || 0);
  };

  return (
    <div className="profile-earnings-commissions-all">
      <div className="profile-el-wrapper">
        <div
          className="profile-information-title"
          style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
        >
          <div className="profile-information-title-back">
            <span
              onClick={() => {
                setScreen(SREENS.home);
              }}
            >
              <IconBack />
            </span>
            <div>Thu nhập - Hoa hồng</div>
          </div>
          <div>
            <span style={{ color: '#064DD6' }}>
              {FormatterUtils.formatAmount(totalNotForControl || 0, '')}
              <sup>đ</sup>
            </span>
          </div>
        </div>

        <HFeature
          {...{
            featureId: 'commissionsAll',
            documentIdName: 'commissionsAll',
            nodeName: 'commissions',
            documentRelations: relations,
          }}
        >
          <HSearchFormHiddenAble
            {...{
              withRelations: relations,
              hiddenFields: {
                type: 'spend',
                userId: currentUser.id,
              },
              hiddenCreateButton: true,
              // advancedSchema: () => CommissionAdvanceFormSchema({ type: '', applyFor: 'spend' }),
              onDataReadyToSubmit: handleDataReadyToSubmit,
              onGotSuccess: onGotSearchResult,
              resetIfSuccess: false,
              className: 'h-search-portal-custom',
              classNameAdvancedTabSchema:
                'profile-earnings-commissions-advanced-search',
            }}
          />

          <HTable
            schema={MyCommissionSearchResultTableSchema}
            scroll={isMobile ? { x: 'max-content' } : {}}
          />
        </HFeature>
      </div>
    </div>
  );
};

export default ProfileEarningsCommissionsAll;
