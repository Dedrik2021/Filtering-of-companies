import { useSelector } from 'react-redux';

import DataFirms from '../dataFirms/DataFirms';
import Spinner from '../../../spinner/Spinner';
import dataFirmsError from '../../../assets/images/data-error.webp';

import './firmsItems.scss'

const FirmsItems = ({stylePsc}) => {
	const { dataStatus, dataFilterStatus } = useSelector((state) => state.firmsData);

	const dataFirmsLoaded = () => {
		if (dataStatus === 'success' && dataFilterStatus === 'success') {
			return <DataFirms stylePsc={stylePsc}/>
		} else if (
			(dataStatus === 'loading' && dataFilterStatus === 'loading') ||
			dataStatus === 'success' ||
			dataFilterStatus === 'success'
		) {
			return <Spinner />;
		} else if (dataStatus === 'error' && dataFilterStatus === 'error') {
			return (
				<img
					src={dataFirmsError}
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
				{dataFirmsLoaded()}
			</div>
		</div>
	)
};

export default FirmsItems;
