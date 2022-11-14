import { useEffect, useState, FC } from 'react';
import {Helmet} from 'react-helmet';

import FirmsList from '../firms/firmsList/FirmsList';
import ShowMoreBtns from '../showMoreBtns/ShowMoreBtns';
import {
	fetchData,
	fetchDataFilter,
	fetchDataLength,
	fetchDataOthers,
} from '../../redux/thunks/fetchThunk';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import {
	setActiveBtn,
	setOthersBtn
} from '../../redux/slices/firmsDataSlice'

import './app.scss';
import '../../scss/style.scss'

const App: FC = () => {
	const dispatch = useAppDispatch();
	const [page, setPage] = useState(50);
	const [disabledAllDataBtn, setDisabledAllDataBtn] = useState(false);
	const [disabledBtn, setDisabledBtn] = useState(false);
	const { dataStatus, length } = useAppSelector((state) => state.firmsData);

	useEffect(() => {
		if (isNaN(length)) {
			setDisabledBtn(true);
			setDisabledAllDataBtn(true);
		} else {
			setDisabledBtn(false);
			setDisabledAllDataBtn(false);
		}

		dispatch(fetchData({ length: 25, psc: '' }));
		dispatch(fetchDataFilter({ length: 25, psc: '' }));
		dispatch(fetchDataOthers({length}))
		dispatch(fetchDataLength());
	}, [dispatch, length]);

	const handlePageClick = () => {
		if (page <= length) {
			setPage(page + 25);
			dispatch(fetchData({ length: page, psc: '' }));
		} else {
			setDisabledBtn(true);
		}
	};

	const onShowAllAddress = () => {
		dispatch(fetchData({ length, psc: '' }));
		setDisabledBtn(true);
		setDisabledAllDataBtn(true);
		dispatch(setActiveBtn(null));
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
