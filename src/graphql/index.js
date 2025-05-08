import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { GRAPHQL_API_URL } from '../constants'
import { pinia, useAuthStore } from '../store'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: GRAPHQL_API_URL,
  credentials: 'include', // Añadido para enviar cookies con cada solicitud
})

// Auth link
const authLink = setContext((_, { headers }) => {
  const authStore = useAuthStore(pinia);
  
  return {
    headers: {
      ...headers,
      authorization: authStore.authState.token ? `Bearer ${authStore.authState.token}` : '',
    }
  }
})

// Create the apollo client
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export default apolloClient