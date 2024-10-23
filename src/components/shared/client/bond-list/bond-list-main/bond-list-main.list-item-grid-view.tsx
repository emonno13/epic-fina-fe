import { useHTranslation } from '@lib/i18n';
import { useState } from 'react';
import ItemColView from '../../bond-loan-item/bond-loan-item.item-col-view';
import ClientBondListMainListItemContent from './bond-list-main.bond-item-content';
import ClientBondTransactionForm from './bond-list-main.form-transaction';

const ClientBondListMainListItemGridView = ({ bondData }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { name, info, org, slug } = bondData;
  const { t } = useHTranslation('common');
  const orgImage = org?.image?.url || '';

  const showModal = () => {
    setVisible(true);
  };

  return (
    <>
      <ItemColView
        screen={'bond'}
        showCheckBox={false}
        backgroundColor={org?.backgroundColor}
        orgImage={orgImage}
        titleHeader={org ? org.name : ''}
        slug={`/danh-sach-trai-phieu/${slug}`}
        name={name}
        content={<ClientBondListMainListItemContent bondData={bondData} />}
        uiDescription={null}
        onClick={() => {
          showModal();
        }}
        buttonText={t('Request advice on this loan package', {
          en: 'Request advice on this loan package',
          vn: 'Yêu cầu tư vấn',
        })}
      />

      <ClientBondTransactionForm
        visible={visible}
        closeModal={() => setVisible(false)}
        bondData={bondData}
      />
    </>
  );
};

export default ClientBondListMainListItemGridView;
