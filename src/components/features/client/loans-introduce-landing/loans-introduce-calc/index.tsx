import HScrollAnimation from '@components/shared/common/h-scroll-animation';
import { Tabs } from 'antd';
import BankLoanCalculator from '../../calculators-toolkit/bank-loan-calculator';
import BudgetPlanner from '../../calculators-toolkit/budget-planner';
import CalculatingTaxBySalary from '../../calculators-toolkit/calculating-tax-by-salary';
import LoanCalculator from '../../calculators-toolkit/loan-calculator';

import './loan-introduce-calc.module.scss';

const { TabPane } = Tabs;

const LoanIntroduceCalc = () => {
  return (
    <div className="content-loan-calc-tool">
      <HScrollAnimation>
        <div id="calculation-tool" className="loans-introduce-container">
          <div className="content-loan-calc">
            <div className="title-itroduce-loan-calc">Công cụ tính</div>
            {/* <LoanCalculatorWrapper>
							<LoanCalc />
						</LoanCalculatorWrapper> */}

            <Tabs defaultActiveKey="1" className="loans-introduce-tabs">
              <TabPane tab={'Công cụ tính khoản vay'} key={1}>
                <LoanCalculator />
              </TabPane>
              <TabPane tab={'Tính toán khả năng vay'} key={2}>
                <BankLoanCalculator />
              </TabPane>
              <TabPane tab={'Thiết lập kế hoạch ngân sách'} key={3}>
                <BudgetPlanner />
              </TabPane>
              <TabPane tab={'Tính thuế theo lương'} key={4}>
                <CalculatingTaxBySalary />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </HScrollAnimation>
    </div>
  );
};

export default LoanIntroduceCalc;
