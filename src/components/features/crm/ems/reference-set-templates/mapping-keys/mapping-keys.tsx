import { Table } from 'antd';

import { useHTranslation } from '../../../../../../lib/i18n';
import { HButton } from '../../../../../shared/common-form-elements/h-confirmation-button';

export const ReferenceSetTemplateMappingKeys = (props) => {
  const { t } = useHTranslation('admin-common');
  const { setVisibleModal, dataMapping } = props?.transport;

  const columns = [
    {
      title: 'Reference',
      dataIndex: 'key',
    },
    {
      title: 'Mapping',
      dataIndex: 'value',
    },
    {
      title: 'Result',
      dataIndex: 'result',
    },
  ];

  const handleButtonClick = () => {
    setVisibleModal(true);
  };

  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <HButton onClick={handleButtonClick} type="primary">
          {t('Test mapping')}
        </HButton>
      </div>

      <Table
        columns={columns}
        dataSource={dataMapping}
        pagination={false}
        bordered/>
    </div>
  );
};
