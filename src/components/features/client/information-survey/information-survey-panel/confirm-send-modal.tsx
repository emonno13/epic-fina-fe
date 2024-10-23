import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { Button, ModalProps } from 'antd';

const ConfirmSendModal = (props: ModalProps) => {
  const { onOk, onCancel } = props;
  const { t } = useHTranslation('common');
  return (
    <HModal
      {...{
        ...props,
        footer: null,
        centered: true,
        width: 450,
      }}
    >
      <div className="confirm-send-container">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUjSURBVHgB5ZxdUttIEMf/PbKpzVO0sO94TxBygogTLHuCkBNgio/aN5a3LWALc4KFE2z2BDgngCM478A6T0lZtjrd8kdsWfhD0Yzs+FdFLCvCGv+np6enpwXBEZ+rfqVc9gJmrhjCJhP5YPjJ6wjciBgfydB9xJ3G2nnzHg4gWIKrvh+WzK4x9AYRArmTn+2D0IRBXV7/C8NO/UWt2YAFcheifeDvwHh7chjADnX5uSmdP14jR3IRQns/WjN7HFE1c8/PT0N+TvMS5LuFaB9t7MqHnDBQQTE0kIMgmYXoOb9/YG8IzAfhfdjq7Gf1IQYZ6Byt75VL3h0WRQSFsSMdc9c6Xq8iA3NbROd4/ZKZMt3MFURU884e9uf6nVkvjB1iuXTL4C0sAQS6N2F7m2rN5izXzzQ01B9EYnbLIoKibe1Im7Xts1w/1SK6lqAiFDYrfBezWsZUi+gOh+UUQelZxr/TrptoEZYd4zv57MbwCWL2pWumNjoL0xzos0LoFMmgGiwRofM6uaAKD38JiPgWloiI99fOnlK/U+rQUAcjvfUnLELsLBQfYJhOnnOeqULEEaPlNQMZz7kQgt+LhscYE0LXDnAQMUbtlFwEcQX2CdrHGzvJk2NC6AIKPzqMSw0Lhk+NCKHW4GyqNDxmERGzq+FSaZfMyGw4IoRLa5B7+bOcs3Z/or3h9wMhnFrDYuCHh37QfzNsEW/hEE3gJs+57ggibzACYiF6c2uA1SPoO81YCE2zYwEwRC/hGM20x/fuvf8NjpHItZJy2nmQJU4z0NeuEMwBVhSZqd7oq2lV/S3orpPrBtC4YyR3ccQwPh/4m8Z4XgWLgqEihEDI3rYsyBYn/cZRIRYhC0DZjy0qiEq9LxVjERrTyB4tbWLFiUA/Z9rgyQt1UoPjxGrQJZIkelmoEMN8+QmFCaEsjBDelxUWok34tX9MpVLhQsy0JfajYyQr9AkFwdG3YK6gqLJ7b+KGTKFxoUXxmOJ8hBavSRgxutu0imgFnwm9Th0FoaFt/1jLDlEQWsZoXvzVbEgrVtlhNnXrsRQfEtXl3x04Roblq96GkvIKBSBrng/6GgshM8cHcRbOhUBX/CLuO0Ami/f62s1ZtqNrrCh9HxkL0asmqWPVYNRjH4mhEFuSqadYNQg33w6HaB+u/19UcsQ5Ek2Wzp4Ga52RRRfDXMEh0gvXkhX5XaxxW6K7G7gkMQJGLKJXXH73zJ5DrkRM+2sXDyNlPK3D9arMXpewTcIalNHdcHGaTnyFNCQpgrJ28VRzEtylfMexfESvyr0Om0QT1jdE97CJzBRplfypiRmZW99Z7RnC1vP/ZTOrzs2wJN8thVQhdG6NAJtDxE+rou+WNNoTImJz2o8bkkwsOA0PNmpksAdL6KwhK7+buMKO443oXVhCBL4qnz9WJ7RlMtJLdwxammL0NAh8750/vZ50zdTkrQmjbU1lYVnRNJx8h2mXTRVCp9SWWVIxpM2htn2GZzbmfHDF3C7LMNHhEFvzjA+uzP0ok20HmgfTHGMac2/wlP9+rEoiZ38x03vc1NB9XhGU7I87/uFXyp0FetxRIkYNlp6LE6aRWYg+8QOwxCcuFmqpqBOXtUNhD8AmcS8IywLRXJXa7dqsDnESuQnRJ85KM97KJwewgQwBmblOyxcPdeRI7kL06fmQAHENp5YvZs18qVOmumbaNcmcR++nYU2IJK0jf8vIpq8WrxmO/5BGBeOtaVIknp/wUbcibf69iCRfARtqBPqd/NRxAAAAAElFTkSuQmCC" />
        <h3 className="confirm-send-container__title">
          {t('You have not left your referrer information', {
            vn: 'Bạn chưa để lại thông tin người giới thiệu',
          })}
        </h3>
        <p className="confirm-send-container__description">
          {t(
            'When you are not a member of FINA, we cannot contact you to advise and inform you about attractive commission policy from FINA.',
            {
              vn: 'Khi bạn chưa là thành viên của FINA, chúng tôi không thể liên hệ để tư vấn và thông báo đến bạn chính sách hoa hồng hấp dẫn từ FINA',
            },
          )}
        </p>
        <Button
          {...{
            type: 'primary',
            onClick: onCancel,
            className: 'close-modal-btn',
          }}
        >
          {t('Come back to replenish', { vn: 'Quay trở lại để bổ sung' })}
        </Button>
        <Button
          {...{
            className: 'continue-sending-btn',
            onClick: onOk,
          }}
        >
          {t('Ignore, continue sending information', {
            vn: 'Bỏ qua, tiếp tục gửi thông tin',
          })}
        </Button>
      </div>
    </HModal>
  );
};

export default ConfirmSendModal;
