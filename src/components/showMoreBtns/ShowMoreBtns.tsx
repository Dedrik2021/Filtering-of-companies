import { memo, FC } from 'react';

import './showMoreBtns.scss';

interface ShowMoreBtnsProps {
	disabledBtn: boolean;
	handlePageClick: () => void;
	onShowAllAddress: () => void;
	disabledAllDataBtn: boolean;
}

const ShowMoreBtns: FC<ShowMoreBtnsProps> = memo((props) => {
	const { disabledBtn, handlePageClick, onShowAllAddress, disabledAllDataBtn } = props;

	return (
		<div className="show-more">
			<button
				className={`show-more__btn ${disabledBtn ? 'active' : ''}`}
				type="button"
				onClick={handlePageClick}
			>
				{disabledBtn ? 'No More Items' : 'Add 50 Items'}
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
});

export default ShowMoreBtns;
