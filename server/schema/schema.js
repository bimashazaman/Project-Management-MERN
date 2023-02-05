const Client = require('../models/Client')
const Project = require('../models/Project')

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
        return Project.find({ clientId: parent.id })
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
        return Client.findById(parent.clientId)
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
        return Client.find({})
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      // A function that returns the client that matches the id passed in the query.
      resolve(parent, args) {
        // code to get data from db / other source
        return Client.findById(args.id)
      },
    },

    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({})
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
