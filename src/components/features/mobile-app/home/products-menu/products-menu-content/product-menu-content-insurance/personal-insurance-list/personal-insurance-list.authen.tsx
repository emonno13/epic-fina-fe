import { PRODUCT_TYPE } from '@components/features/fina/products/utils';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { MobileUtils } from '@lib/utils/mobile';
import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import LinkItemPersonalProduct from '../product-menu-content-insurance-link-item/product-menu-content-insurance.link-item.personal-insurance';
import PersonalInsuranceListEmpty from './personal-insurance-list.empty';

const ListComponent = () => {
  const { t } = useHTranslation('mobile-home');
  const personalInsuranceTransactions = useTableSourceData();
  const checkShouldDisplayData = MobileUtils.checkDisplayInsurances();
  if (
    !checkShouldDisplayData ||
    !(
      Array.isArray(personalInsuranceTransactions) &&
      personalInsuranceTransactions.length > 0
    )
  ) {
    return <PersonalInsuranceListEmpty />;
  }
  return (
    <>
      {personalInsuranceTransactions.map((transactionData, index) => (
        <LinkItemPersonalProduct
          key={`home-mobile-insurance-item-${transactionData.id}-${index}`}
          data={{
            ...transactionData?.product,
            metaData: transactionData?.metaData,
          }}
        />
      ))}
    </>
  );
};

const PersonalInsuranceListAuthen = () => {
  const currentUser = useCurrentUser();
  return (
    <HFeature
      {...{
        featureId: 'personalInsuranceTransaction',
        nodeName: 'transactions',
      }}
    >
      <HSearchFormHiddenAble
        {...{
          hiddenFields: {
            type: PRODUCT_TYPE.INSURANCE,
            customerId: currentUser.id,
          },
          withRelations: ['product'],
        }}
      />
      <ListComponent />
    </HFeature>
  );
};

export default PersonalInsuranceListAuthen;
