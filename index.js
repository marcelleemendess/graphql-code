const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers")

// typeDefs: all piece of data, every query defined will exist inside typeDefs
//resolvers: all the funcions that resolve those types, like make calls to apis, 
//to databases, send data back will be enclosed inside of resolvers   

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log( `Your API is running at ${url}`)
})