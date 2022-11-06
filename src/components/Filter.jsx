import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DropDown from './Dropdown';
import { fetchData, setActiveBtn, fetchDataFilter } from '../redux/slices/dataSlice';

const Filter = (props) => {
	const { styleBtn, setDisabledBtn, setDisabledAllDataBtn, disabledBtn, disabledAllDataBtn } =
		props;
	const dispatch = useDispatch();
	const [btn, setBtn] = useState(false);
	const { dataFilterStatus, length, dataFilter, activeBtn } = useSelector(
		(state) => state.firmsData,
	);

	const numbers = dataFilter.map((item) => item.psc).sort();
    const uniqueNumbers = [...new Set(numbers)]
    const numbersSpace = uniqueNumbers.map(item => item.replace(/\s+/g,''))
    const numbersLength = numbersSpace.map(item => item.substr(0, 5))
    const numbersString = numbersLength.map(item => item.replace(/[^0-9]/g, ''))

	const numbersWithGroups = numbersString.map((num, i) => ({number: {id: i, psc: num}, group: + num.toString()[1] }));

	const result = [];
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

	const onActiveBtn = (id) => {
		dispatch(setActiveBtn(id));
		dispatch(fetchData({ length, psc: id }));
		dispatch(fetchDataFilter({ length, psc: id }));
		setDisabledBtn(true);
		setDisabledAllDataBtn(false);
	};

	const onActiveBtn2 = (id) => {
		dispatch(fetchData({ length, psc: id }));
		setDisabledBtn(true);
		setBtn(id[1]);
	};

	const onResetBtn = () => {
		dispatch(setActiveBtn(''));
		setBtn('');
		setDisabledBtn(false);
		setDisabledAllDataBtn(false);
		dispatch(fetchData({ length: 20, psc: '' }));
		dispatch(fetchDataFilter({ length: 20, psc: '' }));
	};

	const stylePsc = (psc) => {
		switch (psc[1]) {
			case '0':
				return 'red';
			case '1':
				return 'black';
			case '2':
				return 'darkmagenta';
			case '3':
				return 'brown';
			case '4':
				return 'blue';
			case '5':
				return 'darkgreen';
			case '6':
				return 'chocolate';
			case '7':
				return 'darkgoldenrod';
			case '8':
				return 'darkred';
			case '9':
				return 'goldenrod';
			default:
				return 'antiquewhite';
		}
	};

	return (
		<div className="filter">
			<h3 className="filter__title">Filter: PSČ</h3>
			<div
				className={`filter__inner ${disabledAllDataBtn ? '' : disabledBtn ? 'active' : ''}`}
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
									style={{ backgroundColor: styleBtn(name) }}
									onClick={() => onActiveBtn(id)}
								>
									{name}
								</button>

								<DropDown
									btn={btn}
									onActiveBtn2={onActiveBtn2}
									stylePsc={stylePsc}
									setBtn={setBtn}
									dataFilterStatus={dataFilterStatus}
                                    result={result}
                                    activeBtn={activeBtn}
								/>
							</li>
						);
					})}
				</ul>

				<button
					className={`filter-list__btn filter-list__btn--reset ${
						disabledBtn ? '' : 'active'
					}`}
					type="button"
					onClick={onResetBtn}
				>
					Reset Filter
				</button>
			</div>
		</div>
	);
};

export default Filter;
