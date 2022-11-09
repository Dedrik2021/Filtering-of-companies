import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';

import FirmsList from '../firms/firmsList/FirmsList';
import ShowMoreBtns from '../showMoreBtns/ShowMoreBtns';
import {
	fetchData,
	fetchDataFilter,
	fetchDataLength,
	fetchDataOthers,
} from '../../redux/thunks/fetchThunk';

import {
	setActiveBtn,
	setOthersBtn
} from '../../redux/slices/firmsDataSlice'

import './app.scss';
import '../../scss/style.scss'

const App = () => {
	const dispatch = useDispatch();
	const scrollRef = useRef(null);
	const [page, setPage] = useState(40);
	const [disabledAllDataBtn, setDisabledAllDataBtn] = useState(false);
	const [disabledBtn, setDisabledBtn] = useState(false);
	const { dataStatus, length } = useSelector((state) => state.firmsData);

	useEffect(() => {
		if (isNaN(length)) {
			setDisabledBtn(true);
			setDisabledAllDataBtn(true);
		} else {
			setDisabledBtn(false);
			setDisabledAllDataBtn(false);
		}

		dispatch(fetchData({ length: 20, psc: '' }));
		dispatch(fetchDataFilter({ length: 20, psc: '' }));
		dispatch(fetchDataOthers(length))
		dispatch(fetchDataLength());
	}, [length]);

	const handlePageClick = () => {
		if (page <= length) {
			setPage(page + 20);
			dispatch(fetchData({ length: page, psc: '' }));
			setTimeout(() => {
				window.scrollTo(0, scrollRef.current.offsetTop);
			}, 1000);
		} else {
			setDisabledBtn(true);
		}
	};

	const onShowAllAddress = () => {
		dispatch(fetchData({ length, psc: '' }));
		setDisabledBtn(true);
		setDisabledAllDataBtn(true);
		dispatch(setActiveBtn(''));
		dispatch(setOthersBtn(false))
		window.scrollTo(0, 0);
	};

	const dataLoaded = () => {
		if (dataStatus === 'success') {
			return (
				isNaN(length) && (
					<h3
						style={{
							textAlign: 'center',
							fontSize: '40px',
							marginBottom: '30px',
							color: 'red',
							textTransform: 'uppercase',
						}}
					>
						Please restart the page!!!
					</h3>
				)
			);
		}
	};

	return (
		<>
			<Helmet>
				<meta name="description" content="List Of Companies" />
				<title>List Of Companies</title>
			</Helmet>
			<div className="app">
				<div className="container">
					{dataLoaded()}
					<FirmsList
						setDisabledBtn={setDisabledBtn}
						setDisabledAllDataBtn={setDisabledAllDataBtn}
						disabledBtn={disabledBtn}
						disabledAllDataBtn={disabledAllDataBtn}
					/>
					<ShowMoreBtns
						disabledBtn={disabledBtn}
						handlePageClick={handlePageClick}
						onShowAllAddress={onShowAllAddress}
						disabledAllDataBtn={disabledAllDataBtn}
					/>
				</div>
			</div>
		</>
	);
};

export default App;
