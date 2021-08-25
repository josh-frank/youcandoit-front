import { useState } from 'react';

import { useMutation, useQueryClient } from 'react-query';

import { StyledForm } from "../styles/homeStyles";

const handleSubmission = async ( { toDoFormState } ) => {
    const response = await fetch( `http://localhost:${ 3001 }/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {
            user_id: 1,
            content: toDoFormState,
            finished: false
        } )
    } );
    return response.json();
};

const AddToDoForm = () => {

    const queryClient = useQueryClient();

    const [ toDoFormState, setToDoFormState ] = useState( "" );

    const { mutate } = useMutation( handleSubmission, {
        onSuccess: async newToDo => {
            setToDoFormState( "" );
            await queryClient.cancelQueries( "todos" );
            const previousValue = queryClient.getQueryData( "todos" );
            queryClient.setQueryData( "todos", previousQueryData => [...previousQueryData, newToDo ] );
            return previousValue;
        },
    } );

    return <StyledForm
        onSubmit={ async submissionEvent => {
            submissionEvent.preventDefault();
            try { mutate( { toDoFormState } ); }
            catch ( error ) { console.log( error ); }
        } }
    >
        <input
            required
            value={ toDoFormState }
            onChange={ changeEvent => setToDoFormState( changeEvent.target.value ) }
        />
        <input type="submit" value="Do it!" />
    </StyledForm>;

};

export default AddToDoForm;
