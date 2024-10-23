import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import ClientToppedHeader from 'layouts/admin/lightly/client/topped-header';

const Error = (props: any) => {
  const { t } = useTranslation('common');
  return (
    <div>
      <ClientToppedHeader />
      <div
        style={{ height: '60vh', maxHeight: '600px', minHeight: '300px', alignItems: 'center', justifyContent: 'center' }}
        className="flex"
      >
        <ExclamationCircleOutlined style={{ fontSize: '100px', color: '#064DD6' }} />
        <div style={{ marginLeft: '30px' }}>
          <p>ERROR: {props.statusCode
            ? t('error-with-status', { statusCode: props.statusCode })
            : t('error-without-status')}
          </p>
          <p>Vui Lòng liên hệ tổng đài để được hỗ trợ</p>
        </div>
      </div>
    </div>
  );
};

Error.getInitialProps = async (context: any) => {
  const { res, err } = context;
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }
  return {
    statusCode,
  };
};

Error.defaultProps = {
  statusCode: null,
};

Error.propTypes = {
  statusCode: PropTypes.number,
};

export default Error;