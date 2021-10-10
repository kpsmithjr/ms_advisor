import React from "react";
import { useHistory } from 'react-router-dom';

const Waivers =()=> {
    const history = useHistory();

    function handleCancel() {
        history.goBack();
    }

    function handleSubmit() {
        history.push('/plan');
    }

    return (
        <div className='waivers-header'>
            <h1>Input Waivers</h1>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Waivers;