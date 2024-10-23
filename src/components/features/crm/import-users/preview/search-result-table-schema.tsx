import { TableUtils } from '@lib/table-utils';
import { ImportUtils } from '../../../../shared/common/import-data/utils';

export const UsersTableSchema = () => {
  return [
    TableUtils.createTableColumnConfig({
      title: 'Number',
      sortable: true,
      key: 'idx',
      render: (_, record) => {
        const idx = ImportUtils.getValue(record, 'idx');
        return <p className="text-center">{idx}</p>;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Full Name',
      sortable: true,
      key: 'fullName',
      render: (_, record) => {
        const name = ImportUtils.getValue(record, 'name');
        return `${name}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Last Name',
      sortable: true,
      key: 'lastName',
      render: (_, record) => {
        const lastName = ImportUtils.getValue(record, 'lastName');
        return `${lastName}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'First Name',
      sortable: true,
      key: 'firstName',
      render: (_, record) => {
        const firstName = ImportUtils.getValue(record, 'firstName');
        return `${firstName}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Phone Number 01',
      sortable: true,
      key: 'phoneNumber01',
      render: (_, record) => {
        const mobile1 = ImportUtils.getValue(record, 'mobile1');
        return `${mobile1}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Phone Number 02',
      sortable: true,
      key: 'phoneNumber02',
      render: (_, record) => {
        const mobile2 = ImportUtils.getValue(record, 'mobile2');
        return `${mobile2}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Other Phone Number',
      sortable: true,
      key: 'otherPhoneNumber',
      render: (_, record) => {
        const mobileOther = ImportUtils.getValue(record, 'mobileOther');
        return `${mobileOther}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Email 01',
      sortable: true,
      key: 'email1',
      render: (_, record) => {
        const email1 = ImportUtils.getValue(record, 'email1');
        return `${email1}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Email 02',
      sortable: true,
      key: 'email2',
      render: (_, record) => {
        const email2 = ImportUtils.getValue(record, 'email2');
        return `${email2}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Other Email',
      sortable: true,
      key: 'emailOther',
      render: (_, record) => {
        const emailOther = ImportUtils.getValue(record, 'emailOther');
        return `${emailOther}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Role',
      sortable: true,
      key: 'role',
      render: (_, record) => {
        const role = ImportUtils.getValue(record, 'role');
        return `${role}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Address Country',
      sortable: true,
      key: 'addressCountry',
      render: (_, record) => {
        const addressCountry = ImportUtils.getValue(record, 'addressCountry');
        return `${addressCountry}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'State',
      sortable: true,
      key: 'state',
      render: (_, record) => {
        const state = ImportUtils.getValue(record, 'state');
        return `${state}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'City',
      sortable: true,
      key: 'city',
      render: (_, record) => {
        const city = ImportUtils.getValue(record, 'city');
        return `${city}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Street',
      sortable: true,
      key: 'street',
      render: (_, record) => {
        const street = ImportUtils.getValue(record, 'street');
        return `${street}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Industry',
      sortable: true,
      key: 'industry',
      render: (_, record) => {
        const industry = ImportUtils.getValue(record, 'industry');
        return `${industry}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Company',
      sortable: true,
      key: 'company',
      render: (_, record) => {
        const company = ImportUtils.getValue(record, 'company');
        return `${company}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Department',
      sortable: true,
      key: 'department',
      render: (_, record) => {
        const department = ImportUtils.getValue(record, 'department');
        return `${department}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Title',
      sortable: true,
      key: 'title',
      render: (_, record) => {
        const title = ImportUtils.getValue(record, 'title');
        return `${title}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Birthday',
      sortable: true,
      key: 'birthday',
      render: (_, record) => {
        const birthday = ImportUtils.getValue(record, 'birthday');
        return `${birthday}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Personal ID Number',
      sortable: true,
      key: 'personalIdNumber',
      render: (_, record) => {
        const personalIdNumber = ImportUtils.getValue(
          record,
          'personalIdNumber',
        );
        return `${personalIdNumber}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Personal ID Issue Date',
      sortable: true,
      key: 'personalIdIssueDate',
      render: (_, record) => {
        const personalIdIssueDate = ImportUtils.getValue(
          record,
          'personalIdIssueDate',
        );
        return `${personalIdIssueDate}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Transacted Products',
      sortable: true,
      key: 'transactedProducts',
      render: (_, record) => {
        const transactedProducts = ImportUtils.getValue(
          record,
          'transactedProducts',
        );
        return `${transactedProducts}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Project Name',
      sortable: true,
      key: 'projectName',
      render: (_, record) => {
        const projectName = ImportUtils.getValue(record, 'projectName');
        return `${projectName}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Supplier Name',
      sortable: true,
      key: 'supplierName',
      render: (_, record) => {
        const supplierName = ImportUtils.getValue(record, 'supplierName');
        return `${supplierName}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Lead Lifecycle Stage',
      sortable: true,
      key: 'leadLifecycleStage',
      render: (_, record) => {
        const leadLifecycleStage = ImportUtils.getValue(
          record,
          'leadLifecycleStage',
        );
        return `${leadLifecycleStage}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Lead Status',
      sortable: true,
      key: 'leadStatus',
      render: (_, record) => {
        const leadStatus = ImportUtils.getValue(record, 'leadStatus');
        return `${leadStatus}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Data Source 1',
      sortable: true,
      key: 'dataSource1',
      render: (_, record) => {
        const dataSource1 = ImportUtils.getValue(record, 'dataSource1');
        return `${dataSource1}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Data Source 2',
      sortable: true,
      key: 'dataSource2',
      render: (_, record) => {
        const dataSource2 = ImportUtils.getValue(record, 'dataSource2');
        return `${dataSource2}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Tag 1',
      sortable: true,
      key: 'tag1',
      render: (_, record) => {
        const tag1 = ImportUtils.getValue(record, 'tag1');
        return `${tag1}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Tag 2',
      sortable: true,
      key: 'tag2',
      render: (_, record) => {
        const tag2 = ImportUtils.getValue(record, 'tag2');
        return `${tag2}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Tag 3',
      sortable: true,
      key: 'tag3',
      render: (_, record) => {
        const tag3 = ImportUtils.getValue(record, 'tag3');
        return `${tag3}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Tag 4',
      sortable: true,
      key: 'tag4',
      render: (_, record) => {
        const tag4 = ImportUtils.getValue(record, 'tag4');
        return `${tag4}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Tag 5',
      sortable: true,
      key: 'tag5',
      render: (_, record) => {
        const tag5 = ImportUtils.getValue(record, 'tag5');
        return `${tag5}`;
      },
    }),

    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
