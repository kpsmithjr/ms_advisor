import React from "react";
import styled from "styled-components";

const RequirementContainer = styled.div`
color: ${props => (props.clr === 0 ? 'red' : (props.clr === 1 ? 'green' : 'grey'))};
margin-left: 4px;
`
const LineContainer = styled.div`
display: inline-flex;
`
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