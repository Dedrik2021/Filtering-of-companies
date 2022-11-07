import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('fetchData/fetchDataStatus', async (params) => {
    const {length, psc} = params
	const response = await fetch(`https://demo.flexibee.eu/v2/c/demo/adresar/(psc%20begins%20%27${psc}%27).json?limit=${length}&start=0`);
	return await response.json();
});

export const fetchDataFilter = createAsyncThunk('fetchDataFilter/fetchDataStatus', async (params) => {
    const {length, psc} = params
	const response = await fetch(`https://demo.flexibee.eu/v2/c/demo/adresar/(psc%20begins%20%27${psc}%27).json?limit=${length}&start=0`);
	return await response.json();
});

export const fetchDataOthers = createAsyncThunk('fetchDataOthers/fetchDataStatus', async (length) => {
	const response = await fetch(`https://demo.flexibee.eu/v2/c/demo/adresar.json?limit=${length}&start=0`);
	return await response.json();
});

export const fetchDataLength = createAsyncThunk('fetchDataLength/fetchDataStatus', async () => {
	const response = await fetch(`https://demo.flexibee.eu/v2/c/demo/adresar.json?add-row-count=true`);
	return await response.json();
});

const initialState = {
    data: [],
    dataOthers: [],
    dataFilter: [],
    allData: [],
    allDataFilter: [],
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
        getData(state, action) {
			state.data = action.payload;
		},
        getDataFilter(state, action) {
			state.dataFilter = action.payload;
		},
        getLength(state, action) {
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
			state.allData = [];
		});
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.dataStatus = 'success';
			state.allData = action.payload;
        });
        builder.addCase(fetchData.rejected, (state) => {
            state.dataStatus = 'error';
			state.allData = [];
        });

		builder.addCase(fetchDataFilter.pending, (state) => {
            state.dataFilterStatus = 'loading';
			state.allDataFilter = [];
		});
        builder.addCase(fetchDataFilter.fulfilled, (state, action) => {
            state.dataFilterStatus = 'success';
			state.allDataFilter = action.payload;
        });
        builder.addCase(fetchDataFilter.rejected, (state) => {
            state.dataFilterStatus = 'error';
			state.allDataFilter = [];
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
			state.dataOthers = [];
            state.dataOthersStatus = 'loading'
		});
        builder.addCase(fetchDataOthers.fulfilled, (state, action) => {
            state.dataOthers = action.payload;
            state.dataOthersStatus = 'success'
        });
        builder.addCase(fetchDataOthers.rejected, (state) => {
			state.dataOthers = [];
            state.dataOthersStatus = 'error'
        });
	},
});

export const {
    getData,
    getDataFilter,
    getLength,
    setActiveBtn,
    setOthersBtn
} = dataSlice.actions

export default dataSlice.reducer;
