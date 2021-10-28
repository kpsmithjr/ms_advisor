import React, { useState, useEffect } from "react";

const tradReqs = {
    name: "Traditional",
    required: [
        [
            {
                dept: "CS",
                num: 4760
            }
        ],
        [
            {
                dept: "CS",
                num: 5700
            }
        ]
    ],
    electives: [],
    num_core: 2,
    num_elective: 0
};

const profReqs = {
    name: "Professional",
    required: [
        [
            {
                dept: "CS",
                num: 5994
            }
        ]
    ],
    electives: [],
    num_core: 1,
    num_elective: 2
};

const aiReqs = {
    name: "Graduate Certificate in Artificial Intelligence",
    required: [
        [
            {
                dept: "CS",
                num: 5130
            }
        ],
        [
            {
                dept: "CS",
                num: 5300
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
            num: 5340
        },
        {
            dept: "CS",
            num: 5342
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
            dept: "CS",
            num: 5420
        },
        {
            dept: "CS",
            num: 6320
        },
        {
            dept: "CS",
            num: 6340
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
        [
            {
                dept: "CS",
                num: 4250
            }
        ],
        [
            {
                dept: "CS",
                num: 5130
            }
        ],
        [
            {
                dept: "CS",
                num: 5500
            }
        ]
    ],
    num_core: 3,
    credHrs: 30
}

/*
    const [req, setReqs] = useState({reqHrs: coreReqs.credHrs,
                                     req6000: true,
                                     reqClasses: coreReqs.required,
                                     optReqClasses: cyberReqs.required,
                                     optElectClasses: cyberReqs.electives,
                                     numOptReq: cyberReqs.num_core,
                                     numOptElect: cyberReqs.num_elective}
    );
    

setReqs({ ...req, optReqClasses: aiReqs.required,
    optElectClasses: aiReqs.electives,
    numOptReq: aiReqs.num_core,
    numOptElect: aiReqs.num_elective});
*/

const Requirements =({msOptions, plan, waivers})=> {
    var optReqClassesVal;
    var optElectClassesVal;
    console.log(msOptions.msTrack)
    console.log(msOptions.certs)
    switch (msOptions.msTrack) {
        case "Traditional":
            optReqClassesVal =  tradReqs.required;
            optElectClassesVal =  tradReqs.electives;
            break;
        case "Professional":
            optReqClassesVal =  profReqs.required;
            optElectClassesVal =  profReqs.electives;
            break;
        case "Graduate Certificate":

            if (msOptions.certs[0].selected) {
                optReqClassesVal = aiReqs.required;
                optElectClassesVal = aiReqs.electives;
            } else if (msOptions.certs[1].selected) {
                optReqClassesVal = cyberReqs.required;
                optElectClassesVal = cyberReqs.electives;
            } else if (msOptions.certs[2].selected) {
                optReqClassesVal = dsReqs.required;
                optElectClassesVal = dsReqs.electives;
            } else if (msOptions.certs[3].selected) {
                optReqClassesVal = webReqs.required;
                optElectClassesVal = webReqs.electives;
            } else if (msOptions.certs[4].selected) {
                optReqClassesVal = mobileReqs.required;
                optElectClassesVal = mobileReqs.electives;
            } 
            break;            
        default:
            optReqClassesVal =  [[]];
            optElectClassesVal =  [[]];
            console.error("Unknown MS Options");
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
        let test = [];
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
    console.log(req.optReqClasses)
    const test1 = genReqs(req.optReqClasses);

    return (
        
        <div>
            <h3 className="reqheader"> Requirements</h3>
            <p>{req.reqHrs} Credit Hours</p>
            <p>6000+ Course</p>
            <ul>
                {test.map((value, index) => <li key={index}>{value}</li>)}
            </ul>
            <h3>Option Requirements</h3>
            <ul>
                {test1.map((value, index) => <li key={index}>{value}</li>)}
            </ul>
                <h3>Option Electives ({req.numOptElect})</h3>
            <ul>
                {req.optElectClasses.map((value, index) => <li key={index}>{value.dept} {value.num}</li>)}
            </ul>
        </div>
    );
}
export default Requirements;
