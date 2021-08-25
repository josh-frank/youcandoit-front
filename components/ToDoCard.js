import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled, { keyframes } from 'styled-components';

import homeStyles from '../styles/Home.module.css';

const toDoStyledAnimation = () => keyframes`
    0% { transform: rotate( 0deg ); }
    33% { transform: rotate( -5deg ); }
    66% { transform: rotate( 5deg ); }
    100% { transform: rotate( 0deg ); }
`;

const StyledToDo = styled.div`
    margin: 1rem;
    padding: 1.5rem;
    text-align: left;
    background: ${ ( { finished } ) => finished ? "darkgreen" : "darkred" };
    color: white;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: box-shadow 0.05s ease;
    width: 45%;
    &:hover, &:active, &:focus {
        animation: ${ toDoStyledAnimation() } 0.15s linear;
    }
`;

const StyledContentField = styled.textarea`
    border: none;
    background: none;
    font-family: inherit;
    font-size: x-large;
    font-weight: bold;
    color: inherit;
    resize: none;
`;

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
                return previousQueryData.filter( eachToDo => eachToDo.id !== previousQueryData.id );
            } );
            return deletedToDo;
        }
    } );

    return <StyledToDo finished={ todo.finished }>
        <StyledContentField
            cols={ 15 }
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
    </StyledToDo>;

};

export default ToDoCard;