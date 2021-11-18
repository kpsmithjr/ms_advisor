import React, { useState } from "react";
import SemItem from "../types/semItem";
import styled from 'styled-components';
import RequirementsLine from "./RequirementsLine";
import RequirementsColumn from "./RequirementsColumn";

import ReqLine from "../types/reqLine"
import Course from "../types/course"
import MsOptionsType from "../types/msOptions";

import coreReqs from "../data/core_reqs.json";
import track_reqs from "../data/track_req.json";

import cs_rotation from "../data/cs_rotation.json";

/*
const tradReqs = {
  name: "Traditional",
  required: [
    {
      courses: [
        {
          id: "CS-4760",
          dept: "CS",
          num: 4760
        }
      ],
      numReq: 1
    },
    {
      courses: [
        {
          id: "CS-5700",
          dept: "CS",
          num: 5700
        }
      ],
      numReq: 1
    }
  ],
  electives: [
    {
      courses: [],
      numReq: 0
    }
  ],
  num_core: 2,
  num_elective: 0
};
*/

/*
const profReqs = {
    name: "Professional",
    required: [
      {
        courses: [
          {
              dept: "CS",
              num: 5994
          }
        ],
        numReq: 1
      },
    ],
    electives: [
      {
        courses: [],
        numReq: 0
      }
    ],
    num_core: 1,
    num_elective: 2
};
*/

/*
const aiReqs = {
  name: "Graduate Certificate in Artificial Intelligence",
  required: [
    {
      courses: [
        {
          id: "CS-5130",
          dept: "CS",
          num: 5130
        }
      ],
      numReq: 1
    },
    {
      courses: [
        {
          id: "CS-5300",
          dept: "CS",
          num: 5300
        }
      ],
      numReq: 1
    }
  ],
  electives: [
    {
      courses: [
        {
          id: "CS-5320",
          dept: "CS",
          num: 5320
        }
      ],
      numReq: 1
    },
    {
      courses: [
        {
          id: "CS-5340",
          dept: "CS",
          num: 5340
        }
      ],
      numReq: 1
    },
    {
      courses: [
        {
          id: "CS-5342",
          dept: "CS",
          num: 5342
        }
      ],
      numReq: 1
    },
    {
      courses: [
        {
          id: "CS-5370",
          dept: "CS",
          num: 5370
        },
      ],
      numReq: 1
    },
    {
      courses: [
        {
          id: "CS-5390",
          dept: "CS",
          num: 5390
        }
      ],
      numReq: 1
    },
    {
      courses: [
        {
          id: "CS-5420",
          dept: "CS",
          num: 5420
        }
      ],
      numReq: 1
    },
    {
      courses: [
        {
          id: "CS-6320",
          dept: "CS",
          num: 6320
        }
      ],
      numReq: 1
    },
    {
      courses: [
        {
          id: "CS-6340",
          dept: "CS",
          num: 6340
        }
      ],
      numReq: 1
    }
  ],
  num_core: 2,
  num_elective: 2
};
*/

/*
const mobileReqs = {
  name: "Graduate Certificate in Mobile Apps and Computing",
  required: [
    {
      courses: [
        {
          dept: "CS",
          num: 5020
        }            
      ],
      numReq: 1
    },
    {
      courses: [
        {
          dept: "CS",
          num: 420
        }
      ],
      numReq: 1
    },
    {
      courses: [
        {
          dept: "CS",
          num: 5792
        }
      ],
      numReq: 1
    }
  ],
  electives: [
    {
      course: [
        {
            dept: "CS",
            num: 4610
        }
      ],
      numReq: 1
    },
    {
      courses: [
        {
          dept: "CS",
          num: 5222
        }
      ],
      numReq: 1
    },
    {
      courses: [
        {
          dept: "CS",
          num: 5750
        }
      ],
      numReq: 1
    }
  ],
  num_core: 3,
  num_elective: 1
};
*/

/*
const webReqs = {
    name: "Graduate Certificate in Internet and Web",
    required: [
        [
            {
                dept: "CS",
                num: 4010
            }            
        ],
        [
            {
                dept: "CS",
                num: 4011
            }
        ],
        [
            {
                dept: "CS",
                num: 5012
            }            
        ]
    ],
    electives: [
        {
            dept: "CS",
            num: 5020
        },
        {
            dept: "CS",
            num: 5030
        },
        {
            dept: "CS",
            num: 5792
        },
        {
            dept: "CS",
            num: 5750
        }
    ],
    num_core: 3,
    num_elective: 1
};
*/
/*
const cyberReqs = {
    name: "Graduate Certificate in Cybersecurity",
    required: [
        [
            {
                dept: "CS",
                num: 5702
            },
            {
                dept: "INFSYS",
                num: 6828
            }            
        ],
        [
            {
                dept: "CS",
                num: 4730
            },
            {
                dept: "INFSYS",
                num: 6836
            }
        ],
        [
            {
                dept: "CS",
                num: 5782
            },
            {
                dept: "INFSYS",
                num: 6858
            }
        ]
    ],
    electives: [
        {
            dept: "CS",
            num: 4700
        },
        {
            dept: "CS",
            num: 5020
        },
        {
            dept: "CS",
            num: 5222
        },
        {
            dept: "CS",
            num: 5732
        },
        {
            dept: "CS",
            num: 5750
        },
        {
            dept: "CS",
            num: 5792
        },
        {
            dept: "CS",
            num: 5794
        },
        {
            dept: "INFSYS",
            num: 6830
        },
        {
            dept: "INFSYS",
            num: 6862
        },
        {
            dept: "INFSYS",
            num: 6864
        },
        {
            dept: "INFSYS",
            num: 6868
        },
        {
            dept: "INFSYS",
            num: 6878
        }
    ],
    num_core: 3,
    num_elective: 1
};
*/
/*
const dsReqs = {
    name: "Graduate Certificate in Data Science",
    required: [
        [
            {
                dept: "CS",
                num: 4200
            }
        ],
        [
            {
                dept: "CS",
                num: 5340
            }
        ],
        [
            {
                dept: "CS",
                num: 5342
            }
        ]
    ],
    electives: [
        {
            dept: "CS",
            num: 5320
        },
        {
            dept: "CS",
            num: 5370
        },
        {
            dept: "CS",
            num: 5390
        },
        {
            dept: "MATH",
            num: 4005
        },
        {
            dept: "MATH",
            num: 4200
        },
        {
            dept: "MATH",
            num: 4210
        }
    ],
    num_core: 3,
    num_elective: 1
};
*/

/*
const coreReqs = {
    
}
*/

const RequirementContainer = styled.div`
color: ${props => (props.met ? 'green' : 'red')};
margin-left: 8px;
`

interface IRequirements {
  msOptions: MsOptionsType;
  plan: SemItem[];
  waivers: Course[];
}

const Requirements =({msOptions, plan, waivers} : IRequirements) => {
  let optReq;
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

  const calcCreditHours = (plan: SemItem[]) => {
    let credHrs: number = 0;
            
    for (let i:number = 0; i < plan.length; ++i) {
      for (let j:number = 0; j < plan[i].courses.length; ++j) {
        credHrs += 3;
      }
    }      
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
    return credHrs;
  }

  const check6000Course = (plan: SemItem[]) => {
    for (let i:number = 0; i < plan.length; ++i) {        
      for (let j:number = 0; j < plan[i].courses.length; ++j) {
        if (((plan[i].courses[j].dept === 'CS') || (plan[i].courses[j].dept === 'CS')) 
          && (plan[i].courses[j].num >= 6000)){
          return true;          
        }
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

  const genReqArr = (reqs, waivers) => {
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

  const isCourseInPlan = (course: Course, plan: SemItem[]) => {
    for (let i = 0; i < plan.length; ++i) {
      for (let j = 0; j < plan[i].courses.length; ++j) {
        if ((course.dept === plan[i].courses[j].dept)
          && (course.num === plan[i].courses[j].num)) {
          return true;
        }
      }
    }
    return false;
  }

  const updateColor = (reqline: ReqLine, plan: SemItem[]) => {
    // Intialize everything to 0      
    let clrArr:number[] = Array(reqline.courses.length*2-1).fill(0);

    let count = 0;
    // Set course color to 1 if in plan
    for (let i = 0; i < reqline.courses.length; ++i) {
      if ((isCourseInPlan(reqline.courses[i], plan))
      || isCourseWaived(reqline.courses[i].dept, reqline.courses[i].num, waivers)){        
        clrArr[2*i] = 1;
        ++count;
      }
    }
      
    // If the number of courses set to 1 >= the number required,
    // then set all 0's to 2
    if (count >= reqline.numReq) {
      for (let i = 0; i < clrArr.length; ++i) {
        if (clrArr[i] === 0) {
          clrArr[i] = 2;
        }
      }
    }
    return clrArr;
  }

  const reqCredHrs:number = coreReqs.credHrs;
  const [credHrs, setCredHrs] = React.useState<number>(calcCreditHours(plan));
  const [credHrs5000, setCredHrs5000] = React.useState<number>(calcCreditHours5000(plan));
  const [coreReq, setCoreReqs] = React.useState(coreReqs);
  const coreTxt = genReqArr(coreReq.required, waivers);

  const optReqTxt = genReqArr(optReq.required, waivers);
  const optElectTxt = optReq.electives ? genReqArr(optReq.electives, waivers) : [] as string[][];
  
  React.useEffect(() => {
    setCredHrs(calcCreditHours(plan));
    setCredHrs5000(calcCreditHours5000(plan));
  }, [plan]);

  return (        
    <div>
      <h3 className="reqheader">Requirements</h3>
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
        <RequirementsLine key={lineIndex} txtArr={lines} clrArr={updateColor(coreReq.required[lineIndex], plan)} />
      ))}
      <h3 className="reqheader">Track Requirements</h3>
      {optReqTxt.map((lines, lineIndex) => (
        <RequirementsLine key={lineIndex} txtArr={lines} clrArr={updateColor(optReq.required[lineIndex], plan)} />
      ))}
      <h3 className="reqheader">Track Electives ({optReq.num_elective})</h3>
      {optElectTxt ? optElectTxt.map((lines, lineIndex) => (
        <RequirementsColumn key={lineIndex} txtArr={lines} clrArr={updateColor(optReq.electives[lineIndex], plan)} />
      )) : null}
    </div>
  );
}
export default Requirements;
