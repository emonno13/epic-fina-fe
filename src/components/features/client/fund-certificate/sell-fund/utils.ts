import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';

export const handleFinishSell = (initSellValue, sellContext) => {
  const {
    setOtpTransId,
    setVolume,
    setFee,
    setOrder,
    setProduct,
    setProductProgram,
  } = sellContext;
  setOtpTransId(initSellValue.OtpTransId);
  setVolume(initSellValue.volume);
  setFee(initSellValue.fee);
  setOrder(initSellValue.order);
  setProduct(initSellValue.product);
  setProductProgram(initSellValue.ProductProgram);
};

export const loadRedemptionFeeEstimation = async (
  volume,
  productId,
  productProgramId,
) => {
  if (!volume || !productId || !productProgramId) return undefined;
  try {
    const fee = await httpRequester.postToApi({
      url: endpoints.endpointWithApiDomain(
        '/products/load-redemption-fee-estimation-with-mio',
      ),
      params: {
        volume,
        productId,
        productProgramId,
      },
    });
    return fee;
  } catch (e) {
    return undefined;
  }
};
