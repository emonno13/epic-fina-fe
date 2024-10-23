import { PlusOutlined } from '@ant-design/icons';
import HCarousel from '@components/shared/common/h-carousel';
import { AddressBlueSvg, CallMiniIcon, GroupShowSvg } from '@icons';
import { useTableSourceData } from '@schema-form/features/hooks';
import { Avatar } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { ConverterUtils } from '../../../../../../lib/converter';

const ViewDetailListGuarantorDetail = () => {
  const dataSource = useTableSourceData();
  const [hospitalSelect, setHospitalSelect] = useState<any>();

  useEffect(() => {
    if (!isEmpty(dataSource)) {
      setHospitalSelect(dataSource[0]);
    } else {
      setHospitalSelect(null);
    }
  }, [dataSource]);

  return (
    <div>
      <div className="title-show-hospital">
        <GroupShowSvg className="title-show-hospital__icon-show" />
        <div className="title-show-hospital__description">
          Tất cả <b>({dataSource?.length || 0})</b>
        </div>
      </div>
      <HCarousel
        {...{
          autoplay: false,
          dots: true,
          slidesToShow: 1,
          rows: 3,
          slidesPerRow: 4,
        }}
      >
        {!isEmpty(dataSource) &&
          dataSource.map((element) => {
            const { avatar, name } = element;
            const url = avatar?.url || '';

            return (
              <div
                onClick={() => setHospitalSelect(element)}
                key={element.id}
                className={
                  element?.id === hospitalSelect?.id
                    ? 'show-hospital-select'
                    : 'show-hospital'
                }
              >
                <div className="show-hospital__content">
                  <Avatar size={32} icon={<PlusOutlined />} src={url} />
                  <div className="show-hospital__name-hospital">
                    {name || ''}{' '}
                  </div>
                </div>
              </div>
            );
          })}
      </HCarousel>
      <div className="show-hospital-sline"></div>
      <div>
        {!isEmpty(hospitalSelect) && (
          <div className="show-hospital-detail">
            <div className="show-hospital-detail__name">
              {' '}
              {hospitalSelect?.name}{' '}
            </div>
            <div className="show-hospital-detail__address">
              <AddressBlueSvg className="show-hospital-detail__address__icon" />
              <div className="show-hospital-detail__address__detail">
                {ConverterUtils.showUserAddress(hospitalSelect)}
              </div>
            </div>
            <div className="show-hospital-detail__tels">
              <div className="show-hospital-detail__tels__icon">
                <CallMiniIcon />
              </div>
              <div className="show-hospital-detail__tels_detail">
                {ConverterUtils.showUserPhone(hospitalSelect)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDetailListGuarantorDetail;
