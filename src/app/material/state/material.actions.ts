import { createAction, props } from '@ngrx/store';

export const MATERIAL_INIT_THEME = '[Material] Init Theme';
export const initTheme = createAction(
  MATERIAL_INIT_THEME,
);

export const MATERIAL_SET_THEME = '[Material] Set Theme';
export const setTheme = createAction(
  MATERIAL_SET_THEME,
  props<{ theme: string; }>()
);

export const MATERIAL_SET_THEME_SUCCESS = '[Material] Set Theme Success';
export const setThemeSuccess = createAction(
  MATERIAL_SET_THEME_SUCCESS,
);

export const MATERIAL_TOGGLE_THEME = '[Material] Toggle Theme';
export const toggleTheme = createAction(
  MATERIAL_TOGGLE_THEME,
);

export const MATERIAL_TOGGLE_SUCCESS_THEME = '[Material] Toggle Theme Success';
export const toggleThemeSuccess = createAction(
  MATERIAL_TOGGLE_SUCCESS_THEME,
);

