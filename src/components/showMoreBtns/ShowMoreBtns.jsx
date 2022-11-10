import { memo } from "react";

import './showMoreBtns.scss'

const ShowMoreBtns = memo((props) => {
    const {disabledBtn, handlePageClick, onShowAllAddress, disabledAllDataBtn} = props

	return (
		<div className="show-more" >
			<button
				className={`show-more__btn ${disabledBtn ? 'active' : ''}`}
				type="button"
				onClick={handlePageClick}
			>
				{disabledBtn ? 'No More Items' : 'Add 25 Items'}
			</button>

			<button
				className={`
					show-more__btn 
					show-more__btn--red 
					${disabledAllDataBtn ? 'active' : ''}
				`}
				type="button"
				onClick={onShowAllAddress}
			>
				{disabledAllDataBtn ? 'Reset Filter' : 'Show All Address'}
			</button>
		</div>
	);
}) 

export default ShowMoreBtns;
