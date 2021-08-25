import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import homeStyles from '../styles/Home.module.css';

const saveToDoEdit = async ( { toDoEdits } ) => {
    console.log( toDoEdits )
    const response = await fetch( `http://localhost:${ 3001 }/todos/${ toDoEdits.id }`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( { content: toDoEdits.content } )
    } );
    return response.json();
};

const toggleFinished = async ( toDo, allTodos, setTodosToDisplay ) => {
    await fetch( `http://localhost:${ 3001 }/todos/${ toDo.id }`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( { finished: !toDo.finished } )
    } )
        .then( response => response.json() )
        .then( () => {
            const updatedTodos = [ ...allTodos ];
            updatedTodos.find( eachToDo => eachToDo.id === toDo.id ).finished = !toDo.finished;
            setTodosToDisplay( updatedTodos );
        } );
};

const deleteToDo = async ( idToDelete, allTodos, setTodosToDisplay ) => {
    await fetch( `http://localhost:${ 3001 }/todos/${ idToDelete }`, { method: "DELETE" } )
        .then( response => response.json() )
        .then( () => {
            const updatedTodos = allTodos.filter( todo => todo.id !== idToDelete );
            setTodosToDisplay( updatedTodos );
        } );
};

const ToDoCard = ( { todo, allTodos, setTodosToDisplay } ) => {

    const queryClient = new useQueryClient();

    const [ toDoEdits, setToDoEdits ] = useState( {
        id: todo.id,
        content: todo.content
    } );

    const saveMutation = useMutation( saveToDoEdit, {
        onSuccess: async updatedToDo => {
            await queryClient.cancelQueries( "todos" );
            const previousEdit = queryClient.getQueryData( "todos" );
            queryClient.setQueryData( "todos", previousQueryData => {
                const newQueryData = [ ...previousQueryData ];
                newQueryData.find( eachToDo => eachToDo.id === todo.id ).content = updatedToDo.content;
                return newQueryData;
            } );
            return previousEdit;
        }
    } );

    return <div className={ homeStyles.card } >
        <input
            value={ toDoEdits.content }
            onChange={ changeEvent => setToDoEdits( { ...toDoEdits, content: changeEvent.target.value } ) }
        />
        <div className={ homeStyles.finished }>
            <b>{ todo.finished ? "COMPLETE: " : "INCOMPLETE: " }</b>
            { todo.finished ? "I knew you could do it!" : "Let's do it!" }
        </div>
        <button onClick={ () => toggleFinished( todo, allTodos, setTodosToDisplay ) }>
            { todo.finished ? "🕒Mark unfinished" : "✨Mark finished" }
        </button>
        <button onClick={ () => {
            try { saveMutation.mutate( { toDoEdits } ); }
            catch ( error ) { console.log( error ); }
        } }>
            💾Save
        </button>
        <button onClick={ () => deleteToDo( todo.id, allTodos, setTodosToDisplay ) }>
            ❌Delete
        </button>
    </div>;

};

export default ToDoCard;