import { HTextArea } from '@components/shared/common-form-elements/h-input';
import HContainer from '@components/shared/common/h-container';
import HResponsiveImage from '@components/shared/common/h-responsive-image/h-responsive-image';
import {
  InputEmailSchemaItem,
  InputFullNameSchemaItem,
  InputPhoneNumberSchemaItem,
} from '@components/shared/input-with-rule';
import { SendBtn } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { HForm } from '@schema-form/h-form';
import { createSchemaItem } from '@schema-form/h-types';
import { Form } from 'antd';
import { InvestButton } from './common/invest-btn';
import { useInvestIntroTransaction } from './hooks';

import './invest-in-fina.module.scss';

export const InvestInFina = () => {
  return (
    <div className="invest-in-fina">
      <HContainer className="wrapper">
        <div className="wrapper-img">
          <HResponsiveImage
            src={'/assets/images/invest-intro_invest_girl.png'}
            width={270.64}
            height={382.7}
            mWidth={236}
            mHeight={333.7}
            alt={'Counselling request'}
          />
        </div>
        <div className={'wrapper-content'}>
          <Header />
          <FormCounsellingRequest />
        </div>
      </HContainer>
    </div>
  );
};
const Header = () => {
  const t = useInvestIntroTransaction();

  return (
    <h2 className="h2-title">
      <p dangerouslySetInnerHTML={{ __html: t('invest-in-fina_tit') }} />
      <span>{t('invest-in-fina_subtit')}</span>
    </h2>
  );
};
const FormCounsellingRequest = () => {
  const investI18n = useInvestIntroTransaction();
  const { t } = useHTranslation('common');
  const [form] = Form.useForm();

  return (
    <div className="form-counselling-request">
      <HForm
        form={form}
        endpoint={endpoints.endpointWithApiDomain('/tasks/public')}
        method="post"
        onDataReadyToSubmit={(task) => ({
          ...task,
          page: location.href,
        })}
        schema={() => [
          InputFullNameSchemaItem({
            name: 'customerName',
            colProps: { xs: 24, md: 8 },
            rowProps: {
              gutter: [
                { xs: 16, sm: 16, md: 16 },
                { xs: 18, sm: 18, md: 18 },
              ],
            },
          }),
          InputPhoneNumberSchemaItem({
            name: 'phone',
            colProps: { xs: 24, md: 8 },
          }),
          InputEmailSchemaItem({ name: 'email', colProps: { xs: 24, md: 8 } }),
          createSchemaItem({
            Component: HTextArea,
            label: t('Content to consult', { vn: 'Nội dung cần tư vấn' }),
            name: 'note',
            rules: [
              {
                required: true,
                message: t('Please enter content to consult', {
                  vn: 'Vui lòng nhập nội dung cần tư vấn',
                }),
              },
            ],
            colProps: { span: 24 },
            componentProps: {
              placeholder: t('Enter content to consult', {
                vn: 'Nhập nội dung cần tư vấn',
              }),
              modernLabel: true,
              row: 3,
            },
          }),
        ]}
        hideControlButton={true}
        useDefaultMessage={true}
      />
      <InvestButton onClick={() => form?.submit()} type="primary">
        <SendBtn />
        {investI18n('sendRequest')}
      </InvestButton>
    </div>
  );
};
