import Head from 'next/head';

import { useState } from 'react';

import AddToDoForm from '../components/AddToDoForm';
import ToDoCard from '../components/ToDoCard';

// import HomeFooter from '../components/HomeFooter';

import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  const response = await fetch( `http://localhost:${ process.env.API_PORT }/todos` );
  const todos = await response.json();
  if ( !todos ) return { notFound: true };
  return { props: { todos } };
}

const ToDoCards = ( { todos, setTodosToDisplay } ) => <div className={ styles.grid }>
  { todos.map( todo => <ToDoCard
    key={ todo.id }
    todo={ todo }
    allTodos={ todos }
    setTodosToDisplay={ setTodosToDisplay }
  /> ) }
</div>;

export default function Home( { todos } ) {

  const [ todosToDisplay, setTodosToDisplay ] = useState( todos || [] );

  return <div className={ styles.container }>

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

        <AddToDoForm setTodosToDisplay={ setTodosToDisplay } />

        <ToDoCards todos={ todosToDisplay } setTodosToDisplay={ setTodosToDisplay } />

      </main>

      {/* <HomeFooter /> */}

    </div>;

}
