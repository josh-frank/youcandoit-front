import Head from 'next/head';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import AddToDoForm from '../components/AddToDoForm';
import ToDoCard from '../components/ToDoCard';

// import HomeFooter from '../components/HomeFooter';

import { StyledGrid, StyledContainer, StyledMain } from "../styles/homeStyles"

const queryClient = new QueryClient();

const ToDoCards = () => {
  const { isLoading, data } = useQuery( "todos", async () => {
    const response = await fetch( `http://localhost:${ 3001 }/todos` );
    return response.json();
  } );
  return <StyledGrid>
    { isLoading ? "Loading..." : data.map( todo => <ToDoCard
      key={ todo.id }
      todo={ todo }
      allTodos={ data }
    /> ) }
  </StyledGrid>;
};

export default function Home() {

  return <QueryClientProvider client={ queryClient }>
    <StyledContainer>

      <Head>
        <title>You can do it!</title>
        <meta name="description" content="Go ahead! You can do it!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledMain>

        <h1 style={ { textAlign: "center", margin: 0, lineHeight: 1.15, fontSize: "4rem" } }>
          You can do it!
        </h1>

        <p style={ { textAlign: "center", lineHeight: 1.5, fontSize: "1.5rem" } }>
          There's so much to do! I believe in you!
        </p>

        <AddToDoForm />
        
        <ToDoCards />

      </StyledMain>

      {/* <HomeFooter /> */}

    </StyledContainer>
  </QueryClientProvider>;

}
