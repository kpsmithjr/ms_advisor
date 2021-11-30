import SemItemType from "../types/semItemType";

interface ICoursePlanner {
	plan: SemItemType[];
	planHandler: (newPlan: SemItemType[]) => void;
};

export default ICoursePlanner;