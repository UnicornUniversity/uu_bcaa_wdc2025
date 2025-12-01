import React, { createContext, useContext, useState, useEffect } from "react";

const TransactionListContext = createContext();

export function useTransactionList() {
  const context = useContext(TransactionListContext);
  if (!context) {
    throw new Error(
      "useTransactionList must be used within a TransactionListProvider"
    );
  }
  return context;
}

export default function TransactionListProvider({ children }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setStatus("loading");
    setError(null);

    try {
      // Simulate 2 seconds delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch("/transaction/list");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const transactionData = await response.json();
      setData(transactionData);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Failed to fetch transactions");
      setStatus("error");
    }
  };

  const createTransaction = async (transactionData) => {
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/transaction/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const createdTransaction = await response.json();

      // Refresh the transaction list after successful creation
      await fetchTransactions();

      return createdTransaction;
    } catch (err) {
      setError(err.message || "Failed to create transaction");
      setStatus("error");
      throw err;
    }
  };

  const updateTransaction = async (transactionData) => {
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/transaction/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            errorData.error ||
            `HTTP error! status: ${response.status}`
        );
      }

      const updatedTransaction = await response.json();

      // Refresh the transaction list after successful update
      await fetchTransactions();

      return updatedTransaction;
    } catch (err) {
      setError(err.message || "Failed to update transaction");
      setStatus("error");
      throw err;
    }
  };

  const deleteTransaction = async (transactionId) => {
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/transaction/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: transactionId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            errorData.error ||
            `HTTP error! status: ${response.status}`
        );
      }

      // Refresh the transaction list after successful deletion
      await fetchTransactions();
    } catch (err) {
      setError(err.message || "Failed to delete transaction");
      setStatus("error");
      throw err;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const value = {
    data,
    status,
    error,
    handlerMap: {
      fetchTransactions,
      createTransaction,
      updateTransaction,
      deleteTransaction,
    },
  };

  return (
    <TransactionListContext.Provider value={value}>
      {children}
    </TransactionListContext.Provider>
  );
}
