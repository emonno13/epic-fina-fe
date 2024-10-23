import { AnyObject } from '@components/shared/atom/type';
import { createContext } from 'react';

export interface ITaskManagerContext {
  visibleReopenTask?: boolean;
  setVisibleReopenTask?: (value: boolean) => void;
  documentSelected?: AnyObject;
  setDocumentSelected?: (value: AnyObject) => void;
}
export const TaskManagerContext = createContext<ITaskManagerContext>({
  visibleReopenTask: false,
  setVisibleReopenTask: (value: boolean) => {},
  documentSelected: undefined,
  setDocumentSelected: (value: AnyObject) => {},
});
