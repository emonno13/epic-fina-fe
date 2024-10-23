import { useMemo } from 'react';
import { DEFAULT_BORROWED_TIME, DEFAULT_DTI_INDEX } from './constants';

export type LoanAbilityType = {
  totalIncome: number, // per month
  totalCost: number, // per month
  realInterestRate: number, // per year
  borrowedTime?: number, // year
  dtiIndex?: number // percentage
  className?: string;
}

export const useLoanAbility = (params: LoanAbilityType) => {
  const { borrowedTime = DEFAULT_BORROWED_TIME, realInterestRate, totalCost, totalIncome, dtiIndex } = params;
  const normalizedBorrowedTime = useMemo(() => borrowedTime || DEFAULT_BORROWED_TIME, [borrowedTime]); // thời gian vay
  const normalizedDtiIndex = useMemo(() => dtiIndex || DEFAULT_DTI_INDEX, [dtiIndex]); // 80%

  const totalMonthlyPayment = useMemo(() => {
    return totalIncome * normalizedDtiIndex / 100 - totalCost;
  }, [totalIncome, totalCost, normalizedDtiIndex]);

  const totalAnnuallyPayment = useMemo(() => {
    return totalMonthlyPayment * 12;
  }, [totalMonthlyPayment]);

  const loanableAmount = useMemo(() => {
    return totalMonthlyPayment / (1 / (normalizedBorrowedTime * 12) + realInterestRate / 12 / 100);
  }, [totalMonthlyPayment, normalizedBorrowedTime, realInterestRate]);

  // tiền lãi 1 tháng
  const interestMonthlyPayment = useMemo(() => {
    return (loanableAmount * (realInterestRate / 100)) / 12;
  }, [loanableAmount, realInterestRate]);

  // tiền gốc 1 tháng
  const rootMonthlyPayment = useMemo(() => {
    return loanableAmount / (normalizedBorrowedTime  * 12);
  }, [loanableAmount, normalizedBorrowedTime]);

  return {
    totalMonthlyPayment,
    totalAnnuallyPayment,
    loanableAmount,
    rootMonthlyPayment,
    interestMonthlyPayment,
  };
};
