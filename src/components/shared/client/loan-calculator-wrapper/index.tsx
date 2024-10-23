import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveLoanCalcObj } from '../loan-calculator/actions';
import { getLoanCalcObject } from '../loan-calculator/utils';

const LoanCalculatorWrapper = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveLoanCalcObj(getLoanCalcObject(router)));
  }, [router]);

  return children;
};

export default LoanCalculatorWrapper;