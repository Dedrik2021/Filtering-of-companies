import { useEffect, useState, FC, memo } from 'react';

import FilterDropdownBtns from '../filterDropdownBtns/FilterDropdownBtns';
import FilterDropdownOthersBtns from '../filterDropdownOthersBtns/FilterDropdownOthersBtns';
import { fetchData, fetchDataFilter } from '../../../redux/thunks/fetchThunk';
import {
	setActiveBtn,
	setOthersBtn,
	setBtn,
	setSearchParams,
	setDisabledBtn,
} from '../../../redux/slices/firmsDataSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { DataFirmsObj } from '../../../redux/slices/types';

import './filter.scss';

export interface FilterProps {
	stylePsc: (psc: string) => string;
	setDisabledAllDataBtn: (value: boolean) => void;
	disabledAllDataBtn: boolean;
	dataOthersStatus: string;
	updateSearchValue: (value: string) => void;
}

const Filter: FC<FilterProps> = memo((props) => {
	const {
		stylePsc,
		setDisabledAllDataBtn,
		disabledAllDataBtn,
		dataOthersStatus,
		updateSearchValue,
	} = props;

	const dispatch = useAppDispatch();
	const [othersDataBtns, setOthersDataBtns] = useState<DataFirmsObj[]>([]);
	const {
		dataFilterStatus,
		length,
		dataFilter,
		activeBtn,
		dataOthersBtns,
		othersBtn,
		btn,
		disabledBtn
	} = useAppSelector((state) => state.firmsData);

	useEffect(() => {
		setOthersDataBtns(
			dataOthersBtns.winstrom !== undefined ? dataOthersBtns.winstrom.adresar : [],
		);
	}, [dataOthersBtns]);

	useEffect(() => {
		if (disabledAllDataBtn) {
			dispatch(setBtn(null));
		}
	}, [disabledAllDataBtn, dispatch]);

	const numbrs = othersDataBtns && othersDataBtns.map((item) => item.psc).sort();
	const uniNumbers = Array.from(new Set(numbrs));
	const numbrsSpace = uniNumbers.map((item) => item.replace(/\s+/g, ''));
	const pscOthers = numbrsSpace.filter((item) => item.length > 5);

	const numbers = dataFilter.map((item) => item.psc).sort();
	const uniqueNumbers = Array.from(new Set(numbers));
	const numbersSpace = uniqueNumbers.map((item) => item.replace(/\s+/g, ''));
	const numbersLength = numbersSpace.filter((item) => item.length === 5);
	const numbersString = numbersLength.map((item) => item.replace(/[^0-9]/g, ''));

	const numbersWithGroups = numbersString.map((num, i) => ({
		number: { id: i, psc: num },
		group: +num.toString()[1],
	}));

	const result: { group: number; numbers: { id: number; psc: string }[] }[] = [];
	numbersWithGroups.forEach(({ number, group }) => {
		const existingGroupIndex = result.findIndex((resultItem) => resultItem.group === group);
		if (existingGroupIndex === -1) {
			result.push({ group, numbers: [number] });
		} else {
			result[existingGroupIndex].numbers.push(number);
		}
	});

	const filterBbtns = [
		{
			id: 0,
			name: '0xx xx',
		},
		{
			id: 1,
			name: '1xx xx',
		},
		{
			id: 2,
			name: '2xx xx',
		},
		{
			id: 3,
			name: '3xx xx',
		},
		{
			id: 4,
			name: '4xx xx',
		},
		{
			id: 5,
			name: '5xx xx',
		},
		{
			id: 6,
			name: '6xx xx',
		},
		{
			id: 7,
			name: '7xx xx',
		},
		{
			id: 8,
			name: '8xx xx',
		},
		{
			id: 9,
			name: '9xx xx',
		},
	];

	const onFilterBtnClick = (psc: number) => {
		dispatch(fetchData({ length, psc: String(psc) }));
		dispatch(fetchDataFilter({ length, psc: String(psc) }));
		dispatch(setSearchParams(''));
		setDisabledAllDataBtn(false);
		dispatch(setOthersBtn(false));
		
		setTimeout(() => {
			dispatch(setActiveBtn(psc));
			dispatch(setBtn(null));
			dispatch(setDisabledBtn(true));
		}, 700)
	};	

	const onDropdownBtnClick = (psc: string) => {
		dispatch(fetchData({ length, psc: psc }));
		dispatch(setDisabledBtn(true));
		dispatch(setBtn(Number(psc[1])));
	};

	const onOthersBtnClick = () => {
		updateSearchValue('');
		dispatch(setSearchParams(''));
		
		setTimeout(() => {
			dispatch(setActiveBtn(null));
			dispatch(setOthersBtn(true));
			dispatch(setDisabledBtn(true));
		}, 700)
	};

	const onResetBtnClick = () => {
		dispatch(setOthersBtn(false));
		dispatch(setActiveBtn(null));
		dispatch(setBtn(null));
		dispatch(setDisabledBtn(false));
		setDisabledAllDataBtn(false);
		dispatch(fetchData({ length: 50, psc: '' }));
		dispatch(fetchDataFilter({ length: 50, psc: '' }));
		updateSearchValue('');
		dispatch(setSearchParams(''));
	};

	return (
		<div className={`filter`}>
			<h3 className="filter__title">Filter: PSČ</h3>
			<div
				className={`filter__inner ${
					disabledAllDataBtn ? (othersBtn ? 'active' : '') : disabledBtn ? 'active' : ''
				}`}
			>
				<ul className="filter-list">
					{filterBbtns.map(({ id, name }) => {
						return (
							<li
								className={`filter-list__item ${activeBtn === id ? 'active' : ''}`}
								key={id}
							>
								<button
									className={`filter-list__btn ${
										activeBtn === id ? 'active' : ''
									}`}
									type="button"
									style={{ backgroundColor: stylePsc(name[0]) }}
									onClick={() => onFilterBtnClick(id)}
								>
									{name}
								</button>

								<FilterDropdownBtns
									btn={btn}
									onDropdownBtnClick={onDropdownBtnClick}
									stylePsc={stylePsc}
									dataFilterStatus={dataFilterStatus}
									result={result}
									activeBtn={activeBtn}
								/>
							</li>
						);
					})}
				</ul>
				<FilterDropdownOthersBtns
					othersBtn={othersBtn}
					onOthersBtn={onOthersBtnClick}
					pscOthers={pscOthers}
					btn={btn}
					onDropdownBtnClick={onDropdownBtnClick}
					dataOthersStatus={dataOthersStatus}
					setDisabledAllDataBtn={setDisabledAllDataBtn}
				/>
				<button
					className={`filter-list__btn filter-list__btn--reset ${
						disabledBtn ? '' : 'active'
					}`}
					type="button"
					onClick={onResetBtnClick}
				>
					Reset Filter
				</button>
			</div>
		</div>
	);
});

export default Filter;
