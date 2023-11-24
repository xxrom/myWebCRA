import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ScrollState {
  value: number;
  offsetTop: number;
}

const initialState: ScrollState = {
  value: 0,
  offsetTop: 0,
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setOffsetTop: (state, action: PayloadAction<number>) => {
      console.log('scrollSlice: New offsetTop', action.payload);
      state.offsetTop = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setOffsetTop } =
  scrollSlice.actions;

export default scrollSlice.reducer;
