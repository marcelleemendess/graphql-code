const { UserList, MovieList } = require("../FakeData")
// resolvers will resolve the Queries that we have 
//  ex: type Query {
//     users: [User!]!
// }
const _ = require("lodash");

const resolvers = {
    Query: {
        // User Resolvers
        users: () => {
            //this is the place where you can make an api call
            // to your database go get data about users for ex.
            return UserList
        },
        user: (parent, args) => {
            const id = args.id;
            const user  = _.find(UserList, { id: Number(id) });
            return user;
        },
        //Movie Resolvers
        movies: () => {
            return MovieList;
        },
        movie: (parent, args) => {
            const name = args.name;
            const movie  = _.find(MovieList, { name: name });
            return movie;
        },
        //create a resolvers for User
        //whenever you have a fiel inside of a type that it doesn't return a basic type, 
        //you can add resolvers for taht field to that type adn specify what that field will return
        User: {
            favoriteMovies: () => {
                return _.filter(MovieList, (movie) => 
                    movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
                );
            },
        },
    },
};

module.exports = { resolvers };