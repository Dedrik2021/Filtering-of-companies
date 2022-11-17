import { createAsyncThunk } from '@reduxjs/toolkit';

import { Params, ParamsLength } from './types';

export const fetchData = createAsyncThunk('fetchData/fetchDataStatus', async (params: Params) => {
	const { length, psc } = params;
	try {
		const response = await fetch(
			`https://demo.flexibee.eu/v2/c/demo/adresar/(psc%20begins%20%27${psc}%27).json?limit=${length}&start=0`,
		);
		return await response.json();
	} catch(err) {
		console.log(`Problem is - ${err}`);
	}
});

export const fetchDataFilter = createAsyncThunk(
	'fetchDataFilter/fetchDataStatus',
	async (params: Params) => {
		const { length, psc } = params;
		try {
			const response = await fetch(
				`https://demo.flexibee.eu/v2/c/demo/adresar/(psc%20begins%20%27${psc}%27).json?limit=${length}&start=0`,
			);
			return await response.json();
		} catch(err) {
			console.log(`Problem is - ${err}`);
		}
	},
);

export const fetchDataOthers = createAsyncThunk(
	'fetchDataOthers/fetchDataStatus',
	async (params: ParamsLength) => {
		const { length } = params;
		try {
			const response = await fetch(
				`https://demo.flexibee.eu/v2/c/demo/adresar.json?limit=${length}&start=0`,
			);
			return await response.json();
		} catch(err) {
			console.log(`Problem is - ${err}`);
		}
	},
);

export const fetchDataLength = createAsyncThunk('fetchDataLength/fetchDataStatus', async () => {
	try {
		const response = await fetch(
			`https://demo.flexibee.eu/v2/c/demo/adresar.json?add-row-count=true`,
		);
		return await response.json();
	} catch(err) {
		console.log(`Problem is - ${err}`);
	}
});
