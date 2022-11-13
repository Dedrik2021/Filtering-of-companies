/* eslint-disable no-sequences */
import { memo, FC } from "react";

import './filterDropdownBtns.scss'

interface FilterDropdownProps {
    btn: null | number,
    onDropdownBtnClick: (psc: string) => void,
    stylePsc: (value: string) => string;
    setBtn: (value: number | ((prevVar: null | number) => number)) => void;
    dataFilterStatus: string,
    result: {group: number, numbers: { id: number; psc: string; }[]}[],
    activeBtn: null | number
}

const DropdownBtns: FC<FilterDropdownProps> = memo((props) => {
	const { 
        btn, 
        onDropdownBtnClick, 
        stylePsc, 
        setBtn, 
        dataFilterStatus,
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
                                    onClick={() => (onDropdownBtnClick(psc[0] + psc[1] + psc[2]), setBtn((id)))}
                                    style={{ backgroundColor: stylePsc(psc[1]) }} 
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
