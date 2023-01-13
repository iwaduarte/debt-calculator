import React, { useEffect, useRef, useState } from "react";
import style from "./InputGroup.module.css";
import DebtInput from "./DebtInput.jsx";
import { finance } from "financejs";
import { FaTimes } from "react-icons/all.js";
import { validateNumbers } from "../../utils.js";

const { main, closeClass, outerClose } = style;

const InputGroup = ({
  closeIcon = false,
  onClick = () => {},
  handleTotal = () => {},
  values = {},
}) => {
  const { monthlyPayment: cachedMonthlyPayment, debt, apr: cachedAPR } = values;

  const [remainingDebt, setRemainingDebt] = useState(debt);
  const [apr, setApr] = useState(cachedAPR);
  const [monthlyPayment, setMonthlyPayment] = useState(cachedMonthlyPayment);
  const timeoutRef = useRef(null);

  const CloseIcon = closeIcon
    ? ({ className }) => <FaTimes className={className} onClick={onClick} />
    : () => null;

  useEffect(() => {
    if (apr && monthlyPayment && remainingDebt) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const monthsRemaining = finance.calculateMonths(
          remainingDebt,
          apr,
          monthlyPayment
        );
        const totalRepayment = monthsRemaining * monthlyPayment;
        handleTotal(remainingDebt, monthlyPayment, totalRepayment, apr);
      }, 500);
    }
  }, [apr, remainingDebt, monthlyPayment]);

  return (
    <>
      <div className={main}>
        <DebtInput title="Debt Name" placeholder="e.g Medical" />
        <DebtInput
          title="Remaining Debt Amount"
          type="number"
          placeholder="5000"
          prepend="$"
          onChange={validateNumbers(setRemainingDebt)}
          value={remainingDebt}
        />
        <DebtInput
          title="Current APR"
          type="number"
          placeholder="15.99"
          append="%"
          onChange={validateNumbers(setApr)}
          value={apr}
        />
        <DebtInput
          title="Current Monthly Payment"
          type="number"
          placeholder="200"
          prepend="$"
          onChange={validateNumbers(setMonthlyPayment)}
          value={monthlyPayment}
        />
        <div className={outerClose}>
          <CloseIcon className={closeClass} />
        </div>
      </div>
    </>
  );
};

export default InputGroup;
