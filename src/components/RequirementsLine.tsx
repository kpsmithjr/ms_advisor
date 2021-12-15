import React from "react";
import styled from "styled-components";

interface IReqCont {
	clr: number;
};

const RequirementContainer = styled.div<IReqCont>`
color: ${props => (props.clr === 0 ? 'red' : (props.clr === 1 ? 'green' : 'grey'))};
`;

const LineContainer = styled.div`
	display: inline-flex;
	margin-left: 8px;
`;

interface IReqLine {
	txtArr: string[];
	clrArr: number[];
}

const RequirementsLine = ({txtArr, clrArr} : IReqLine) => {
	return (
		<div>
		<LineContainer>
			{txtArr.map((txt, index) => (
				<RequirementContainer
				key={index}
				clr={clrArr[index]}
			>
				{txt}
			</RequirementContainer>
			))}			
		</LineContainer>
		</div>
	);
}

export default RequirementsLine;