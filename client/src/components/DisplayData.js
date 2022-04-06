import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const QUERY_ALL_USERS = gql `
    query GetAllUsers {
        users {
        id
        name
        age
        username
        }
    }
`

function DisplayData() {

    const { data, loading, error } = useQuery(QUERY_ALL_USERS)

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
                    </div>
                );
        })}
    </div>
  )
}

export default DisplayData