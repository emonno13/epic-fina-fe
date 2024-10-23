import { createContext, useState } from 'react';

export const BuyFundContextProvider = ({ children }) => {
  const [fees, setFees] = useState([]);
  const [volume, setVolume] = useState('');

  return <BuyFundContext.Provider value={{
    fees,
    setFees,
    volume,
    setVolume,
  }}>
    {children}
  </BuyFundContext.Provider>;
};
export const BuyFundContext = createContext<any>({});
