import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getData, getDataFilter, getLength } from '../redux/slices/dataSlice';

const FirmsItems = ({stylePsc}) => {
	const dispatch = useDispatch();
	const { data, allData, allDataFilter, dataLength, fields } = useSelector((state) => state.firmsData);

	let result = [];
	for (let i in dataLength.winstrom) {
		if (dataLength.winstrom.hasOwnProperty(i)) {
			result.push(dataLength.winstrom[i])
		}
	}

	useEffect(() => {
		dispatch(getData(allData.winstrom.adresar));
		dispatch(getDataFilter(allDataFilter.winstrom !== undefined && allDataFilter.winstrom.adresar));
        dispatch(getLength(Number(result[1])))
	}, []);

	return (
		<div className="firms-items">
			<div className="firms-items__box">
				<ul className="firms-items__list">
					<li className="firms-items__item" >
						<h3 className="firms-items__title">№</h3>
					</li>
					<li className="firms-items__item">
						<h3 className="firms-items__title">Name</h3>
					</li>
					<li className="firms-items__item">
						<h3 className="firms-items__title">Address</h3>
					</li>
					<li className="firms-items__item">
						<h3 className="firms-items__title">PSČ</h3>
					</li>
				</ul>
				<div className="firms-items__list">
					<ul className="list">
						{data &&
							data.map((item, i) => {
								return (
									<li className="list__item list__item--length" key={item.id}>
										{i + 1}
									</li>
								);
							})}
					</ul>
					<ul className="list">
						{data.map((item) => {
							return (
								<li className="list__item" key={item.id} >
									{item.nazev !== '' ? item.nazev : '-- -- --'}
								</li>
							);
						})}
					</ul>
					<ul className="list" >
						{data.map((item) => {
							return (
								<li 
									className="list__item" key={item.id}
									>
									{item.ulice !== '' ? item.ulice : '-- -- -- '}
								</li>
							);
						})}
					</ul>
					<ul className="list">
						{data.map((item) => {
							return (
								<li className="list__item" key={item.id} style={{backgroundColor: stylePsc(item.psc), color: item.psc !== '' ? 'white' : 'black', borderColor: 'white'}}>
									{item.psc !== '' ? item.psc : '-- -- --'}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default FirmsItems;
