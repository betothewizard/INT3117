# C2 Coverage

- Path 1: 1 - 2(T) - 3 - 9\
  Test 1: makeDecision(300, 10000000, 12000000, 10000000)

- Path 2: 1 - 2(F) -4(T) - 5 - 9\
  Test 2: makeDecision(600, 10000000, 12000000, 21000000)

- Path 3: 1 - 2(F) - 4(F) - 6(T) - 7 - 9\
  Test 3: makeDecision(550, 10000000, 15000000, 8000000)

- Path 4: 1 - 2(F) - 4(F) - 6(F) - 8 - 9\
  Test 4: makeDecision(550, 10000000, 12000000, 10000000)

```mermaid
graph TD

    A[Start] --> K[1. maxLoanTerm = 0]
    K --> B{2. creditScore < 400 OR<br>creditScore > 700 OR<br>loanAmount <= 0 OR<br>collateralValue <= 0 OR<br>monthlyIncome <= 0}
    B -->|True| C["3. return {decision: 'I', maxLoanTerm}"]
    B -->|False| D{4. creditScore >= 580 AND<br>monthlyIncome >= 20000000 AND<br>collateralValue >= 1.2 * loanAmount}
    D -->|True| E["5. return {decision: 'A', maxLoanTerm: 120}"]
    D -->|False| F{6. creditScore >= 500 AND<br>creditScore < 580 AND<br>monthlyIncome >= 6000000 AND<br>monthlyIncome < 20000000 AND<br>collateralValue >= 1.5 * loanAmount}
    F -->|True| G["7. return {decision: 'C', maxLoanTerm: 60}"]
    F -->|False| H["8. return {decision: 'R, maxLoanTerm}"]
    C --> I[9. Exit]
    E --> I
    G --> I
    H --> I
```

| Testcase                                        | Expected output                   | Actual output                     | Result |
| ----------------------------------------------- | --------------------------------- | --------------------------------- | ------ |
| makeDecision(300, 10000000, 12000000, 10000000) | {decision: 'I', maxLoanTerm: 0}   | {decision: 'I', maxLoanTerm: 0}   | Passed |
| makeDecision(600, 10000000, 12000000, 21000000) | {decision: 'A', maxLoanTerm: 120} | {decision: 'A', maxLoanTerm: 120} | Passed |
| makeDecision(550, 10000000, 15000000, 8000000)  | {decision: 'C', maxLoanTerm: 60}  | {decision: 'C', maxLoanTerm: 60}  | Passed |
| makeDecision(550, 10000000, 12000000, 10000000) | {decision: 'R, maxLoanTerm: 0}    | {decision: 'R, maxLoanTerm: 0}    | Passed |
