const { UserList } = require("../FakeData")
// resolvers will resolve the Queries that we have 
//  ex: type Query {
//     users: [User!]!
// }

const resolvers = {
    Query: {
        users() {
            //this is the place where you can make an api call
            // to your database go get data about users for ex.
            return UserList
        }
    }
};

module.exports = { resolvers };