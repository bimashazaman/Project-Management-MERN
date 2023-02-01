const { projects, clients } = require('../sampleData')

const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
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
      resolve(parent, args) {
        return projects.filter((project) => project.clientId === parent.id)
      },
    },
  }),
})

// project type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return clients.find((client) => client.id === parent.clientId)
      },
    },
  }),
})

//Defining the root query.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return clients
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      // A function that returns the client that matches the id passed in the query.
      resolve(parent, args) {
        // code to get data from db / other source
        return clients.find((client) => client.id === args.id)
      },
    },

    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return projects
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return projects.find((project) => project.id === args.id)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})