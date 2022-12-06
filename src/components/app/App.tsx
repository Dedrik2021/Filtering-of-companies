/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, FC, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import debounce from 'lodash.debounce';

import FirmsList from '../firms/firmsList/FirmsList';
import Search from '../search/Search';
import ShowMoreBtns from '../showMoreBtns/ShowMoreBtns';
import { Status } from '../../enums/status';
import {
	fetchData,
	fetchDataFilter,
	fetchDataLength,
	fetchDataOthers,
} from '../../redux/thunks/fetchThunk';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import {
	setActiveBtn,
	setOthersBtn,
	setBtn,
	setSearchParams,
	setDisabledBtn,
} from '../../redux/slices/firmsDataSlice';

import './app.scss';
import '../../scss/style.scss';

const App: FC = () => {
	const dispatch = useAppDispatch();
	const [page, setPage] = useState(100);
	const [disabledAllDataBtn, setDisabledAllDataBtn] = useState(false);
	const { dataStatus, length, searchParams, disabledBtn } = useAppSelector((state) => state.firmsData);

	useEffect(() => {
		if (isNaN(length)) {
			dispatch(setDisabledBtn(true));
			setDisabledAllDataBtn(true);
		} else {
			dispatch(setDisabledBtn(false));
			setDisabledAllDataBtn(false);
		}

		dispatch(fetchData({ length: 50, psc: '' }));
		dispatch(fetchDataFilter({ length: 50, psc: '' }));
		dispatch(fetchDataOthers({ length }));
		dispatch(fetchDataLength());
	}, [dispatch, length, searchParams]);

	const handlePageClick = () => {
		if (page <= length) {
			setPage(page + 50);
			dispatch(fetchData({ length: page, psc: '' }));
			dispatch(setSearchParams(''))
		} else {
			dispatch(setDisabledBtn(true));
		}
	};

	const onShowAllAddress = () => {
		dispatch(fetchData({ length, psc: '' }));
		dispatch(setDisabledBtn(true));
		setDisabledAllDataBtn(true);
		dispatch(setActiveBtn(null));
		dispatch(setOthersBtn(false));
		dispatch(setSearchParams(''))
	};

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchParams(e.target.value));
		updateSearchValue(e.target.value);
	};

	const updateSearchValue = useCallback(
		debounce((num: string) => {
			if (num !== '') {
				if (!Number.isNaN(Number(num))) {
					dispatch(fetchData({ length: length, psc: num }));
					setDisabledAllDataBtn(false);
					dispatch(setActiveBtn(null));
					dispatch(setOthersBtn(false));
					dispatch(setBtn(null));
					dispatch(setDisabledBtn(false));
				} else {
					alert('The input data must contain numbers!');
					dispatch(fetchData({ length: 50, psc: '' }));
					dispatch(setSearchParams(''));
					setDisabledAllDataBtn(false);
					dispatch(setActiveBtn(null));
					dispatch(setOthersBtn(false));
					dispatch(setBtn(null));
					dispatch(setDisabledBtn(true));
					setDisabledAllDataBtn(false);
				}
			} else {
				dispatch(fetchData({ length: 50, psc: '' }));
				dispatch(setBtn(null));
				dispatch(setSearchParams(''));
			}
		}, 180),
		[],
	);

	const dataLoaded = () => {
		if (dataStatus === Status.SUCCESS) {
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
					<Search searchParams={searchParams} onChangeInput={onChangeInput} />
					<FirmsList
						setDisabledAllDataBtn={setDisabledAllDataBtn}
						disabledAllDataBtn={disabledAllDataBtn}
						updateSearchValue={updateSearchValue}
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
