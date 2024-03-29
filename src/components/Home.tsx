import { useNavigate } from 'react-router-dom';
import React from "react";
import Ajv2020 from "ajv/dist/2020";
import SaveablePlanType from "../types/saveablePlanType";
import MsOptionsType from "../types/msOptions";
import CourseType from "../types/courseType";
import SemItemType from "../types/semItemType"

const Home = ({ saveablePlanHandler }: any) => {
  const navigate = useNavigate();
  const [errorState, seterrorState] = React.useState<boolean>(false);
  const [errorMessage, seterrorMessage] = React.useState<string>("")

  //TODO: make this not hard coded?
  const remoteValidationSchemaUrl: string = "https://kpsmithjr.github.io/ms_advisor_files/saveablePlanFiles/saveablePlan2.schema.json";

  React.useEffect(() => {
    const errorLabel: HTMLElement | null = document.getElementById('errorLabel')
    if (errorLabel) {
      errorLabel.innerHTML = errorMessage;
    }
  }, [errorState, errorMessage]);
    
  const createNewPlan = () => {
    seterrorState(false);
    navigate('/options');
  }

  function getFile(url: any, callback: any) {
    const https = require('https')
    https.request(url, function (res: any) {
      var data = "";
      res.on('data', function (chunk: any) {
        data += chunk;
      })
      .on('end', function () {
        try {
          var JSONfile = JSON.parse(data);
          callback("success", JSONfile);
        } catch {
          seterrorMessage("Unable to Parse Remote Validation Schema :(");
          seterrorState(true);
        }
      });
    }).on('error', function (e: any) {
      callback("error", e);
    }).end();
  }

  //Get the details of the studentPlan file, propagate
  function setFile(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      seterrorState(false);
      const files = event.currentTarget.files as FileList;
      if (files && files.length !== 0) {
        const file = files[0];
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')

        reader.onload = () => {
          const result = reader.result as string
          if (result) {
            getFile(remoteValidationSchemaUrl, function (status: any, data: any) {
              if (status === "success") {
                const saveablePlan: SaveablePlanType = JSON.parse(result);
                const ajv = new Ajv2020({ allErrors: true })
                const validate_plan = ajv.compile(data);
                console.log(data);
                if (validate_plan(saveablePlan)) {
                  try {
                    const myOpt: MsOptionsType = saveablePlan.msOptions;
                    const myRes: CourseType[] = saveablePlan.restrictedCourses;
                    const myTransHrs: number = saveablePlan.transferHours;
                    const myWav: CourseType[] = saveablePlan.waivers;
                    const myComp: CourseType[] = saveablePlan.completed;
                    const myPln: SemItemType[] = saveablePlan.plan;

                    //don't check transfer hours, if it's zero it will want to throw an error
                    if (myOpt && myRes && myWav && myComp && myPln) {
                      saveablePlanHandler(myOpt, myWav, myRes, myPln, myTransHrs, myComp);
                      navigate('/planner');
                    } else {
                      seterrorMessage("Selected File has Format or Content Errors :(");
                      seterrorState(true);
                    }
                  } catch {
                    seterrorMessage("Unable to Parse Selected File :(");
                    seterrorState(true);
                  }
                } else {
                  seterrorMessage("Selected File is not a Valid Plan :(");
                  seterrorState(true);
                }
              } else {
                seterrorMessage("Unable to Access Remote Validation Schema :(");
                seterrorState(true);
              }
            });
          } else {
            seterrorMessage("File Contents not Found :(");
            seterrorState(true);
          }
        }
        reader.readAsText(file)
      } else {
        seterrorMessage("file not Found :(");
        seterrorState(true);
      }
    } catch {
      seterrorMessage("Unknown Error :(");
      seterrorState(true);
    }
  }

  return (
    <div className='page-container'>
      <div className='page-header'>
        <h1>MS Computer Science: Advising Tool </h1>
      </div>
      <div className='instructions'>
        <p>
          Welcome to the MS Advising Tool for the Department of Computer Science at the University of Missouri - St. Louis.
        </p>
        <br/>
        <p>
          This program will guide you through prompts in order to understand your desired degree track and to gather information on
          your existing coure work. Finally, you will be taken to the planning page where you can create your acadmedic plan using 
          our drag-and-drop tool. If you wish to return to a previous page, click the appropriate link in the NavBar.
        </p>
        <br/>
        <p>
          To begin planning click "Create New Plan" or load an existing plan by clicking "Browse".
        </p>
      </div>
      <div className="spacer"> </div>
      <div className='footer-buttons'>
        <button onClick={createNewPlan}>Create New Plan</button>
        &nbsp;&nbsp;&nbsp;
        <input type="file" accept = ".txt" onChange={setFile.bind(this)} />
        {errorState &&
          <div>
            <label id={"errorLabel"} style={{ color: 'red' }}>errorMessage</label>
          </div>
        }
      </div>      
    </div>
  );    
}

export default Home;