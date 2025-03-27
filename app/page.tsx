import ModelVisualizer from "./components/model-visualizer";

export default function Home() {
  return (
    <div className="w-screen h-screen">

      <ModelVisualizer modelPath="/models/pistol.fbx" texture="/models/texture.jpg" />
    </div>
  );
}