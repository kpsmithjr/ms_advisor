import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Courses from "../data/cs_courses.json";
import styled from "styled-components";
import CourseType from "../types/courseType";
import IWaivers from "../interfaces/iWaivers";
import core_req from "../data/core_reqs.json";
import track_req from "../data/track_req.json";

const WaiverContainer = styled.div`
`

type WaiverType = {
  id: string;
  dept: string;
  num: number;
  name: string;
  selected: boolean;
};

const Waivers = ({waivers, msTrack, handler}: IWaivers) => {
  const navigate = useNavigate();
  
  const waiverSelected = (dept: string, num: number): boolean => {
    for (let i = 0; i < waivers.length; ++i) {
      if ((waivers[i].dept === dept) && (waivers[i].num === num)) {
        return true;
      }
    }
    return false;
  };

  const getCourseName = (dept: string, num:number): string => {
		for (let i = 0; i < Courses.length; ++i) {
			if ((Courses[i].dept === dept) && (Courses[i].num === num)) {
				return Courses[i].name;
			}
		}
		return "";
	};

  const isWaiverInArray = (waiver: WaiverType, arr: WaiverType[]): boolean => {
    for (let i = 0; i < arr.length; ++i) {
      if ((waiver.dept === arr[i].dept) && (waiver.num === arr[i].num)) {
        return true;
      }
    }
    return false;
  };

  const addCoreReqs = (waiverData: WaiverType[]): WaiverType[] => {
    for (let i = 0; i < core_req.required.length; ++i) {
      for (let j = 0; j < core_req.required[i].courses.length; ++j) {
        let tmp = core_req.required[i].courses[j];

        const newWaiver:WaiverType = {
          id: tmp.dept + " " + tmp.num.toString(),
          dept: tmp.dept,
          num: tmp.num,
          name: getCourseName(tmp.dept, tmp.num),
          selected: waiverSelected(tmp.dept, tmp.num)
        };

        waiverData.push(newWaiver)
      }
    }
    return waiverData;
  }

  const addTrackReqs = (waiverData: WaiverType[]): WaiverType[] => {
    let reqs = null;
    for (let k = 0; k < track_req.length; ++k) {
      if (track_req[k].name === msTrack) {
        reqs = track_req[k].required;
      }
    }
    if (reqs === null) {
      console.log("ERROR = Could not find MS Track Requirements")
    } else {
      for (let i = 0; i < reqs.length; ++i) {
        for (let j = 0; j < reqs[i].courses.length; ++j) {
          let tmp = reqs[i].courses[j];
  
          const newWaiver:WaiverType = {
            id: tmp.dept + " " + tmp.num.toString(),
            dept: tmp.dept,
            num: tmp.num,
            name: getCourseName(tmp.dept, tmp.num),
            selected: waiverSelected(tmp.dept, tmp.num)
          };
          
          if (!isWaiverInArray(newWaiver, waiverData)) {
            waiverData.push(newWaiver)
          }          
        }
      }
    }    
    return waiverData;
  }

  const generateWaiverData = (): WaiverType[] => {
    let waiverData = [] as WaiverType[];

    addCoreReqs(waiverData);
    addTrackReqs(waiverData);

    return waiverData;
  };

  const [formData, setFormData] = useState<WaiverType[]>(generateWaiverData());  

  function handleClick(e: any) {
    const newFormData = formData.map(course => {
      if (course.id !== e.target.name ) return course;      
      return { ...course, selected: e.target.checked};
    });
    setFormData(newFormData);
  }
  
  function handleCancel() {
    navigate(-1);
  }

  function handleSubmit() {
    let newWaivers = [] as CourseType[];
    for (let i = 0; i < formData.length; ++i) {
      if (formData[i].selected) {
        const waivedCourse:CourseType = {
          id: formData[i].id,
          dept:formData[i].dept,
          num:formData[i].num,
          name:formData[i].name,
        }
        newWaivers.push(waivedCourse);
      }
    }
    handler(newWaivers);
    navigate('/completed');
  }
  
  return (
    <div className='page-container'>
      <div className="page-header">
        <h1>Waivered Courses</h1>
      </div>
      <div className="footer-buttons">
        <button onClick={handleCancel}>Previous</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={handleSubmit}>Next</button>
      </div>
      <div className='instructions'>
				<p>Waivers may be granted by the Department of Computer Science if you have previous experience with
           the subject matter from work or a class taken at another university. Required courses, based on the MS
           options selected earlier, are shown</p>
        <br></br>
        <p>Note: Credit hours in these courses will not count toward the 30 graduate hour requirement.</p>
        <p>Note: A '(W)' will be displayed next to any requirment with a waiver.</p>
        <br></br>
			</div>
      <WaiverContainer>
        {formData.map((course, index) => {
          return (
            <div key={`waiver-checkbox-${index}`}>
              <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                name={course.id}
                onChange={handleClick}
                checked={course.selected}
              />
              <label>  {course.dept} {course.num}: {course.name}</label>                 
            </div>
          );
        })}
      </WaiverContainer>
    </div>
  );
}

export default Waivers;