import { useState } from 'react';
import homeStyles from '../styles/Home.module.css';

const AddToDoForm = ( { setAllTodos } ) => {

    const [ toDoFormState, setToDoFormState ] = useState( "" );

    const handleSubmission = async submissionEvent => {
        submissionEvent.preventDefault();
        await fetch( `http://localhost:${ 3001 }/todos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( {
                content: toDoFormState,
                finished: false
            } )
        } )
            .then( response => response.json() )
            .then( newToDo => {
                setAllTodos( state => [ ...state, newToDo ] );
                setToDoFormState( "" );
            } );
    };

    return <form
        className={ homeStyles.form }
        onSubmit={ handleSubmission }
    >
        <input
            value={ toDoFormState }
            onChange={ changeEvent => setToDoFormState( changeEvent.target.value ) }
        />
        <input type="submit" value="Do it!" />
    </form>;

};

export default AddToDoForm;
