import { InjectionToken } from '@angular/core';
import * as types from '../types';


export interface CoreConfig {
  size: Record<string, types.CoreSize>;
  mixins: Record<string, types.CoreColorMix>;
  brandMixins: Record<string, types.CoreBrandMix>;
  browserThemes: Record<string, types.CoreBrowserTheme>;
  status: Record<string, types.CoreStatusType>;
}

const defaultCoreConfig: CoreConfig = {
  size: {
    sm: types.CORE_SIZE_SM,
    rg: types.CORE_SIZE_RG,
    md: types.CORE_SIZE_MD,
    lg: types.CORE_SIZE_LG,
    xl: types.CORE_SIZE_XL,
    xxl: types.CORE_SIZE_XXL,
  },
  mixins: {
    primary: types.CORE_COLOR_MIX_PRIMARY,
    secondary: types.CORE_COLOR_MIX_SECONDARY,
    flat: types.CORE_COLOR_MIX_FLAT,
    error: types.CORE_COLOR_MIX_ERROR,
    success: types.CORE_COLOR_MIX_SUCCESS,
    warning: types.CORE_COLOR_MIX_WARNING,
  },
  brandMixins: {
    primary: types.CORE_BRAND_MIX_PRIMARY,
    secondary: types.CORE_BRAND_MIX_SECONDARY,
    flat: types.CORE_BRAND_MIX_FLAT,
    black: types.CORE_BRAND_MIX_BLACK,
    white: types.CORE_BRAND_MIX_WHITE
  },
  browserThemes: {
    light: types.CORE_BROWSER_THEME_LIGHT,
    dark: types.CORE_BROWSER_THEME_DARK,
  },
  status: {
    pending: types.CORE_PENDING_STATUS,
    inprogress: types.CORE_INPROGRESS_STATUS,
    done: types.CORE_DONE_STATUS,
  }
};

export const CORE_CONFIG = new InjectionToken<CoreConfig>(
  'core.config (description)',
   { factory: () => { return defaultCoreConfig; }}
);
