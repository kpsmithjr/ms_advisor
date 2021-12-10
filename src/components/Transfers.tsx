import React from 'react';
import { useNavigate } from 'react-router-dom';

import ITransfers from "../interfaces/iTransfers";

const min_trans_hrs:number = 0;
const max_trans_hrs:number = 9;
const Transfers = ({transfersHrs, setTransferHanlder}: ITransfers) => {
	
	const navigate = useNavigate();
	const [transHrs, setTransHours] = React.useState<number>(transfersHrs);

	const handleChange = (event:any) => {
		const val:number = event.target.value;
		if (val > max_trans_hrs) {
			setTransHours(max_trans_hrs);
		} else if (val < min_trans_hrs) {
			setTransHours(min_trans_hrs);
		} else {
			setTransHours(val);
		}
	}
	
	const handleCancel = () => {
		navigate(-1);
	};

	const handleSubmit = () => {
		setTransferHanlder(transHrs);
		navigate('/waivers');
	}

	return (
		<div>
			<h3>Enter the number of credit hours to transfer into the program.</h3>
			<h4>A maximum of {max_trans_hrs} transfered credit hours will be applied to the degree.</h4>
			<form>
				<label>Enter the number of transfer credit hours:
					<input
						type="number"
						name="transferHrs"
						value={transHrs}
						onChange={handleChange}
					/>
				</label>
			</form>
			<div className="options-footer">
				<button onClick={handleCancel}>Cancel</button>
				<button onClick={handleSubmit}>Next</button>
			</div>
		</div>
	)
}

export default Transfers;