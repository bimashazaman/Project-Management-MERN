const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
var { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

const port = 3000

const app = express()

connectDB()

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development', // only enable graphiql in development
  })
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
