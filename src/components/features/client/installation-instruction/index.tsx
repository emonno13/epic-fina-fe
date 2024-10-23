import { useHTranslation } from '@lib/i18n';
import { Col, Row } from 'antd';

import './installation-instruction.module.scss';

const InstallationInstructionStep = ({ step, image, label }) => {
  const { t } = useHTranslation('common');
  return (
    <div className="installation-instruction-content-step">
      <div className="installation-instruction-content-step__label">
        <span>
          {t('Step', { vn: 'Cách' })} {step}:
        </span>{' '}
        {label}
      </div>
      <div className="installation-instruction-content-step__image">
        <img src={image} />
      </div>
    </div>
  );
};

const InstallationInstruction = () => {
  const { t } = useHTranslation('common');
  return (
    <div className="installation-instruction">
      <div className="max-w-1100 m-auto">
        <Row gutter={[24, 24]}>
          <Col {...{ xs: 24, sm: 24, md: 16 }}>
            <div className="installation-instruction-content">
              <h2 className="installation-instruction-content-title">
                {t('Installation Instructions', { vn: 'Hướng dẫn cài đặt' })}
              </h2>
              <InstallationInstructionStep
                {...{
                  step: 1,
                  image:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAIAAABsNpe/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABmklEQVRoge2ZwQ4DIQhEa9P//+XtwQub6dBBTWqRd2p2Xa2MikC7ruvx/zx//QfWUNPYiZrGTtQ0duLFXrTWxC665+ntrRfCHvCt/VYfC8muRsf38daKaFddmehYyBlqdBRb2ue2PbMi7qXoWJaT1Igys8rHKDU+gd7A/h7zFQonqaFHiEyHaA9RzlBDX8GK1f02M7sliRptVWaEnULsXFqbkUmihhRv+Dbuv31v4L+d31fZ1bD4OiB+pIE9K37d1yqJGvSkUmzj36D8lgosdkeSqCHF4izroVhaVwm/0nXLroZ/Mox5CUVPNnplRjgssrP4FmW29/chI4kagRtu9Mxh+kTvwtgDkkSNQPTnr2YGy9XqeRNFpSRqfNkbSoZcP1Wi91k2CpJEjcH6BvMJUe8e9daM7GpEowI9A8JqIH79qeKN0UpFtOI6Xw85Q41O9Paq3K/851FOUmMG5bSJ1kCQUuMO2wl6VgW/1TlJDWXVKp4Yn/i35spT3Rlbqcq9FW2v5EcYSdRYVvv7LUnUqGnsRE1jJ2oaO/EGTviAow3YIxoAAAAASUVORK5CYII=',
                  label: t(
                    'Use a mobile device with an internet connection and scan and read the QRCode below for quick installation:',
                    {
                      vn: 'Dùng thiết bị di động có kết nối mạng và scan đọc QRCode bên dưới để cài đặt nhanh:',
                    },
                  ),
                }}
              />
              <InstallationInstructionStep
                {...{
                  step: 2,
                  label: t(
                    "Go to the app store on your mobile device (CH Play if it's Android and the App Store if it's iOS) and search with the keyword [Fina] then install the app with the icon as shown below.",
                    {
                      vn: 'Vào cửa hàng ứng dụng trên thiết bị di động của bạn (CH Play nếu là Android và App Store nếu là iOS) và tìm kiếm với từ khóa [Fina] rồi cài đặt ứng dụng có biểu tượng như bên dưới.',
                    },
                  ),
                  image: '/assets/images/app_icon.png',
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default InstallationInstruction;
