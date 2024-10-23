import { FC, ReactNode } from 'react';
import { isEmpty } from 'underscore';
import { Empty } from 'antd';

import './fund-information-item.module.scss';

interface DataItem {
  label?: string;
  content?: ReactNode;
}

interface FundInformationItemProps {
  headerLeftContent?: string;
  headerRightContent?: string;
  data?: DataItem[];
}

export const FundInformationItem: FC<FundInformationItemProps> = ({ headerLeftContent, headerRightContent, data }) => {
  return (
    <div className="fund-information-item">
      <div className="fund-information-item--header">
        <p>{headerLeftContent}</p>
        <p>{headerRightContent}</p>
      </div>
      <div className="fund-information-item--content">
        {(isEmpty(data) || isEmpty(data?.[0])) ? <Empty/> : data?.map((item, index) => {
          return (
            <div
              key={`fund-information-item${index}`} className="fund-information-item--content__item"
            >
              {`· ${item.label}`}
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};
