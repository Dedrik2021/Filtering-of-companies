/* eslint-disable no-sequences */
import { memo, FC } from 'react';

import { useAppDispatch } from '../../../redux/store';
import { setBtn } from '../../../redux/slices/firmsDataSlice';

import './filterDropdownOthersBtns.scss';

interface OthersDropdownBtnsProps {
	othersBtn: boolean,
	onOthersBtn: () => void,
	pscOthers: string[], 
	btn: null | number,
	onDropdownBtnClick: (psc: string) => void,
	setDisabledAllDataBtn: (value: boolean) => void;
	dataOthersStatus: string
}

const OthersDropdownBtns: FC<OthersDropdownBtnsProps> = memo((props) => {
	const {
		othersBtn,
		onOthersBtn,
		pscOthers,
		btn,
		onDropdownBtnClick,
		dataOthersStatus,
		setDisabledAllDataBtn,
	} = props;

	const dispatch = useAppDispatch()

	return (
		<div className={`filter__box `}>
			<button
				className={`filter__btn ${othersBtn ? 'active' : ''}`}
				type="button"
				onClick={onOthersBtn}
				style={{ backgroundColor: 'aqua', color: 'black' }}
			>
				Others
			</button>
			<ul className={`filter-dropdown-others-btns ${othersBtn ? 'active' : ''}`}>
				{pscOthers.map((psc, i) => {
					return (
						<li className="filter-dropdown-others-btns__item" key={i}>
							<button
								className={`filter-dropdown-others-btns__btn ${
									btn === i ? 'active' : ''
								}`}
								style={{ backgroundColor: 'black' }}
								onClick={() => (
									onDropdownBtnClick(
										psc[0] + psc[1] + psc[2] + psc[3] + psc[4] + psc[5],
									),
									dispatch(setBtn(i)),
									setDisabledAllDataBtn(false)
								)}
								type="button"
							>
								{dataOthersStatus === 'loading' ? 'xx xx xx' : psc}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
});

export default OthersDropdownBtns;
