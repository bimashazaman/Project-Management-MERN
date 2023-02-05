import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`

const ClientComponent = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  console.log(data)

  return (
    <div>
      {!loading &&
        !error &&
        data.clients.map((client) => (
          <div key={client.id}>
            <p>{client.name}</p>
            <p>{client.email}</p>
            <p>{client.phone}</p>
          </div>
        ))}
    </div>
  )
}

export default ClientComponent
