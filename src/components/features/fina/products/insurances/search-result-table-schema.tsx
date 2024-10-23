import { EyeOutlined, FormOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { Button, Modal, Tag } from 'antd';
import Tooltip from 'antd/lib/tooltip';
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share';
import { useState } from 'react';
import { ConverterUtils } from '../../../../../lib/converter';
import { useCurrentUser } from '../../../../../lib/providers/auth';
import {
  useDeleteDocumentControl,
  useEditDocumentControl,
  useSetDocumentDetail,
} from '../../../../../schema-form/features/hooks';
import { ItemViewer } from '../../../../shared/common/configuration/item-viewer';
import { PRODUCT_SOURCE } from './constant';
import { ProductPvi } from './pvi';

import { USER_TYPES } from '../../../../../types/organization';
import { Link } from '../../../../shared/link';

import '../../../../../styles/_default_responsive.scss';
import '../product.module.scss';

export const InsurancesProductTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  const currentUser: any = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const editControl = useEditDocumentControl();
  const deleteDocumentControl = useDeleteDocumentControl();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleDocumentSelected = useSetDocumentDetail();

  return [
    TableUtils.createTableColumnConfig({
      title: t('Manufacture'),
      dataIndex: 'org',
      sortable: true,
      key: 'orgId',
      width: 250,
      render: (_, document: any) => {
        let productUrl = '';
        switch (document.source) {
          case PRODUCT_SOURCE.GLOBAL_CARE:
            productUrl =
              document?.info?.productUrlOriginal &&
              document?.info?.codeGatewayGlobalCare
                ? `${document?.info?.productUrlOriginal}&staff_id=${currentUser.id}&token=${document?.info?.codeGatewayGlobalCare}`
                : document?.info?.productUrlOriginal;
            break;
          case PRODUCT_SOURCE.GOTRUST:
            productUrl = `${document?.info?.productUrlOriginal}/?s=${currentUser.id}&r=Fina`;
            break;
          default:
            break;
        }
        const GroupAction = () => {
          const detailLink = `/admin/products/insurances?documentId=${document.id}`;
          return (
            <div className="d-f-center common-responsive__mobile-action">
              <div className={'m-l-5 m-r-5'}>
                {productUrl && (
                  <div className="d-f-center m-r-10">
                    <Tooltip placement="topLeft" title="Click me">
                      <a href={productUrl} target="_blank" rel="noreferrer">
                        {' '}
                        <EyeOutlined />
                      </a>
                    </Tooltip>
                  </div>
                )}
              </div>
              <div
                className={'m-l-5 m-r-5'}
                onClick={() => handleDocumentSelected(document)}
              >
                <Link href={detailLink}>
                  <FormOutlined />
                </Link>
              </div>
            </div>
          );
        };
        const ShareSocialMedia = () => {
          return (
            <div className="d-f-center">
              {productUrl && (
                <>
                  <div className={'m-l-5 m-r-5'}>
                    <FacebookShareButton
                      url={productUrl}
                      quote={document?.name}
                      hashtag={'#fina'}
                    >
                      <FacebookIcon size={24} round />
                    </FacebookShareButton>
                  </div>
                  <div
                    className={'m-l-5 m-r-5'}
                    dangerouslySetInnerHTML={createZaloShareButton(
                      productUrl,
                      '579745863508352884',
                    )}
                  />
                  <div className={'m-l-5 m-r-5'}>
                    <WhatsappShareButton
                      url={productUrl}
                      title={document?.name}
                    >
                      <WhatsappIcon size={24} round />
                    </WhatsappShareButton>
                  </div>
                </>
              )}
            </div>
          );
        };
        return (
          <div className={'product common-responsive'}>
            <GroupAction />
            <div className={'common-responsive__mobile'}>
              <ItemViewer
                {...{
                  label: t('Code'),
                  value: <Tag color={'rgb(0, 104, 255)'}>#{document.code}</Tag>,
                  labelClassName: 'm-b-0i',
                }}
              />
              <ItemViewer
                {...{
                  label: t('Name'),
                  value: document?.name,
                  labelClassName: 'm-b-0i',
                }}
              />
              <ItemViewer
                {...{
                  label: t('Category', { vn: 'Danh mục' }),
                  value: ConverterUtils.showCategoryConverter(
                    document?.category,
                  ),
                  labelClassName: 'm-b-0i',
                }}
              />
              <ItemViewer
                {...{
                  label: t('Commission', { vn: 'Hoa hồng' }),
                  value: `${document?.commissionSettings?.insurancesSettingReceive?.percentCommission || '-'}  (%)`,
                  labelClassName: 'm-b-0i',
                }}
              />
              <ItemViewer
                {...{
                  label: t('Social media share', { vn: 'Chia Sẻ Link Mua' }),
                  value: <ShareSocialMedia />,
                  labelClassName: 'm-b-0i',
                  className: 'social-media-share',
                }}
              />
            </div>
            <ItemViewer
              {...{
                label: t('Manufacture'),
                value: ConverterUtils.showOrgConverter(document?.org),
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product title'),
      dataIndex: 'name',
      sortable: true,
      responsive: ['md'],
      width: 300,
      render: (_, document: any) => {
        return (
          <div>
            <ItemViewer
              {...{
                label: t('Code'),
                value: document?.code,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Name'),
                value: document?.name,
                labelClassName: 'm-b-0i',
              }}
            />
            <ItemViewer
              {...{
                label: t('Commission', { vn: 'Hoa hồng' }),
                value: `${document?.commissionSettings?.insurancesSettingReceive?.percentCommission || '-'}  (%)`,
                labelClassName: 'm-b-0i',
              }}
            />
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Category', { vn: 'Danh mục' }),
      dataIndex: 'category',
      sortable: true,
      responsive: ['md'],
      key: 'categoryId',
      width: 250,
      render: ConverterUtils.showCategoryConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'description',
      sortable: true,
      responsive: ['md'],
      key: 'description',
      width: 500,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Product original', { vn: 'Sản phẩm bảo hiểm' }),
      dataIndex: 'name',
      sortable: true,
      responsive: ['md'],
      width: 250,
      render: (_, document: any) => {
        let productUrl = '';
        let modalProduct;
        switch (document.source) {
          case PRODUCT_SOURCE.GLOBAL_CARE:
            productUrl =
              document?.info?.productUrlOriginal &&
              document?.info?.codeGatewayGlobalCare
                ? `${document?.info?.productUrlOriginal}&staff_id=${currentUser.id}&token=${document?.info?.codeGatewayGlobalCare}`
                : document?.info?.productUrlOriginal;
            modalProduct = (
              <iframe
                title={productUrl || ''}
                allowFullScreen
                frameBorder="0"
                height={'500px'}
                src={productUrl || ''}
                width={'100%'}
              />
            );
            break;
          case PRODUCT_SOURCE.GOTRUST:
            productUrl = `${document?.info?.productUrlOriginal}/?s=${currentUser.id}&r=Fina`;
            modalProduct = (
              <iframe
                title={productUrl || ''}
                allowFullScreen
                frameBorder="0"
                height={'500px'}
                src={productUrl || ''}
                width={'100%'}
              />
            );
            break;
          case PRODUCT_SOURCE.PVI:
            modalProduct = (
              <ProductPvi {...{ product: document, setIsModalVisible }} />
            );
            break;
          default:
            break;
        }
        const showModal = () => {
          if (
            document.source === PRODUCT_SOURCE.GLOBAL_CARE ||
            document.source === PRODUCT_SOURCE.GOTRUST
          ) {
            window.open(
              `${productUrl}`,
              '_blank',
              'toolbar=yes,scrollbars=yes,resizable=yes,top=150,left=200,width=500,height=400',
            );
            return;
          }
          setIsModalVisible(true);
        };
        const handleCancel = () => {
          setIsModalVisible(false);
        };
        return (
          <div>
            <Button size={'middle'} onClick={showModal}>
              {t('Open Product', { vn: 'Hiển thị sản phẩm' })}
            </Button>
            <Modal
              destroyOnClose={true}
              visible={isModalVisible}
              width={'80%'}
              footer={false}
              onCancel={handleCancel}
            >
              {modalProduct}
            </Modal>
          </div>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Social media share', { vn: 'Chia Sẻ Link Mua' }),
      sortable: true,
      responsive: ['md'],
      width: 250,
      render: (_, document: any) => {
        const productGlobalCareUrl =
          document?.info?.productUrlOriginal &&
          document?.info?.codeGatewayGlobalCare
            ? `${document?.info?.productUrlOriginal}&staff_id=${currentUser.id}&token=${document?.info?.codeGatewayGlobalCare}`
            : document?.info?.productUrlOriginal;
        return (
          <div className="d-f-center">
            {productGlobalCareUrl && (
              <>
                <div className={'m-l-5 m-r-5'}>
                  <FacebookShareButton
                    url={productGlobalCareUrl}
                    quote={document?.name}
                    hashtag={'#fina'}
                  >
                    <FacebookIcon size={24} round />
                  </FacebookShareButton>
                </div>
                <div
                  className={'m-l-5 m-r-5'}
                  key={document?.id}
                  dangerouslySetInnerHTML={createZaloShareButton(
                    productGlobalCareUrl,
                    '579745863508352884',
                  )}
                />
                <div className={'m-l-5 m-r-5'}>
                  <WhatsappShareButton
                    url={productGlobalCareUrl}
                    title={document?.name}
                  >
                    <WhatsappIcon size={24} round />
                  </WhatsappShareButton>
                </div>
              </>
            )}
          </div>
        );
      },
    }),
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 100,
      responsive: ['md'],
      render: (_, document) => {
        let productUrl = '';
        switch (document.source) {
          case PRODUCT_SOURCE.GLOBAL_CARE:
            productUrl =
              document?.info?.productUrlOriginal &&
              document?.info?.codeGatewayGlobalCare
                ? `${document?.info?.productUrlOriginal}&staff_id=${currentUser.id}&token=${document?.info?.codeGatewayGlobalCare}`
                : document?.info?.productUrlOriginal;
            break;
          case PRODUCT_SOURCE.GOTRUST:
            productUrl = `${document?.info?.productUrlOriginal}/?s=${currentUser.id}&r=Fina`;
            break;
          default:
            break;
        }
        return (
          <div className="d-f-center">
            {productUrl && (
              <div className="d-f-center m-r-10">
                <Tooltip placement="topLeft" title="Click me">
                  <a href={productUrl} target="_blank" rel="noreferrer">
                    {' '}
                    <EyeOutlined />
                  </a>
                </Tooltip>
              </div>
            )}
            <div>{isOrgStaff && editControl(document)}</div>
            <div className="p-l-10" color="danger">
              {isOrgStaff && deleteDocumentControl(document)}
            </div>
          </div>
        );
      },
    },
  ];
};

function createZaloShareButton(href, OAId) {
  return {
    __html: `<div class="zalo-share-button" data-href="${href}" data-oaid="${OAId}" data-layout="2" data-color="blue" data-customize=false></div>`,
  };
}
