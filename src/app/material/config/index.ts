import { InjectionToken } from '@angular/core';
import { CoreStatusType } from '@/core/types';
import { 
  CORE_PENDING_STATUS,
  CORE_INPROGRESS_STATUS,
  CORE_DONE_STATUS ,
} from '@/core/config';

import {
  MatSize,
  MatColorMix,
  MatBrandMix,
  MatBrowserTheme
} from '../types';

export const MAT_SIZE_XS: MatSize = 'xs'; 
export const MAT_SIZE_SM: MatSize = 'sm'; 
export const MAT_SIZE_RG: MatSize = 'rg'; 
export const MAT_SIZE_MD: MatSize = 'md'; 
export const MAT_SIZE_LG: MatSize = 'lg'; 
export const MAT_SIZE_XL: MatSize = 'xl'; 
export const MAT_SIZE_XXL: MatSize = 'xxl'; 

export const MAT_COLOR_MIX_PRIMARY: MatColorMix = 'primary';
export const MAT_COLOR_MIX_SECONDARY: MatColorMix = 'secondary';
export const MAT_COLOR_MIX_FLAT: MatColorMix = 'flat';
export const MAT_COLOR_MIX_ERROR: MatColorMix = 'error';
export const MAT_COLOR_MIX_SUCCESS: MatColorMix = 'success';
export const MAT_COLOR_MIX_WARNING: MatColorMix = 'warning';

export const MAT_BRAND_MIX_PRIMARY: MatBrandMix = 'primary';
export const MAT_BRAND_MIX_SECONDARY: MatBrandMix = 'secondary';
export const MAT_BRAND_MIX_FLAT: MatBrandMix = 'flat';
export const MAT_BRAND_MIX_BLACK: MatBrandMix = 'black';
export const MAT_BRAND_MIX_WHITE: MatBrandMix = 'white';

export const MAT_BROWSER_THEME_LIGHT: MatBrowserTheme = 'light';
export const MAT_BROWSER_THEME_DARK: MatBrowserTheme = 'dark';

export interface CoreConfig {
  sizesMap: Record<string, MatSize>;
  sizes: MatSize[];
  mixinsMap: Record<string, MatColorMix>;
  mixins: MatColorMix[];
  brandMixinsMap: Record<string, MatBrandMix>;
  brandMixins: MatBrandMix[];
  browserThemesMap: Record<string, MatBrowserTheme>;
  statusMap: Record<string, CoreStatusType>;
}


const sizesMap: Record<string, MatSize> = {
  xxl: MAT_SIZE_XXL,
  xl: MAT_SIZE_XL,
  lg: MAT_SIZE_LG,
  md: MAT_SIZE_MD,
  rg: MAT_SIZE_RG,
  sm: MAT_SIZE_SM,
  xs: MAT_SIZE_XS,
};

const sizes: MatSize[] = [
  MAT_SIZE_XXL,
  MAT_SIZE_XL,
  MAT_SIZE_LG,
  MAT_SIZE_MD,
  MAT_SIZE_RG,
  MAT_SIZE_SM,
  MAT_SIZE_XS,
];

const mixinsMap: Record<string, MatColorMix> = {
  primary: MAT_COLOR_MIX_PRIMARY,
  secondary: MAT_COLOR_MIX_SECONDARY,
  flat: MAT_COLOR_MIX_FLAT,
  error: MAT_COLOR_MIX_ERROR,
  success: MAT_COLOR_MIX_SUCCESS,
  warning: MAT_COLOR_MIX_WARNING,
};

const mixins: MatColorMix[] = [
  MAT_COLOR_MIX_PRIMARY,
  MAT_COLOR_MIX_SECONDARY,
  MAT_COLOR_MIX_FLAT,
  MAT_COLOR_MIX_ERROR,
  MAT_COLOR_MIX_SUCCESS,
  MAT_COLOR_MIX_WARNING,
];

const brandMixinsMap: Record<string, MatBrandMix> = {
  primary: MAT_BRAND_MIX_PRIMARY,
  secondary: MAT_BRAND_MIX_SECONDARY,
  flat: MAT_BRAND_MIX_FLAT,
  black: MAT_BRAND_MIX_BLACK,
  white: MAT_BRAND_MIX_WHITE
};

const brandMixins: MatBrandMix[] = [
  MAT_BRAND_MIX_PRIMARY,
  MAT_BRAND_MIX_SECONDARY,
  MAT_BRAND_MIX_FLAT,
  MAT_BRAND_MIX_BLACK,
  MAT_BRAND_MIX_WHITE
];

const browserThemesMap: Record<string, MatBrowserTheme> = {
  light: MAT_BROWSER_THEME_LIGHT,
  dark: MAT_BROWSER_THEME_DARK,
};

const statusMap: Record<string, CoreStatusType> = {
  pending: CORE_PENDING_STATUS,
  inprogress: CORE_INPROGRESS_STATUS,
  done: CORE_DONE_STATUS,
};


const defaultCoreConfig: CoreConfig = {
  sizes,
  sizesMap,
  mixins,
  mixinsMap,
  brandMixins,
  brandMixinsMap,
  browserThemesMap,
  statusMap,
}

export const CORE_CONFIG = new InjectionToken<CoreConfig>(
  'core.config (description)',
   { factory: () => { return defaultCoreConfig; }}
);
