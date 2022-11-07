import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getData, getDataFilter, getLength } from '../redux/slices/dataSlice';

const FirmsItems = ({stylePsc}) => {
	const dispatch = useDispatch();
	const { data, allData, allDataFilter, dataLength } = useSelector((state) => state.firmsData);
	const pscs = data.map(item => item.psc.replace(/\s+/g,''))

	let result = [];
	for (let i in dataLength.winstrom) {
		if (dataLength.winstrom.hasOwnProperty(i)) {
			result.push(dataLength.winstrom[i])
		}
	}

	useEffect(() => {
		dispatch(getData(allData.winstrom !== undefined && allData.winstrom.adresar));
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
						{data.map((item, i) => {
								return (
									<li className="list__item list__item--length" key={item.id}>
										{i + 1}
									</li>
								);
							})}
					</ul>
					<ul className="list">
						{data.map(({id, nazev}) => {
							return (
								<li className="list__item" key={id} >
									{nazev}
								</li>
							);
						})}
					</ul>
					<ul className="list" >
						{data.map(({id, ulice}) => {
							return (
								<li 
									className="list__item" key={id}
									>
									{ulice !== '' ? ulice : '-- -- --'}
								</li>
							);
						})}
					</ul>
					<ul className="list">
						{pscs.map((psc, i) => {
							return (
								<li className="list__item" key={i} style={{backgroundColor: stylePsc(psc), color: psc !== '' ? 'white' : 'black', borderColor: 'white'}}>
									{psc !== '' ? psc : 'xxx xx'}
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
