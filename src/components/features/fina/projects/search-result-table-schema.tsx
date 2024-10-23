import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { Tag } from 'antd';
import { ConverterUtils } from '../../../../lib/converter';
import { FormatterUtils } from '../../../../lib/formatter';
import { useCurrentUser } from '../../../../lib/providers/auth';
import { useEditDocumentControl } from '../../../../schema-form/features/hooks';
import { USER_TYPES } from '../../../../types/organization';
import { ItemViewer } from '../../../shared/common/configuration/item-viewer';

export const DocumentTemplateTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  const currentUser: any = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  return [
    TableUtils.createTableColumnConfig({
      title: t('Organizations'),
      dataIndex: 'org',
      sortable: true,
      key: 'orgId',
      render: (_, record) => ConverterUtils.showOrgConverter(record.investor),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Project Name', { vn: 'Tên dự án' }),
      dataIndex: 'name',
      sortable: true,
      key: 'name',
      render: (name, project) => (
        <div>
          <div>{name}</div>
          <Tag color={'pink'}>{project.code}</Tag>
        </div>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Details'),
      dataIndex: 'name',
      sortable: true,
      render: (_, project: any) => {
        return (
          <div>
            <ItemViewer
              {...{ label: t('Project type'), value: project.type }}
            />
            <ItemViewer
              {...{ label: t('Total Area'), value: project.totalArea }}
            />
            <ItemViewer
              {...{
                label: t('Expected Price'),
                value: FormatterUtils.formatAmount(
                  project.expectedPrice || 0,
                  'vnđ',
                ),
              }}
            />
            <ItemViewer
              {...{ label: t('Project status'), value: project.projectStatus }}
            />
            <ItemViewer
              {...{ label: t('Project size'), value: project.projectSize }}
            />
            <ItemViewer
              {...{
                label: t('Project link'),
                value: (
                  <a href={project.link} target="_blank" rel="noreferrer">
                    {project.link}
                  </a>
                ),
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Operation Status', { vn: 'Trạng thái hoạt động' }),
      dataIndex: 'active',
      sortable: true,
      key: 'active',
      width: 200,
      render: (active, document) => {
        return (
          <Tag color={active ? 'blue' : 'pink'}>
            {active ? 'Hoạt động' : 'Không hoạt động'}
          </Tag>
        );
      },
    }),
    {
      title: t('Edit'),
      dataIndex: 'action',
      width: 120,
      render: (_, document) => {
        const editControl = useEditDocumentControl(document);
        return (
          <div className="d-f-center">
            <div>{isOrgStaff && editControl()}</div>
          </div>
        );
      },
    },
  ];
};
