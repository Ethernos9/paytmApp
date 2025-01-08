import React from 'react'

const Transaction = ({transaction}) => {

  return (
    <div>
      <h2>Transaction ID: {transaction.transactionId}</h2>
      <h2>Transaction Amount: {transaction.amount}</h2>
      <h2>Transaction senderAccountNumber: {transaction.senderAccountNumber}</h2>
      <h2>Transaction receiverAccountNumber: {transaction.receiverAccountNumber}</h2>
      <h2>Transaction status: {transaction.status}</h2>
      <h2>Transaction description: {transaction.description}</h2>


    </div>
  )
}

export default Transaction