const { GraphQLServer } = require('graphql-yoga')

// Stores the links at runtime
let links = [
  {
    id: 'link-0',
    url: 'www.medium.com',
    description: 'A Blog for stories'
  }
]

// Implementation of GraphQL schema
let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    }
  }
}

// schema and resolvers passed to GraphQLServer
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
