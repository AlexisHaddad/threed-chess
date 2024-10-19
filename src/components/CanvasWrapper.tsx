import { Canvas } from "@react-three/fiber";
import { PropsWithChildren, useRef, useState } from "react";
import { AnimatedCamera } from "./AnimatedCamera";
import { OrbitControls } from "@react-three/drei";
import { Button } from "@nextui-org/react";

export const CanvasWrapper = ({ children }: PropsWithChildren) => {
  const fixedRef = useRef(false);
  const [isOrbitalControlsEnabled, setIsOrbitalControlsEnabled] =
    useState(false);
  return (
    <>
      <Canvas shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 10, 0]} intensity={1} castShadow />

        <AnimatedCamera fixedRef={fixedRef} />

        <OrbitControls
          enablePan={isOrbitalControlsEnabled}
          enableZoom={isOrbitalControlsEnabled}
          enableRotate={isOrbitalControlsEnabled}
        />
        {children}
      </Canvas>
      <div style={{ position: "absolute", bottom: 0, right: 0 }}>
        <Button
          color="primary"
          onClick={() => setIsOrbitalControlsEnabled(!isOrbitalControlsEnabled)}
        >
          {isOrbitalControlsEnabled ? "Disable" : "Enable"} Orbital Controls
        </Button>
      </div>
    </>
  );
};
