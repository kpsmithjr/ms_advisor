import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
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
    const remoteValidationSchemaUrl: string = "https://raw.githubusercontent.com/kpsmithjr/ms_advisor_files/main/saveablePlanFiles/saveablePlan2.schema.json";

    React.useEffect(() => {
        const errorLabel: HTMLElement | null = document.getElementById('errorLabel')
        if (errorLabel) {
            errorLabel.innerHTML = errorMessage;
        }
    }, [errorState]);
    

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
                        seterrorMessage("unable to access remote validation schema :(");
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

                                if (validate_plan(saveablePlan)) {
                                    try {
                                        const myOpt: MsOptionsType = saveablePlan.msOptions;
                                        const myWav: CourseType[] = saveablePlan.waivers;
                                        const myRes: CourseType[] = saveablePlan.restrictedCourses;
                                        const myPln: SemItemType[] = saveablePlan.plan;

                                        if (myOpt && myWav && myRes && myPln) {
                                            saveablePlanHandler(myOpt, myWav, myRes, myPln);
                                            navigate('/planner');
                                        } else {
                                            seterrorMessage("Selected File has Format or Content Errors :(");
                                            seterrorState(true);
                                        }
                                    } catch {
                                        seterrorMessage("Selected File has Format or Content Errors :(");
                                        seterrorState(true);
                                    }
                                } else {
                                    seterrorMessage("Selected File has Format or Content Errors :(");
                                    seterrorState(true);
                                }
                            } else {
                                seterrorMessage("unable to access remote validation schema :(");
                                seterrorState(true);
                            }
                        });
                    } else {
                        seterrorMessage("file contents not found :(");
                        seterrorState(true);
                    }
                }
                reader.readAsText(file)
            } else {
                seterrorMessage("file not found :(");
                seterrorState(true);
            }
        } catch {
            seterrorMessage("unknown error :(");
            seterrorState(true);
        }
    }

  return (
    <div className='home'>
      <h1>Welcome to the MS Advisor</h1>
      <p>
        This app will help you plan a course of study for the Master's Program in the Computer Science Department at the University of Missouri - St. Louis.
        You may start a new academic plan or load an existing one.
      </p>
          <button onClick={createNewPlan}>Create New Plan</button>
          <input type="file" accept = ".txt" onChange={setFile.bind(this)} />
          {errorState &&
              <div>
              <label id={"errorLabel"} style={{ color: 'red' }}>errorMessage</label>
              </div>
          }
    </div>
  );    
}

export default Home;