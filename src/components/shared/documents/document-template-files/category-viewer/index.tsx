import { Column } from './column';
import { HorizontalScrollContainer } from './horizontal-scroll-container';
import { DocumentGroupViewer } from '../document-group-viewer';

import './category-viewer.module.scss';

export const CategoryViewer = ({ category, isDisabled }) => {
  const documentTemplateDetails = category.documentTemplateDetails || [];
  return (
    <>
      <h3 className={'category-viewer__title'}>{category?.name}</h3>

      <HorizontalScrollContainer grid={8}>
        {documentTemplateDetails.map((documentTemplateDetail, index) => {
          documentTemplateDetail.orderNumber = index;
          return (
            <Column grid={8} key={index}>
              <DocumentGroupViewer {...{ documentTemplateDetail, category, groupIndex: index, isDisabled }}/>
            </Column>
          );
        })}
      </HorizontalScrollContainer>
    </>
  );
};