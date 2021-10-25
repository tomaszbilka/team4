import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getUserFromLocalStorage } from './utils/localStorage';
import { UserProvider } from './contexts/UserContext';

const localStorageToken = 'wos-user';

const httpLink = createHttpLink({
  uri: 'https://worklog-on-steroids.herokuapp.com/api/ql_open',
});

const authLink = setContext((_, { headers }) => {
  const token = getUserFromLocalStorage(localStorageToken);

  console.log(token);
  if (token) {
    return {
      headers: {
        ...headers,
        'user-name': token,
      },
    };
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <App token={localStorageToken} />
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
