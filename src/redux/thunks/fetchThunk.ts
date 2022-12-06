import { createAsyncThunk } from '@reduxjs/toolkit';

import { Params, ParamsLength } from './types';

export const fetchData = createAsyncThunk('fetchData/fetchDataStatus', async (params: Params) => {
	const { length, psc } = params;
	try {
		const response = await fetch(
			`https://demo.flexibee.eu/v2/c/demo/adresar/(psc%20begins%20%27${psc}%27).json?limit=${length}&start=0`,
		);
		return await response.json();
	} catch(error) {
		console.log(`Problem is - ${error}`);
	}
});

export const fetchDataFilter = createAsyncThunk(
	'fetchDataFilter/dataFilterStatus',
	async (params: Params) => {
		const { length, psc } = params;
		try {
			const response = await fetch(
				`https://demo.flexibee.eu/v2/c/demo/adresar/(psc%20begins%20%27${psc}%27).json?limit=${length}&start=0`,
			);
			return await response.json();

		} catch(error) {
			console.log(`Problem is - ${error}`);
		}
	},
);

export const fetchDataOthers = createAsyncThunk(
	'fetchDataOthers/dataOthersStatus',
	async (params: ParamsLength) => {
		const { length } = params;
		try {
			const response = await fetch(
				`https://demo.flexibee.eu/v2/c/demo/adresar.json?limit=${length}&start=0`,
			);
			return await response.json();
		} catch(error) {
			console.log(`Problem is - ${error}`);
		}
	},
);

export const fetchDataLength = createAsyncThunk('fetchDataLength/dataLengthStatus', async () => {
	try {
		const response = await fetch(
			`https://demo.flexibee.eu/v2/c/demo/adresar.json?add-row-count=true`,
		);
		return await response.json();
	} catch(error) {
		console.log(`Problem is - ${error}`);
	}
});
