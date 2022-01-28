# Transaction Discovery
A Mock Server designed to simulate a DB Instance containing transactions from NIBSS.

It provides endpoints for:

* Listing Transactions (http://localhost/1005)
  * The payload of transactions listing is generated using JSON Generator
* Fetching a Single Transaction (http://localhost/fetch/transaction/:transactionID)

# Test Transaction IDs
The available test Transactions are:

* IL462800050037810014901
* IL462800050037810014902
* IL462800050037810014903
* IL462800050037810014904
* IL462800050037810014905
* IL462800050037810014906
* IL462800050037810014907
* IL462800050037810014908
* IL462800050037810014909
* IL462800050037810014910
* IL462800050037810014911
* IL462800050037810014912
* IL462800050037810014913
* IL462800050037810014914
* IL462800050037810014915
* IL462800050037810014916

# Setup

1. Clone the project
2. Create the `.env` using the reference file `.env.example`
3. Run the command, `npm install`
4. Run the project using the command, `npm run dev`
