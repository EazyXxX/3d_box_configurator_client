import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useBoxStore } from "../store";
import { Box } from "./Box";

export function BoxScene() {
  const isDarkMode = useBoxStore((state) => state.isDarkMode);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden lg:col-span-2">
      <Canvas
        camera={{ position: [200, 200, 200], fov: 45 }}
        style={{
          background: isDarkMode ? "#1a1a1a" : "#f0f0f0",
          transition: "ease",
          transitionDuration: "300",
        }}
      >
        <directionalLight position={[100, 100, 100]} intensity={0.8} />
        <directionalLight position={[-50, 50, -50]} intensity={0.4} />
        <ambientLight intensity={0.3} />

        <Box />

        <OrbitControls maxDistance={1000} minDistance={50} />
        <gridHelper args={[500, 50]} />
      </Canvas>
    </div>
  );
}
