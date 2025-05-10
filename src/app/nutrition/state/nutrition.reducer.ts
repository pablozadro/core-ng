import { createReducer, createSelector, on } from '@ngrx/store';

import { CoreStatusType } from '@/core/types';
import {
  CORE_PENDING_STATUS,
  CORE_INPROGRESS_STATUS,
  CORE_DONE_STATUS
} from '@/core/config';

import { NutritionCategory, NutritionItem } from '@/nutrition/types';

import { AppState } from '@/app.reducer';
import * as actions from '@/nutrition/state/nutrition.actions';


export const NUTRITION_FEATURE_KEY = 'nutrition';

export interface NutritionItemsState {
    payload: NutritionItem[];
    status: CoreStatusType;
    error: string;
}

export interface NutritionItemsQueryState {
  orderBy?: string;
  orderDir?: string;
  category?: string;
}

export interface NutritionItemsFilterState {
  title?: string;
}

export interface NutritionCategoriesState {
    payload: NutritionCategory[];
    status: CoreStatusType;
    error: string;
}

export interface NutritionState {
  items: NutritionItemsState;
  categories: NutritionCategoriesState; 
  query: NutritionItemsQueryState;
  filter: NutritionItemsFilterState;
}


// Initial State

export const initialNutritionState: NutritionState = {
  categories: {
    payload: [],
    status: CORE_PENDING_STATUS,
    error: ''
  },
  items: {
    payload: [],
    status: CORE_PENDING_STATUS,
    error: ''
  },
  query: {
    category: '',
    orderBy: 'fact.protein',
    orderDir: '1'
  },
  filter: {
    title: ''
  },
};


// Selectors

export const selectNutrition = (state: AppState) => state.nutrition;

export const selectNutritionCategories = createSelector(
  selectNutrition,
  (state: NutritionState) => state.categories
);

export const selectNutritionItems = createSelector(
  selectNutrition,
  (state: NutritionState) => state.items
);

export const selectNutritionItemsQuery = createSelector(
  selectNutrition,
  (state: NutritionState) => state.query
);

export const selectNutritionItemsFilter = createSelector(
  selectNutrition,
  (state: NutritionState) => state.filter
);


// Reducer

export const nutritionReducer = createReducer(
  initialNutritionState,
  on(actions.getItems, state => {
    return {
      ...state,
      items: {
        ...state.items,
        status: CORE_INPROGRESS_STATUS,
        payload: [],
        error: '',
      }
    };
  }),
  on(actions.getItemsSuccess, (state, { items }) => {
    return {
      ...state,
      items: {
        ...state.items,
        status: CORE_DONE_STATUS,
        payload: items,
        error: ''
      }
    };
  }),
  on(actions.getItemsError, (state, { error }) => {
    return {
      ...state,
      items: {
        ...state.items,
        status: CORE_DONE_STATUS,
        payload: [],
        error
      }
    };
  }),
  on(actions.getCategories, state => {
    return {
      ...state,
      categories: {
        ...state.categories,
        status: CORE_INPROGRESS_STATUS,
        payload: [],
        error: ''
      }
    };
  }),
  on(actions.getCategoriesSuccess, (state, { categories }) => {
    return {
      ...state,
      categories: {
        ...state.categories,
        status: CORE_DONE_STATUS,
        payload: categories,
        error: ''
      }
    };
  }),
  on(actions.getCategoriesError, (state, { error }) => {
    return {
      ...state,
      categories: {
        ...state.categories,
        status: CORE_DONE_STATUS,
        payload: [],
        error
      }
    };
  }),
  on(actions.setFilter, (state, { filter }) => {
    return {
      ...state,
      filter
    };
  }),
);