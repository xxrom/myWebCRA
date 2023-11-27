import { createSlice } from '@reduxjs/toolkit';
import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType, useAppSelector } from '../store';

export type ScrollState = {
  value: number;
  scrollY: number;
  components: Array<Element>;
  positions: {
    [key: string]: {
      offsetTop: number;
      componentHeight: number;
      isInView: boolean;
    };
  };
};

const initialState: ScrollState = {
  value: 0,
  scrollY: 0,
  components: [],
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
      const getElementData = (element: Draft<Element>) => {
        const offsetTop = element?.getBoundingClientRect()?.top || 0;
        const componentHeight = element?.clientHeight || 0;
        const isInView = Math.abs(offsetTop) < componentHeight;

        console.log('offsetTop', offsetTop);

        return {
          offsetTop,
          componentHeight,
          isInView,
        };
      };

      console.log('UPDATE!', state.components);
      const updatedComponents = state?.components?.reduce(
        (accumulate: any, element, index) => ({
          ...accumulate,
          [index]: getElementData(element),
        }),
        {}
      );

      console.log('up', updatedComponents);
      state.positions = updatedComponents;
      console.log('updatedPositions', state.positions);
    },
    findAllComponents: (state) => {
      state.components = Array.from(
        document.querySelectorAll('[data-component-index]') as any
      ); // TODO types ...
      console.log('findAllComponents: ', state.components);
    },
    setScrollY: (state, action: PayloadAction<number>) => {
      console.log('scrollSlice: New offsetTop', action.payload);
      state.scrollY = action.payload;
    },
    selectComponent: (state): any => {
      const index = 0;

      console.log('SelectComponent postition', state.positions);

      return state?.positions?.[index];
    },
  },
});

export const scrollSelectors = {
  getComponentInfoById: (index?: number) => (state: RootStateType) =>
    state.scroll.positions?.[index] || null,
};

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  updateComponentsScrollInfo,
  findAllComponents,
  setScrollY,
  selectComponent,
} = scrollSlice.actions;
export const scrollSliceActions = scrollSlice.actions;

export default scrollSlice.reducer;
