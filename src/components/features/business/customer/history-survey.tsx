import { ConverterUtils } from '@lib/converter';
import { endpoints } from '@lib/networks/endpoints';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Empty } from 'antd';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';

export interface RenderCustomerUpdateProps {
  user?: any;
}

const HistorySurvey: FC<RenderCustomerUpdateProps> = ({
  user: defaultUser,
}) => {
  const documentDetail = useDocumentDetail();
  const [histories, setHistories] = useState([]);

  const user = defaultUser || documentDetail;

  useEffect(() => {
    if (user?.id) {
      FormUtils.submitForm(
        {},
        {
          method: 'get',
          endpoint: endpoints.endpointWithApiDomain(
            `/users/history-survey/${user?.id}`,
          ),
          onGotSuccess: (res) => {
            if (res) {
              setHistories(res);
            }
          },
        },
      );
    }
  }, [user]);

  if (histories?.length === 0)
    return <Empty {...{ description: 'Không có thông tin!' }} />;

  return (
    <>
      {histories?.map((el: any, indexEl) => {
        return (
          <div key={indexEl}>
            <p>
              Thực hiện bới:{' '}
              <span
                style={{
                  color: '#0068ff',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
              >
                {el?.updatedBy?.fullName}
              </span>{' '}
              - {moment(el?.updatedAt).format('DD/MM/YYYY HH:mm')}
            </p>
            {el?.surveyDetails?.map((item, indexItem) => {
              return (
                <div key={indexItem}>
                  <span
                    style={{
                      color: '#111111',
                      fontWeight: 600,
                      fontSize: '14px',
                    }}
                  >
                    {item?.questionData?.content?.blocks?.[0]?.text}
                  </span>
                  :{' '}
                  {typeof item?.content === 'number'
                    ? ConverterUtils.formatNumber(item?.content)
                    : item?.content}{' '}
                  {item?.questionData?.suffix}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default HistorySurvey;
