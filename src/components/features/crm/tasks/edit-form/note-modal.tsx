import React, { useState } from 'react';
import { Typography } from 'antd';
import { HModal } from '../../../../shared/common/h-modal';
import { HTextArea } from '../../../../shared/common-form-elements/h-input';
const { Paragraph } = Typography;

const NoteModal = ({ setVisible, visible, setNote }) => {
  const [value, setValue] = useState<string>();
  const handleCancelModal = () => {
    setVisible(false);
  };
	
  return (
    <HModal
      {...{
        visible,
        width: 1100,
        title: 'Ghi chú',
        destroyOnClose: false,
        onCancel:() =>  handleCancelModal(),
        onOk: () => {
          setNote(value);
          if (value) {
            setVisible(false);
          }
        },
      }}>
      <Paragraph type="danger">
				YCTV chưa được đối tác phải hồi. Cần thêm ghi chú để tạo hồ sơ vay
      </Paragraph>
      <HTextArea
        onChange={e => setValue(e.target.value)}
        autoSize={{ minRows: 6, maxRows: 7 }}
      />
    </HModal>
  );
};

export default NoteModal;
