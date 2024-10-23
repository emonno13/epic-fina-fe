import { TYPE_TIME } from '../constants';

export interface ItemBudgetPlanner {
  label: string,
  value?: number,
  time: string,
  annual?: number
}

export interface DefaultDataBudgetPlanner {
  totalIncomes: ItemBudgetPlanner[],
  homeExpenses: ItemBudgetPlanner[],
  livingExpenses: ItemBudgetPlanner[],
  vehicleTransport: ItemBudgetPlanner[],
  mortgageDebtRepayments: ItemBudgetPlanner[],
  leisureEntertainment:ItemBudgetPlanner[],
  insuranceSuperannuation: ItemBudgetPlanner[],
}

export const defaultDataBudgetPlanner = (t): DefaultDataBudgetPlanner => (
  {
    totalIncomes: [
      { label: t('netSalary'), time: TYPE_TIME.MONTH },
      { label: t('netBonuses'), time: TYPE_TIME.MONTH },
      { label: t('netSalaryPartner'), time: TYPE_TIME.MONTH },
      { label: t('netBonusesPartner'), time: TYPE_TIME.MONTH },
      { label: t('householdBusiness'), time: TYPE_TIME.MONTH },
      { label: t('pensionsAllowances'), time: TYPE_TIME.MONTH },
      { label: t('carRental'), time: TYPE_TIME.MONTH },
      { label: t('houseForRent'), time: TYPE_TIME.MONTH },
      { label: t('companyBusiness'), time: TYPE_TIME.MONTH },
      { label: t('investmentIncome'), time: TYPE_TIME.MONTH },
      { label: t('otherIncome'), time: TYPE_TIME.MONTH },
    ],
    homeExpenses: [
      { label: t('homeMaintenanceRenovations'), time: TYPE_TIME.MONTH },
      { label: t('gardeningPoolExpenses'), time: TYPE_TIME.MONTH },
      { label: t('homeServices'), time: TYPE_TIME.MONTH },
      { label: t('phoneMobileInternet'), time: TYPE_TIME.MONTH },
      { label: t('utilities'), time: TYPE_TIME.MONTH },
      { label: t('rentalCosts'), time: TYPE_TIME.MONTH },
      { label: t('other'), time: TYPE_TIME.MONTH },
    ],
    livingExpenses: [
      { label: t('groceriesFood'), time: TYPE_TIME.MONTH },
      { label: t('clothesShoes'), time: TYPE_TIME.MONTH },
      { label: t('medicalPharmaceutical'), time: TYPE_TIME.MONTH },
      { label: t('childCare'), time: TYPE_TIME.MONTH },
      { label: t('petCare'), time: TYPE_TIME.MONTH },
      { label: t('laundryDryCleaning'), time: TYPE_TIME.MONTH },
      { label: t('educationExpenses'), time: TYPE_TIME.MONTH },
      { label: t('other'), time: TYPE_TIME.MONTH },
    ],
    vehicleTransport: [
      { label: t('registrationFees'), time: TYPE_TIME.MONTH },
      { label: t('maintenanceRepairs'), time: TYPE_TIME.MONTH },
      { label: t('petrol'), time: TYPE_TIME.MONTH },
      { label: t('transportTaxis'), time: TYPE_TIME.MONTH },
      { label: t('parking'), time: TYPE_TIME.MONTH },
      { label: t('other'), time: TYPE_TIME.MONTH },
    ],
    mortgageDebtRepayments: [
      { label: t('realEstateMortgageRepayment'), time: TYPE_TIME.MONTH },
      { label: t('payingOffCarLoan'), time: TYPE_TIME.MONTH },
      { label: t('payingOffUnsecuredLoans'), time: TYPE_TIME.MONTH },
      { label: t('creditCards'), time: TYPE_TIME.MONTH },
      { label: t('other'), time: TYPE_TIME.MONTH },
    ],
    leisureEntertainment: [
      { label: t('restaurantsTakeaway'), time: TYPE_TIME.MONTH },
      { label: t('sportsHobbiesClubMemberships'), time: TYPE_TIME.MONTH },
      { label: t('newspapersMagazinesBooks'), time: TYPE_TIME.MONTH },
      { label: t('gift'), time: TYPE_TIME.MONTH },
      { label: t('alcoholCigarettesGambling'), time: TYPE_TIME.MONTH },
      { label: t('other'), time: TYPE_TIME.MONTH },
    ],
    insuranceSuperannuation: [
      { label: t('lifeInsurance'), time: TYPE_TIME.MONTH },
      { label: t('healthInsurance'), time: TYPE_TIME.MONTH },
      { label: t('propertyInsurance'), time: TYPE_TIME.MONTH },
      { label: t('other'), time: TYPE_TIME.MONTH },
    ],
  }
);

export const descriptionBudgetPlanner = 'Công cụ lập kế hoạch ngân sách có thể giúp bạn tính toán thu nhập và chi phí và tìm ra tình hình tài chính của bạn.';
