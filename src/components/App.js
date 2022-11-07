import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';

import FirmsList from './FirmsList';
import ShowMoreBtns from './ShowMoreBtns';
import {
	fetchData,
	fetchDataFilter,
	fetchDataLength,
	setActiveBtn,
	fetchDataOthers,
	setOthersBtn
} from '../redux/slices/dataSlice';

import '../scss/style.scss';

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
			}, 500);
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
					<h1 className="title">List Of Companies</h1>
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
						scrollRef={scrollRef}
						disabledAllDataBtn={disabledAllDataBtn}
					/>
				</div>
			</div>
		</>
	);
};

export default App;
