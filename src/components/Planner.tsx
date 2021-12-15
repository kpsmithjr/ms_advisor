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

const PlanHeaderContainer = styled.div`
  margin: 10px;
  display: flex;
`;

const InstructionContainer = styled.div`
  margin-left: 25px;
`;

const InstructionHeaderContainer = styled.div`
  margin-left: 10px;
`;

const InstructionButtonContainer = styled.button`
  width: 150px;
`;
const SaveButtonContainer = styled.button`
  background: lightgreen;
  width: 150px;
`;

const Plan = ({ msOptions, waivers, restrictedCourses, oldPlan, planHandler, transferHrs, completed}: IPlan)=> {
  const [plan, setPlan] = React.useState<SemItem[]>(oldPlan);
  
  const updatePlan = (newPlan: SemItem[]) => {
    setPlan(newPlan);
  }

	React.useEffect(() => {
		planHandler(plan);
	}, [plan]);
  
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

  const [showInstructions, setShowInstructions] = React.useState<boolean>(false);

  const handleInstructions = (e:any) => {
    setShowInstructions(!showInstructions);
    console.log(showInstructions);
  };


  return (
    <div>
      <PlanHeaderContainer>
        <h1>Academic Planner</h1>
        &nbsp;&nbsp;&nbsp;
        <InstructionButtonContainer onClick={handleInstructions}>
          Instructions
        </InstructionButtonContainer>
        &nbsp;&nbsp;&nbsp;
        <SaveButtonContainer onClick={saveToFile}>
          Save To File
        </SaveButtonContainer>        
        
      </PlanHeaderContainer>
      { showInstructions && 
        <React.Fragment>
          <InstructionHeaderContainer>
            <b>Instructions: </b>
          </InstructionHeaderContainer>
          <InstructionContainer>
            <li>Create your acadmic plan by dragging courses from 'Available Courses' to the desired semester.</li>
            <li>We recommend starting with any restricted courses, followed by your desired 6000+ course and any prerequisites, next your core courses, and finally your electives.              
            </li>
            <br></br>
          </InstructionContainer>
          <InstructionHeaderContainer>
            <b>Available Courses: </b>
          </InstructionHeaderContainer>
          <InstructionContainer>
            <li>This section provides a list of the CS courses based on the 3-year course rotation.
            Any courses you have selcted as 'waived' or 'completed' will not be shown. Additionally, only courses &gt; 4000 will
            be shown, unless you have selected a course as restricted.</li>
            <li>If you have selected "Evening-only" or "Online-only" options earlier, only courses meeting those criteria will be shown.</li>
            <li>Courses may be added to a semester using drag-and-drop. When dragging a course,
            a semester will be shaded grey if the course cannot be added.</li>
            <li>You may display a description of a course, including prerequisites and scheduling info, by double-clicking on a course. </li>
            <br></br>
          </InstructionContainer>
          <InstructionHeaderContainer>
            <b>Semester Planner: </b>
          </InstructionHeaderContainer>
          <InstructionContainer>
            <li>This section shows your academic plan by semester. Click the 'Add Semester' button to add more semesters.</li>
            <li>The Available Courses can be filtered by clicking a semester title. To change the filter, click another semester
            or deselect the semester.</li>
            <li>Courses can be moved between semesters, or they can be removed by dragging the course back to the 'Available Courses' section.</li>
            <li>Courses are shaded red if the prerequiste(s) are not planned before the course is planned.</li>
            <br></br>
          </InstructionContainer>
          <InstructionHeaderContainer>
            <b>Degree Checklist: </b>
          </InstructionHeaderContainer>
          <InstructionContainer>
            <li>This section compares your academic plan to the degree requirements.</li>
            <li>If a requirement is met, the item will appear green. Any requirement not met will appear red. An elective will appear grey if
              it is not planned, but the required number of electives are planned.
            </li>
            <li>Courses that are waived will have a '(W)' next to them.</li>
            <li>The number of completed and transfered credit hours (if any) will appear above the requirements.</li>
          </InstructionContainer>
          <div className="spacer"> </div>
        </React.Fragment>
      }
      <PlanContainer>
        <PlannerContiner>
          <CoursePlanner options = {msOptions} plan={plan} waivers={waivers} restrictedCourses={restrictedCourses} completed={completed} planHandler={updatePlan}/>
        </PlannerContiner>
        <RequirementsContainer>
          <Requirements msOptions={msOptions} plan={plan} waivers={waivers} restrictedCourses={restrictedCourses} transferHrs={transferHrs} completed={completed}/>
        </RequirementsContainer>
      </PlanContainer>      
    </div>
  );
}

export default Plan;