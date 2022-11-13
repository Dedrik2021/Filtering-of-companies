import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { 
    fetchData, 
    fetchDataFilter, 
    fetchDataLength, 
    fetchDataOthers 
} from '../thunks/fetchThunk';

import { InitialState, DataFirmsObj, Status } from './types';

const initialState: InitialState = {
    dataFirms: [],
    dataFilter: [],
    allDataFirms: {winstrom: undefined},
    allDataFirmsFilter: {winstrom: undefined},
    dataLength: {winstrom: undefined},
    length: 0,
    activeBtn: null,
    dataOthersBtns: {winstrom: undefined},
    othersBtn: false,
	dataStatus: Status.LOADING,
	dataFilterStatus: Status.LOADING,
	dataOthersStatus: Status.LOADING,
};

const dataSlice = createSlice({
	name: 'firmsData',
	initialState,
    reducers: {
        setData(state, action: PayloadAction<DataFirmsObj[]>) {
			state.dataFirms = action.payload;
		},
        setDataFilter(state, action: PayloadAction<DataFirmsObj[]>) {
			state.dataFilter = action.payload;
		},
        setLength(state, action: PayloadAction<number>) {
            state.length = action.payload
        },
        setActiveBtn(state, action: PayloadAction<null | number>) {
            state.activeBtn = action.payload
        },
        setOthersBtn(state, action: PayloadAction<boolean>) {
            state.othersBtn = action.payload
        }
    },

	extraReducers: (builder) => {
		builder.addCase(fetchData.pending, (state) => {
            state.dataStatus = Status.LOADING;
			state.allDataFirms = {winstrom: undefined};
		});
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.dataStatus = Status.SUCCESS;
			state.allDataFirms = action.payload;
        });
        builder.addCase(fetchData.rejected, (state) => {
            state.dataStatus = Status.ERROR;
			state.allDataFirms = {winstrom: undefined};
        });

		builder.addCase(fetchDataFilter.pending, (state) => {
            state.dataFilterStatus = Status.LOADING;
			state.allDataFirmsFilter = {winstrom: undefined};
		});
        builder.addCase(fetchDataFilter.fulfilled, (state, action) => {
            state.dataFilterStatus = Status.SUCCESS;
			state.allDataFirmsFilter = action.payload;
        });
        builder.addCase(fetchDataFilter.rejected, (state) => {
            state.dataFilterStatus = Status.ERROR;
			state.allDataFirmsFilter = {winstrom: undefined};
        });

		builder.addCase(fetchDataLength.pending, (state) => {
			state.dataLength = {winstrom: undefined};
		});
        builder.addCase(fetchDataLength.fulfilled, (state, action) => {
			state.dataLength = action.payload;
        });
        builder.addCase(fetchDataLength.rejected, (state) => {
			state.dataLength = {winstrom: undefined};
        });

		builder.addCase(fetchDataOthers.pending, (state) => {
			state.dataOthersBtns = {winstrom: undefined};
            state.dataOthersStatus = Status.LOADING
		});
        builder.addCase(fetchDataOthers.fulfilled, (state, action) => {
            state.dataOthersBtns = action.payload;
            state.dataOthersStatus = Status.SUCCESS
        });
        builder.addCase(fetchDataOthers.rejected, (state) => {
			state.dataOthersBtns = {winstrom: undefined};
            state.dataOthersStatus = Status.ERROR
        });
	},
});

export const {
    setData,
    setDataFilter,
    setLength,
    setActiveBtn,
    setOthersBtn
} = dataSlice.actions

export default dataSlice.reducer;
