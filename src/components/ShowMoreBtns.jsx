import { memo } from "react";

const ShowMoreBtns = memo((props) => {
    const {disabledBtn, scrollRef, handlePageClick, onShowAllAddress, disabledAllDataBtn} = props

	return (
		<div className="show-more" ref={scrollRef}>
			<button
				className={`show-more__btn ${disabledBtn ? 'active' : ''}`}
				type="button"
				onClick={handlePageClick}
			>
				{disabledBtn ? 'No More Address' : 'Next 20 Address'}
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
				{disabledAllDataBtn ? 'No More Address' : 'Show All Address'}
			</button>
		</div>
	);
}) 

export default ShowMoreBtns;
