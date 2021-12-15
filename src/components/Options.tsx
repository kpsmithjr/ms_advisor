import React from "react";
import { useNavigate } from 'react-router-dom';

import MsOptionsType from "../types/msOptions";

import track_reqs from "../data/track_req.json";
import IOptions from "../interfaces/iOptions";

import '../App.css';

const Options = ({options, handler}: IOptions)=> {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<MsOptionsType>(options);

  /*
  const [alert, setAlert] = React.useState<AlertType>({
    type: 'error',
    text: "You must select a Graduate Certificate for this track!",
    show: false
  })

  const onCloseAlert = () => {
    setAlert({
      type: 'error',
      text: "You must select a Graduate Certificate for this track!",
      show: false
    })
  };
  */
  const updateTrack = (e: any) => {
    var newData:MsOptionsType = JSON.parse(JSON.stringify(formData));
    newData.msTrack = e.target.value;
    setFormData(newData);
    handler(newData);
  };

  const updateFulltime = (e: any) => {
    var newData: MsOptionsType = JSON.parse(JSON.stringify(formData));
    newData.fullTime = e.target.checked;
    setFormData(newData);
    handler(newData);
  };
  const updateEvening = (e: any) => {
    var newData: MsOptionsType = JSON.parse(JSON.stringify(formData));
    newData.eveningOnly = e.target.checked;
    setFormData(newData);
    handler(newData);
  };
  const updateOnline = (e: any) => {
    var newData: MsOptionsType = JSON.parse(JSON.stringify(formData));
    newData.onlineOnly = e.target.checked;
    setFormData(newData);
    handler(newData);
  };
  const handleCertChange = (e: any) => {
    const newCerts = formData.certs.map(cert => {
      if (cert.name !== e.target.name ) return cert;      
      return { ...cert, selected: e.target.checked};
    });
    setFormData({ ...formData, certs: newCerts});
  };

  /*
  const validateForm = () => {
    const errors = [] as string[];
    // Check that if Grad Cert track is selected, at least on Grad Cert is also selected
    if (formData.msTrack === "Graduate Certificate") {
      let certSelected = false;
      for (let i = 0; i < formData.certs.length; ++i) {
        if (formData.certs[i].selected) {
          certSelected = true;
          break;
        }
      }

      if (!certSelected) {
        errors.push("You must select a Graduate Certificate for this track!");
      }
    }
    return errors;
  }
  */

  const handleSubmit = () => {
    //const errors = validateForm();
    //if (errors.length > 0) {
    //  setAlert({...alert, show: true})
    //  return;
    //}
    
    handler(formData);
    navigate('/restricted');
  };

  const handleCancel = () => {
    navigate(-1);    
  };

  /*
  const genSemesters = () => {
    let sems = [formData.firstSem];
    let curTerm:string, curYear:number;
    const tmpArr = formData.firstSem.split(" ");
    curTerm = tmpArr[0];
    curYear = parseInt(tmpArr[1]);

    for (let i = 1; i < numSemsToList; ++i) {
      if (curTerm === "SP") {
        curTerm = "FS";      
      } else {
        curTerm = "SP";
        curYear +=1;
      }

      sems.push(curTerm + " " + curYear.toString());      
    }
    return sems;
  };

  const semesters = genSemesters();
  */

  // Placeholder for function that reads JSON files and generates track list
  const getTrackList = () => {
    let msTracks = [] as string[];
    for (let i = 0; i < track_reqs.length; ++i) {
      msTracks.push(track_reqs[i].name)
    }
    
    return msTracks;
 }
  
  const msTracks = getTrackList();

  return (   
    <div className="page-container">
      <div className="page-header">
        <h1>Academic Plan Options</h1>
      </div>
      <div className="footer-buttons">
        <button onClick={handleCancel}>Previous</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={handleSubmit}>Next</button>
      </div>
      <div className='instructions'>
              <p>
              Select which Computer Science MS track you wish to pursue from the drop-down menu.
              </p>
              <br/>
              <p>
              You may specify additional preferences below to filter which classes are shown in the planner
              <br/>
              (e.g. only show classes that are offered in the evenings, or classes that are available online).
              </p>
              <br/>
              <p>
              Selecting the Full-time Enrollment option will have the planner check that 9+ credit hours are taken each semester.
              <br/>
              -Note that F-1 and J-1 graduate students must maintain full-time enrollment in order to comply with visa regulations.
              </p>
              <br/> <br/>
      </div>
      <div className="forms">
        <form>
          <label>Select Your MS Track:
            &nbsp;
            <select
              name="msTrack"
              value={formData.msTrack}
              onChange={updateTrack}
            >
              {msTracks.map((item, i) => { return (<option key={i} value={item}>{item}</option>) })}
            </select>
            </label>
            {/*
            <br />
            <br />
            
            Graduate Certificate: 
            {formData.certs.map(( cert, index) => {
              return (
                <li key={index}>
                  <div >
                    <div >
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={cert.name}
                        checked={cert.selected}
                        onChange={handleCertChange}
                      />
                      <label>{cert.name}</label>                 
                    </div>
                  </div>
                </li>
              );
            })}
            <br />
            <br />
          */}
        </form>
      </div>
          <div className = "spacer"> </div>

          <div className="filter">
              <style>
                  h4 {"text-align: center;"};
              </style>
              <h4>Additional Enrollment Options:</h4>
              <ul className="checkbox">
                  <li>
                      <input type="checkbox" id="cb1" value="Full-time Enrollment" onChange={updateFulltime} checked={formData.fullTime}/>
                      &nbsp;
                      <label htmlFor="cb1">Full-time Enrollment</label>
                  </li>
                  <li>
                      <input type="checkbox" id="cb2" value="Evening-only Courses" onChange={updateEvening} checked={formData.eveningOnly}/>
                      &nbsp;
                      <label htmlFor="cb2">Evening-only Courses</label>
                  </li>
                  <li>
                      <input type="checkbox" id="cb3" value="Online-only Courses" onChange={updateOnline} checked={formData.onlineOnly}/>
                      &nbsp;
                      <label htmlFor="cb3">Online-only Courses</label>
                  </li>
              </ul>
          </div>      
    </div>
  );
}

export default Options;