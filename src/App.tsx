import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/NavBar';
import Options from './components/Options';
import Waivers from './components/Waivers';
import Planner from './components/Planner';
import MsOptionsType from './types/msOptions';
import SemItem from './types/semItemType';
import CourseType from './types/courseType';
import Restricted from './components/Restricted';

const gcOptions = [
  {
    name: "Graduate Certificate in Artificial Intelligence",
    selected: false
  },
  {
    name: "Graduate Certificate in Cybersecurity",
    selected: false
  },
  {
    name: "Graduate Certificate in Data Science",
    selected: false
  },
  {
    name: "Graduate Certificate in Internet and Web",
    selected: false
  },
  {
    name: "Graduate Certificate in Mobile Apps and Computing",
    selected: false
  }  
];

const optionsDefault = {
  //firstSem: 'FS 21',
  msTrack: 'Traditional',  
  certs: gcOptions
}

const waiversDefault = [] as CourseType[];

/*
const planDefault = [
  {
		id: 'FS-2021',
		year: 2021,
		term: "FS",		
		position: 1,
		courses: [{id: "CS 1000", dept: "CS", num: 1000}]
	},
	{
		id: 'SP-2022',
		year: 2022,
		term: "SP",
		position: 2,
		courses: [{id: "CS 1001", dept: "CS", num: 1001}]
	}
]
*/
const planDefault:SemItem[] = [
  {
		id: 'FS-2021',
		year: 2021,
		term: "FS",		
		position: 1,
    maxCredHrs: 9,
		courses: [] as CourseType[],
    courseOffered: false
	}
]

const App = () => {
  const [optionsVal, setOptionsVal] = useState<MsOptionsType>(optionsDefault);
  const [waiverVals, setWaiverVals] = useState<CourseType[]>(waiversDefault);
  const [planVals, setPlanVals] = useState<SemItem[]>(planDefault)
  const [restrictedCourses, setRestrictedCourses] = React.useState<CourseType[]>([]);
  const [firstTime, setFirstTime] = React.useState<boolean>(true);

  const updateOptions = (newOptions: MsOptionsType): void => {
    setOptionsVal(newOptions);
  };

  const updateWaivers = (newWaivers: CourseType[]): void => {
    setWaiverVals(newWaivers);    
  };

  const updatePlan = (newPlan: SemItem[]): void => {
    setPlanVals(newPlan);
  };

  const updateRestrictedCourses = (newRestrictedCourses: CourseType[]): void => {
    setRestrictedCourses(newRestrictedCourses);
    console.log(newRestrictedCourses);
  }

  const autoFillFirstSem = () => {
    const current = new Date();
    const month = current.getMonth();
    const year = current.getFullYear();

    let firstTerm:string, firstYear: number;

    if (month <= 5) {
      firstTerm = "SS";
      firstYear = year;
    } else if (month <= 7) {
      firstTerm = "FS";
      firstYear = year;
    } else {
      firstTerm = "SP";
      firstYear = year + 1;
    }

    var newPlanVals:SemItem[] = JSON.parse(JSON.stringify(planVals));
    newPlanVals[0].year = firstYear;
    newPlanVals[0].term = firstTerm;
    newPlanVals[0].id = firstTerm + "-" + firstYear.toString();
    setPlanVals(newPlanVals);
    setFirstTime(false);
  };
  
  if (firstTime) {
    autoFillFirstSem();
  }  

  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/restricted" element={<Restricted restrictedCourses={restrictedCourses} handler={updateRestrictedCourses}/>} />
        <Route path="/options" element={<Options options={optionsVal} handler={updateOptions}/>} />
        <Route path="/waivers" element={<Waivers waivers={waiverVals} msTrack={optionsVal.msTrack} handler={updateWaivers}/>} />
              <Route path="/planner" element={<Planner msOptions={optionsVal} waivers={waiverVals} restrictedCourses={restrictedCourses} oldPlan={planVals} planHandler={updatePlan}/>} />
      </Routes>      
    </Router>    
  );
}

export default App;
