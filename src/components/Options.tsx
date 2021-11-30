import React from "react";
import { useNavigate } from 'react-router-dom';

import MsOptionsType from "../types/msOptions";

import track_reqs from "../data/track_req.json";
import IOptions from "../interfaces/iOptions";

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
    navigate('/waivers');
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
    <div>
      <div>
        <h1>Select Academic Plan Options</h1>
      </div>
      <div>
        <form>
          <label>
            Select Your MS Track
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
        <div className="options-footer">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSubmit}>Next</button>
        </div>
    </div>

    );
  }

export default Options;