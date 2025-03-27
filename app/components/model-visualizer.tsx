"use client";
import { Canvas, useLoader } from "@react-three/fiber";
import { useFBX, useTexture } from "@react-three/drei";
import { OrbitControls,  } from "@react-three/drei";
import { useState, useRef } from "react";
import { TextureLoader } from "three";

export interface ModelVisualizerProps {
    modelPath: string;
    texture: string;
}

interface ModelRendererProps {
    modelPath: string;
    texture: string;
}

function Shirt(props: ModelRendererProps) {
  const fbx = useFBX(props.modelPath); // Load the model
  const meshRef = useRef(); // Reference to the shirt mesh


  const colorMap = useLoader(TextureLoader, props.texture)

  return (
    <mesh ref={meshRef}>
      {/* <primitive object={fbx} /> */}
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}

export default function ModelVisualizer(props: ModelVisualizerProps) {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 2, 5] }}>
        {/* Lighting */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        
        {/* 3D Shirt */}
        <Shirt scale={0.1} modelPath={props.modelPath} texture={props.texture} />
        
        {/* Enable mouse rotation */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}