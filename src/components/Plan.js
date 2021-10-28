import React, { useState, useEffect} from "react";
import Requirements from "./Requirements";
import Planner from "./Planner";
import CourseSelctor from "./CourseSelector";

const Plan =({msOptions, waivers})=> {
    const [plan, setPlan] = useState([]);
    
    function updatePlan() {
        setPlan(plan => [...plan, {dept: "CS", num: 4760}]);
    }

    return (
        <div className="plan-container">            
            <div className="plan-header">
                <h1>Create Your Academic Plan</h1>
            </div>
            <div className="plan-courses">
                <CourseSelctor />
            </div>
            <div className="plan-planner">
                <Planner />
            </div>
            <div className="plan-requirements">
                <Requirements msOptions={msOptions} plan={plan} waivers={waivers}/>
            </div>
            <div className="plan-footer">
                <button onClick={updatePlan}>Save Plan</button>
            </div>
        </div>
    );
}

export default Plan;