import * as React from "react";
import CoursePlanner from "./CoursePlanner";
import Requirements from "./Requirements";

import SemItem from "../types/semItem";

interface IUpdatePlan {
    newPlan: SemItem[];
}

const Plan =({msOptions, waivers, oldPlan, planHandler})=> {
    const [plan, setPlan] = React.useState<SemItem[]>(oldPlan);

    const updatePlan = (newPlan: SemItem[]) => {
        setPlan(newPlan);
    }

    const savePlan = () => {
        planHandler(plan);
        console.log(plan);
    }

    return (
        <div className="plan-container">            
            <div className="plan-header">
                <h1>Create Your Academic Plan</h1>
            </div>
            <div className="planner">
                <CoursePlanner plan={plan} planHandler={updatePlan}/>
            </div>            
            <div className="plan-requirements">
                <Requirements msOptions={msOptions} plan={plan} waivers={waivers}/>
            </div>
            <div className="plan-footer">
                <button onClick={savePlan}>Save Plan</button>
            </div>
        </div>
    );
}

export default Plan;