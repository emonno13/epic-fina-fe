import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { doRequest } from '@lib/networks/http';
import { useIsAuthenticated } from '@lib/providers/auth';
import { Button, Form } from 'antd';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { getInformationSurveyData } from '../constants';
import ConfirmSendModal from './confirm-send-modal';
import InformationSurveySection from './header-label';
import { InformationSurveyForm } from './information-survey-form';
import ReffererInformation from './referrer-information';

const NotSubmitedPanel = ({
  showPanelTitle,
  isIntroduceCustomer,
  setSubmited,
}) => {
  const { t } = useHTranslation('common');
  const { query, replace, pathname } = useRouter();
  const [form] = Form.useForm();
  const isAuthenticated = useIsAuthenticated();
  const [confirmVisile, setConfirmVisible] = useState<boolean>(false);
  const informationSurveyData = getInformationSurveyData(t);
  const existInformationSurveyData = useMemo(() => {
    const { categoryType } = query;

    return informationSurveyData[categoryType as string] || {};
  }, [query, informationSurveyData]);
  const [documentId, setDocumentId] = useState('');

  useEffect(() => {
    fetchCodeGroup().then((r) => {
      const idGroupQuestion = r?.configs?.find(
        (el) => el?.name === 'HOME_BANNER',
      )?.value;
      if (idGroupQuestion) {
        fetchSurveyId(idGroupQuestion).then((res) => {
          setDocumentId(res?.data?.[0]?.id);
        });
      }
    });
  }, []);

  const fetchSurveyId = async (code = '') => {
    const params = {
      where: {
        code,
      },
    };
    return doRequest(
      {
        url: `${endpoints.endpointWithApiDomain(
          '/question-groups/public',
        )}?filter=${encodeURIComponent(JSON.stringify(params))}`,
      },
      'get',
    );
  };

  const fetchCodeGroup = async () => {
    const code = 'CONFIG_QUESTION_GROUPS';
    return doRequest(
      {
        url: `${endpoints.endpointWithApiDomain(
          `/configurations/public/${code}`,
        )}`,
      },
      'get',
    );
  };

  const onSubmit = () => {
    form.submit();
  };

  const onGotSuccess = (values) => {
    setSubmited(true);
    replace({
      pathname,
      query: {
        categoryType: 'vay-mua-nha',
        documentId: documentId,
        taskId: values?.id,
        userId: values?.userId,
      },
    });
  };

  const onOpenConfirmModal = () => {
    setConfirmVisible(true);
  };

  const onCloseConfirmModal = () => {
    setConfirmVisible(false);
  };

  const onNextClick = debounce(() => {
    if (isIntroduceCustomer && !isAuthenticated) {
      onOpenConfirmModal();
      return;
    }
    onSubmit();
    replace({
      pathname,
      query: {
        categoryType: 'vay-mua-nha',
        documentId: documentId,
      },
    });
  }, 500);

  return (
    <>
      {showPanelTitle && (
        <h2 className="panel-title">{existInformationSurveyData?.title}</h2>
      )}
      <div className="section-container">
        <InformationSurveySection
          headerLabel={t('Customer information', {
            vn: 'Thông tin khách có nhu cầu mua',
          })}
        >
          <InformationSurveyForm
            {...{
              form,
              onGotSuccess,
            }}
          />
        </InformationSurveySection>
        {isIntroduceCustomer && (
          <InformationSurveySection
            headerLabel={t('Information of the referrer', {
              vn: 'Thông tin của người giới thiệu',
            })}
          >
            <ReffererInformation />
          </InformationSurveySection>
        )}
        <div className="submit-btn-container">
          <Button
            {...{
              type: 'primary',
              onClick: onNextClick,
            }}
          >
            {t('Next', { vn: 'Tiếp theo' })}
          </Button>
        </div>
      </div>
      <ConfirmSendModal
        {...{
          onCancel: onCloseConfirmModal,
          visible: confirmVisile,
          onOk: onSubmit,
        }}
      />
    </>
  );
};

export default NotSubmitedPanel;
