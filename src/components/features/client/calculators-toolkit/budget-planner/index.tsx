import {
  MinusCircleOutlined,
  MinusOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import HContainer from '@components/shared/common/h-container';
import { HModal } from '@components/shared/common/h-modal';
import HTabs from '@components/shared/common/h-tabs';
import { PrintIconSvg, ResetIconSvg } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { Collapse, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import CalculatorsToolkitHeader from '../calculators-toolkit-header';
import { postLocation, TYPE_MODAL, VisibleModal } from '../constants';
import CopyRightFina from '../copy-right';
import FormCreateTaskSchema from '../form-create-task-schema';
import InformationDescription from '../information-description';
import { defaultDataBudgetPlanner, descriptionBudgetPlanner } from './constant';
import ListItemBudgetPlanner from './list-item-budget-planner';
import ViewSummary from './view-summary';

import './styles.module.scss';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const KEY_TABS = {
  DETAIL: 'DETAIL',
  SUMMARY: 'SUMMARY',
};

const BudgetPlanner = () => {
  const { t } = useHTranslation('calculator-toolkit');
  const router = useRouter();
  const componentRef: any = useRef();
  const [openPanels, setOpenPanels] = useState<any>(['totalIncomes']);
  const [dataBudgetPlanner, setDataBudgetPlanner] = useState(
    defaultDataBudgetPlanner(t),
  );
  const [visibleModal, setVisibleModal] = useState<VisibleModal>({
    visible: false,
    type: '',
  });
  const [iShowCreateForm, setIsShowCreateForm] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState(KEY_TABS.DETAIL);

  const handlePrintPage = useReactToPrint({
    content: () => componentRef?.current,
  });
  const closeModal = () => setVisibleModal({ visible: false, type: '' });
  const openModal = (type) => setVisibleModal({ visible: true, type });

  const handlePrint = () => {
    setActiveKey(KEY_TABS.SUMMARY);

    !iShowCreateForm
      ? openModal(TYPE_MODAL.CREATE_INFO)
      : setTimeout(() => {
          handlePrintPage && handlePrintPage();
        }, 100);
  };

  useEffect(() => {
    postLocation(router); // Log times request calc;
  }, []);

  return (
    <HContainer>
      <div className="budget-planner-wrapper" ref={componentRef}>
        <div className="budget-planner">
          <CalculatorsToolkitHeader />
          <h2 className="calculators-toolkit-item-title">
            {t('budgetPlanner')}
          </h2>
          <div className="calculators-toolkit-line"></div>

          <HTabs
            className="budget-planner-tabs"
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
            destroyInactiveTabPane={true}
          >
            <TabPane key={KEY_TABS.DETAIL} tab={t('enterYourDetails')}>
              <Collapse
                ghost
                bordered={false}
                defaultActiveKey={['totalIncomes']}
                activeKey={openPanels}
                expandIcon={({ isActive }) =>
                  isActive ? <MinusOutlined /> : <PlusOutlined />
                }
                onChange={setOpenPanels}
                expandIconPosition={'right'}
              >
                {Object.keys(dataBudgetPlanner)?.map((key) => (
                  <Panel header={t(key)} key={key}>
                    <ListItemBudgetPlanner
                      dataBudgetPlanner={dataBudgetPlanner}
                      setData={setDataBudgetPlanner}
                      keyBudgetPlanner={key}
                    />
                  </Panel>
                ))}
              </Collapse>

              <div className="calculators-toolkit-actions">
                <div className="calculators-toolkit-actions-left flex">
                  <HButton
                    className="open-all"
                    type="primary"
                    onClick={() =>
                      setOpenPanels([...Object.keys(dataBudgetPlanner)])
                    }
                  >
                    <PlusCircleOutlined />
                    {t('openAll')}
                  </HButton>
                  <HButton
                    icon
                    className="close-all"
                    type="primary"
                    onClick={() => setOpenPanels([])}
                  >
                    <MinusCircleOutlined /> {t('closeAll')}
                  </HButton>
                </div>
                <div className="calculators-toolkit-actions-right">
                  <HButton
                    className="btn-reset"
                    type="primary"
                    onClick={() =>
                      setDataBudgetPlanner(defaultDataBudgetPlanner(t))
                    }
                  >
                    <ResetIconSvg /> {t('reset')}
                  </HButton>
                  <HButton
                    icon
                    className="btn-print"
                    onClick={() => handlePrint()}
                  >
                    <PrintIconSvg />
                    {t('print')}
                  </HButton>
                  <HButton
                    className="btn-info"
                    onClick={() => openModal(TYPE_MODAL.INFO)}
                  >
                    <UnorderedListOutlined /> {t('information')}
                  </HButton>
                </div>
              </div>
            </TabPane>

            <TabPane key={KEY_TABS.SUMMARY} tab={t('viewSummary')}>
              <ViewSummary data={dataBudgetPlanner} />
            </TabPane>
          </HTabs>
        </div>
        <CopyRightFina />
      </div>

      <HModal
        {...{
          visible: visibleModal.visible,
          onCancel: closeModal,
          footer: null,
          title:
            visibleModal.type === TYPE_MODAL.INFO
              ? t('descriptionInformation')
              : '',
          className: `bank-loan-calculator-modal ${visibleModal.type === TYPE_MODAL.INFO ? '' : 'bank-loan-calculator-modal-no-padding'}`,
        }}
      >
        {visibleModal.type === TYPE_MODAL.INFO ? (
          <InformationDescription>
            {descriptionBudgetPlanner}
          </InformationDescription>
        ) : (
          <FormCreateTaskSchema
            setIsShowCreateForm={setIsShowCreateForm}
            actionAfterSubmit={handlePrintPage}
            closeModal={closeModal}
          />
        )}
      </HModal>
    </HContainer>
  );
};

export default BudgetPlanner;
