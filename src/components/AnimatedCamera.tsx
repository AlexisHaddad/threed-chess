import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { PerspectiveCamera as PerspectiveCameraRef } from "three";

interface AnimatedCameraProps {
  fixedRef: MutableRefObject<boolean>;
}

// Animated camera component
export const AnimatedCamera = ({ fixedRef }: AnimatedCameraProps) => {
  const cameraRef = useRef<PerspectiveCameraRef | null>(null);
  console.log("AnimatedCamera");

  // Animation: Rotating around the board
  useFrame((state) => {
    if (cameraRef.current) {
      const { clock } = state;
      const elapsedTime = clock.getElapsedTime();

      // Rotate the camera around the board (simple circular motion)
      if (elapsedTime < 3) {
        // Rotate the camera around the board for 3 seconds
        const radius = 12;
        const angle = elapsedTime * Math.PI * 0.5; // 90 degrees in 3 seconds
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        console.log("x", x, "z", z);
        cameraRef.current.position.x = x;
        cameraRef.current.position.y = angle;
        cameraRef.current.position.z = z;
        cameraRef.current.lookAt(4, 0, 4); // Look at the center of the board
      } else {
        cameraRef.current.lookAt(4, 0, 4); // Look at the center of the board
        fixedRef.current = true; // Set the fixed flag
      }
    }
  });

  return (
    <PerspectiveCamera
      makeDefault
      manual
      ref={cameraRef}
      aspect={window.innerWidth / window.innerHeight}
      fov={60}
      near={1}
      far={100000}
    />
  );
};
