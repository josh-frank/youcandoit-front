import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { toDoStyledAnimation, StyledToDo, StyledToDoContentField, StyledToDoButton } from "../styles/homeStyles";

const saveToDoEdit = async ( { toDoEdits } ) => {
    const response = await fetch( `http://localhost:${ 3001 }/todos/content/${ toDoEdits.id }`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( { content: toDoEdits.content } )
    } );
    return response.json();
};

const toggleFinished = async ( { toDoEdits } ) => {
    const response = await fetch( `http://localhost:${ 3001 }/todos/finished/${ toDoEdits.id }`, { method: "PATCH" } );
    return response.json();
};

const deleteToDo = async ( { toDoEdits } ) => {
    const response = await fetch( `http://localhost:${ 3001 }/todos/${ toDoEdits.id }`, { method: "DELETE" } );
    return response.json();
};

const ToDoCard = ( { todo } ) => {

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
                return previousQueryData.filter( eachToDo => eachToDo.id !== deletedToDo.id );
            } );
            return deletedToDo;
        }
    } );

    return <StyledToDo finished={ todo.finished }>
        <StyledToDoContentField
            cols={ 15 }
            rows={ todo.content.length / 15 }
            value={ toDoEdits.content }
            onChange={ changeEvent => setToDoEdits( { ...toDoEdits, content: changeEvent.target.value } ) }
        />
        <div style={ { fontSize: "small", fontStyle: "italic" } }>
            <b>{ todo.finished ? "COMPLETE: " : "INCOMPLETE: " }</b>
            { todo.finished ? "I knew you could do it!" : "Let's do it!" }
        </div>
        <StyledToDoButton
            finished={ todo.finished }
            onClick={ () => {
                try {
                    toggleFinishedMutation.mutate( { toDoEdits } );
                }
                catch ( error ) { console.log( error ); }
            } }
        >
            { todo.finished ? "🕒 MARK UNFINISHED" : "✨ MARK FINISHED" }
        </StyledToDoButton>
        <StyledToDoButton
            finished={ todo.finished }
            onClick={ () => {
                try {
                    saveMutation.mutate( { toDoEdits } );
                }
                catch ( error ) { console.log( error ); }
            } }
        >
            💾 SAVE
        </StyledToDoButton>
        <StyledToDoButton
            finished={ todo.finished }
            onClick={ () => {
                try {
                    setToDoEdits( { ...toDoEdits, finished: !toDoEdits.finished } );
                    deleteMutation.mutate( { toDoEdits } );
                }
                catch ( error ) { console.log( error ); }
            } }
        >
            ❌ DELETE
        </StyledToDoButton>
    </StyledToDo>;

};

export default ToDoCard;