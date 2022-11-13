import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import firmsData from './slices/firmsDataSlice'

export const store = configureStore({
	reducer: {
        firmsData
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
    })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()