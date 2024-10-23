import { HModal, HModalProps } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { useTableSourceData } from '@schema-form/features/hooks';
import { Button, Col, Radio, Row } from 'antd';
import { isEmpty } from 'lodash';
import { SetStateAction } from 'react';

interface TemplateModalProps extends HModalProps {
  setSelectedDocumentId: React.Dispatch<SetStateAction<string>>;
  selectedDocumentId: string;
  handleSubmitChange: () => void;
}
export default function TemplateModal(props: TemplateModalProps) {
  const { t } = useHTranslation('common');
  const {
    setSelectedDocumentId,
    selectedDocumentId,
    handleSubmitChange,
    ...restProps
  } = props;
  const categoriesAndDocuments = useTableSourceData() || [];

  return (
    <HModal
      footer={null}
      {...restProps}
      title={t('Select folder', { vn: 'Chọn thư mục chuyển tới' })}
      extraTitle={
        <Button type="primary" onClick={handleSubmitChange}>
          Submit
        </Button>
      }
      className="template-modal"
    >
      <div className="options">
        {categoriesAndDocuments.map((category) => {
          return (
            <div key={category.id}>
              <h4 className="title">{category?.name}</h4>
              <Radio.Group
                onChange={(e) => setSelectedDocumentId(e.target.value)}
                value={selectedDocumentId}
              >
                <Row gutter={[5, 5]}>
                  {category?.documentTemplateDetails?.map(
                    (documentTemplateDetail) => {
                      if (isEmpty(documentTemplateDetail?.document)) {
                        return <></>;
                      }

                      return (
                        <Col key={documentTemplateDetail.document.id} span={12}>
                          <Radio value={documentTemplateDetail.document.id}>
                            {documentTemplateDetail.document.name.toLowerCase()}
                          </Radio>
                        </Col>
                      );
                    },
                  )}
                </Row>
              </Radio.Group>
              <br />
              <br />
            </div>
          );
        })}
      </div>
    </HModal>
  );
}
