export type CrudOperators =
  | 'eq'
  | 'ne'
  | 'lt'
  | 'gt'
  | 'lte'
  | 'gte'
  | 'in'
  | 'nin'
  | 'contains'
  | 'ncontains'
  | 'containss'
  | 'ncontainss'
  | 'between'
  | 'nbetween'
  | 'null'
  | 'nnull'
  | 'startswith'
  | 'nstartswith'
  | 'startswiths'
  | 'nstartswiths'
  | 'endswith'
  | 'nendswith'
  | 'endswiths'
  | 'nendswiths'
  | 'or'
  | 'and';

export type LogicalFilter = {
  field: string;
  operator: Exclude<CrudOperators, 'or' | 'and'>;
  value: any;
};

export type ConditionalFilter = {
  key?: string;
  operator: Extract<CrudOperators, 'or' | 'and'>;
  value: (LogicalFilter | ConditionalFilter)[];
};

export type CrudFilter = LogicalFilter | ConditionalFilter;
export type CrudSort = {
  field: string;
  order: 'asc' | 'desc';
};

export type SetFilterBehavior = 'merge' | 'replace';
export type CrudFilters = CrudFilter[];
export type CrudSorting = CrudSort[];
export type BaseKey = string | number;
export type BaseRecord = {
  id?: BaseKey;
  [key: string]: any;
};
export interface GetListResponse<TData = BaseRecord> {
  data: TData[];
  metadata: {
    parsedPage: number;
    parsedPageSize: number;
    total: number;
  };
  [key: string]: any;
}

export interface ValidationErrors {
  [field: string]: string | string[] | boolean | { key: string; message: string };
}
export interface HttpError extends Record<string, any> {
  message: string;
  statusCode: number;
  errors?: ValidationErrors;
}

export interface TableSorters {
  /**
   * Initial sorter state
   */
  initial?: CrudSorting;
  /**
   * Default and unchangeable sorter state
   *  @default `[]`
   */
  permanent?: CrudSorting;
  /**
   * Whether to use server side sorting or not.
   * @default "server"
   */
  mode?: 'server' | 'off';
}

export interface TableFilters {
  /**
   * Initial filter state
   */
  initial?: CrudFilters;
  /**
   * Default and unchangeable filter state
   *  @default `[]`
   */
  permanent?: CrudFilters;
  /**
   * Default behavior of the `setFilters` function
   * @default `"merge"`
   */
  defaultBehavior?: SetFilterBehavior;
  /**
   * Whether to use server side filter or not.
   * @default "server"
   */
  mode?: 'server' | 'off';
}
