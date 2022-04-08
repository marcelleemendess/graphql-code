import React, { useState } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const QUERY_ALL_USERS = gql `
    query GetAllUsers {
        users {
        id
        name
        age
        username
        nationality
        }
    }
`;
const QUERY_ALL_MOVIES = gql `
    query GetAllUsers {
        movies {
            name
        }
    }
`;

const GET_MOVIE_BY_NAME = gql `
    query Movies($name: String!) {
        movie(name: $name) {
            name
            yearOfPublication
        }
    }
`;

const CREATE_USER_MUTATION = gql `
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name   
        }
    }
`;

function DisplayData() {
    const [movieSearched, setMovieSearched] = useState("");

     // Create User States
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("");

    const { data, loading, error } = useQuery(QUERY_ALL_USERS)
    const { data: movieData} = useQuery(QUERY_ALL_MOVIES)
    const [ fetchMovie, {data: movieSearchedData, error: movieError},] = useLazyQuery(GET_MOVIE_BY_NAME);
    // when we call the fetchMovie function we fetch the data.

    const [ createUser ] = useMutation(CREATE_USER_MUTATION)

    // if(loading) {
    //     return <h1>Data Loading...</h1>
    // }

    // if(data) {
    //     console.log(data);
    // }

    // if(error) {
    //     return  console.log(error);
    // }

  return (
    <div>
        <div>
            <input 
            type="text" 
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type="number" 
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Nationality"
                onChange={(e) => setNationality(e.target.value.toUpperCase())}
            />
            <button 
                onClick={() => {
                    createUser({variables: { input: { name, username, age:21, nationality }}})
                }}
            >
                Create User
            </button>
        </div>

        {/* always check if the data is available */}
        { data && 
            data.users.map((user) => {
                return (
                    <div key={user.id}>
                        <h2>Name: { user.name}</h2>
                        <h2>Nationality: { user.nationality}</h2>
                    </div>
                );
        })}

        { movieData &&
            movieData.movies.map((movie) => {
                return <h2 key={movie.name}>Movie Name: { movie.name }</h2>
            })
        }
        <div>
            <input 
                type="text" 
                placeholder="Interestellar..." 
                onChange={(e) => setMovieSearched(e.target.value)}
            />
            <button 
                onClick={() => {
                    // passing the variables, base on the state to fetch the right movies
                    fetchMovie({
                        variables: { 
                            name: movieSearched,
                        }
                    })
                }}
            >   Fetch Data
            </button>
            <div>
                {movieSearchedData && (
                <div>
                    <h1>MovieName: {movieSearchedData.movie.name}</h1>
                    <h1>
                        Year Of Publication: {movieSearchedData.movie.yearOfPublication}
                    </h1>{" "}
                </div>
                )}
                {movieError && <h1> There was an error fetching the data</h1>}
            </div>
        </div>
    </div>
  )
}

export default DisplayData