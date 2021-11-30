import MsOptionsType from "../types/msOptions";

interface IOptions {
	options: MsOptionsType;
	handler: (newOptions: MsOptionsType) => void;
};

export default IOptions;