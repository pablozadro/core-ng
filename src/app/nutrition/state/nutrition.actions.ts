import { createAction, props } from '@ngrx/store';
import { NutritionCategory, NutritionItem } from '@/nutrition/types';
import { GetItemsQuery, GetItemsFilter } from '@/nutrition/types';


/**
 * Items
 */

export const GET_ITEMS = '[Nutrition] Get Items';
export const getItems = createAction(
  GET_ITEMS,
  props<{ query: GetItemsQuery; }>()
);


export const GET_ITEMS_SUCCESS = '[Nutrition] Get Items Success';
export const getItemsSuccess = createAction(
  GET_ITEMS_SUCCESS,
  props<{ payload: NutritionItem[]; }>()
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
  props<{ payload: NutritionCategory[]; }>()
);


export const GET_CATEGORIES_ERROR = '[Nutrition] Get Categories Error';
export const getCategoriesError = createAction(
  GET_CATEGORIES_ERROR,
  props<{ error: string; }>()
);


/**
 * Query
 */

export const SET_QUERY = '[Nutrition] Set Query';
export const setQuery = createAction(
  SET_QUERY,
  props<{ query: GetItemsQuery; }>()
);


/**
 * Filter
 */

export const SET_FILTER = '[Nutrition] Set Filter';
export const setFilter = createAction(
  SET_FILTER,
  props<{ filter: GetItemsFilter; }>()
);



/**
 * Calculate
 */

export const ADD_TO_CALCULATE = '[Nutrition] Add To Calculate';
export const addToCalculate = createAction(
  ADD_TO_CALCULATE,
  props<{ item: NutritionItem; }>()
);

export const REMOVE_FROM_CALCULATE = '[Nutrition] Remove From Calculate';
export const removeFromCalculate = createAction(
  REMOVE_FROM_CALCULATE,
  props<{ item: NutritionItem; }>()
);


export const UPDATE_CALCULATE_METRICS = '[Nutrition] Update Calculate Metrics';
export const updateCalculateMetrics = createAction(
  UPDATE_CALCULATE_METRICS,
  props<{ totalCalories: number; totalProteins: number }>()
);
