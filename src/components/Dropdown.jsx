import { memo } from "react";

const Dropdown = memo((props) => {
	const { 
        btn, 
        onActiveBtn2, 
        stylePsc, 
        setBtn, 
        dataFilterStatus ,
        result,
        activeBtn
    } = props;

	return (
		<ul className="dropdown">
            {result.map(({group, numbers}) => {
                return (
                    <li className="dropdown__item" key={group}>
                        <span className="dropdown__group">{`${activeBtn}${group}x xx`}</span>
                        {numbers.map(({id, psc}) => {
                            return (
                                <button 
                                    className={`btn ${btn === id ? 'active' : ''}`}
                                    onClick={() => (onActiveBtn2(psc[0] + psc[1] + psc[2]), setBtn(id))}
                                    style={{ backgroundColor: stylePsc(psc) }}
							        type="button" key={id}>
                                    {dataFilterStatus === 'loading' ? 'xxx xx' : psc}
                                </button>
                            )
                        })}
                    </li>
                )
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

export default Dropdown;
