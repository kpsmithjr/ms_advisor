import React from "react";
import { useHistory } from 'react-router-dom';


const Home =()=> {
    const history = useHistory();

    const createNewPlan = () => {
        history.push('/options');
    }

    return (
        <div className='home'>
            <h1>Welcom to the MS Advisor</h1>
            <p>
                This app will help you plan a course of study for the Master's Program in the Computer Science Department at the University of Missouri - St. Louis.
                You may start a new academic plan or load an existing one.
            </p>
            <button onClick={createNewPlan}>Creat New Plan</button>
            <button>Load Existing Plan</button>
            
        </div>
    );
}

export default Home;

//<input type="file" value="C:\fakepath" />