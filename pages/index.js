import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Characters from "../components/Characters";
import { useState } from "react";
import { ApolloClient } from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/core";
import { gql } from "@apollo/client/core";
import {
  Heading,
  Box,
  Flex,
  Input,
  Stack,
  IconButton,
  useToast,
} from "@chakra-ui/react";

export default function Home(results) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction="column" justify="center" align="center">
        <Box
          mb={4}
          flexDirection="column"
          align="center"
          justify="center"
          py={8}
        >
          <Heading as="h1" size="2xl" mb={8}>
            Rick and Morty
          </Heading>
          <Characters characters={characters} />
        </Box>
      </Flex>
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            id
            name
            location {
              id
              name
            }
            origin {
              id
              name
            }
            episode {
              id
              episode
            }
            image
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}
