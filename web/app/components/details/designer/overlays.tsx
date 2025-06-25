// overlays.tsx
import { Text } from "@react-three/drei";

export function TagInfoOverlay() {
  return (
    <group>
      <Text font="/fonts/Nunito-Bold.ttf" position={[0.25, -0.1, 0]} fontSize={0.02} color="white" anchorX="center" anchorY="middle">Etiqueta</Text>
      <Text font="/fonts/Nunito-Bold.ttf" position={[0.355, -0.1, 0]} fontSize={0.02} color="green" anchorX="center" anchorY="middle">Sustentável</Text>
      <Text font="/fonts/Nunito-Bold.ttf" position={[0.3, -0.125, 0]} fontSize={0.01} color="white" anchorX="center" anchorY="middle">Escaneie o código QR...</Text>
      <mesh position={[0.3, -0.17, 0]} onClick={() => window.open("/product-page", "_blank")}>
        <planeGeometry args={[0.18, 0.05]} />
        <meshStandardMaterial color="white" />
        <Text font="/fonts/Nunito-Bold.ttf" position={[0, 0, 0.01]} fontSize={0.012} color="black" anchorX="center" anchorY="middle">Transparência Total</Text>
      </mesh>
    </group>
  );
}

export function TorsoOverlay() {
  return (
    <group>
      <Text font="/fonts/Nunito-Bold.ttf" position={[0.35, 0.2, 0]} fontSize={0.02} color="white" anchorX="center" anchorY="middle">
        Parte Frontal
      </Text>
      <Text font="/fonts/Nunito-Bold.ttf" position={[0.35, 0.17, 0]} fontSize={0.012} color="white" anchorX="center" anchorY="middle">
        Produzida com algodão 100% reciclado.
      </Text>
    </group>
  );
}

export function SleeveOverlay() {
  return (
    <group>
      <Text font="/fonts/Nunito-Bold.ttf" position={[0.35, 0.2, 0]} fontSize={0.02} color="white" anchorX="center" anchorY="middle">
        Mangas Curtas
      </Text>
      <Text font="/fonts/Nunito-Bold.ttf" position={[0.35, 0.17, 0]} fontSize={0.012} color="white" anchorX="center" anchorY="middle">
        Produzida com algodão 100% reciclado.
      </Text>
    </group>
  );
}

export function CollarOverlay() {
  return (
    <group>
      <Text font="/fonts/Nunito-Bold.ttf" position={[0.35, 0.2, 0]} fontSize={0.02} color="white" anchorX="center" anchorY="middle">
        Colar
      </Text>
      <Text font="/fonts/Nunito-Bold.ttf" position={[0.35, 0.17, 0]} fontSize={0.012} color="white" anchorX="center" anchorY="middle">
        Produzida com algodão 100% reciclado.
      </Text>
    </group>
  );
}
