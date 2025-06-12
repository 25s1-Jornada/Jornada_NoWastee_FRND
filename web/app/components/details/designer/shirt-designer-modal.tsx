'use client';

import { Dialog } from '@headlessui/react';
import { Canvas, useFrame, AmbientLight, Primitive, Group } from '@react-three/fiber';
import {
  AccumulativeShadows,
  Center,
  Decal,
  Environment,
  RandomizedLight,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import { easing } from 'maath';
import { useRef, Suspense } from 'react';
import { useSnapshot } from 'valtio';
import { state } from './store';
import * as THREE from 'three';

function Shirt() {
  const snap = useSnapshot(state);
  const texture = useTexture(`/teste/${snap.decal}.png`);
  const { nodes, materials } = useGLTF('/teste/shirt_baked_collapsed.glb');

  // Grab first mesh dynamically
  const firstMesh = Object.values(nodes).find(
    (n): n is THREE.Mesh => (n as THREE.Mesh).isMesh
  );

  if (!firstMesh) return null;

  useFrame((_, delta) => {
    if ('lambert1' in materials) {
      easing.dampC((materials.lambert1 as any).color, snap.color, 0.25, delta);
    } else if (firstMesh.material && 'color' in firstMesh.material) {
      easing.dampC((firstMesh.material as any).color, snap.color, 0.25, delta);
    }
  });

  return (
    <Primitive
      castShadow
      object={firstMesh}
      dispose={null}
    >
      <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} />
    </Primitive>
  );
}

function Backdrop() {
  const shadows = useRef(null);
  useFrame((state, delta) => {
    if (shadows.current) {
      easing.dampC((shadows.current as any).getMesh().material.color, state.color, 0.25, delta);
    }
  });

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={5}
      resolution={2048}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight amount={4} radius={9} intensity={0.5} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.3} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  );
}

function OverlayContent({ onClose }: { onClose: () => void }) {
  const snap = useSnapshot(state);

  return (
    <div className="absolute top-0 left-0 w-full h-full text-white p-6 z-10 pointer-events-none">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold pointer-events-auto">Personalizar Camiseta</h2>
        <button
          onClick={onClose}
          className="exit px-4 py-2 bg-black text-white rounded pointer-events-auto"
        >
          X
        </button>
      </div>

      <div className="absolute bottom-10 left-10 flex gap-4 pointer-events-auto">
        {snap.colors.map((color) => (
          <div
            key={color}
            className="circle"
            title={color}
            style={{ backgroundColor: color }}
            onClick={() => (state.color = color)}
          />
        ))}
      </div>

      <div className="absolute bottom-10 right-10 flex gap-4 pointer-events-auto">
        {snap.decals.map((decal) => (
          <img
            key={decal}
            src={`/teste/${decal}_thumb.png`}
            className="w-10 h-10 cursor-pointer hover:scale-110 object-contain"
            onClick={() => (state.decal = decal)}
          />
        ))}
      </div>
    </div>
  );
}

function CameraRig({ children }) {
  const group = useRef()
  const snap = useSnapshot(state)
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })
  return <Group ref={group} data-testid="camera-group">{children}</Group>
}

export default function ShirtDesignerModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-[#00000090]" aria-hidden="true" />
      <div className="fixed top-[10%] left-[10%] w-[80%] h-[80%] bg-[#e0e0e0] rounded overflow-hidden shadow-xl">
        <Canvas shadows camera={{ position: [0, 0, 0], fov: 25 }}>
          <CameraRig>
            <AmbientLight intensity={Math.PI * 0.5} />
            <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr"  />
            <Suspense fallback={null}>
              <Backdrop />
              <Center>
                <Shirt />
              </Center>
            </Suspense>
          </CameraRig>
        </Canvas>
        <OverlayContent onClose={onClose} />
      </div>
    </Dialog>
  );
}
