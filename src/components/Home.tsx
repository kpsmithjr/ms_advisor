import { useNavigate } from 'react-router-dom';
import React from "react";
import Ajv2020 from "ajv/dist/2020";
const ajv = new Ajv2020({ allErrors: true })

const Home = () => {
    const navigate = useNavigate();
    //const inputFileRef = useRef();

    const createNewPlan = () => {
      //create an empty studentPlan, propagate
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
                    callback("success", JSON.parse(data));
                });

        }).on('error', function (e: any) {
            callback("error", e);
        }).end();
    }

    function setFile(event: React.ChangeEvent<HTMLInputElement>) {
        //Get the details of the studentPlan file, propagate
        //TODO: handle exceptions
        const files = event.currentTarget.files as FileList;
        if (files && files.length != 0) {
            const file = files[0];
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                    const result = reader.result as string
                    if (result) {
                        const studentPlan = JSON.parse(result);

                        //TODO: maybe make a central reference file to pull urls etc from?
                        getFile("https://raw.githubusercontent.com/kpsmithjr/ms_advisor_files/main/studentPlan.schema.json", function (status:any, data:any) {
                            if (status === "success") {
                                const validate_plan = ajv.compile(data);
                                if (validate_plan(studentPlan)) {
                                    //TODO: propagate the studentPlan
                                    navigate('/planner');
                                } else {
                                    //TODO: error popup
                                }
                            } //TODO: max wait time
                        }); 
                    }
                }
                reader.readAsText(file)
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
          <input type="file" onChange={setFile.bind(this)} />
    </div>
  );    
}

export default Home;