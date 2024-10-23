import React, { useState } from 'react';
import { Button } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import ApplyModal from './apply-modal';
import { BagSvg, LocationSvg, SalarySvg } from '../../icons';

import './job-item.module.scss';

interface JobItemProps{
  item: any;
  view: 'grid' | 'list'
}

const JobItem = React.memo(({ item, view }:JobItemProps)=> {
  const { push, locale } = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const onClick = () => setVisible(true);

  const viewDetail = async () => {
    await push(`/${locale}/tuyen-dung/${item?.id}`);
  };

  return (
    <>
      {view === 'list' ?
        <div className="job-item__list-container " >
          <p className="job-item__title cursor-pointer" onClick={viewDetail}>{item?.jobTitle}</p>
          <div className="job-item__body">
            <div className="job-item__row" style={{ marginLeft: 0 }}>
              <div className="job-item__row" style={{ marginLeft: 0 }}>
                <LocationSvg />
                <p className="job-item__text">{item?.workplace}</p>
              </div>
              <div className="job-item__row">
                <SalarySvg />
                <p className="job-item__text">Lương:</p>
                <p className="job-item__text">{item?.salary}</p>
              </div>
              <div className="job-item__row">
                <BagSvg />
                <p className="job-item__text">Nhận hồ sơ trước:</p>
                <p className="job-item__date">{moment(item?.applicationDeadline).format('DD/MM/YYYY')}</p>
              </div>
            </div>
            <Button className="job-item__button" style={{ marginBottom: '25px' }} onClick={onClick}>Ứng tuyển</Button>
          </div>
        </div>
        :
        <div className="job-item__grid-container " >
          <p className="job-item__title cursor-pointer" onClick={viewDetail}>{item?.jobTitle}</p>
          <div className="job-item__row" style={{ marginLeft: 0 }}>
            <div className="job-item__row" style={{ marginLeft: 0 }}>
              <LocationSvg />
              <p className="job-item__text">{item?.workplace}</p>
            </div>
            <div className="job-item__row">
              <SalarySvg />
              <p className="job-item__text">Lương:</p>
              <p className="job-item__text">{item?.salary}</p>
            </div>
          </div>
          <div className="job-item__row" style={{ marginLeft: 0 }}>
            <BagSvg />
            <p className="job-item__text">Nhận hồ sơ trước:</p>
            <p className="job-item__date">{moment(item?.applicationDeadline).format('DD/MM/YYYY')}</p>
          </div>
          <Button className="job-item__button" onClick={onClick}>Ứng tuyển</Button>
        </div>
      }
      <ApplyModal visible={visible} closeModal={()=> setVisible(false)} item={item}/>
    </>

  );
});
export default JobItem;
