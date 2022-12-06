import { DataFirmsObj } from "./types"

export interface InitialState {
    allDataFirms: {winstrom: undefined | {adresar: DataFirmsObj[]}},
    allDataFirmsFilter: {winstrom: undefined | {adresar: DataFirmsObj[]}},
    dataLength: {winstrom: undefined | {"@version": string, "@rowCount": string, adresar: DataFirmsObj[]}},
    dataOthersBtns: {winstrom: undefined | {adresar: DataFirmsObj[]}},
    dataFirms: DataFirmsObj[],
    dataFilter: DataFirmsObj[],
    length: number,
    activeBtn: null | number,
    othersBtn: boolean,
    dataStatus: string,
    dataFilterStatus: string,
    dataOthersStatus: string,
    btn: null | number,
    searchParams: string,
    disabledBtn: boolean
}