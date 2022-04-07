import React, { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
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
        movies(name: $name) {
            name
            yearOfPublication
        }
    }
`;

function DisplayData() {

    const [movieSearched, setMovieSearched] = useState("")

    const { data, loading, error } = useQuery(QUERY_ALL_USERS)
    const { data: movieData} = useQuery(QUERY_ALL_MOVIES)
    const [ fetchMovie, {data: movieSearchedData, error: movieError},] = useLazyQuery(GET_MOVIE_BY_NAME);

    if(loading) {
        return <h1>Data Loading...</h1>
    }

    if(data) {
        console.log(data);
    }

    if(error) {
        return  console.log(error);
    }

  return (
    <div>
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
                        <h2>MovieName: { movieSearchedData.movie.name}</h2>
                        <h2>Year of Publication: { movieSearchedData.movie.yearOfPublication}</h2>
                    </div>
                )}
                {movieError && <h1> There was an error fetching the data</h1>}
            </div>
        </div>
    </div>
  )
}

export default DisplayData