import { useEffect, useState, useContext } from "react";
import { DebtCreditContext } from "../context/DebtCreditContext"; // corrected import
import { useProfileContext } from "../hooks/useProfileContext";
import { useAuthContext } from "../hooks/useAuthContext";
import DebtDetails from "./DebtDetails";
import CreditDetails from "./CreditDetails";

const DebtCredit = () => {
  const { profile } = useProfileContext();
  const { user } = useAuthContext();
  const { state, updateDebtCredit } = useContext(DebtCreditContext);
  const { debts, credits } = state.debtCredit; // Updated to access debts and credits directly
  
  useEffect(() => {
    updateDebtCredit();
  }, [profile.userId]);

  useEffect(() => {
    const fetchDebtCredit = async () => {
      try {
        const response = await fetch(`/api/debtorCreditor/${profile.userId}`);
        const json = await response.json();
        // setDebts(json.debts);
        // setCredits(json.credits);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDebtCredit();
  }, [profile.userId]);
  console.log(debts);
  // const handleSettle = (id) => async () => {
  //   try {
  //     const response = await fetch(`/api/debtorCreditor/underSettlement/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({ UnderSettlement: true }),
  //     });
  //     if (response.ok)
  //     updateDebtCredit();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleConfirmSettlement = (id) => async () => {
  //   try {
  //     const response = await fetch(`/api/debtorCreditor/settled/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({ settled: true }),
  //     });
  //     if(response.ok)
  //     updateDebtCredit();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleDeclineSettlement = (id) => async () => {
  //   try {
  //     const response = await fetch(`/api/debtorCreditor/underSettlement/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({ UnderSettlement: false }),
  //     });
  //     if (response.ok)
  //     updateDebtCredit();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
    <div className="text-text p-4">
      <h2 className="text-4xl text-center mb-2">Debts</h2>
      
      <div className="border-1 border-border rounded-xl p-4 mb-4">
          <table className='text-text w-full'>
              <colgroup>
                <col className="w-[400px]"/>
                <col className="w-[300px]" />
                <col className="w-[200px]" />
                <col className="w-[200px]" />
                <col className="w-[400px]" />
              </colgroup>
              <thead className='text-zinc-300 [&_tr]:border-b'>
                <tr className='text-left align-middle border-border text-md'>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Tag</th>
                  <th className="pb-4">Amount</th>
                  <th className="text-center pb-4">Action</th>
                </tr>
              </thead>
              <tbody className='text-text [&_tr:last-child]:border-0'>
              {debts ? debts.map((debt) => (
                !debt.settled && (
                <tr className="w-full border-b border-border" key={debt._id}>
                  <DebtDetails debt={debt}/>
                </tr>
              ))) : <tr><h1>No debts Found</h1></tr>}
            </tbody>
          </table>
        </div>
      <h2 className="text-4xl text-center mb-2">Creditors</h2>
      
      <div className="border-1 border-border rounded-xl p-4">
          <table className='text-text w-full'>
              <colgroup>
                <col className="w-[400px]"/>
                <col className="w-[300px]" />
                <col className="w-[200px]" />
                <col className="w-[200px]" />
                <col className="w-[400px]" />
              </colgroup>
              <thead className='text-zinc-300 [&_tr]:border-b'>
                <tr className='text-left align-middle border-border text-md'>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Title</th>
                  <th className="pb-4">Tag</th>
                  <th className="pb-4">Amount</th>
                  <th className="text-center pb-4">Action</th>
                </tr>
              </thead>
              <tbody className='text-text [&_tr:last-child]:border-0'>
              {credits.map((credit) => (
                !credit.settled && (
                <tr className="w-full border-b border-border" key={credit._id}>
                  <CreditDetails credit={credit} />
                </tr>
              )))}
            </tbody>
          </table>
        </div>
    </div>
    </>
  );  
};

export default DebtCredit;