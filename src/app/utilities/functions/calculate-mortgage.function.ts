import { AppFormResult } from '../../models/app-form.model';

export function CalculateMortgage(
  amount: string,
  term: number,
  interest: number,
  type: string
): AppFormResult {
  const amountNumber = parseFloat(amount.replace(/,/g, ''));

  const P = amountNumber;
  const r = interest / 100 / 12;
  const n = term * 12;
  const nt = (1 + r) ** n;

  let result: AppFormResult;
  const month = (P * r * nt) / (nt - 1);
  const total = month * n;

  //followed a formula from Chatgpt here couldn't care less

  if (type === 'repayment') {
    result = {
      main: month.toFixed(2),
      total: total.toFixed(2),
      type: type,
    };
  } else if (type === 'interest') {
    const totalInterest = total - P;
    result = {
      main: totalInterest.toFixed(2),
      total: total.toFixed(2),
      type: type,
    };
  } else {
    throw new Error();
  }

  return result;
}
