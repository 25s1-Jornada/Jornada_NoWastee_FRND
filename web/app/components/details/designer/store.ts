// components/details/designer/store.ts
import { proxy } from "valtio";

export const state = proxy({
  intro: true,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['react', 'three2', 'pmndrs', 'logo_nowastee'],
  color: '#EFBD4E',
  decal: 'logo_nowastee',
  focusTag: false, // para controlar o zoom da camera e outras features.
});
