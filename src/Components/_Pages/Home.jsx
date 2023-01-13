import React, { useState } from "react";
import style from "./Home.module.css";
import { Outlet } from "react-router-dom";
import { Context } from "../../Contexts/GroupsContext.jsx";

const { main, subtext } = style;

const Home = ({}) => {
  const [data, setData] = useState({});
  return (
    <div className={main}>
      <h3> Debt Consolidation Savings Calculator</h3>
      <div className={subtext}>
        Enter the details of your current unsecured debt and see how much you
        may be able to save after consolidating the debts into a single loan.
        Only include credit card debt, medical debt, personal loan debt, and
        other types of unsecured debt.
      </div>
      <Context data={{ data, setData }}>
        <Outlet />
      </Context>
    </div>
  );
};

export default Home;
