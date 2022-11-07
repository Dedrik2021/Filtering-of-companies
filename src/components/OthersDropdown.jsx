import { memo } from 'react';

const OthersDropdown = memo((props) => {
	const { 
        othersBtn, 
        onOthersBtn, 
        pscOthers, 
        btn, 
        onActiveBtn2, 
        setBtn, 
        dataOthersStatus 
    } = props;

	return (
		<div className={`filter__box `}>
			<button
				className={`filter__btn ${othersBtn ? 'active' : ''}`}
				type="button"
				onClick={onOthersBtn}
				style={{ backgroundColor: 'aqua', color: 'black' }}
			>
				Others
			</button>
			<ul className={`dropdown-others ${othersBtn ? 'active' : ''}`}>
				{pscOthers.map((psc, i) => {
					return (
						<li className="dropdown-others__item" key={i}>
							<button
								className={`dropdown-others__btn ${btn === i ? 'active' : ''}`}
								style={{ backgroundColor: 'black' }}
								onClick={() => (
									onActiveBtn2(
										psc[0] + psc[1] + psc[2] + psc[3] + psc[4] + psc[5],
									),
									setBtn(i)
								)}
								type="button"
							>
								{dataOthersStatus === 'loading' ? 'xx xx xx' : psc}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
});

export default OthersDropdown;
