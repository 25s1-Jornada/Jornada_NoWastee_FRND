import { Bvh, useGLTF, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { debounce } from "lodash";
import { Selection, EffectComposer, N8AO, Outline, Select, TiltShift2, ToneMapping } from "@react-three/postprocessing";
import { useCallback, useEffect, useState } from "react";
import * as THREE from 'three';
import { state } from './store';
import { useSnapshot } from "valtio";

export default function TagGroup() {
  // Hover state
  const [hovered, hover] = useState(false)  // Hover state
  // Debounce hover a bit to stop the ticker from being erratic
  const debouncedHover = useCallback(debounce(hover, 15), [])
  const over = (hovering: boolean) => (event) => (event.stopPropagation(), debouncedHover(true));
  const snap = useSnapshot(state);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    if (hovered) {
      // camera zooms into tag mesh object. Must communicate to the camerarig state.
    } else {
      // camera resets to initial zoom. Must communicate to the camerarig state.
    }
  }, [hovered])

  return (
    <Bvh firstHitOnly>
      <Selection>
        <TagEffects />
        <Select enabled={hovered} onPointerOver={over(true)} onPointerOut={() => debouncedHover(false)}
          onClick={(e) => {
            e.stopPropagation();
            state.focusTag = true;
          }}>
          <Tag />
        </Select>
      </Selection>
      {snap.focusTag && <TagInfoOverlay />}
    </Bvh>
  )
}

function Tag(props: any) {
  const { nodes, materials } = useGLTF('/teste/solo_tag.glb');

  const firstMesh = Object.values(nodes).find(
    (n): n is THREE.Mesh => n.name === 'Tag'
  );

  if (!firstMesh) return null;

  return (
    <primitive
      object={firstMesh}
      dispose={null}
    >
    </primitive>
  )
}

function TagEffects() {
  const { size } = useThree()

  return (
    <EffectComposer stencilBuffer enableNormalPass={false} autoClear={false} multisampling={4}>
      <N8AO halfRes aoSamples={5} aoRadius={0.4} distanceFalloff={0.75} intensity={1} />
      <Outline visibleEdgeColor={0xffffff} width={size.width} edgeStrength={8} />
      <TiltShift2 samples={5} />
      <ToneMapping />
    </EffectComposer>
  )
}

function TagInfoOverlay() {
  return (
    <group>
      {/* Título */}
      <Text
        font="/fonts/Nunito-Bold.ttf"
        position={[0.25, -0.1, 0]}
        fontSize={0.02}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Etiqueta
      </Text>

      {/* Subtítulo */}
      <Text
        font="/fonts/Nunito-Bold.ttf"
        position={[0.355, -0.1, 0]}
        fontSize={0.02}
        color="green"
        anchorX="center"
        anchorY="middle"
      >
        Sustentável
      </Text>

      {/* Descrição */}
      <Text
        font="/fonts/Nunito-Bold.ttf"
        position={[0.3, -0.125, 0]}
        fontSize={0.01}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Escaneie o código QR...
      </Text>

      {/* Botão */}
      <mesh
        position={[0.3, -0.17, 0]}
        onClick={() => console.log("oi")}
      >
        <planeGeometry args={[0.18, 0.05]} />
        <meshStandardMaterial color="transparent" />

        <Text
          font="/fonts/Nunito-Bold.ttf"
          position={[0, 0, 0.01]}
          fontSize={0.012}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Transparência Total
        </Text>
      </mesh>
    </group>
  );
}