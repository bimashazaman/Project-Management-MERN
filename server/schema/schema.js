const { projects, clients } = require('../sampleData')

const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql

// client type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    projects: {
      type: new GraphQLList(ProjectType),
      //  A function that returns the projects that are associated with the client.
      resolve(parent, args) {
        return projects.filter((project) => project.clientId === parent.id)
      },
    },
  }),
})

//Defining the root query.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      // A function that returns the client that matches the id passed in the query.
      resolve(parent, args) {
        // code to get data from db / other source
        return clients.find((client) => client.id === args.id)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
