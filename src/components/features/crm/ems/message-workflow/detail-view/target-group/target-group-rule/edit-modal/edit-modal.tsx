import { useEffect, useState } from 'react';
import useForm from 'antd/lib/form/hooks/useForm';

import { notification } from 'antd';
import { HModal } from '../../../../../../../../shared/common/h-modal';
import { HForm } from '../../../../../../../../../schema-form/h-form';
import { createSchemaItem } from '../../../../../../../../../schema-form/h-types';
import { HSelect } from '../../../../../../../../shared/common-form-elements/select';
import { useHTranslation } from '../../../../../../../../../lib/i18n';
import {
  TARGET_GROUP,
  TARGET_GROUP_OPTIONS,
  TARGET_GROUP_RULES,
  USER_PROPERTY_RULE_OPTIONS,
} from '../../../../constant';
import { HFeature } from '../../../../../../../../../schema-form/features';

import './edit-modal.module.scss';

export interface IEditRuleModalProps {
  initialValues: any,
  initialShowModal: boolean,
  onGotRule?: (params: any) => void
}

export const EditModal = (props: IEditRuleModalProps) => {
  const { t } = useHTranslation('admin-common');
  const { initialValues, initialShowModal, onGotRule } = props;
  const [form] = useForm();
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTargetGroup, setCurrentTargetGroup] = useState(TARGET_GROUP_OPTIONS[0]);
  const [condition, setCondition] = useState(USER_PROPERTY_RULE_OPTIONS[0]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
    setCondition({ value: initialValues?.property, label: '' });
  }, [initialValues]);

  useEffect(() => {
    setShowEditModal(initialShowModal);
  }, [initialShowModal]);

  const handleSubmitRule = () => {
    setShowEditModal(false);
    const newTargetGroup = form.getFieldsValue();

    if (!newTargetGroup?.property || !newTargetGroup?.compareCondition || !newTargetGroup?.compareValue) {
      notification.error({
        message: 'Error',
        description: 'Nhập thiếu trường target group',
      });
    } else {
      onGotRule && onGotRule({ ...initialValues, ...form.getFieldsValue() });
    }
    form.resetFields();
  };

  const handleCancel = () => {
    onGotRule && onGotRule(false);
    form.resetFields();
  };

  const controls = TARGET_GROUP_RULES[currentTargetGroup.id]?.[condition?.value] || [];

  return (
    <HFeature {...{
      featureId: 'modal-edit-target-group',
      documentIdName: 'modal-edit-target-group',
    }}>
      <HModal {...{
        title: (initialValues as any)?.id ? 'Edit rule' : 'Add new rule',
        visible: showEditModal,
        centered: true,
        onOk: handleSubmitRule,
        onCancel: handleCancel,
        okText: 'Save',
        width: '90%',
      }}>
        <div className={'target-group-edit-modal'}>
          <ul className={'target-group-edit-modal__menu rule-menu'}>
            {TARGET_GROUP_OPTIONS.map((item: any, index: number) => (
              <li key={`target-group-option-${index}`} className={'rule-menu__item rule-menu__item--' + (item.id === currentTargetGroup.id ? 'active' : 'none')} onClick={() => setCurrentTargetGroup(item)}>
                {item.icon}
                <span className={'m-l-10'}>{item.name}</span>
                <span className={'active-span'} style={{ display: item.id === currentTargetGroup.id ? 'block' : 'none' }}/>
              </li>
            ))}
          </ul>

          <div className={'target-group-edit-modal__content'}>
            <HForm {...{
              hideControlButton: true,
              resetIfSuccess: true,
              form,
              schema: () => [
                createSchemaItem({
                  Component: HSelect,
                  name: 'property',
                  label: currentTargetGroup.id === TARGET_GROUP.USER_PROPERTY ? t('User') : t('Company'),
                  rowProps: { gutter: { md: 24 } },
                  colProps: { span: 8 },
                  rules: [{ required: true, message: 'Property is required' }],
                  componentProps: {
                    defaultValue: condition.value,
                    optionValues: USER_PROPERTY_RULE_OPTIONS,
                    onChangeSelected: setCondition,
                  },
                }),
                ...(Array.isArray(controls) && controls?.length > 0 ? controls.map((control: any) => createSchemaItem(control)) : []),
              ],
            }}/>
          </div>
        </div>
      </HModal>
    </HFeature>
  );
};
