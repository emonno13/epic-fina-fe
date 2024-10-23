import { useHTranslation } from '@lib/i18n';
import { useClientDocumentDetail } from '@schema-form/client-features/hooks/client-feature-hook';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, notification, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CreditOfferLetterContainer from '../credit-offer-letter-container';
import { CreditOfferLetterModal } from '../credit-offer-letter-modal';
import CreditOfferLetterPersonalInfo from '../credit-offer-letter-personal-info';

import './credit-offer-letter-footer.module.scss';

const { Title } = Typography;

const CreditOfferLetterFooter = ({ setTaskDataDetail }) => {
  const { t } = useHTranslation('common');
  const taskData = useClientDocumentDetail();
  const { push } = useRouter();
  const [isVisibleCreateDeal, setIsVisibleCreateDeal] = useState(false);

  const onClickAgree = () => {
    setIsVisibleCreateDeal(true);
  };

  const onClickReject = async () => {
    await FormUtils.submitForm(taskData, {
      showSuccessMessage: false,
      onGotSuccess: () => {
        notification.success({
          message: t(
            'You declined credit offer letter. Fina staff will contact you as soon as possible.',
            {
              vn: 'Bạn đã từ chối thư chào tín dụng. Nhân viên Fina sẽ liên lạc với bạn trong thời gian sớm nhất.',
            },
          ),
        });
      },
      method: 'post',
      nodeName: `tasks/public/update-waiting_for_staff_fina-task/${taskData?.id}`,
    });

    await FormUtils.submitForm(
      {},
      {
        nodeName: 'tasks',
        documentId: taskData?.id,
        onGotSuccess: setTaskDataDetail,
      },
    );
  };

  return (
    <CreditOfferLetterContainer>
      <div className="credit-offer-letter-footer">
        <p>
          Trong báo cáo này, tôi đã đưa ra các đề xuất của mình về phương án tài
          trợ đối với trường hợp cụ thể của bạn.
          <br />
          Tôi sẵn sàng thảo luận về bất kỳ điều gì bạn cảm thấy muốn thấy trong
          chiến dịch của mình hoặc cách chúng tôi có thể điều hành chiến dịch
          của mình theo nhu cầu của bạn.
          <br />
          Rất mong được làm việc với bạn.
        </p>
        <CreditOfferLetterPersonalInfo />
        <p className="extra">
          <span>*</span> Mọi thông tin được cung cấp trên cơ sở phục vụ cho
          chính phương án cụ thể theo bảng đề nghị này và trên cơ sở thông tin
          bạn cung cấp là chính xác, FINA không tuyên bố hoặc bảo đảm cho bất kỳ
          trường hợp nào khác hoặc sự liên quan của nó đối với việc bạn sử dụng
          thông tin cho mục đích khác. Bạn có thể xác minh thông tin độc lập để
          đảm bảo tính chính xác dành riêng cho bạn để đi đến quyết định lựa
          chọn sử dụng đề nghị tư vấn của chúng tôi.
          <br />
          Chúng tôi tư vấn và lựa chọn là ở bạn, bạn đồng ý miễn trừ bất kỳ
          trách nhiệm pháp lý hoặc khiếu nại cho chúng tôi.
        </p>
        {taskData?.statusAssign === 'waiting_for_staff_fina' ||
        taskData?.statusAssign === 'create_profile' ? (
          <Title level={3} type="danger">
            Bạn đã phản hồi thư chào tín dụng này!
          </Title>
        ) : (
          <div>
            <Button
              {...{
                type: 'primary',
                onClick: onClickReject,
                danger: true,
              }}
            >
              {t('Reject', { vn: 'Từ chối' })}
            </Button>
            <Button
              {...{
                type: 'primary',
                className: 'm-l-10',
                onClick: onClickAgree,
              }}
            >
              {t('Agree', { vn: 'Đồng ý' })}
            </Button>
            <CreditOfferLetterModal
              {...{
                isVisibleCreateDeal,
                setIsVisibleCreateDeal,
              }}
            />
          </div>
        )}
      </div>
    </CreditOfferLetterContainer>
  );
};

export default CreditOfferLetterFooter;
