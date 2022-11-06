import { useSelector } from 'react-redux';

import Filter from './Filter';
import FirmsItems from './FirmsItems';
import Spinner from '../spinner/Spinner';
import dataError from '../assets/images/data-error.webp';

const FirmsList = (props) => {
	const { 
		setDisabledBtn, 
		setDisabledAllDataBtn, 
		disabledBtn, 
		disabledAllDataBtn 
	} = props;
	const { dataStatus, dataFilterStatus } = useSelector((state) => state.firmsData);

	const stylePsc = (psc) => {
		switch (psc[0]) {
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

	const dataLoaded = () => {
		if (dataStatus === 'success' && dataFilterStatus === 'success') {
			return <FirmsItems stylePsc={stylePsc} />;
		} else if (
			(dataStatus === 'loading' && dataFilterStatus === 'loading') ||
			dataStatus === 'success' ||
			dataFilterStatus === 'success'
		) {
			return <Spinner />;
		} else if (dataStatus === 'error' && dataFilterStatus === 'error') {
			return (
				<img
					src={dataError}
					style={{
						paddingTop: '100px',
						display: 'block',
						borderRadius: '10px',
						margin: '0 auto',
					}}
					alt="Data Eroor"
				/>
			);
		}
	};

	return (
		<section className="firms">
			<Filter
				styleBtn={stylePsc}
				setDisabledBtn={setDisabledBtn}
				setDisabledAllDataBtn={setDisabledAllDataBtn}
				disabledBtn={disabledBtn}
				disabledAllDataBtn={disabledAllDataBtn}
			/>
			{/* <FirmsItems stylePsc={stylePsc} />; */}
			{dataLoaded()}
		</section>
	);
};

export default FirmsList;
