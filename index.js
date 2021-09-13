const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const fetchTransactionListing = require('./util/fetchTransactionListing')

// List Transactions
app.get('/', async (_request, response) => {
  const { data: transactionListing } = await fetchTransactionListing()

  response.status(200).json({
    status: 'Success',
    message: 'List of all TASL Transactions',
    results: transactionListing
  })
})


// Fetch a Single Transaction by its ID
app.get('/fetch/transaction/:transactionID', async (request, response) => {
  let transaction
  const transactionID = request.params.transactionID
  const { data: transactionListing } = await fetchTransactionListing()

  const transactionIsInArray = transactionListing.some((element) => {
    return element.hits.hits[0]._source.transaction_id === transactionID
  })

  if (transactionIsInArray) {
    transaction = transactionListing.find((element) => {
      return element.hits.hits[0]._source.transaction_id === transactionID
    })

    response.status(200).send({
      data: transaction
    })
  }

  response.status(404).json({
    status: 'Error',
    message: `Transaction with ID, ${transactionID}, not found!`
  })
})

app.listen(`${PORT}`, () => console.log(`TASL Mock Server running on PORT ${PORT}`))
