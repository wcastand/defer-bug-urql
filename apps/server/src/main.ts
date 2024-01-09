import { createServer } from 'node:http'
import { createSchema, createYoga } from 'graphql-yoga'
import { useDeferStream } from '@graphql-yoga/plugin-defer-stream'
import { IResolvers } from '@graphql-tools/utils'
 
const typeDefs = /* GraphQL */ `
  type Query {
    """
    A field that resolves fast.
    """
    fastField: String!
 
    """
    A field that resolves slowly.
    Maybe you want to @defer this field ;)
    """
    slowField(waitFor: Int! = 5000): String
  }
`
 
const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time))
 
const resolvers: IResolvers<any, {}> | Array<IResolvers<any, {}>> = {
  Query: {
    fastField: async () => {
      await wait(100)
      return 'I am speed'
    },
    slowField: async (_, { waitFor }) => {
      await wait(waitFor)
      return 'I am slow'
    }
  }
}
 
const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers
  }),
  plugins: [useDeferStream()]
})
 
const server = createServer(yoga)
 
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})