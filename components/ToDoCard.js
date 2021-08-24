import { useState } from 'react';
import homeStyles from '../styles/Home.module.css';

const saveToDoEdit = async ( idToUpdate, edit, allTodos, setTodosToDisplay ) => {
    await fetch( `http://localhost:${ 3001 }/todos/${ idToUpdate }`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( { content: edit } )
    } )
        .then( response => response.json() )
        .then( editedToDo => {
            const updatedTodos = [ ...allTodos ];
            updatedTodos.find( todo => todo.id === editedToDo.id ).content = editedToDo.content;
            setTodosToDisplay( updatedTodos );
        } );
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

    const [ toDoEdits, setToDoEdits ] = useState( todo.content );

    return <div className={ homeStyles.card } >
        <input
            value={ toDoEdits }
            onChange={ changeEvent => setToDoEdits( changeEvent.target.value ) }
        />
        <div className={ homeStyles.finished }>
            <b>{ todo.finished ? "COMPLETE: " : "INCOMPLETE: " }</b>
            { todo.finished ? "I knew you could do it!" : "Let's do it!" }
        </div>
        <button onClick={ () => toggleFinished( todo, allTodos, setTodosToDisplay ) }>
            { todo.finished ? "🕒Mark unfinished" : "✨Mark finished" }
        </button>
        <button onClick={ () => saveToDoEdit( todo.id, toDoEdits, allTodos, setTodosToDisplay ) }>
            💾Save
        </button>
        <button onClick={ () => deleteToDo( todo.id, allTodos, setTodosToDisplay ) }>
            ❌Delete
        </button>
    </div>;

};

export default ToDoCard;