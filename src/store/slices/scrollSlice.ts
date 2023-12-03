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

        return {
          offsetTop,
          componentHeight,
          isInView,
        };
      };

      const updatedComponents = state?.components?.reduce(
        (accumulate: any, element, index) => ({
          ...accumulate,
          [index]: getElementData(element),
        }),
        {}
      );

      state.positions = updatedComponents;
      //console.log('updatedPositions', state.positions);
    },
    findAllComponents: (state) => {
      state.components = Array.from(
        document.querySelectorAll('[data-component-index]') as any
      ); // TODO types ...
      //console.log('findAllComponents: ', state.components);
    },
    setScrollY: (state, action: PayloadAction<number>) => {
      state.scrollY = action.payload;
    },
  },
});

/*
export const scrollSelectors = {
  selectComponentInfoById: (index?: number) => () => {

    const selectPositions = (s: RootStateType) => s?.scroll?.positions;
    const selectPositionIndex = (s: RootStateType, innerIndex: number) => innerIndex;

    return createSelector([selectPositions, selectPositionIndex],
      (positions, i) => {
        if (typeof index !== 'number' || index < 0) {
          return null;
        }

        return positions?.[i];
      }
    );
  },
*/
export const scrollSelectors = {
  selectComponentInfoById: (index?: number) => (state: RootStateType) =>
    (typeof index === 'number' && state.scroll.positions?.[index]) || null,
};

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  updateComponentsScrollInfo,
  findAllComponents,
  setScrollY,
} = scrollSlice.actions;
export const scrollSliceActions = scrollSlice.actions;

export default scrollSlice.reducer;
