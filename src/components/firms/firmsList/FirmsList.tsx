import { FC, memo } from 'react';

import Filter from '../../filter/filter/Filter';
import FirmsItems from '../firmsItems/FirmsItems';

import './firmsList.scss';

interface FirmsListProps {
	setDisabledAllDataBtn: (value: boolean | ((prevVar: boolean) => boolean)) => void;
	disabledAllDataBtn: boolean;
	updateSearchValue: (value: string) => void
}

const FirmsList: FC<FirmsListProps> = memo((props) => {
	const {
		setDisabledAllDataBtn,
		disabledAllDataBtn,
		updateSearchValue,
	} = props;

	const stylePsc = (psc: string) => {
		switch (psc) {
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
				return 'tomato';
		}
	};

	return (
		<section className="firms">
			<Filter
				stylePsc={stylePsc}
				setDisabledAllDataBtn={setDisabledAllDataBtn}
				disabledAllDataBtn={disabledAllDataBtn}
				dataOthersStatus={''}
				updateSearchValue={updateSearchValue}
			/>
			<FirmsItems stylePsc={stylePsc} />
		</section>
	);
});

export default FirmsList;
