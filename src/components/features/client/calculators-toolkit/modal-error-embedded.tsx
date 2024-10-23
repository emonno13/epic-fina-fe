import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { getFooterFinaAgentData } from 'layouts/fina-agent/constants';

import './styles.module.scss';

const ModalErrorEmbedded = () => {
  const { t } = useHTranslation('calculator-toolkit');
  const data = getFooterFinaAgentData(t);

  return (
    <HModal
      visible={true}
      width={700}
      closable={false}
      maskClosable={false}
      footer={null}
      className="modal-error-embedded"
    >
      <>
        <div className="modal-error-embedded-content">
          <img
            src="/assets/images/calculators-toolkit-introduce-bg.png"
            alt="calculators-toolkit-introduce-bg"
            className="introduce-bg"
          />
          <div className="modal-error-embedded-content-right">
            <h2 className="modal-error-embedded-title">
              Bạn vui lòng liên hệ với Fina để được cho phép hiển thị và hỗ trợ
              nhúng bộ công cụ tính
            </h2>

            {data.map(({ icon, text }, index) => (
              <div
                key={`modal-error-embedded-content-right-${index}`}
                className="modal-error-embedded-content-right-item"
              >
                <div className="modal-error-embedded-content-right-item-icon">
                  {icon}
                </div>
                <div className="modal-error-embedded-content-right-item-text">
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    </HModal>
  );
};

export default ModalErrorEmbedded;
