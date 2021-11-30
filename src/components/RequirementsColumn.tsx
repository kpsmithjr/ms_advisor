import React from "react";
import styled from "styled-components";

interface IReqCont {
	clr: number;
};

const RequirementContainer = styled.div<IReqCont>`
color: ${props => (props.clr === 0 ? 'red' : (props.clr === 1 ? 'green' : 'grey'))};
margin-left: 4px;
`
const ColContainer = styled.div`
`
interface IReqLine {
	txtArr: string[];
	clrArr: number[];
}

const RequirementsColumn = ({txtArr, clrArr} : IReqLine) => {
	return (
		<div>
		<ColContainer>
			{txtArr.map((txt, index) => (
				<RequirementContainer
				key={index}
				clr={clrArr[index]}
			>
				{txt}
			</RequirementContainer>
			))}			
		</ColContainer>
		</div>
	);
}

export default RequirementsColumn;