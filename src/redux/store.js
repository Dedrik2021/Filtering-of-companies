import { configureStore } from '@reduxjs/toolkit' 
import thunk from 'redux-thunk'

import firmsData from './slices/dataSlice'

export const store = configureStore({
    reducer: {
        firmsData
    },
    
    middleware: [thunk]
})