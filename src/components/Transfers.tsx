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
			setTransferHanlder(max_trans_hrs);
		} else if (val < min_trans_hrs) {
			setTransHours(min_trans_hrs);
			setTransferHanlder(min_trans_hrs);
		} else {
			setTransHours(val);
			setTransferHanlder(val);
		}
	}
	
	const handleCancel = () => {
		navigate(-1);
	};

	const handleSubmit = () => {
		
		navigate('/waivers');
	}

	return (
		<div className='page-container'>
			<div className="page-header">
        <h1>Transfer Courses</h1>
      </div>
			<div className="footer-buttons">
				<button onClick={handleCancel}>Previous</button>
				&nbsp;&nbsp;&nbsp;
				<button onClick={handleSubmit}>Next</button>
			</div>
			<div className='instructions'>
        Enter the number of credit hours to transfer into the program.
				<br></br>
				Note: A maximim of {max_trans_hrs} transfered hours will be applied to the degree.
      </div>
			<br></br>
			<form className='forms'>
				<label>Transfer credit hours:
					<input
						type="number"
						name="transferHrs"
						value={transHrs}
						onChange={handleChange}
					/>
				</label>
			</form>
		</div>
	)
}

export default Transfers;