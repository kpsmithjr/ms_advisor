import MsOptionsType from "../types/msOptions";
import SemItem from "../types/semItemType";
import Course from "../types/courseType";

interface IRequirements {
  msOptions: MsOptionsType;
  plan: SemItem[];
  waivers: Course[];
  restrictedCourses: Course[];
  transferHrs: number;
}

export default IRequirements;