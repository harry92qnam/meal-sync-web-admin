import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Transaction() {
  const transactions = [
    { id: '1', title: 'Transaction 1' },
    { id: '2', title: 'Transaction 2' },
  ];
  return (
    <div className="flex">
      <div>
        <h1>Transactions</h1>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <Link to={`/transaction/${transaction.id}`}>{transaction.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
