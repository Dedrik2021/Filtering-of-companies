import { createSlice } from '@reduxjs/toolkit';

import { 
    fetchData, 
    fetchDataFilter, 
    fetchDataLength, 
    fetchDataOthers 
} from '../thunks/fetchThunk';

const initialState = {
    dataOthersBtns: [],
    dataFirms: [],
    dataFilter: [],
    allDataFirms: [],
    allDataFirmsFilter: [],
    dataLength: [],
    length: 0,
    activeBtn: '',
    othersBtn: false,
	dataStatus: 'loading',
	dataFilterStatus: 'loading',
	dataOthersStatus: 'loading',
};

const dataSlice = createSlice({
	name: 'firmsData',
	initialState,
    reducers: {
        setData(state, action) {
			state.dataFirms = action.payload;
		},
        setDataFilter(state, action) {
			state.dataFilter = action.payload;
		},
        setLength(state, action) {
            state.length = action.payload
        },
        setActiveBtn(state, action) {
            state.activeBtn = action.payload
        },
        setOthersBtn(state, action) {
            state.othersBtn = action.payload
        }
    },

	extraReducers: (builder) => {
		builder.addCase(fetchData.pending, (state) => {
            state.dataStatus = 'loading';
			state.allDataFirms = [];
		});
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.dataStatus = 'success';
			state.allDataFirms = action.payload;
        });
        builder.addCase(fetchData.rejected, (state) => {
            state.dataStatus = 'error';
			state.allDataFirms = [];
        });

		builder.addCase(fetchDataFilter.pending, (state) => {
            state.dataFilterStatus = 'loading';
			state.allDataFirmsFilter = [];
		});
        builder.addCase(fetchDataFilter.fulfilled, (state, action) => {
            state.dataFilterStatus = 'success';
			state.allDataFirmsFilter = action.payload;
        });
        builder.addCase(fetchDataFilter.rejected, (state) => {
            state.dataFilterStatus = 'error';
			state.allDataFirmsFilter = [];
        });

		builder.addCase(fetchDataLength.pending, (state) => {
			state.dataLength = [];
		});
        builder.addCase(fetchDataLength.fulfilled, (state, action) => {
			state.dataLength = action.payload;
        });
        builder.addCase(fetchDataLength.rejected, (state) => {
			state.dataLength = [];
        });

		builder.addCase(fetchDataOthers.pending, (state) => {
			state.dataOthersBtns = [];
            state.dataOthersStatus = 'loading'
		});
        builder.addCase(fetchDataOthers.fulfilled, (state, action) => {
            state.dataOthersBtns = action.payload;
            state.dataOthersStatus = 'success'
        });
        builder.addCase(fetchDataOthers.rejected, (state) => {
			state.dataOthersBtns = [];
            state.dataOthersStatus = 'error'
        });
	},
});

export const {
    setData,
    setDataFilter,
    setLength,
    setActiveBtn,
    setOthersBtn,
    setTakeDataOthersBtns
} = dataSlice.actions

export default dataSlice.reducer;
