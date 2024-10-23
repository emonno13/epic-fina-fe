import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { createContext } from 'react';

export const EditableContext = createContext<FormInstance<any> | null>(null);
