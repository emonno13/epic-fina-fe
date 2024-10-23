import { Link } from '@components/shared/link';
import { useHTranslation } from '@lib/i18n';
import { ConvertUtils } from '@lib/utils/convert';
import { Avatar, Col, Row, Spin } from 'antd';
import camelCase from 'camelcase';
import { ConverterUtils } from '../../../../lib/converter';

const ContactExpertsListItem = ({ expertData }) => {
  const { t } = useHTranslation('admin-common');
  const { id, avatar, firstName, lastName, title } = expertData;
  const fullName = ConverterUtils.getFullNameUser(expertData);
  const href = `/lien-he/${ConvertUtils.slugify(fullName)}-${id}`;
  return (
    <div className="expert-list-item">
      <Link href={href}>
        <Avatar
          className="expert-list-item__avatar"
          icon={<img src="/assets/images/default_expert_image.png" />}
          size={160}
          src={avatar}
        />
      </Link>
      <Link href={href}>
        <div className="expert-list-item__name">{fullName}</div>
      </Link>
      <div className="expert-list-item__info">
        {title
          ? t(camelCase(title))
          : t('Financial expert', { vn: 'Chuyên viên tài chính' })}
      </div>
      <Link href={href}>
        <div className="expert-list-item__see-info-btn">
          {t('See info', { vn: 'Xem thông tin' })}
        </div>
      </Link>
    </div>
  );
};

const ContactExpertsList = ({ data, loading }) => {
  if (!Array.isArray(data) || data.length < 0) {
    return null;
  }
  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 16]}>
        {data.map((expertData, index) => (
          <Col
            key={`expert-list-item-${index}-${expertData?.id}`}
            {...{ xs: 24, sm: 24, md: 6 }}
          >
            <ContactExpertsListItem {...{ expertData }} />
          </Col>
        ))}
      </Row>
    </Spin>
  );
};

export default ContactExpertsList;
