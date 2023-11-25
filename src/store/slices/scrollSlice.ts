import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Ref, RefObject } from 'react';

export interface ScrollState {
  value: number;
  scrollY: number;
  refs: RefObject<Array<HTMLDivElement>> | null;
  positions: {
    [key: string]: {
      offsetTop: number;
      componentHeight: number;
      isInView: boolean;
    };
  };
}

const initialState: ScrollState = {
  value: 0,
  scrollY: 0,
  refs: null,
  positions: {},
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    updateComponentsScrollInfo: (state) => {
      const getElementData = (element: HTMLDivElement) => {
        const offsetTop = element?.getBoundingClientRect()?.top || 0;
        const componentHeight = element.clientHeight;
        const isInView = Math.abs(offsetTop) < componentHeight;

        console.log('offsetTop', offsetTop);

        return {
          offsetTop,
          componentHeight,
          isInView,
        };
      };

      const updatedComponents = state?.refs?.current?.reduce(
        (accumulate, element, index) => {
          //state.positions[index] = getElementData(element);

          return accumulate;
        },
        []
      );
      console.log('up', updatedComponents);
    },
    setScrollY: (state, action: PayloadAction<number>) => {
      console.log('scrollSlice: New offsetTop', action.payload);
      state.scrollY = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setScrollY } =
  scrollSlice.actions;

export default scrollSlice.reducer;
