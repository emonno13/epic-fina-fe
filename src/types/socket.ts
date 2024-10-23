export const SET_DATASOURCE_EVENT = 'set-datasource';
export const SET_DOCUMENT_DETAIL_EVENT = 'set-document-detail';
export const SET_PAGINATION_EVENT = 'set-pagination';

export type SetDatasourceEventArgType = {
  featureId: string;
  dataSource: any[];
  namespace?: string;
};

export type SetDocumentDetailDetailEventArgType = {
  featureId: string;
  documentDetail: any;
  namespace?: string;
  documentDetailVisibility?: boolean;
};

export type SetPaginationEventArgType = {
  featureId: string;
  pagination?: {
    page?: number;
    filter?: {
      limit: number;
      skip: number;
      order: string;
    }
  }
};
