import { InboxOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { message, notification, Radio, Table, Tabs, Typography } from 'antd';
import locale from 'antd/lib/date-picker/locale/en_GB';
import Dragger from 'antd/lib/upload/Dragger';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { HInput } from '@components/shared/common-form-elements/h-input';
import HTinyEditor from '@components/shared/common-form-elements/h-tiny-editor';
import { HSelect } from '@components/shared/common-form-elements/select';
import { TableUtils } from '@lib/table-utils';
import { createSchemaItem } from '@schema-form/h-types';
import 'moment/locale/en-gb';
import { excelTypesFile, importExcel } from './utils';
const { TabPane } = Tabs;
// import { TabTypeTemplate } from '@components/features/template-notification/detail-schema-form';

const { Title } = Typography;

export const EVENT_STATUS = {
  not_send: 'not_send',
  sending: 'sending',
  send: 'send',
};

export const EVENT_STATUS_LABEL = {
  not_send: 'Chờ gửi',
  sending: 'Đang gửi',
  send: 'Đã gửi',
};

export const contentHeaderDefault = () => `
<table class="main-table" style="width: 600px; height: 34px;" border="0" cellspacing="0" cellpadding="0">
	<tbody>
		<tr style="height: 34px;">
			<td style="padding-top: 30px; background: #fff;"><img class="logo-img" style="display: block; margin-left: 20px; height: 55px; width: 180px;" src="https://storage.googleapis.com/crm-example/upload/beta-fina/logo-top11670323999970png" alt="Fina" /></td>
		</tr>
	</tbody>
</table>
`;

export const contentFooterDefault = () => `
<td class="x_mob_left" style="height: 83px; padding-top: 20px; background: #fff;" align="left" valign="top">
<table style="min-width: 100%; max-width: 100%; width: 100%!important; height: 39px; background: #fff;" border="0" width="100%" cellspacing="0" cellpadding="0">
	<tbody>
		<tr style="height: 25px;">
			<td class="body-wrapper" style="padding-bottom: 20px; padding-left: 20px; background: #fff; font-size: 14px; line-height: 19px; color: #666; font-family: Arial,Helvetica,sans-serif; width: 48.7437%; height: 39px;" align="left">
				<p><img class="logo-img" style="display: block; margin: 0; height: 30px; margin-bottom: 10px;" src="https://crm-beta.fina.com.vn/assets/images/fina_logo.png" alt="Fina" /></p>
				<p style="padding: 0; margin: 0;">Website: https://fina.com.vn/vn</p>
				<p style="padding: 0; margin: 0;">Hotline: 08 5749 8668</p>
				<p style="padding: 0; margin: 0;">Email: support@fina.com.vn</p>
			</td>
			<td class="body-wrapper" style="padding-bottom: 20px; padding: 25px 20px; background: #fff; font-size: 14px;" align="left">
				<p style="display: flex; flex-direction: row-reverse;"><a style="margin-right: 10px; text-decoration: none;" href="tel:08 5749 8668" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="2"> <img src="https://cdn.fina.com.vn/production/email/bc5bb9dc-6fbf-4106-8352-078f6a9bd330.png" width="34" data-imagetype="External" /> </a>&nbsp; <a style="margin-right: 10px; text-decoration: none;" href="https://zalo.me/937476885441449805" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="3"> <img src="https://phukienre.com.vn/wp-content/uploads/2022/05/zalo-icon.png" width="28" data-imagetype="External" /> </a>&nbsp; <a style="margin-right: 10px; text-decoration: none;" href="https://www.facebook.com/finavietnam" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="5"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" width="28" data-imagetype="External" /> </a> <a style="margin-right: 10px; text-decoration: none;" href="mailto:support@fina.com.vn" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="4"> <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gmail.max-1100x1100.png" width="28" data-imagetype="External" /> </a>&nbsp; <a style="margin-right: 10px; text-decoration: none;" href="https://www.youtube.com/channel/UCdetskOW9FS3oZwBvEfKHyg" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="4"> <img src="https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png" width="28" data-imagetype="External" /> </a></p>
			</td>
		</tr>
	</tbody>
</table>
</td>`;

export const renderButton = (
  buttonLink,
) => `<tr style="background: #fff!important;">
<td>
	<p style="width: 100%; line-height: 20px; font-size: 18px; text-align: center; margin-bottom: 30px;"><a style="margin-right: 10px; text-decoration: none; padding: 10px 20px; border: 1px solid #E0BD7A; border-radius: 8px; color: #fff; background: #E0BD7A;" href="${buttonLink}" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="2">Đăng kí tham gia ngay</a></p>
</td>
</tr>`;

export const contentDefault = (imageBanner, buttonLink, contentText) => `
<table style="width: 57.8611%;" border="0" cellspacing="0" cellpadding="0">
	<tbody>
			<tr>
				<td style="background: #f1f1f1; padding: 0; width: 100%;" align="center">
				${contentHeaderDefault()}
				<table class="main-table" style="width: 600px; height: auto;" border="0" cellspacing="0" cellpadding="0">
					<tbody>
						<tr style="height: auto;">
							<td class="body-wrapper" style="padding: 20px; background: #fff; font-size: 14px; line-height: 19px; color: #666; font-family: Arial,Helvetica,sans-serif; height: auto;" align="left">
								<p><img style="width: 100%;" src="${imageBanner}" alt="" /></p>
								<p>K&iacute;nh gửi qu&yacute; kh&aacute;ch h&agrave;ng th&acirc;n mến,</p>
								${contentText}
								<p>Tr&acirc;n trọng, <br /><strong>FINA</strong></p>
							</td>
						</tr>
						${renderButton(buttonLink)}
						<tr style="height: 1px; background-color: #0a3eca!important;">
						</tr>
						<tr style="height: 83px;">
							${contentFooterDefault()}
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>`;

export const EMAILS = [
  { label: 'nghinhv@fina.com.vn', value: 'nghinhv@fina.com.vn' },
  { label: 'khueptt@fina.com.vn', value: 'khueptt@fina.com.vn' },
  { label: 'nhungvt@fina.com.vn', value: 'nhungvt@fina.com.vn' },
  { label: 'trucntt@fina.com.vn', value: 'trucntt@fina.com.vn' },
  { label: 'ntthanhtruc.3599@gmail.com', value: 'ntthanhtruc.3599@gmail.com' },
  { label: 'tiendo@fina.com.vn', value: 'tiendo@fina.com.vn' },
  { label: 'alexpham@fina.com.vn', value: 'alexpham@fina.com.vn' },
  { label: 'hoangphuoc93@gmail.com', value: 'hoangphuoc93@gmail.com' },
  { label: 'quocna@fina.com.vn', value: 'quocna@fina.com.vn' },
  { label: 'anhdv@fina.com.vn', value: 'anhdv@fina.com.vn' },
  { label: 'tamnguyen@fina.com.vn', value: 'tamnguyen@fina.com.vn' },
  { label: 'uyenntc@fina.com.vn', value: 'uyenntc@fina.com.vn' },
  { label: 'phuongln@fina.com.vn', value: 'phuongln@fina.com.vn' },
  { label: 'nhutnpm@fina.com.vn', value: 'nhutnpm@fina.com.vn' },
  { label: 'longdnn@fina.com.vn', value: 'longdnn@fina.com.vn' },
  { label: 'binhlqt@fina.com.vn', value: 'binhlqt@fina.com.vn' },
  { label: 'phuongntn@fina.com.vn', value: 'phuongntn@fina.com.vn' },
  { label: 'gulistnv@fina.com.vn', value: 'gulistnv@fina.com.vn' },
  { label: 'haodtd@fina.com.vn', value: 'haodtd@fina.com.vn' },
];

export const ImportInsuranceBeneficiaryTable = (props: { data: any[] }) => {
  const data = props?.data || [];
  const { t } = useHTranslation('admin-common');

  return (
    <Table
      {...{
        columns: [
          TableUtils.createTableColumnConfig({
            title: t('Email'),
            dataIndex: 'email',
            key: 'email',
            width: 150,
          }),
        ],
        dataSource: data,
        pagination: false,
      }}
    />
  );
};

export const DetailSchemaForm = (props) => {
  const { t } = useHTranslation('admin-common');
  const { form } = props;
  const [rawData, setRawData] = useState<any[]>([]);

  useEffect(() => {
    form.setFieldsValue({
      emails: rawData?.map((el) => el?.[0]),
    });
  }, [rawData]);

  const handleImportExcel = (file) => {
    if (!file) {
      message.error('Tải lên không thành công');
      return;
    }

    importExcel(file, setRawData);
  };

  const configs = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    onChange: (info) => {
      const file = info?.file;
      if (file?.status === 'done') {
        if (!excelTypesFile.includes(file?.type)) {
          notification.error({
            message: t('Fail', 'Không thành công'),
            description: t('Only excel file upload', {
              vn: 'Chỉ tải lên tệp excel',
            }),
          });
          return;
        }
        message.success(
          `${info.file.name} ${t('upload file successfully', { vn: 'tải lên thành công' })}`,
        );
        handleImportExcel(file?.originFileObj);
      }
      if (file?.status === 'error') {
        message.error(
          `${info.file.name} ${t('upload file fail', { vn: 'tải lên thất bại' })}`,
        );
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const disabledDate = (current) => {
    return current && current < moment();
  };

  return [
    createSchemaItem({
      Component: HInput,
      colProps: { span: 12 },
      label: t('Title'),
      rules: [
        {
          required: true,
          message: t('Title is required', { vn: 'Tiêu đề là bắt buộc' }),
        },
      ],
      componentProps: {
        modernLabel: true,
        placeholder: t('Title'),
      },
      name: 'title',
    }),
    createSchemaItem({
      Component: HDatePicker,
      label: t('Start Time', { en: 'Start Time', vn: 'Thời gian bắt đầu gửi' }),
      name: 'time',
      colProps: { span: 12 },
      rules: [
        {
          required: true,
          message: t('Start time is required', {
            vn: 'Ngày bắt đầu gửi là bắt buộc',
          }),
        },
      ],
      componentProps: {
        disabledDate,
        locale: locale,
        placeholder: 'Select start date',
        showTime: true,
        modernLabel: true,
        format: 'DD/MM/YYYY HH:mm',
      },
    }),
    createSchemaItem({
      Component: HTinyEditor,
      name: 'content',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      rules: [
        {
          required: true,
          message: t('Content is required', {
            vn: 'Nội dung cần phải được nhập',
          }),
        },
      ],
      label: t('Content'),
      componentProps: {
        rows: 4,
        placeholder: t('Enter the content', { vn: 'Nhập vào  nội dung' }),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      colProps: { span: 24 },
      label: t('Email test', { vn: 'Email test' }),
      name: 'emails',
      componentProps: {
        mode: 'multiple',
        // modernLabel: true,
        options: EMAILS,
      },
      hidden: true,
    }),
    createSchemaItem({
      Component: Radio.Group,
      colProps: { span: 12 },
      label: t('Send to', { vn: 'Gửi đến' }),
      rules: [
        {
          required: true,
          message: t('Name is required', { vn: 'Tên là bắt buộc' }),
        },
      ],
      initialValue: 'test',
      componentProps: {
        modernLabel: true,
        optionType: 'button',
        placeholder: t('Title'),
        options: [
          { label: t('Gửi test'), value: 'test' },
          { label: t('Gửi toàn bộ hệ thống'), value: 'all' },
          { label: t('Gửi dánh sách'), value: 'custom' },
        ],
      },
      name: 'type',
    }),
    createSchemaItem({
      Component: Radio.Group,
      colProps: { span: 12 },
      label: t('Status', { vn: 'Trạng thái' }),
      rules: [
        {
          required: true,
          message: t('Name is required', { vn: 'Tên là bắt buộc' }),
        },
      ],
      initialValue: 'not_send',
      componentProps: {
        modernLabel: true,
        optionType: 'button',
        placeholder: t('Title'),
        options: [
          { label: t('Đã gửi'), value: 'send' },
          { label: t('Chờ gửi'), value: 'not_send' },
        ],
      },
      name: 'status',
    }),
    createSchemaItem({
      Component: () => (
        <Dragger {...configs}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            {t('Click or drag file to this area to upload', {
              vn: 'Nhấp hoặc kéo tệp email bạn muốn gửi vào khu vực này để tải lên',
            })}
          </p>
          <p className="ant-upload-hint">
            {t(
              'Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files',
              {
                vn: 'Hỗ trợ tải lên đơn lẻ. Nghiêm cấm tải lên dữ liệu công ty hoặc dữ liệu khác tập tin ban nhạc',
              },
            )}
          </p>
        </Dragger>
      ),
    }),
    createSchemaItem({
      Component: () => (
        <>
          <Title
            {...{
              level: 4,
            }}
          >
            {t('Danh sách người nhận', { vn: 'Danh sách người nhận' })}
          </Title>
          <ImportInsuranceBeneficiaryTable
            data={rawData?.map((el) => ({ email: el }))}
          />
        </>
      ),
      hidden: !rawData.length,
    }),
  ];
};
