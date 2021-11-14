import React, { useState } from "react";
import SemItem from "../types/semItem";
import styled from 'styled-components';
import RequirementsLine from "./RequirementsLine";
import RequirementsColumn from "./RequirementsColumn";

import ReqLine from "../types/reqLine"
import Course from "../types/course"
import MsOptionsType from "../types/msOptions";

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

const mobileReqs = {
    name: "Graduate Certificate in Mobile Apps and Computing",
    required: [
        [
            {
                dept: "CS",
                num: 5020
            }            
        ],
        [
            {
                dept: "CS",
                num: 420
            }            
        ],
        [
            {
                dept: "CS",
                num: 5792
            }
        ]
    ],
    electives: [
        {
            dept: "CS",
            num: 4610
        },
        {
            dept: "CS",
            num: 5222
        },
        {
            dept: "CS",
            num: 5750
        }
    ],
    num_core: 3,
    num_elective: 1
};

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

const coreReqs = {
    name: "Master of Science in Computer Science",
    required: [
      {
        courses: [
          {
            id: 'CS-4250',
            dept: "CS",
            num: 4250
          },
          {
            id: 'CS-5250',
            dept: "CS",
            num: 5250
          }
        ],
        numReq: 1
      },
      {
        courses: [
          {
            id: 'CS-5130',
            dept: "CS",
            num: 5130
          }
        ],
        numReq: 1
      },
      {
        courses: [
          {
            id: 'CS-5500',
            dept: "CS",
            num: 5500
          }
        ],
        numReq: 1
      }
    ],
    num_core: 3,
    credHrs: 30
}

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

  if (msOptions.msTrack === "Traditional") {
    optReq = tradReqs;
  } else if (msOptions.msTrack === "Professional") {
    optReq = profReqs;
  } else if (msOptions.msTrack === "Graduate Certificate") {
    for (let i:number = 0; i < msOptions.certs.length; ++i) {
      if (msOptions.certs[i].selected) {
        optReq = aiReqs;
      }
    }
  } else {
    console.log(msOptions.msTrack);
    console.error("Unknown Track");
  }

  /*
  switch (msOptions.msTrack) {
    case "Traditional":
      optReq = tradReqs;
      break;
    case "Professional":
      optReq =  profReqs;
      break;
    case "Graduate Certificate":
      if (msOptions.certs[0].selected) {
        optReq = aiReqs;
      } else if (msOptions.certs[1].selected) {
        optReq = cyberReqs;
      } else if (msOptions.certs[2].selected) {
        optReq = dsReqs;
      } else if (msOptions.certs[3].selected) {
        optReq = webReqs;
      } else if (msOptions.certs[4].selected) {
        optReq = mobileReqs;
      } 
      break;            
    default:
      console.error("Unknown MS Options");
      break;
    }
    

    const [req, setReqs] = useState({reqHrs: coreReqs.credHrs,
                                     req6000: true,
                                     reqClasses: coreReqs.required,
                                     optReqClasses: optReqClassesVal,
                                     optElectClasses: optElectClassesVal,
                                     numOptReq: 0,
                                     numOptElect: 0}
    );

    function genReqs(classes) {
        let test = [""];
        for (let i = 0; i < classes.length; i++) {
            let test_row = "";
            test_row = classes[i][0].dept + " " + classes[i][0].num;

            for (let j = 1; j < classes[i].length; j++) {
                test_row += " or " + classes[i][j].dept + " " + classes[i][j].num;
            }
            test.push(test_row);
        }
        return test;
    }

    const test = genReqs(req.reqClasses);
    const test1 = genReqs(req.optReqClasses);

    const rendereReqs = (plan, reqs) => {
      reqs.reqClasses.map((req) => {
        let met = false;
        for (let i:number = 0; i < plan.length; ++i) {
          if (met) {
            break;
          }
          for (let j:number = 0; j < plan[i].courses.length; ++j) {
            if ((req.dept === plan[i].courses[j].dept)
              && (req.num === plan[i].courses[j].num)){
              met = true;
              break;
            }
          }
        }
        <RequirementContainer
          met={met}
        >
          {req.dept} {req.num}
        </RequirementContainer>
      })
    };
    */

  const calcCreditHours = (plan: SemItem[]) => {
    let credHrs: number = 0;
            
    for (let i:number = 0; i < plan.length; ++i) {
      for (let j:number = 0; j < plan[i].courses.length; ++j) {
        credHrs += 3;
      }
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
    return false;
  };
    
  const genReqArr = (reqs) => {
    let reqArr = [] as string[][];

    // Loop over all requirement vectors
    for (let i:number = 0; i < reqs.length; ++i) {
      if (reqs[i].courses.length === 0) {
        return reqArr;          
      }

      let courseTxt = reqs[i].courses[0].dept + " " + reqs[i].courses[0].num.toString();
      let courseArr = [courseTxt];

      // For each requirement vector, loop over all courses
      for (let j:number = 1; j < reqs[i].courses.length; ++j) {
        courseArr.push(" or ");
        let courseTxt = reqs[i].courses[j].dept + " " + reqs[i].courses[j].num.toString();
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
      if (isCourseInPlan(reqline.courses[i], plan)) {        
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

  const reqCredHrs:number = 30;
  const [credHrs, setCredHrs] = React.useState<number>(calcCreditHours(plan));
  const [coreReq, setCoreReqs] = React.useState(coreReqs);
  const coreTxt = genReqArr(coreReq.required);

  const optReqTxt = genReqArr(optReq.required);
  const optElectTxt = optReq.electives ? genReqArr(optReq.electives) : [] as string[][];
  
  React.useEffect(() => {
    setCredHrs(calcCreditHours(plan));
  }, [plan]);

  return (        
    <div>
      <h3 className="reqheader">Requirements</h3>
      <RequirementContainer met={credHrs >= reqCredHrs} >
       {reqCredHrs} Credit Hours ({credHrs})
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
