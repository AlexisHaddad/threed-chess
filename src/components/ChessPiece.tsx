import React from "react";
import { Vector3 } from "@react-three/fiber";

interface ChessPieceProps {
  position: Vector3;
  color: string;
}

// Create a chess piece placeholder (cube)
export const ChessPiece = ({ position, color }: ChessPieceProps) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
