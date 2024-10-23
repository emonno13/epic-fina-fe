import { HFeatureItemForm } from '@schema-form/features/forms/h-item-form';
import {
  useItemDocumentForm,
  useOnCloseItem,
} from '@schema-form/features/hooks/document-detail-hooks';
import { HItemDocumentModalPanel } from '@schema-form/features/panels/item-modal';
import { createSchemaItem } from '@schema-form/h-types';
import { Button, Input } from 'antd';
import moment from 'moment';
const CreateOrUpdateAnswer = ({ answer, onSubmit, isEdit }) => {
  if (!isEdit) {
    return null;
  }
  const onCloseItem = useOnCloseItem();
  const form = useItemDocumentForm();
  const onSaveClick = () => {
    const values = form?.getFieldsValue(true);
    const newAnswer = {
      id: answer.id || moment().valueOf(),
      content: values.content,
    };
    onSubmit(newAnswer);
    onCloseItem();
  };
  return (
    <HItemDocumentModalPanel
      footer={<Button onClick={onSaveClick}>Lưu</Button>}
    >
      <HFeatureItemForm
        {...{
          nodeName: 'answers',
          schema: () => [
            createSchemaItem({
              label: 'Nội dung',
              name: 'content',
              Component: Input,
            }),
          ],
        }}
      />
    </HItemDocumentModalPanel>
  );
};

export default CreateOrUpdateAnswer;
