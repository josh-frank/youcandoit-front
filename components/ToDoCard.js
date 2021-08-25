import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import homeStyles from '../styles/Home.module.css';

const saveToDoEdit = async ( { toDoEdits } ) => {
    const response = await fetch( `http://localhost:${ 3001 }/todos/${ toDoEdits.id }`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( { content: toDoEdits.content } )
    } );
    return response.json();
};

const toggleFinished = async ( { toDoEdits } ) => {
    const response = await fetch( `http://localhost:${ 3001 }/todos/${ toDoEdits.id }`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( { finished: !toDoEdits.finished } )
    } );
    return response.json();
};

const deleteToDo = async ( { toDoEdits } ) => {
    const response = await fetch( `http://localhost:${ 3001 }/todos/${ toDoEdits.id }`, { method: "DELETE" } );
    return response.json();
};

const ToDoCard = ( { todo, allTodos, setTodosToDisplay } ) => {

    const queryClient = new useQueryClient();

    const [ toDoEdits, setToDoEdits ] = useState( { ...todo } );

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

    const toggleFinishedMutation = useMutation( toggleFinished, {
        onSuccess: async updatedToDo => {
            await queryClient.cancelQueries( "todos" );
            const previousEdit = queryClient.getQueryData( "todos" );
            queryClient.setQueryData( "todos", previousQueryData => {
                const newQueryData = [ ...previousQueryData ];
                newQueryData.find( eachToDo => eachToDo.id === todo.id ).finished = updatedToDo.finished;
                return newQueryData;
            } );
            return previousEdit;
        }
    } );

    const deleteMutation = useMutation( deleteToDo, {
        onSuccess: async deletedToDo => {
            await queryClient.cancelQueries( "todos" );
            queryClient.setQueryData( "todos", previousQueryData => {
                console.log(previousQueryData)
                return previousQueryData.filter( eachToDo => eachToDo.id !== previousQueryData.id );
            } );
            return deletedToDo;
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
        <button onClick={ () => {
            try { toggleFinishedMutation.mutate( { toDoEdits } ); }
            catch ( error ) { console.log( error ); }
        } }>
            { todo.finished ? "🕒Mark unfinished" : "✨Mark finished" }
        </button>
        <button onClick={ () => {
            try { saveMutation.mutate( { toDoEdits } ); }
            catch ( error ) { console.log( error ); }
        } }>
            💾Save
        </button>
        <button onClick={ () => {
            try { deleteMutation.mutate( { toDoEdits } ) }
            catch ( error ) { console.log( error ); }
        } }>
            ❌Delete
        </button>
    </div>;

};

export default ToDoCard;