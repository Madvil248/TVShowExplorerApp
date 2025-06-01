import { configureStore } from '@reduxjs/toolkit';
import showsReducer from './showsSlice'; // Import the reducer from our slice

export const store = configureStore({
    reducer: {
        shows: showsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
    })
});