import * as React from "react";
import styled from 'styled-components';
import CoursePlanner from "./CoursePlanner";
import Requirements from "./Requirements";

import SemItem from "../types/semItemType";
import IPlan from "../interfaces/iPlan";

const PlanContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 10px;
  grid-auto-rows: minmax(20px, auto);
`;

const PlannerContiner = styled.div`
`;

const RequirementsContainer = styled.div`
`;

const PlanFooterContainer = styled.div`
  text-align: center;
`;



const Plan = ({ msOptions, waivers, restrictedCourses, oldPlan, planHandler, transferHrs, completed}: IPlan)=> {
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
    let transferHours: number = +transferHrs
    const fileData = JSON.stringify({ msOptions, waivers, restrictedCourses, completed, plan, transferHours });
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'UMSL_CS_MS_Plan.txt';
    link.href = url;
    link.click();
  }

  return (
    <div>
      <div className="page-header">
        <h1>Academic Planner</h1>
      </div>
    <PlanContainer>            
      <PlannerContiner>
        <CoursePlanner plan={plan} waivers={waivers} restrictedCourses={restrictedCourses} completed={completed} planHandler={updatePlan}/>
      </PlannerContiner>            
      <RequirementsContainer>
        <Requirements msOptions={msOptions} plan={plan} waivers={waivers} restrictedCourses={restrictedCourses} transferHrs={transferHrs} completed={completed}/>
      </RequirementsContainer>      
    </PlanContainer>
    <PlanFooterContainer>
        <button onClick={savePlan}>Save Plan</button>
        <button onClick={saveToFile}>Save To File</button>
      </PlanFooterContainer>
    </div>
  );
}

export default Plan;