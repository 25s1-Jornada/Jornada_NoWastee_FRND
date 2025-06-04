'use client'
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { Suspense } from "react";

// function GLBModel() {
//   const { scene } = useGLTF("/models/tshirt.glb");

//   // Optional fine-tuning
//   scene.rotation.y = Math.PI; // Optional flip if needed
//   return <primitive position={[0, 0, 0]}  object={scene} scale={0.05} />;
// }
// export default function ModelVisualizer() {
//   return (
//     <Canvas
//       className="w-full h-full"
//       camera={{ position: [0, 0, 0], fov: 90 }}
//     >
//       <ambientLight intensity={1.2} />
//       <directionalLight position={[5, 5, 5]} intensity={1.0} />
//       <Suspense fallback={null}>
//         <GLBModel />
//         <OrbitControls enablePan={true} />
//       </Suspense>
//     </Canvas>
//   );
// }
import { useGLTF, OrbitControls, Html, useProgress, Stats, Circle } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
}

function GLBModel() {
  const { scene } = useGLTF("/models/nowastee.glb");
  return <primitive object={scene} position={[0, 0, 0]} scale={1} />;
}

export default function ModelVisualizer() {
  return (
    <Canvas camera={{ position: [0, 0, 3], zoom: 1 }} shadows>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Suspense fallback={<Loader />}>
        <GLBModel />
        <OrbitControls target={[0, 0, 0]} />
        <Stats />
      </Suspense>
    </Canvas>
  );
}
