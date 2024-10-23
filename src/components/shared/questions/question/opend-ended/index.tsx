import { useHTranslation } from '@lib/i18n';
import { Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const OpenEnded = ({ value, onChange }) => {
  const { t } = useHTranslation('admin-common');
  const onSuffixChange = (e) => {
    onChange({ suffix: e.target.value });
  };
  return (
    <FormItem label={t('Suffix', { en: 'Suffix', vn: 'Hậu tố' })}>
      <Input value={value.suffix} onChange={onSuffixChange} />
    </FormItem>
  );
};

export default OpenEnded;
