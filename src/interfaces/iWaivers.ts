import CourseType from "../types/courseType";

interface IWaivers {
	waivers: CourseType[];
	msTrack: string;
	handler: (newWaivers: CourseType[]) => void ;
};

export default IWaivers;