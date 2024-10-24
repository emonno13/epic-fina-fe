import { EditOutlined } from '@ant-design/icons';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { useHTranslation } from '@lib/i18n';
import { usePublicEnvironment } from '@system/hooks';
import { Form, Row, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { endpoints } from '../../../../lib/networks/endpoints';
import { useCurrentUser } from '../../../../lib/providers/auth';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '../../../../schema-form/features/panels';
import {
  CreateButton,
  HSearchForm,
  HSearchFormHiddenAble,
} from '../../../../schema-form/features/search-form';
import { USER_TYPES } from '../../../../types/organization';
import { DocumentProjectDetailSchemaForm } from './detail-schema-form';
import PrioritizeLoanProductForm from './prioritize-loan-product';
import ProjectOutstandingModal from './project-outstanding-modal';
import { DocumentTemplateTableSchema } from './search-result-table-schema';
import { PROJECT_TYPES } from './utils';

import './projects.module.scss';

const { TabPane } = Tabs;

const initValues = {
  type: PROJECT_TYPES.LOAN,
};

const Project = () => {
  const [documentDetail, setDocumentDetail] = useState<any>();
  const currentUser: any = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const { t } = useHTranslation('admin');
  const [form] = Form.useForm();
  const [prioritizeProductId, setPrioritizeProductId] = useState<string>('');

  useEffect(() => {
    setPrioritizeProductId(documentDetail?.prioritizeProductId);
  }, [documentDetail]);

  return (
    <HFeature
      {...{
        featureId: 'projects',
        nodeName: 'projects',
      }}
    >
      <HSearchForm
        endpoint={endpoints.endpointWithApiDomain('/projects/public')}
        withRelations={['investor', 'user']}
        renderRightSuffix={
          isOrgStaff && (
            <Row>
              <CreateButton />
            </Row>
          )
        }
      />
      <HDocumentDrawerPanel>
        <Tabs>
          <TabPane
            tab={t('Project detail', { vn: 'Chi tiết dự án' })}
            key={'project-detail'}
          >
            <HFeatureForm
              {...{
                initialValues: initValues,
                schema: DocumentProjectDetailSchemaForm,
                hideSubmitAndContinueButton: true,
                onDataReadyToSubmit: (values) => ({
                  ...values,
                  image: values?.image?.url,
                  prioritizeProductId: prioritizeProductId || undefined,
                }),
                transport: {
                  setDocumentDetail,
                },
                form,
              }}
            />
          </TabPane>
          {
            <TabPane
              tab={t('Prioritize product', { vn: 'Sản phẩm vay ưu tiên' })}
              key={'prioritize-product'}
            >
              <PrioritizeLoanProductForm
                {...{
                  projectId: documentDetail?.id,
                  setPrioritizeProductId,
                  prioritizeProductId,
                }}
              />
            </TabPane>
          }
        </Tabs>
      </HDocumentDrawerPanel>
      <HTable schema={DocumentTemplateTableSchema} />
    </HFeature>
  );
};

export const GetIndexPrioritized = () => {
  const maxIndexPrioritized =
    +usePublicEnvironment('MAX_INDEX_PRIORITIZED') || 10;
  const indexPrioritized: number[] = [];

  for (let i = 1; i <= maxIndexPrioritized; i++) {
    indexPrioritized.push(i);
  }

  return indexPrioritized;
};

const ProjectOutstanding = () => {
  const [documentDetail, setDocumentDetail] = useState<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { t } = useHTranslation('admin');
  const [form] = Form.useForm();
  const [prioritizeProductId, setPrioritizeProductId] = useState<string>('');
  const indexPrioritized = GetIndexPrioritized();

  useEffect(() => {
    setPrioritizeProductId(documentDetail?.prioritizeProductId);
  }, [documentDetail]);

  return (
    <HFeature
      {...{
        featureId: 'projects-outstanding',
        nodeName: 'projects',
      }}
    >
      <HSearchFormHiddenAble
        {...{
          endpoint: endpoints.endpointWithApiDomain('/projects/public'),
          withRelations: ['investor', 'user'],
          hiddenValues: {
            filter: {
              order: ['indexPrioritized ASC'],
              where: {
                indexPrioritized: { inq: indexPrioritized },
                active: true,
              },
            },
          },
          resetIfSuccess: false,
        }}
      />
      <HDocumentDrawerPanel>
        <Tabs>
          <TabPane
            tab={t('Project detail', { vn: 'Chi tiết dự án' })}
            key={'project-detail'}
          >
            <HFeatureForm
              {...{
                initialValues: initValues,
                schema: DocumentProjectDetailSchemaForm,
                hideSubmitAndContinueButton: true,
                onDataReadyToSubmit: (values) => ({
                  ...values,
                  image: values?.image?.url,
                  prioritizeProductId: prioritizeProductId || undefined,
                }),
                transport: {
                  setDocumentDetail,
                },
                form,
              }}
            />
          </TabPane>
          {
            <TabPane
              tab={t('Prioritize product', { vn: 'Sản phẩm vay ưu tiên' })}
              key={'prioritize-product'}
            >
              <PrioritizeLoanProductForm
                {...{
                  projectId: documentDetail?.id,
                  setPrioritizeProductId,
                  prioritizeProductId,
                }}
              />
            </TabPane>
          }
        </Tabs>
      </HDocumentDrawerPanel>

      <div className={'project-outstanding'}>
        <h1>Dự án bds nổi bật</h1>
        <HButton
          icon={<EditOutlined />}
          className={'m-b-15 m-t-10'}
          type={'primary'}
          onClick={() => setIsVisible(true)}
        >
          Chỉnh sửa dự án bds nổi bật
        </HButton>
        <HTable schema={DocumentTemplateTableSchema} />

        {isVisible && (
          <ProjectOutstandingModal
            {...{
              isVisible,
              setIsVisible,
              searchForm: form,
            }}
          />
        )}
      </div>
    </HFeature>
  );
};

const PROJECTS_VIEW = {
  ALL: 'Tất cả',
  OUTSTANDING: 'Dự án bds nổi bật',
};

const ProjectsView = () => {
  const { t } = useHTranslation('admin-common');
  const [activeKey, setActiveKey] = useState<string>(PROJECTS_VIEW.ALL);

  return (
    <Tabs activeKey={activeKey} onChange={setActiveKey}>
      <TabPane tab={t(PROJECTS_VIEW.ALL)} key={PROJECTS_VIEW.ALL}>
        {activeKey === PROJECTS_VIEW.ALL && <Project />}
      </TabPane>
      <TabPane
        tab={t(PROJECTS_VIEW.OUTSTANDING)}
        key={PROJECTS_VIEW.OUTSTANDING}
      >
        {activeKey === PROJECTS_VIEW.OUTSTANDING && <ProjectOutstanding />}
      </TabPane>
    </Tabs>
  );
};

export default ProjectsView;
