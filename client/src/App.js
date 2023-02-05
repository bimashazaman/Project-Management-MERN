import Layout from './components/layout/Layout'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql',
  }),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout> </Layout>
    </ApolloProvider>
  )
}

export default App
