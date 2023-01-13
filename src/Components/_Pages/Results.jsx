import React, { useEffect, useState } from "react";
import style from "./Results.module.css";
import { FaArrowLeft } from "react-icons/all";
import Slider from "../Slider/Slider.jsx";
import { Link, useSearchParams } from "react-router-dom";
import { finance } from "financejs";
import { formatNumbers } from "../../utils";

const {
  box,
  anchor,
  icon,
  configureLoan,
  highlight,
  slider,
  borderBottom,
  textFlex,
  row,
  heading,
  numbers,
  blueColor,
  greenColor,
  line,
  innerLine,
  comparison,
} = style;

const Results = () => {
  const [search] = useSearchParams();
  const [desiredAPR, setDesiredAPR] = useState(8);
  const [desiredLoanTerm, setDesiredLoanTerm] = useState(24);
  const [currentRepayment] = useState(search.get("totalRepayment"));
  const [totalDebt] = useState(search.get("totalDebt"));
  const [currentMonthlyPayment] = useState(search.get("monthlyPayment"));
  const [newMonthlyPayment, setNewMonthlyPayment] = useState(0);
  const [newTotalRepayment, setNewTotalRepayment] = useState(0);

  useEffect(() => {
    const _newMonthlyRepayment = finance.calculatePayment(
      totalDebt,
      desiredLoanTerm,
      desiredAPR
    );
    setNewMonthlyPayment(_newMonthlyRepayment);
    setNewTotalRepayment(Math.round(_newMonthlyRepayment * desiredLoanTerm));
  }, [desiredAPR, desiredLoanTerm]);

  return (
    <>
      <Link className={anchor} to={"/supermoney"}>
        <FaArrowLeft className={icon} />
        Update Your Current Debts
      </Link>
      <div className={box}>
        <div className={borderBottom}>
          <div className={configureLoan}>
            <h3>CONFIGURE YOUR CONSOLIDATED LOAN </h3>
            <small>
              Use the sliders below to simulate the new APR and loan term.
            </small>
            <div className={slider}>
              <div className={highlight}>
                <h4>DESIRED APP</h4>
                <span>{desiredAPR.toFixed(2)}%</span>
              </div>
              <Slider
                min={4}
                max={36}
                unit="%"
                value={desiredAPR}
                onChange={(value) => setDesiredAPR(value)}
              />
            </div>
            <div className={slider}>
              <div className={highlight}>
                <h4> DESIRED LOAN TERM</h4>
                <span>{desiredLoanTerm} months </span>
              </div>
              <Slider
                min={12}
                max={60}
                unit="mo"
                value={desiredLoanTerm}
                onChange={(value) => setDesiredLoanTerm(value)}
              />
            </div>
          </div>
        </div>
        <div className={comparison}>
          <div className={row}>
            <div className={textFlex}>
              <span className={heading}> New Total Repayment </span>
              <span className={`${numbers} ${blueColor}`}>
                ${newTotalRepayment.toLocaleString()}
              </span>
            </div>
            <div className={textFlex}>
              <span className={heading}>New Monthly Payment </span>
              <span className={`${numbers} ${blueColor}`}>
                ${formatNumbers(newMonthlyPayment)}
              </span>
            </div>
          </div>
          <div className={line}>
            <div className={innerLine}></div>
          </div>
          <div className={row}>
            <div className={textFlex}>
              <span className={heading}> Current Total Repayment </span>
              <span className={numbers}>
                ${formatNumbers(currentRepayment)}
              </span>
            </div>
            <div className={textFlex}>
              <span className={heading}>Current Monthly Payment </span>
              <span className={numbers}> ${currentMonthlyPayment}</span>
            </div>
          </div>
          <div className={row}>
            <div className={textFlex}>
              <span className={heading}>Total Repayment Savings </span>
              <span className={`${numbers} ${greenColor}`}>
                ${formatNumbers(currentRepayment - newTotalRepayment)}
              </span>
            </div>
            <div className={textFlex}>
              <span className={heading}> Total Monthly Savings </span>
              <span className={`${numbers} ${greenColor}`}>
                ${formatNumbers(currentMonthlyPayment - newMonthlyPayment)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
