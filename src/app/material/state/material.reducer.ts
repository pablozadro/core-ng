import { createReducer, on } from '@ngrx/store';
import * as actions from './material.actions';
import {
  MatBrowserTheme,

} from '@/material/config';
import {
  CoreStatusType,
  CORE_PENDING_STATUS,
  CORE_INPROGRESS_STATUS,
  CORE_DONE_STATUS
} from '@/core/config';

export const MATERIAL_FEATURE_KEY = 'material';

export interface MaterialState {
  status: CoreStatusType;
  theme: string;
}

export const initialMaterialState: MaterialState = {
  status: CORE_PENDING_STATUS,
  theme: ''
};

export const materialReducer = createReducer(
  initialMaterialState,
  on(actions.initTheme, state => {
    return {
      ...state,
      status: CORE_INPROGRESS_STATUS
    }
  }),
  on(actions.setTheme, (state, { theme }) => {
    return {
      ...state,
      theme
    }
  }),
  on(actions.setThemeSuccess, state => {
    return {
      ...state,
      status: CORE_DONE_STATUS
    }
  }),
  on(actions.toggleTheme, state => {
    return {
      ...state,
      status: CORE_INPROGRESS_STATUS
    }
  }),
  on(actions.toggleThemeSuccess, state => {
    return {
      ...state,
      status: CORE_DONE_STATUS
    }
  })
);