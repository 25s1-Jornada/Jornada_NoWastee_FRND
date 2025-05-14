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
  return <primitive object={scene} scale={0.02} />;
}

export default function ModelVisualizer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas className="w-full h-full">
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <GLBModel />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}