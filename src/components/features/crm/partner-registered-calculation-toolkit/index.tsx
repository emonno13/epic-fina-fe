import { ConverterUtils } from '@lib/converter';
import { TableUtils } from '@lib/table-utils';
import { HFeature, HTable } from '@schema-form/features';
import HSearchForm from '@schema-form/features/search-form';

const PartnerRegisteredCalculationToolkit = () => {
  return (
    <HFeature
      {...{
        featureId: 'request-iframe',
        nodeName: 'request-iframe',
      }}
    >
      <HSearchForm
        {...{
          withRelations: ['user'],
        }}
      />

      <HTable schema={PartnerRegisteredCalculationToolkitSchema} />
    </HFeature>
  );
};

export default PartnerRegisteredCalculationToolkit;

const PartnerRegisteredCalculationToolkitSchema = () => {
  return [
    TableUtils.createTableColumnConfig({
      title: 'Tổ chức',
      dataIndex: 'organizationName',
      key: 'organizationName',
      width: '200px',
      render: (organizationName) => {
        return organizationName || '_';
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Họ và tên',
      dataIndex: 'user',
      key: 'user',
      width: '200px',
      render: (user) => {
        return ConverterUtils.getFullNameUser(user);
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Số điện thoại',
      dataIndex: 'user',
      key: 'user',
      width: '300px',
      render: (user) => {
        return user?.tels[0]?.tel;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Email',
      dataIndex: 'user',
      key: 'user',
      width: '200px',
      render: (user) => {
        return user?.emails?.[0]?.email;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      width: '300px',
      key: 'createdAt',
      render: ConverterUtils.fullDatetimeConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: 'Công cụ đăng kí',
      dataIndex: 'calculators',
      key: 'calculators',
      width: '300px',
      render: (calculators) => {
        return (
          <ul>
            {calculators?.map((calculator) => (
              <li key={calculator?.value}>{calculator?.label}</li>
            ))}
          </ul>
        );
      },
    }),
  ];
};
