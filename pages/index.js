import Head from 'next/head';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import AddToDoForm from '../components/AddToDoForm';
import ToDoCard from '../components/ToDoCard';

// import HomeFooter from '../components/HomeFooter';

import styles from '../styles/Home.module.css';

const queryClient = new QueryClient();

const ToDoCards = () => {
  const { isLoading, data } = useQuery( "todos", async () => {
    const response = await fetch( `http://localhost:${ 3001 }/todos` );
    return response.json();
  } );
  return <div className={ styles.grid }>
    { isLoading ? "Loading..." : data.map( todo => <ToDoCard
      key={ todo.id }
      todo={ todo }
      allTodos={ data }
    /> ) }
  </div>;
};

export default function Home() {

  return <QueryClientProvider client={ queryClient }>
    <div className={ styles.container }>

      <Head>
        <title>You can do it!</title>
        <meta name="description" content="Go ahead! You can do it!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={ styles.main }>

        <h1 className={ styles.title }>
          You can do it!
        </h1>

        <p className={ styles.description }>
          There's so much to do! I believe in you!
        </p>

        <AddToDoForm />
        
        <ToDoCards />

      </main>

      {/* <HomeFooter /> */}

    </div>
  </QueryClientProvider>;

}
