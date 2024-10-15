import React from "react";
import { ThreeEvent, Vector3 } from "@react-three/fiber";

interface SquareProps {
  position: Vector3;
  color: string;
  onClick?: ((event: ThreeEvent<MouseEvent>) => void) | undefined;
  isSelected: boolean;
  isPossibleDestination: boolean;
}

// Create a single square component
export const Square = ({
  position,
  color,
  onClick,
  isSelected,
  isPossibleDestination,
}: SquareProps) => {
  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial
        color={isSelected ? "red" : isPossibleDestination ? "yellow" : color}
      />
    </mesh>
  );
};
