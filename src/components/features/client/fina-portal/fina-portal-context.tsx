import { makeCall, setEndingCall } from '@components/shared/stringee/actions';
import { CALL_DIRECTION } from '@components/shared/stringee/constant';
import { useCurrentUser } from '@lib/providers/auth';
import React, { createContext, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

export const TYPE_FINA_PORTAL = {
  HOME: 'HOME',
  ON_PHONE: 'ON_PHONE',
  COUNSELLING: 'COUNSELLING',
  BORROWER_INTRODUCTION: 'BORROWER_INTRODUCTION',
  SUCCESS: 'SUCCESS',
  INPUT_INFO_CUSTOMER: 'INPUT_INFO_CUSTOMER',
};

export type FinaPortalProviderType = {
  banners: any[];
  showForm: any;
  setShowForm: (t: any) => any;
  setStartCall: () => any;
  setEndCall: () => any;
};

export const FinaPortalContext = createContext<FinaPortalProviderType>({
  banners: [],
  showForm: TYPE_FINA_PORTAL.HOME,
  setShowForm: (f) => f,
  setStartCall: () => {},
  setEndCall: () => {},
});

export function useFinaPortalContext() {
  const context = React.useContext(FinaPortalContext);
  return context as FinaPortalProviderType;
}

export const FinaPortalProvider = ({ children, banners }) => {
  const [showForm, setShowForm] = useState(TYPE_FINA_PORTAL.HOME);
  const environments = useSelector(
    (state: RootStateOrAny) => state?.system?.environments,
  );
  const {
    private: { fina_number_call_out },
  } = environments;
  const dispatch = useDispatch();
  const currentUser: any = useCurrentUser();

  const setStartCall = () => {
    dispatch(
      makeCall({
        phoneNumber: fina_number_call_out,
        callingStaff: currentUser,
        currentUser,
        namespace: CALL_DIRECTION.CALL_OUT,
        isCallFromApp: true,
      }),
    );
  };

  const setEndCall = () => {
    dispatch(
      setEndingCall({ namespace: CALL_DIRECTION.CALL_OUT, currentUser }),
    );
  };

  return (
    <FinaPortalContext.Provider
      value={{
        banners,
        showForm,
        setShowForm,
        setStartCall,
        setEndCall,
      }}
    >
      {children}
    </FinaPortalContext.Provider>
  );
};
