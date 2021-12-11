import React from "react";
import SemItem from "../types/semItemType";
import styled from 'styled-components';
import RequirementsLine from "./RequirementsLine";
import RequirementsColumn from "./RequirementsColumn";

import IRequirements from "../interfaces/iRequirements";

import ReqLine from "../types/reqLine"
import Course from "../types/courseType"
import MsOptionsType from "../types/msOptions";

import coreReqs from "../data/core_reqs.json";
import track_reqs from "../data/track_req.json";

interface IReqContainerProps {
  met: boolean;
};

const RequirementContainer = styled.div<IReqContainerProps>`
  color: ${props => (props.met ? 'green' : 'red')};
`;

const Requirements = ({msOptions, plan, waivers, restrictedCourses, transferHrs, completed} : IRequirements) => {
  let optReq: any;
  let track_found = false;
  for (let i = 0; i < track_reqs.length; ++i) {
    if (msOptions.msTrack === track_reqs[i].name) {
      optReq = track_reqs[i];
      track_found = true;
      break;
    }
  }

  if (!track_found) {
    console.log(msOptions.msTrack);
    console.error("Unknown Track");
  }

  const calcCompletedHours = ():number => {
    let hrs:number = 0;

    for (let i = 0; i < completed.length; ++i) {
      hrs += (completed[i].num >= 4000 ? 3 : 0);
    }

    return hrs;
  };


  const calcCreditHours = (plan: SemItem[]): number => {
    let credHrs:number = +transferHrs; // 'transferHrs' was treated as string. This converts it to number
    
    for (let i:number = 0; i < plan.length; ++i) {
      for (let j: number = 0; j < plan[i].courses.length; ++j) {
        credHrs += (plan[i].courses[j].num >= 4000 ? 3 : 0);
      }
    }

    credHrs += calcCompletedHours();    
    
    return credHrs;
  }

  const calcCreditHours5000 = (plan: SemItem[]) => {
    let credHrs: number = 0;
            
    for (let i:number = 0; i < plan.length; ++i) {
      for (let j:number = 0; j < plan[i].courses.length; ++j) {
        if (plan[i].courses[j].num >= 5000) {
          credHrs += 3;
        }
      }
    }

    for (let i:number = 0; i < completed.length; ++i) {
      credHrs += (completed[i].num >= 5000 ? 3 : 0);
    }
    return credHrs;
  }

  const check6000Course = (plan: SemItem[]) => {
    for (let i:number = 0; i < plan.length; ++i) {        
      for (let j:number = 0; j < plan[i].courses.length; ++j) {
        if (((plan[i].courses[j].dept === 'CS') || (plan[i].courses[j].dept === 'CMP SCI')) 
          && (plan[i].courses[j].num >= 6000)){
          return true;          
        }
      }
    }

    for (let i:number = 0; i < completed.length; ++i) {
      if (((completed[i].dept === 'CS') || (completed[i].dept === 'CMP SCI')) 
          && (completed[i].num >= 6000)){
          return true;          
        }
    }
    return false;
  };
  
  const isCourseWaived = (dept: string, num: number, waivers: Course[]) => {
    for (let i = 0; i < waivers.length; ++i) {
      if ((waivers[i].dept === dept) && (waivers[i].num === num)) {
        return true;
      }
    }
    return false;
  };

  const genReqArr = (reqs: any, waivers: Course[]) => {
    let reqArr = [] as string[][];

    // Loop over all requirement vectors
    for (let i:number = 0; i < reqs.length; ++i) {
      if (reqs[i].courses.length === 0) {
        return reqArr;          
      }

      let courseTxt = reqs[i].courses[0].dept + " " + reqs[i].courses[0].num.toString();
      if (isCourseWaived(reqs[i].courses[0].dept, reqs[i].courses[0].num, waivers)) {
        courseTxt += " (W)";
      }
      let courseArr = [courseTxt];

      // For each requirement vector, loop over all courses
      for (let j:number = 1; j < reqs[i].courses.length; ++j) {
        courseArr.push(" or ");
        let courseTxt = reqs[i].courses[j].dept + " " + reqs[i].courses[j].num.toString();
        if (isCourseWaived(reqs[i].courses[0].dept, reqs[i].courses[0].num, waivers)) {
          courseTxt += "(W)";
        }
        courseArr.push(courseTxt);
      }
      reqArr.push(courseArr);
    }
    return reqArr;
  };

  const restrictedArr = (courses: Course[]) => {
    let reqArr = [] as string[][];
    if (courses.length === 0) {
      return reqArr;
    } else {
      for (let j: number = 0; j < courses.length; ++j) {
        reqArr.push([courses[j].dept + " " + courses[j].num.toString()]);
      }
      return reqArr;
    }
  }

  const isCourseInPlan = (course: Course, plan: SemItem[]):boolean => {
    for (let i = 0; i < plan.length; ++i) {
      for (let j = 0; j < plan[i].courses.length; ++j) {
        if ((course.dept === plan[i].courses[j].dept) && (course.num === plan[i].courses[j].num)) {
          return true;
        }
      }
    }
    return false;
  }

  const isCourseCompleted = (course: Course):boolean => {
    for (let i = 0; i < completed.length; ++i) {
      if ((course.dept === completed[i].dept) && (course.num === completed[i].num)) {
        return true;
      }
    }
    return false;
  }

  const updateColor = (reqline:ReqLine, plan:SemItem[], defaultToTwo:boolean) => {
    // Intialize everything to 0
    const defaultNum:number = defaultToTwo ? 2 : 0;
    let clrArr:number[] = Array(reqline.courses.length*2-1).fill(defaultNum);

    let count = 0;
    // Set course color to 1 if in plan
    for (let i = 0; i < reqline.courses.length; ++i) {
      if (isCourseInPlan(reqline.courses[i], plan) || isCourseCompleted(reqline.courses[i])
      || isCourseWaived(reqline.courses[i].dept, reqline.courses[i].num, waivers)){        
        clrArr[2*i] = 1;
        ++count;
      }
    }
      
    // If the number of courses set to 1 >= the number required,
    // then set all 0's to 2
    if (count >= reqline.numReq) {
      for (let i = 0; i < clrArr.length; ++i) {
        if (clrArr[i] === defaultNum) {
          clrArr[i] = 2;
        }
      }
    }
    return clrArr;
  }

  const calcNumElectivesMet = (electives: ReqLine[], plan: SemItem[]):number => {
    let numMet = 0;
    // Loop through all elective requirement lines
    for (let i = 0; i < electives.length; ++i) {
      // Loop through all courses for current requirement line
      for (let j = 0; j < electives[i].courses.length; ++j) {
        // Check if current course is in plan or waived
        if ((isCourseInPlan(electives[i].courses[j], plan))
        || isCourseWaived(electives[i].courses[j].dept, electives[i].courses[j].num, waivers)) {
          numMet += 1; // Increment count and go to next requirement line
          break;
        }
      }
    }
    return numMet;
  }

  const updateRestrictionColor = (course: Course, plan: SemItem[]) => {
    const fillNum:number = isCourseInPlan(course, plan) ? 1 : 0;
    return Array(1).fill(fillNum)
  }

  const [credHrs, setCredHrs] = React.useState<number>(calcCreditHours(plan));
  const [credHrs5000, setCredHrs5000] = React.useState<number>(calcCreditHours5000(plan));
  const [coreReq, setCoreReqs] = React.useState(coreReqs);
  const [numElectivesMet, setNumElectivesMet] = React.useState<number>(calcNumElectivesMet(optReq.electives, plan));

  const coreTxt = genReqArr(coreReq.required, waivers);  

  const optReqTxt = genReqArr(optReq.required, waivers);
  const optElectTxt = optReq.electives ? genReqArr(optReq.electives, waivers) : [] as string[][];
  
  React.useEffect(() => {
    setCredHrs(calcCreditHours(plan));
    setCredHrs5000(calcCreditHours5000(plan));
    setNumElectivesMet(calcNumElectivesMet(optReq.electives, plan));
  }, [plan, optReq.electives]);

  return (        
    <div>
      <h2>Degree Checklist</h2>

      {completed.length>0 &&
        <React.Fragment>
          <h3>Completed {calcCompletedHours()} credit hours </h3>
        </React.Fragment>
      }

      {transferHrs>0 &&
        <React.Fragment>
          <h3>Transfering {transferHrs} credit hours </h3>
        </React.Fragment>
      }

      {restrictedCourses.length > 0 &&
        <React.Fragment>
          <h3>Restricted Courses</h3>
          {restrictedArr(restrictedCourses).map((lines, lineIndex) => (
            <RequirementsLine key={lineIndex} txtArr={lines} clrArr={updateRestrictionColor(restrictedCourses[lineIndex], plan)} />))
          }
        </React.Fragment>
      }

      <h3>Requirements</h3>

      <RequirementContainer met={credHrs >= coreReqs.credHrs} >
       {coreReqs.credHrs} Credit Hours ({credHrs})
      </RequirementContainer>

      <RequirementContainer met={credHrs5000 >= coreReqs.credHrs5000} >
        {coreReqs.credHrs5000} 5000+ Credit Hours ({credHrs5000})
      </RequirementContainer>

      <RequirementContainer met={check6000Course(plan)} >
        6000+ CS Course
      </RequirementContainer>

      {coreTxt.map((lines, lineIndex) => (
        <RequirementsLine key={lineIndex} txtArr={lines} clrArr={updateColor(coreReq.required[lineIndex], plan, false)} />
      ))}

      <h3>Track Requirements</h3>

      {optReqTxt.map((lines, lineIndex) => (
        <RequirementsLine key={lineIndex} txtArr={lines} clrArr={updateColor(optReq.required[lineIndex], plan, false)} />
      ))}

      <h3>Track Electives ({optReq.num_elective})</h3>

      {optElectTxt ? optElectTxt.map((lines, lineIndex) => (
        <RequirementsColumn key={lineIndex} txtArr={lines} clrArr={updateColor(optReq.electives[lineIndex], plan, numElectivesMet>=optReq.num_elective)} />
      )) : null}
    </div>
  );
}
export default Requirements;
