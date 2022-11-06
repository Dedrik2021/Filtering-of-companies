import { memo } from "react";

const DropDown = memo((props) => {
	const { 
        dataFilter, 
        btn, 
        onActiveBtn2, 
        stylePsc, 
        setBtn, 
        dataFilterStatus 
    } = props;
	return (
		<ul className="dropdown">
			{dataFilter.map(({ id, psc }) => {
				return (
					<li className="dropdown__item" key={id}>
						<button
							className={`dropdown__btn ${btn === id ? 'active' : ''}`}
							type="button"
							style={{ backgroundColor: stylePsc(psc) }}
							onClick={() => (onActiveBtn2(psc[0] + psc[1]), setBtn(id))}
						>
							{dataFilterStatus === 'loading' ? 'xxx xx' : psc}
						</button>
					</li>
				);
			})}
			<li className="dropdown__item">
				<button
					className="dropdown__btn"
					type="button"
					style={{ backgroundColor: 'aqua', color: 'black' }}
				>
					Others
				</button>
			</li>
		</ul>
	);
})

export default DropDown;
