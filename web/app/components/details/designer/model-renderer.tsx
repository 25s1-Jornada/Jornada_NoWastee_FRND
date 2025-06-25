// ModelRenderer.tsx
'use client';

import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { meshInteractions, state } from './store';
import * as THREE from 'three';
import { useRef, useEffect, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import { Bvh } from '@react-three/drei';
import { Selection, EffectComposer, Outline, Select, N8AO, TiltShift2, ToneMapping } from '@react-three/postprocessing';
import { debounce } from 'lodash';
import { useMemo } from 'react';

export function ModelRenderer({ path }: { path: string }) {
  const { nodes } = useGLTF(path);
  const meshNodes: Record<string, THREE.Mesh> = {};
  const meshRefs: Record<string, React.RefObject<THREE.Mesh>> = {};

  Object.entries(nodes).forEach(([key, value]) => {
    if ((value as THREE.Mesh).isMesh) {
      meshNodes[key] = value as THREE.Mesh;
      meshRefs[key] = { current: value as THREE.Mesh };
    }
  });

  const snap = useSnapshot(state);
  const texture = useTexture(`/teste/${snap.decal}.png`);
  const [hovered, setHovered] = useState<string | null>(null);
  const debouncedSetHovered = useCallback(debounce(setHovered, 15), []);
  const memoizedLabelContent = useMemo(() => snap.labelContent, [snap.labelContent]);

  // Animate shirt color
  useFrame((_, delta) => {
    Object.values(meshRefs).forEach(ref => {
      if (ref.current?.material && 'color' in ref.current.material) {
        easing.dampC(
          (ref.current.material as THREE.MeshStandardMaterial).color,
          snap.color,
          0.25,
          delta
        );
      }
    });
  });

  return (
    <Bvh firstHitOnly>
      <Selection>
        <ModelEffects />
        {Object.entries(meshNodes).map(([name, mesh]) => (
          <Select
            key={name}
            enabled={hovered === name}
            onPointerOver={(e) => {
              e.stopPropagation();
              debouncedSetHovered(name);
              meshInteractions[name]?.onHover?.();
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              debouncedSetHovered(null);
              meshInteractions[name]?.onUnhover?.();
            }}
            onClick={(e) => {
              e.stopPropagation();
              meshInteractions[name]?.onClick?.();
            }}
          >
            <primitive object={mesh} dispose={null}>
              {name === 'Torso' && (
                <Decal
                  position={[0, 0.04, 0.15]}
                  rotation={[0, 0, 0]}
                  scale={0.15}
                  map={texture}
                />
              )}
            </primitive>
          </Select>
        ))}
      </Selection>
      {memoizedLabelContent && (
        <group name="label-content">
          {memoizedLabelContent}
        </group>
      )}
    </Bvh>
  );
}

function ModelEffects() {
  const { size } = useThree();
  return (
    <EffectComposer stencilBuffer enableNormalPass={false} autoClear={false} multisampling={4}>
      <Outline visibleEdgeColor={0xffffff} width={size.width + 5} edgeStrength={16} />
    </EffectComposer>
  );
}
