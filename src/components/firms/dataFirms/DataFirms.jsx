import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setData, setDataFilter, setLength } from '../../../redux/slices/firmsDataSlice';

const DataFirms = ({ stylePsc }) => {
	const dispatch = useDispatch();
	const { dataFirms, allDataFirms, allDataFirmsFilter, dataLength } = useSelector(
		(state) => state.firmsData,
	);
	const pscs = dataFirms.map((item) => item.psc.replace(/\s+/g, ''));

	let result = [];
	for (let i in dataLength.winstrom) {
		if (dataLength.winstrom.hasOwnProperty(i)) {
			result.push(dataLength.winstrom[i]);
		}
	}

	useEffect(() => {
		dispatch(setData(allDataFirms.winstrom !== undefined && allDataFirms.winstrom.adresar));
		dispatch(
			setDataFilter(
				allDataFirmsFilter.winstrom !== undefined && allDataFirmsFilter.winstrom.adresar,
			),
		);
		dispatch(setLength(Number(result[1])));
	}, []);

	const dataFirmsAvailable = () => {
		if (dataFirms.length !== 0) {
			return (
				<>
					<ul className="list">
						{dataFirms.map((item, i) => {
							return (
								<li className="list__item list__item--length" key={item.id}>
									{i + 1}
								</li>
							);
						})}
					</ul>
					<ul className="list">
						{dataFirms.map(({ id, nazev }) => {
							return (
								<li className="list__item" key={id}>
									{nazev}
								</li>
							);
						})}
					</ul>
					<ul className="list">
						{dataFirms.map(({ id, ulice }) => {
							return (
								<li className="list__item" key={id}>
									{ulice !== '' ? ulice : '-- -- --'}
								</li>
							);
						})}
					</ul>
					<ul className="list" >
						{pscs.map((psc, i) => {
							return (
								<li
									className="list__item"
									key={i}
									style={{
										backgroundColor: stylePsc(psc[0]),
										color: psc !== '' ? 'white' : 'black',
										borderColor: 'white',
									}}
								>
									{psc !== '' ? psc : 'xxx xx'}
								</li>
							);
						})}
					</ul>
				</>
			);
		} else {
			return <h3 style={{color: 'red', textAlign: 'center', width: '1100px', fontSize: '50px', padding: '358px 0'}}>NO DATA</h3>;
		}
	};

	return (
		<div className="firms-items__list" >
			{dataFirmsAvailable()}
		</div>
	);
};

export default DataFirms;