import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
