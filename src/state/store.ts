import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit';

// Placeholder reducer (dummy slice)
const dummySlice = createSlice({
  name: 'dummy',
  initialState: {},
  reducers: {},
});

// Combine reducers - easy to extend in the future
const rootReducer = combineReducers({
  dummy: dummySlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // Middleware or devTools configuration can be added here if needed
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * Future Usage:
 * - Add new slices/reducers to `rootReducer` as needed.
 * - Add custom middleware to enhance store functionality.
 */
