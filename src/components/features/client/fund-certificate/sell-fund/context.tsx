import { createContext, ReactNode, useState } from 'react';
import { IFeeSellFundProduct } from './sell-fund-action';

export interface ISellActionContext {
  order: ISellOrder | undefined,
  otpTransId: string,
  visibleSell: boolean,
  loading: boolean,
  currentStepSell: string,
  volume: number | undefined,
  setOrder: (value: ISellOrder) => void,
  setVolume: (value: number | undefined) => void,
  fee: IFeeSellFundProduct | undefined,
  setOtpTransId: (value: string) => void,
  setVisibleSell: (value: boolean) => void,
  setLoading: (value: boolean) => void,
  setCurrentStepSell: (value: string) => void,
  setFee: (value: IFeeSellFundProduct | undefined) => void,
  product: any,
  setProduct: (value: any) => void,
  productProgram: any,
  setProductProgram: (value: any) => void,
}
export const initSellValue = {
  fee: undefined,
  otpTransId: '',
  order: undefined,
  volume: undefined,
  product: {},
  productProgram: {},
  visibleSell: false,
  loading: false,
  currentStepSell: '',
  setOtpTransId: (value: string) => {},
  setVisibleSell: (value: boolean) => {},
  setLoading: (value: boolean) => {},
  setCurrentStepSell: (value: string) => {},
  setVolume: (value: number | undefined) => {},
  setFee: (value: IFeeSellFundProduct | undefined) => {},
  setOrder: (value: ISellOrder) => {},
  setProduct: (value: any) => {},
  setProductProgram: (value: any) => {},
};
export const SellActionContext = createContext<ISellActionContext>(initSellValue);

export interface ISellOrder {
  volume: number,
  productId: number,
  productProgramId: number,
}

export const SellActionContextProvider = ({
  children,
}: {children: ReactNode}) => {
  const [volume, setVolume] = useState<number>();
  const [order, setOrder] = useState<ISellOrder>();
  const [fee, setFee] = useState<IFeeSellFundProduct>();
  const [visibleSell, setVisibleSell] = useState(false);
  const [otpTransId, setOtpTransId] = useState<string>('');
  const [currentStepSell, setCurrentStepSell] = useState<string>('');
  const [product, setProduct] = useState<any>({});
  const [productProgram, setProductProgram] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <SellActionContext.Provider value={{
      fee,
      order,
      volume,
      setFee,
      setOrder,
      setVolume,
      otpTransId,
      visibleSell,
      setOtpTransId,
      setVisibleSell,
      currentStepSell,
      setCurrentStepSell,
      product,
      setProduct,
      productProgram,
      setProductProgram,
      loading,
      setLoading,
    }}>
      {children}
    </SellActionContext.Provider>
  );
};
