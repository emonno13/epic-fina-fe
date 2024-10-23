import { usePublicEnvironment } from '../../../../../system/hooks';

export function useTaxVAT(): number {
  return (+usePublicEnvironment('VAT') || 10) / 100;
}
