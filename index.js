const makeDecision = (
  creditScore,
  loanAmount,
  collateralValue,
  monthlyIncome
) => {
  let maxLoanTerm = 0;
  if (
    creditScore < 400 ||
    creditScore > 700 ||
    loanAmount <= 0 ||
    collateralValue <= 0 ||
    monthlyIncome <= 0
  ) {
    return { decision: "I", maxLoanTerm };
  }

  if (
    creditScore >= 580 &&
    monthlyIncome >= 20000000 &&
    collateralValue >= 1.2 * loanAmount
  ) {
    return { decision: "A", maxLoanTerm: 120 };
  }

  if (
    creditScore >= 500 &&
    creditScore < 580 &&
    monthlyIncome >= 6000000 &&
    monthlyIncome < 20000000 &&
    collateralValue >= 1.5 * loanAmount
  ) {
    return { decision: "C", maxLoanTerm: 60 };
  }
  return { decision: "R", maxLoanTerm };
};

module.exports = makeDecision;
