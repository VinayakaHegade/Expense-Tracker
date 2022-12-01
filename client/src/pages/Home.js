import React from "react";
import { Container } from "@mui/system";
import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const token = Cookies.get('token')
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <Container>
      <TransactionForm
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
      />

      <TransactionsList
        transactions={transactions}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}
