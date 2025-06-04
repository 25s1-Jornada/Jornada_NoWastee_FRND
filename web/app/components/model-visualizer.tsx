'use client'
import { OrbitControls, useFBX, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

function FBXModel() {
  const model = useFBX("/models/tshirt.fbx"); // This will crash if run on server
  return <primitive object={model} scale={0.02} />;
}
function GLBModel() {
  const { scene } = useGLTF("/models/tshirt.glb");

  // Optional fine-tuning
  scene.rotation.y = Math.PI; // Optional flip if needed
  return <primitive object={scene} scale={1.0} />;
}
export default function ModelVisualizer() {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 1.5, 3], fov: 45 }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <Suspense fallback={null}>
        <GLBModel />
        <OrbitControls enablePan={true} />
      </Suspense>
    </Canvas>
  );
}
