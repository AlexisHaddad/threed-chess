import React from "react";
import { Vector3 } from "@react-three/fiber";

interface SquareProps {
  position: Vector3;
  color: string;
}

// Create a single square component
export const Square = ({ position, color }: SquareProps) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
