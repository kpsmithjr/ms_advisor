import * as React from "react";
import CoursePlanner from "./CoursePlanner";
import Requirements from "./Requirements";

import SemItem from "../types/semItemType";
import IPlan from "../interfaces/iPlan";

const Plan = ({ msOptions, waivers, restrictedCourses, oldPlan, planHandler}: IPlan)=> {
    const [plan, setPlan] = React.useState<SemItem[]>(oldPlan);

    const updatePlan = (newPlan: SemItem[]) => {
        setPlan(newPlan);
    }

    const savePlan = () => {
        planHandler(plan);
        console.log(plan);
    }

    const saveToFile = () => {
        planHandler(plan);
        const fileData = JSON.stringify({ msOptions, waivers, restrictedCourses, plan });
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'UMSL_CS_MS_Plan.txt';
        link.href = url;
        link.click();
    }

    return (
        <div className="plan-container">            
            <div className="plan-header">
                <h1>Create Your Academic Plan</h1>
            </div>
            <div className="planner">
                <CoursePlanner plan={plan} waivers={waivers} restrictedCourses={restrictedCourses} planHandler={updatePlan}/>
            </div>            
            <div className="plan-requirements">
                <Requirements msOptions={msOptions} plan={plan} waivers={waivers} restrictedCourses={restrictedCourses}/>
            </div>
            <div className="plan-footer">
                <button onClick={savePlan}>Save Plan</button>
                <button onClick={saveToFile}>Save To File</button>
            </div>
        </div>
    );
}

export default Plan;