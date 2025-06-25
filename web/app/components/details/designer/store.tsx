// store.ts
import { proxy } from 'valtio';
import React from 'react';
import {
  CollarOverlay,
  SleeveOverlay,
  TagInfoOverlay,
  TorsoOverlay,
} from './overlays';

export type MeshInteraction = {
  onHover?: () => void;
  onUnhover?: () => void;
  onClick?: () => void;
};

export const state = proxy({
  intro: true,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['react', 'three2', 'pmndrs', 'logo_nowastee'],
  color: '#EFBD4E',
  decal: 'logo_nowastee',
  focusTag: false,
  labelContent: null as React.ReactNode | null,
});

// ✅ Move this OUTSIDE the state proxy
export const meshInteractions: Record<string, MeshInteraction> = {
  Tag: {
    onHover: () => {
      state.labelContent = <TagInfoOverlay />;
    },
    onUnhover: () => {
      state.labelContent = null;
    },
    onClick: () => {
      state.focusTag = true;
    },
  },
  Torso: {
    onHover: () => {
      state.labelContent = <TorsoOverlay />;
    },
    onUnhover: () => {
      state.labelContent = null;
    },
  },
  Collar: {
    onHover: () => {
      state.labelContent = <CollarOverlay />;
    },
    onUnhover: () => {
      state.labelContent = null;
    },
  },
  Sleeve: {
    onHover: () => {
      state.labelContent = <SleeveOverlay />;
    },
    onUnhover: () => {
      state.labelContent = null;
    },
  },
};
