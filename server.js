const http = require('http')
require('dotenv').config()

const app = require('./index')
const port = process.env.PORT || 1005
const server = http.createServer(app)

server.listen(port, () => console.log(`TASL Mock Server listening on port ${port}`))
