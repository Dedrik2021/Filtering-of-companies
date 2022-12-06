/* eslint-disable no-sequences */
import { memo, FC } from "react";

import { useAppDispatch } from "../../../redux/store";
import { setBtn } from "../../../redux/slices/firmsDataSlice";
import { Status } from "../../../enums/status";

import './filterDropdownBtns.scss'

interface FilterDropdownProps {
    btn: null | number,
    onDropdownBtnClick: (psc: string) => void,
    stylePsc: (value: string) => string;
    dataFilterStatus: string,
    result: {group: number, numbers: { id: number; psc: string; }[]}[],
    activeBtn: null | number
}

const DropdownBtns: FC<FilterDropdownProps> = memo((props) => {
	const { 
        btn, 
        onDropdownBtnClick, 
        stylePsc, 
        dataFilterStatus,
        result,
        activeBtn
    } = props;

    const dispatch = useAppDispatch()

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
                                    onClick={() => (onDropdownBtnClick(psc[0] + psc[1] + psc[2]), dispatch(setBtn(id)))}
                                    style={{ backgroundColor: stylePsc(psc[1]) }} 
                                    type="button" key={id}>
                                    {dataFilterStatus === Status.LOADING ? 'xxx xx' : psc}
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
