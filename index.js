require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const fetchTransactionListing = require('./util/fetchTransactionListing')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(`${PORT}`, () => console.log(`TASL Mock Server listening on port ${PORT}`))

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

// Fetch Single Transaction by ID using TASL Format
app.post('/:productApplication/_search', async (request, response) => {
  let transaction
  const productApplication = request.params.productApplication
  const {
    query: {
      match: { transactionid: transactionID }
    }
  } = request.body

  const { data: transactionListing } = await fetchTransactionListing()

  const transactionIsInArray = transactionListing.some((element) => {
    return element.hits.hits[0]._source.transaction_id === transactionID
  })

  if (transactionIsInArray) {
    transaction = transactionListing.find((element) => {
      return element.hits.hits[0]._source.transaction_id === transactionID
    })

    response.status(200).send({
      data: transaction,
      product_application: productApplication
    })
  }

  response.status(404).json({
    status: 'Error',
    message: `Transaction with ID, ${transactionID}, not found!`
  })
})
