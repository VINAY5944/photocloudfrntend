import { configureStore } from '@reduxjs/toolkit';

import yourDataReducer from "./Slice"

const store = configureStore({
  reducer: {
    yourData: yourDataReducer,
  },
});

export default store;