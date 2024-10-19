import { Canvas } from "@react-three/fiber";
import { PropsWithChildren, useRef } from "react";
import { AnimatedCamera } from "./AnimatedCamera";
import { OrbitControls } from "@react-three/drei";

export const CanvasWrapper = ({ children }: PropsWithChildren) => {
  const fixedRef = useRef(false);
  return (
    <Canvas shadows>
      <ambientLight intensity={0.7} />
      <directionalLight position={[0, 10, 0]} intensity={1} castShadow />

      <AnimatedCamera fixedRef={fixedRef} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
      {children}
    </Canvas>
  );
};
