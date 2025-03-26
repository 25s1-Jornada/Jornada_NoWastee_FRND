"use client";
import { Canvas } from "@react-three/fiber";
import { useFBX } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { useState, useRef } from "react";

function Shirt(props) {
  const fbx = useFBX("/models/pistol.fbx"); // Load the model
  const [color, setColor] = useState("#ffffff"); // Default color is white
  const meshRef = useRef(); // Reference to the shirt mesh

  // Function to change color when clicked
  const changeColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);
  };

  return (
    <mesh ref={meshRef} onClick={changeColor}>
      <primitive object={fbx} {...props} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
}

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 2, 5] }}>
        {/* Lighting */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        
        {/* 3D Shirt */}
        <Shirt scale={0.1} />
        
        {/* Enable mouse rotation */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}