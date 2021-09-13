const axios = require('axios');
const taslJSONServer = process.env.TASL_JSON_SERVER
const taslJSONServerKey = process.env.TASL_JSON_SERVER_KEY

/**
 * @description Return the listing of transactions from the JSON Generator Schema
 * @return {array|object} Array of Transactions
 */
async function fetchTransactionListing() {
  return axios.get(
    `${taslJSONServer}`,
    {
      headers: {
        Authorization: `Bearer ${taslJSONServerKey}`,
        'Content-Type': 'application/json',
      }
    }
  );
}

module.exports = fetchTransactionListing;
