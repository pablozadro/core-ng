import { createReducer, createSelector, on } from '@ngrx/store';
import { CoreStatusType } from '@/core/types';
import {
  CORE_PENDING_STATUS,
  CORE_INPROGRESS_STATUS,
  CORE_DONE_STATUS
} from '@/core/config';
import { AppState } from '@/app.reducer';
import { GetItemsQuery, GetItemsFilter, NutritionCategory, NutritionItem } from '@/nutrition/types';
import * as actions from '@/nutrition/state/nutrition.actions';


export const NUTRITION_FEATURE_KEY = 'nutrition';

export interface ItemsState {
    payload: NutritionItem[];
    status: CoreStatusType;
    error: string;
}

export interface CategoriesState {
    payload: NutritionCategory[];
    status: CoreStatusType;
    error: string;
}

export interface CalculatateState {
  items: NutritionItem[];
}

export interface NutritionState {
  items: ItemsState;
  categories: CategoriesState;
  query: GetItemsQuery;
  filter: GetItemsFilter;
  calculatate: CalculatateState;
}


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
    orderBy: 'PROTEIN-ASC',
  },
  filter: {
    title: ''
  },
  calculatate: {
    items: [],
  }
};

export const selectNutrition = (state: AppState) => state.nutrition;

export const selectNutritionCategories = createSelector(
  selectNutrition,
  (state: NutritionState) => state.categories
);

export const selectNutritionItems = createSelector(
  selectNutrition,
  (state: NutritionState) => state.items
);

export const selectNutritionQuery = createSelector(
  selectNutrition,
  (state: NutritionState) => state.query
);

export const selectNutritionFilter = createSelector(
  selectNutrition,
  (state: NutritionState) => state.filter
);

export const selectNutritionCalculate = createSelector(
  selectNutrition,
  (state: NutritionState) => state.calculatate
);

export const nutritionReducer = createReducer(
  initialNutritionState,
  on(actions.getItems, state => {
    return {
      ...state,
      items: {
        ...state.items,
        status: CORE_INPROGRESS_STATUS
      }
    };
  }),
  on(actions.getItemsSuccess, (state, { payload }) => {
    return {
      ...state,
      items: {
        ...state.items,
        status: CORE_DONE_STATUS,
        payload,
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
        status: CORE_INPROGRESS_STATUS
      }
    };
  }),
  on(actions.getCategoriesSuccess, (state, { payload }) => {
    return {
      ...state,
      categories: {
        ...state.categories,
        status: CORE_DONE_STATUS,
        payload,
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
  on(actions.setQuery, (state, { query }) => {
    return {
      ...state,
      query
    };
  }),
  on(actions.addToCalculate, (state, { item }) => {
    return {
      ...state,
      calculatate: {
        items: [
          ...state.calculatate.items,
          item
        ],
      }
    };
  }),
  on(actions.removeFromCalculate, (state, { item }) => {
    return {
      ...state,
      calculatate: {
        ...state.calculatate,
        items: state.calculatate.items.filter(_item => _item._id !== item._id ),
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