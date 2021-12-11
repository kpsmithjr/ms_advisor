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
import Transfers from "./components/Transfers";
import CompletedCourses from './components/CompletedCoureses';

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
const completedDefault = [] as CourseType[];

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
  const [restrictedCourses, setRestrictedCourses] = React.useState<CourseType[]>([]);
  const [transferHrs, setTransferHours] = React.useState<number>(0);
  const [waiverVals, setWaiverVals] = useState<CourseType[]>(waiversDefault);
  const [completedVals, setCompletedVals] = useState<CourseType[]>(completedDefault);
  const [planVals, setPlanVals] = useState<SemItem[]>(planDefault)  
  const [firstTime, setFirstTime] = React.useState<boolean>(true);

  const updateOptions = (newOptions: MsOptionsType): void => {
    setOptionsVal(newOptions);
  };

  const updateRestrictedCourses = (newRestrictedCourses: CourseType[]): void => {
    setRestrictedCourses(newRestrictedCourses);
  }

  const updateTransferHours = (newTransferHrs: number):void => {
    setTransferHours(newTransferHrs);
  }

  const updateWaivers = (newWaivers: CourseType[]): void => {
    setWaiverVals(newWaivers);
  };

  const updateCompleted = (newCompleted: CourseType[]): void => {
    setCompletedVals(newCompleted);
  };

  const updatePlan = (newPlan: SemItem[]): void => {
    setPlanVals(newPlan);
  };  

  const updateSaveablePlan = (newOptions: MsOptionsType, newWaivers: CourseType[], newRestrictions: CourseType[], newPlan: SemItem[], newTransHrs:number): void => {
    setOptionsVal(newOptions);
    setWaiverVals(newWaivers);
    setRestrictedCourses(newRestrictions);
    setPlanVals(newPlan);
    setTransferHours(newTransHrs);
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
        <Route path="/" element={<Home saveablePlanHandler={updateSaveablePlan} />} />
        <Route path="/options" element={<Options options={optionsVal} handler={updateOptions}/>} />
        <Route path="/restricted" element={<Restricted restrictedCourses={restrictedCourses} handler={updateRestrictedCourses}/>} />      
        <Route path="/transfers" element={<Transfers transfersHrs={transferHrs} setTransferHanlder={updateTransferHours}/>} />
        <Route path="/waivers" element={<Waivers waivers={waiverVals} msTrack={optionsVal.msTrack} handler={updateWaivers}/>} />
        <Route path="/completed" element={<CompletedCourses completed={completedVals} msTrack={optionsVal.msTrack} handler={updateCompleted}/>} />
        <Route path="/planner" element={<Planner
                                          msOptions={optionsVal}
                                          waivers={waiverVals}
                                          restrictedCourses={restrictedCourses}
                                          oldPlan={planVals}
                                          planHandler={updatePlan}
                                          transferHrs={transferHrs}
                                          completed={completedVals}
                                        />}
        />
      </Routes>      
    </Router>    
  );
}

export default App;
