import { Col, Row } from 'antd';
import React from 'react';
import moment from 'moment';
import { TableUtils } from '../../../../lib/table-utils';
import { useHTranslation } from '../../../../lib/i18n';
import { ItemViewer } from '../../../shared/common/configuration/item-viewer';

export const RecruitContactUsSchema = (props) => {
  const { t } = useHTranslation('recruit');

  return ([
    TableUtils.createTableColumnConfig({
      title: t('contact.contactList'),
      dataIndex: 'contact-us',
      key: 'contact-us',
      render: (_, transactionDetail) => {
        return (
          <>
            <Row>
              <Col span={12}>
                <ItemViewer {...{
                  label: t('contact.fullName'),
                  value: transactionDetail?.fullName || '',
                  labelClassName: 'm-b-10',
                }}/>
              </Col>
              <Col span={12}>
                <ItemViewer {...{
                  label: t('contact.email'),
                  value: transactionDetail?.email || '',
                  labelClassName: 'm-b-10',
                }}/>
              </Col>
            </Row>
            <ItemViewer {...{
              label: t('contact.subject'),
              value: transactionDetail?.subject || '',
              labelClassName: 'm-b-10',
            }}/>

            <ItemViewer {...{
              className: 'm-b-10 text-left',
              label: t('contact.message'),
              value: transactionDetail?.message,
            }}/>
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('contact.createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, transactionDetail) => {
        return (
          <ItemViewer {...{
            label: '',
            value:moment(transactionDetail?.createdAt).format('DD/MM/YYYY') ?? '',
            labelClassName: 'm-b-10',
          }}/>
        );
      },
    }),
    TableUtils.createDeleteControlColumn('Action',{}, 'Ban có muốn xóa thông tin này'),

  ]);
};
