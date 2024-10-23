import { GlobalOutlined } from '@ant-design/icons';
import { CallSvg, TrashIconSvg } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { TableUtils } from '@lib/table-utils';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Button, Form, Modal, notification, Table } from 'antd';
import * as htmlToImage from 'html-to-image';
import Cookies from 'js-cookie';
import { isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { TableSchema } from './bank-table';
import ListBank from './list-bank';
import { PreferentialReviewDetailSchema } from './preferential-reviews.detail-schema-form';

const PreferentialDetail = () => {
  const componentRef: any = useRef();
  const { t } = useHTranslation('admin-common');
  const documentDetail = useDocumentDetail();
  const [dataBank, setDataBank] = useState([]);
  const [data, setData]: any = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleListBank, setVisibleListBank] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEmpty(documentDetail)) {
      FormUtils.submitForm(
        {},
        {
          method: 'get',
          endpoint: endpoints.endpointWithApiDomain(
            '/product-details/preferential-bankers',
          ),
          onGotSuccess: (response) => {
            setData(response?.data);
          },
        },
      );
    } else {
      setData(documentDetail?.details);
      setDataBank(documentDetail?.details);
    }
  }, [documentDetail]);

  const uploadImage = async (options) => {
    const { blob } = options;
    const fd = new FormData();
    fd.append(
      'file',
      blob,
      `${form.getFieldValue('month') - form.getFieldValue('year')}.png`,
    );

    const response = await fetch(
      FormUtils.getNodeEndpoint({
        nodeName: 'files',
      }),
      {
        body: fd,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('h2token')}`,
        },
      },
    );

    const responseData = await response.json();

    if (!responseData?.[0]?.url) {
      notification.error({
        message: 'Thông báo',
        description: 'Kiểm tra lại thông tin tạo tin tức',
      });
    } else {
      const slug = `Thang_${documentDetail?.month ? documentDetail?.month : form.getFieldValue('month')}_${documentDetail?.year ? documentDetail?.year : form.getFieldValue('year')}`;
      // todo
      const dataNew = {
        title: 'BẢNG LÃI SUẤT VAY NGÂN HÀNG',
        description: 'Thông tin lãi suất ngân hàng gần đây nhất',
        author: 'FINA',
        slug: slug,
        image: responseData?.[0]?.url,
        isActive: false,
        content: `<img style="display: block; margin-left: auto; margin-right: auto;" src="${responseData?.[0]?.url}" alt="" width="623" height="828" />`,
      };

      FormUtils.submitForm(
        { ...dataNew },
        {
          endpoint: endpoints.endpointWithApiDomain('/news'),
          method: 'post',
          onGotSuccess: (response) => {
            notification.info({
              message: 'Thông báo',
              description: 'Tạo tin tạo tin tức thành công',
            });
            setVisible(false);
          },
        },
      );
    }
  };

  const uploadFile = () => {
    if (componentRef.current === null) {
      return;
    }

    htmlToImage
      .toBlob(componentRef.current, { cacheBust: true })
      .then(function (blob) {
        uploadImage({ blob });
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };

  const downloadImage = () => {
    if (componentRef.current === null) {
      return;
    }

    htmlToImage
      .toPng(componentRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTablePreferentialBeforeEdit = () => {
    downloadImage();
  };

  const createNew = () => {
    uploadFile();
  };

  const onchangeValueTable = (key, value, index) => {
    const dataTable: any = [...data];
    const rowEdit: any = data?.[index];
    rowEdit[key] = value?.target?.value;
    dataTable.splice(index, 1, rowEdit);
    setData(dataTable);
  };

  const addBank = (bank: string) => {
    setData(data.concat([{ org: bank }]));
    setVisibleListBank(false);
  };

  const removeBank = (index: number) => {
    const list = [...data];
    list.splice(index, 1);
    setData(list);
  };

  const MyDocument = () => {
    return (
      <div
        ref={componentRef}
        style={{
          textAlign: 'center',
          backgroundColor: '#fff',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        <div style={{ fontSize: '22px', color: '#0068ff', fontWeight: 'bold' }}>
          BẢNG LÃI SUẤT VAY NGÂN HÀNG MUA NHÀ
        </div>
        <p style={{ fontSize: '18px', color: '#ff6c0e', fontWeight: 'bold' }}>
          Tháng{' '}
          {documentDetail?.month
            ? documentDetail?.month
            : form.getFieldValue('month')}{' '}
          -{' '}
          {documentDetail?.year
            ? documentDetail?.year
            : form.getFieldValue('year')}
        </p>

        <div style={{ backgroundColor: '#f7f8fb' }} className="p-10">
          <Table
            className="custom-table-preferential-view"
            rowClassName={(record, index) =>
              index % 2 !== 0 ? 'custom-data-row-preferential' : ''
            }
            size={'small'}
            dataSource={data}
            pagination={{ pageSize: 1000 }}
            columns={TableSchema({ isView: true, onchangeValueTable })}
          />

          <p className="m-b-20 m-t-10 text-left">
            *Lãi suất có thể thay đổi tuỳ từng thời điểm chính sách của từng
            ngân hàng
          </p>
        </div>

        <div className="footer-custom flex">
          <div className="logo" style={{ width: '50%' }}>
            <img className="logo" src="/assets/images/fina_logo.png" />
          </div>
          <div className="text-left" style={{ width: '50%' }}>
            <div
              style={{
                fontSize: '20px',
                color: '#ff6c0e',
                fontWeight: 'bold',
                marginBottom: '20px',
              }}
            >
              Liên hệ ngay
            </div>
            <div className="flex">
              <div
                style={{
                  width: '50%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <CallSvg width={32} />
                <span style={{ fontSize: '18px' }}>08-5749-8668</span>
              </div>
              <div
                style={{
                  width: '50%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <GlobalOutlined
                  style={{ fontSize: '28px', color: '#064DD6' }}
                />
                <span style={{ fontSize: '18px', marginLeft: '8px' }}>
                  fina.com.vn
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <HDocumentDrawerPanel
        hideSubmitAndContinueButton={true}
        {...{
          customButton: (
            <>
              <Button
                className="m-r-10"
                {...{
                  onClick: () => {
                    setVisibleListBank(true);
                  },
                }}
              >
                Thêm ngân hàng
              </Button>
              <Button
                className="m-r-10"
                {...{
                  onClick: () => {
                    setVisible(true);
                  },
                }}
              >
                View bảng lãi suất
              </Button>
            </>
          ),
        }}
      >
        <HFeatureForm
          {...{
            schema: PreferentialReviewDetailSchema,
            nodeName: 'preferential',
            onDataReadyToSubmit: (values) => {
              return {
                ...values,
                details: data || [],
              };
            },
          }}
        />
        <Table
          className="custom-table-preferential-view"
          size={'small'}
          dataSource={data}
          pagination={{ pageSize: 1000 }}
          columns={[
            ...TableSchema({ isView: false, onchangeValueTable }),
            TableUtils.createTableColumnConfig({
              title: t('Action'),
              render: (value, record, index) => (
                <span onClick={() => removeBank(index)}>
                  <TrashIconSvg />
                </span>
              ),
            }),
          ]}
        />
      </HDocumentDrawerPanel>

      <Modal
        footer={false}
        visible={visible}
        width={1000}
        onCancel={() => {
          setVisible(false);
        }}
        wrapClassName="preferential-modal-custom"
      >
        <MyDocument />
        <div className="custom-button-print">
          <Button
            className=""
            {...{
              onClick: getTablePreferentialBeforeEdit,
            }}
          >
            Tải bảng lãi suất
          </Button>

          <Button
            className=""
            {...{
              onClick: createNew,
            }}
          >
            Tạo tin tức
          </Button>
        </div>
      </Modal>

      <Modal
        footer={false}
        visible={visibleListBank}
        width={1000}
        onCancel={() => {
          setVisibleListBank(false);
        }}
        wrapClassName="preferential-modal-custom"
      >
        <div style={{ marginTop: '20px' }}>
          <ListBank listBank={data} addBank={addBank} dataBank={dataBank} />
        </div>
      </Modal>
    </div>
  );
};

export default PreferentialDetail;
