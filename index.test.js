const makeDecision = require("./index");

test("Invalid input", () => {
  expect(makeDecision(300, 10000000, 12000000, 10000000)).toEqual({
    decision: "I",
    maxLoanTerm: 0,
  });
});

test("Accepted", () => {
  expect(makeDecision(600, 10000000, 12000000, 21000000)).toEqual({
    decision: "A",
    maxLoanTerm: 120,
  });
});

test("Under consideration", () => {
  expect(makeDecision(550, 10000000, 15000000, 8000000)).toEqual({
    decision: "C",
    maxLoanTerm: 60,
  });
});

test("Rejected", () => {
  expect(makeDecision(550, 10000000, 12000000, 10000000)).toEqual({
    decision: "R",
    maxLoanTerm: 0,
  });
});
