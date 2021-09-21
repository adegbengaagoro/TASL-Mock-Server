require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const mwBasicAuth = require('./middleware/basicAuth')
const fetchTransactionListing = require('./util/fetchTransactionListing')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(mwBasicAuth)

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
  try {
    // let transaction
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

    if (!transactionIsInArray) {
      throw Error('Transaction Record Not Found!')
    }

    const transaction = transactionListing.find((element) => {
      return element.hits.hits[0]._source.transaction_id === transactionID
    })

    response.send({
      data: transaction,
      product_application: productApplication
    })
  } catch (fetchTransactionError) {
    console.log('fetchTransactionError => ', fetchTransactionError)

    response.send({
      status: 'Error',
      message: `Transaction not found!`
    })
  }
})
