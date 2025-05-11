import { createAction, props } from '@ngrx/store';
import { NutritionCategory, NutritionItem } from '@/nutrition/types';
import { 
  NutritionItemsFilterState, 
  NutritionItemsQueryState 
} from '@/nutrition/state/nutrition.reducer';



/**
 * Items
 */

export const GET_ITEMS = '[Nutrition] Get Items';
export const getItems = createAction(
  GET_ITEMS,
);


export const GET_ITEMS_SUCCESS = '[Nutrition] Get Items Success';
export const getItemsSuccess = createAction(
  GET_ITEMS_SUCCESS,
  props<{ items: NutritionItem[]; }>()
);


export const GET_ITEMS_ERROR = '[Nutrition] Get Items Error';
export const getItemsError = createAction(
  GET_ITEMS_ERROR,
  props<{ error: string; }>()
);



/**
 * Categories
 */

export const GET_CATEGORIES = '[Nutrition] Get Categories';
export const getCategories = createAction(
  GET_CATEGORIES,
);


export const GET_CATEGORIES_SUCCESS = '[Nutrition] Get Categories Success';
export const getCategoriesSuccess = createAction(
  GET_CATEGORIES_SUCCESS,
  props<{ categories: NutritionCategory[]; }>()
);


export const GET_CATEGORIES_ERROR = '[Nutrition] Get Categories Error';
export const getCategoriesError = createAction(
  GET_CATEGORIES_ERROR,
  props<{ error: string; }>()
);


/**
 * Filter
 */

export const SET_ITEMS_FILTER = '[Nutrition] Set Items Filter';
export const setFilter = createAction(
  SET_ITEMS_FILTER,
  props<{ filter: NutritionItemsFilterState }>()
);

/**
 * Query
 */

export const SET_ITEMS_QUERY = '[Nutrition] Set Items Query';
export const setQuery = createAction(
  SET_ITEMS_QUERY,
  props<{ query: NutritionItemsQueryState }>()
);

/**
 * Calculate
 */

export const ADD_CALCULATE = '[Nutrition] Add Calculate';
export const addCalculate = createAction(
  ADD_CALCULATE,
  props<{ item: NutritionItem }>()
);

export const REMOVE_CALCULATE = '[Nutrition] Remove Calculate';
export const removeCalculate = createAction(
  REMOVE_CALCULATE,
  props<{ id: string; }>()
);