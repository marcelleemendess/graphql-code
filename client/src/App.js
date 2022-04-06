import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DisplayData from './components/DisplayData';

function App() {

  const client = new ApolloClient({
    cache: new InMemoryCache(),  // save the data in cache-memory 
    uri: 'http://localhost:4000/graphql'
  });

  return (
    <ApolloProvider client={client}>
      <DisplayData />  
    </ApolloProvider>
    
  );
}

export default App;
