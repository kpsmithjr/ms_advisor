import CourseType from "../types/courseType";

interface IWaivers {
	waivers: CourseType[];
	handler: (newWaivers: CourseType[]) => void ;
};

export default IWaivers;