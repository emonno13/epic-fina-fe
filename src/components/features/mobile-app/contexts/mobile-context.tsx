import React from 'react';

export type MobileContextType = {
  loginDrawerVisible: boolean;
  setLoginDrawerVisible: (flag: boolean) => void;
  setRedirect: React.Dispatch<React.SetStateAction<string>>;
  createTaskVisible: boolean;
  setCreateTaskVisible: React.Dispatch<React.SetStateAction<boolean>>;
  taskExtraValues: any,
  setTaskExtraValues: React.Dispatch<React.SetStateAction<any>>;
};

export const MobileContext = React.createContext<MobileContextType>({
  loginDrawerVisible: false,
  setLoginDrawerVisible: (f) => f,
  setRedirect: (f) => f,
  createTaskVisible: false,
  setCreateTaskVisible: (f) => f,
  taskExtraValues: '',
  setTaskExtraValues: (f) => f,
});
