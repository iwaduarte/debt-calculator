import React, { useState } from "react";
import style from "./Calculate.module.css";
import InputGroup from "../Components/Input/InputGroup.jsx";
import AddButton from "../Components/Button/AddButton.jsx";
import Button from "../Components/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { isNumber } from "../utils.js";
import { useContextHook } from "../Contexts/GroupsContext.jsx";
const { title } = style;

const Calculate = () => {
  const { data, setData } = useContextHook();
  const [groups, setGroups] = useState(
    data?.groups || [
      { key: 0, debt: 0, monthlyPayment: 0, repayment: 0, apr: 0 },
    ]
  );
  const [, setTotalDebt] = useState(0);
  const [, setTotalRepayment] = useState(0);
  const [, setTotalMonthlyPayment] = useState(0);
  const navigate = useNavigate();

  const handleClick = () =>
    setGroups((prevState) => [
      ...prevState,
      {
        key: prevState[prevState.length - 1].key + 1,
        debt: 0,
        repayment: 0,
        monthlyPayment: 0,
        apr: 0,
      },
    ]);
  const handleDelete = (value) => {
    setGroups((prevState) => prevState.filter(({ key }) => key !== value));
  };

  const handleItemTotal = (key) => (debt, monthlyPayment, repayment, apr) => {
    const index = groups.findIndex(({ key: itemKey }) => key === itemKey);
    setGroups((prevState) =>
      Object.assign([], prevState, {
        [index]: { key, debt, monthlyPayment, repayment, apr },
      })
    );
  };

  const handleCalculate = () => {
    const { totalDebt, totalMonthlyPayment, totalRepayment } = groups?.reduce(
      (acc, group) => {
        const { debt, monthlyPayment, repayment } = group || {};
        const { totalDebt, totalMonthlyPayment, totalRepayment } = acc || {};

        if (
          !debt ||
          !isNumber(debt) ||
          !monthlyPayment ||
          !isNumber(monthlyPayment)
        )
          return acc;

        const newTotalDebt = totalDebt + debt;
        const newTotalMonthlyPayment = totalMonthlyPayment + monthlyPayment;
        const newTotalRepayment = repayment + totalRepayment;

        return {
          totalDebt: newTotalDebt,
          totalMonthlyPayment: newTotalMonthlyPayment,
          totalRepayment: newTotalRepayment,
        };
      },
      { totalRepayment: 0, totalDebt: 0, totalMonthlyPayment: 0 }
    );
    setTotalDebt(totalDebt);
    setTotalRepayment(totalRepayment);
    setTotalMonthlyPayment(totalMonthlyPayment);

    setData({ groups });
    return navigate(
      `/debt-calculator/results?totalRepayment=${totalRepayment}&totalDebt=${totalDebt}&monthlyPayment=${totalMonthlyPayment}`
    );
  };

  return (
    <>
      <h4 className={title}> ENTER YOUR CURRENT DEBTS</h4>
      {groups.map((group) => {
        const { key } = group;
        return (
          <InputGroup
            key={key}
            closeIcon={!!key}
            onClick={() => handleDelete(key)}
            handleTotal={handleItemTotal(key)}
            values={group}
          />
        );
      })}
      <AddButton title="Add Another Debt" onClick={handleClick} />
      <Button title="Calculate Savings" onClick={handleCalculate} />
    </>
  );
};

export default Calculate;
