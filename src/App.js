import React, { Fragment , useState} from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar';
import Home from './components/Home';
import Options from './components/Options';
import Waivers from './components/Waivers';
import Plan from './components/Plan';

const optionsDefault = {
  firstSem: 'FS 21',
  msOption: 'Traditional',
  maxCredHrs: 6,
  enrollSS: false
}
const App = () => {
  const history = useHistory();
  const [optionsVal, setOptionsVal] = useState(optionsDefault);
  const [validOptions, setValidOptions]= useState(false);

  const updateOptions = (newOptions) => {
    setOptionsVal(newOptions);
    setValidOptions(true);
  }
  const myWaivers = [];

  return (
    <Router>
      <div className='App'>
        <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route
              exact
              path='/options/'
              render={(props)=>
                <Options options={optionsVal} handler={updateOptions}/>
              }
            />
            <Route exact path='/waivers/' component={Waivers} />
            <Route
              exact
              path='/plan/'
              render={()=>
                <Plan msOption={optionsVal.msOption} waivers={myWaivers}/>
              }
            />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
