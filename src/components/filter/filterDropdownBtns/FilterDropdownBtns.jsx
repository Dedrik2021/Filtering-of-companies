import { memo } from "react";

import './filterDropdownBtns.scss'

const DropdownBtns = memo((props) => {
	const { 
        btn, 
        onDropdownBtnClick, 
        stylePsc, 
        setBtn, 
        dataFilterStatus ,
        result,
        activeBtn
    } = props;

	return (
		<ul className="filter-dropdown-btns">
            {result.map(({group, numbers}) => {
                return (
                    <li className="filter-dropdown-btns__item" key={group}>
                        <span className="filter-dropdown-btns__group">{`${activeBtn}${group}x xx`}</span>
                        {numbers.map(({id, psc}) => {
                            return (
                                <button 
                                    className={`btn ${btn === id ? 'active' : ''}`}
                                    onClick={() => (onDropdownBtnClick(psc[0] + psc[1] + psc[2]), setBtn(id))}
                                    style={{ backgroundColor: stylePsc(psc) }}
							        type="button" key={id}>
                                    {dataFilterStatus === 'loading' ? 'xxx xx' : psc}
                                </button>
                            )
                        })}
                    </li>
                )
            })}
		</ul>
	);
})

export default DropdownBtns;
