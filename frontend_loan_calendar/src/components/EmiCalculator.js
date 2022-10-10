import React, { useEffect, useMemo, useState } from "react";
import LoanServices from "../services/LoanServices";

export default function EmiCalculator() {
  const emicalculator = {
    amount: "",
    rate: "",
    months: "",
    errors: {
      amount: "",
      rate: "",
      months: "",
    },
  };

  const finalEmi = {
    emi: "",
    interest: "",
    payment: "",
  };
  const [loanEmi, setLoanEmi] = useState(emicalculator);
  // const [emicalculatorError,setCalculateEmiError] = useState(emicalculator)
  const [calculateEmi, setCalculateEmi] = useState(finalEmi);
  const [confirmation, setConfirmation] = useState(false);
  const [userEmiHistory, setUserEmiHistory] = useState([]);
  const userId = localStorage.getItem("Id");

  const finalEmiCount = (ruppes, interest, months) => {
    const amount = ruppes;
    const rate = interest / 1200;
    const month = months;
    const monthEmi =
      Math.round(
        ((amount * rate) / (1 - Math.pow(1 / (1 + rate), month))) * 100
      ) / 100;
    const totalPayment = Math.round(monthEmi * month * 100) / 100;
    const totalInterest =
      Math.round((totalPayment * 1 - amount * 1) * 100) / 100;
    setCalculateEmi({
      ...calculateEmi,
      emi: Math.round(monthEmi),
      interest: Math.round(totalInterest),
      payment: Math.round(totalPayment),
    });
    setConfirmation(true);
  };

  const userEmiList = useMemo(() => {
    return (
      <>
        {userEmiHistory && userEmiHistory.length > 0 && (
          <div>
            <h2>All Emi History</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Months</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {userEmiHistory.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.amount}</td>
                      <td>{item.rate}%</td>
                      <td>{item.months}</td>
                      <td>
                        <button
                          onClick={() => {
                            setLoanEmi({
                              ...loanEmi,
                              amount: item.amount,
                              rate: item.rate,
                              months: item.months,
                            });
                            finalEmiCount(item.amount, item.rate, item.months);
                          }}
                        >
                          Check EMI
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  }, [userEmiHistory]);

  useEffect(() => {
    LoanServices.getEmiDetails(userId)
      .then((res) => {
        if (res.data.success) {
          setUserEmiHistory(res.data.msg.emiHistory);
        }
      })
      .catch((ex) => console.log(ex));
  }, [confirmation]);

  const formValidation = (emiData) => {
    const error = {};
    const keys = Object.keys(emiData.errors);
    let verify = true;
    for (const value of keys) {
      console.log(emiData[value]);
      if (emiData[value] === "") {
        verify = false;
        error[value] = "Required field";
      }
      setLoanEmi({ ...loanEmi, errors: error });
    }
    if (userEmiHistory?.length > 0) {
      userEmiHistory.forEach((item) => {
        if (
          item.amount === loanEmi.amount &&
          item.rate === loanEmi.rate &&
          item.months === loanEmi.months
        ) {
          verify = false;
        }
      });
    }
    return verify;
    // console.log(calculateEmi,verify);
  };

  const handleEmiCalculator = (e) => {
    e.preventDefault();
    if (formValidation(loanEmi)) {
      finalEmiCount(loanEmi.amount, loanEmi.rate, loanEmi.months);
      LoanServices.AddEmiDetails(userId, loanEmi)
        .then((res) => {
          if (res.data.success) {
            setUserEmiHistory(res.data.msg.emiHistory);
          }
        })
        .catch((ex) => console.log(ex));
    }
  };

  return (
    <div className="container my-5 ">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-centar text-primary">Loan Emi Calculator</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1">
                Loan Amount <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                value={loanEmi.amount}
                onChange={(e) =>
                  setLoanEmi({ ...loanEmi, amount: parseInt(e.target.value) })
                }
                id="exampleInputEmail1"
                required
              />
              {loanEmi && loanEmi.errors?.amount !== "" && (
                <small className="text-danger my-2">
                  {loanEmi.errors.amount}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1">
                Interest <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                value={loanEmi.rate}
                onChange={(e) =>
                  setLoanEmi({ ...loanEmi, rate: parseFloat(e.target.value) })
                }
                id="exampleInputPassword1"
                required
              />
              {loanEmi && loanEmi.errors?.amount !== "" && (
                <small className="text-danger my-2">
                  {loanEmi.errors.amount}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1">
                Loan Tenure (In Months) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                value={loanEmi.months}
                onChange={(e) =>
                  setLoanEmi({ ...loanEmi, months: parseInt(e.target.value) })
                }
                id="exampleInputPassword1"
              />
              {loanEmi && loanEmi.errors?.amount !== "" && (
                <small className="text-danger my-2">
                  {loanEmi.errors.amount}
                </small>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                onClick={handleEmiCalculator}
                className="btn btn-primary me-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmation(false);
                  setLoanEmi({
                    ...loanEmi,
                    amount: "",
                    rate: "",
                    months: "",
                    errors: {
                      amount: "",
                      rate: "",
                      months: "",
                    },
                  });
                }}
                className="btn btn-secondary"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6 py-5 ps-4">
          {confirmation && (
            <div className="w-100 my-5 border border-dark bg-gray">
              <h2>
                <span className="text-info pe-3">Monthly Loan EMI :</span>
                {calculateEmi.emi}
              </h2>
              <h2>
                <span className="text-info pe-3">Total Interest Payable :</span>
                {calculateEmi.interest}
              </h2>
              <h2>
                <span className="text-info pe-3">Total Payment :</span>
                {calculateEmi.payment}
              </h2>
            </div>
          )}
        </div>
      </div>
      <div>{userEmiList}</div>
    </div>
  );
}
