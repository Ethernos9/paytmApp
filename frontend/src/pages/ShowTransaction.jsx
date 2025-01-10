import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

const ShowTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transaction = await axios.post(
          'http://localhost:5000/api/v3/transactions',
          {},
          { withCredentials: true }
        );

        if (transaction) {
          console.log('transactions --->', transaction);
          setTransactions(transaction.data.transactions);
        }
      } catch (error) {
        console.log('transactions error --->', error);
      }
    };

    fetchTransactions();
  }, []);

  const onClick = (transaction)=>{
       navigate(`/transaction/:${transaction.id}`, {state:transaction})
     
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div>
        <NavBar />
      </div>
      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-3xl font-bold text-center mb-6">Transactions</h2>
        <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              onClick={()=>onClick(transaction)}
              className="bg-white text-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-50"
            >
              <h3 className="text-xl font-semibold mb-2">Ethernos</h3>
              <p className="text-gray-700 mb-1">
                <strong>Description:</strong> {transaction?.description}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Amount:</strong> ₹ {transaction?.amount}
              </p>
              <p
                className={`text-sm font-medium ${
                  transaction?.status === 'Success'
                    ? 'text-green-600'
                    : transaction?.status === 'Failure'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}
              >
                <strong>Status:</strong> {transaction?.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowTransaction;
