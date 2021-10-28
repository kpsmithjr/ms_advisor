import React, { Fragment , useState} from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar';
import Home from './components/Home';
import Options from './components/Options';
import Waivers from './components/Waivers';
import Plan from './components/Plan';

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
  firstSem: 'FS 21',
  msTrack: 'Traditional',
  maxCredHrs: 6,
  enrollSS: false,
  certs: gcOptions
}

const waiversDefault = [];

const App = () => {
  const history = useHistory();
  const [optionsVal, setOptionsVal] = useState(optionsDefault);
  const [validOptions, setValidOptions]= useState(false);
  const [waiverVals, setWaiverVals] = useState(waiversDefault);

  const updateOptions = (newOptions) => {
    setOptionsVal(newOptions);
    setValidOptions(true);
  }
  
  const updateWaivers = (newWaivers) => {
    setWaiverVals(newWaivers);
  }

  return (
    <Router>
      <div className='App'>
        <Navbar />
          <Switch>
            <Route
              exact
              path='/'
              component={Home}
            />
            <Route
              exact
              path='/options/'
              render={()=>
                <Options options={optionsVal} handler={updateOptions}/>
              }
            />
            <Route
              exact
              path='/waivers/'
              render={()=>
                <Waivers waivers={waiverVals} handler={updateWaivers}/>
              }
            />
            <Route
              exact
              path='/plan/'
              render={()=>
                <Plan msOptions={optionsVal} waivers={waiverVals}/>
              }
            />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
