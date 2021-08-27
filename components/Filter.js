import { useState } from "react";

const Filter = () => {

    const [ filterState, setFilterState ] = useState( { finished: true, unfinished: true } );

    return <form>
        <label>View:</label>
        <input
            type="checkbox"
            checked={ filterState.finished }
            onChange={ finishedCheckEvent => setFilterState( { ...filterState, finished: finishedCheckEvent.target.checked } ) }
        />
        <label>Finished</label>
        <input
            type="checkbox"
            checked={ filterState.unfinished }
            onChange={ finishedCheckEvent => setFilterState( { ...filterState, unfinished: finishedCheckEvent.target.checked } ) }
        />
        <label>Unfinished</label>
    </form>;

};

export default Filter;