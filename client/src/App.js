import { useEffect, useState } from "react";

const initialForm = {
  amount: "",
  description: "",
  date: "",
};

function App() {
  const [form, setForm] = useState(initialForm);

  const [transactions, setTransactions] = useState([])

  useEffect(() =>{
    fetchTransactions()
  }, []);

  async function fetchTransactions(){
    const res = await fetch("http://localhost:4000/transaction");
    const {data} = await res.json();
    setTransactions(data);
  }

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/transaction",{
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        'content-type': "application/json",
      },
    });

    if(res.ok){
      setForm(initialForm);
      fetchTransactions();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleInput}
          placeholder="Enter transaction amount"
        ></input>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleInput}
          placeholder="Enter transaction details"
        ></input>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInput}
        />
        <button type="submit">Submit</button>
      </form>

      <br />

      <section>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trx) => (
              <tr key={trx._id}>
                <td>{trx.amount}</td>
                <td>{trx.description}</td>
                <td>{trx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}



export default App;
