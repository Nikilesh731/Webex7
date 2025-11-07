import React, { useState } from "react";
import "./LoanEligibilityChecker.css";

const LoanEligibilityChecker = () => {
  const [fields, setFields] = useState({ name: "", age: "", salary: "", emi: "", loan: "" });
  const [result, setResult] = useState(null);

  const handleChange = e =>
    setFields({ ...fields, [e.target.name]: e.target.value });

  const checkEligibility = e => {
    e.preventDefault();
    const { name, age, salary, emi, loan } = fields;
    const errors = [];
    if (!name || !age || !salary || !emi || !loan) errors.push("Fill all fields.");
    if (age < 21 || age > 60) errors.push("Age 21-60 only.");
    if (+loan > 10 * +salary) errors.push("Loan ≤ 10×salary.");
    const proposedEMI = (+loan * 0.02125) / (1 - Math.pow(1 + 0.02125, -60)); // 10%/yr, 5yrs
    const dti = ((+emi + proposedEMI) / +salary) * 100;
    if (dti > 60) errors.push("DTI > 60%.");

    setResult(
      errors.length
        ? { eligible: false, reason: errors.join(" ") }
        : { eligible: true }
    );
  };

  return (
    <div className="loan-eligibility-container">
      <h2>Loan Eligibility Checker</h2>
      <form onSubmit={checkEligibility}>
        <label>
          Name: <input name="name" value={fields.name} onChange={handleChange} />
        </label>
        <label>
          Age: <input name="age" type="number" value={fields.age} onChange={handleChange} />
        </label>
        <label>
          Monthly Salary: <input name="salary" type="number" value={fields.salary} onChange={handleChange} />
        </label>
        <label>
          Existing EMI/Debts: <input name="emi" type="number" value={fields.emi} onChange={handleChange} />
        </label>
        <label>
          Loan Amount: <input name="loan" type="number" value={fields.loan} onChange={handleChange} />
        </label>
        <button type="submit">Check Loan Eligibility</button>
      </form>
      {result && (
        <div className={`loan-eligibility-result ${result.eligible ? "eligible" : "not-eligible"}`}>
          {result.eligible ? "Eligible" : `Not Eligible: ${result.reason}`}
        </div>
      )}
    </div>
  );
};

export default LoanEligibilityChecker;
