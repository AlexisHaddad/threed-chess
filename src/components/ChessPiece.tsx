import React from "react";
import { ThreeEvent, Vector3 } from "@react-three/fiber";

interface ChessPieceProps {
  position: Vector3;
  color: string;
  onClick?: ((event: ThreeEvent<MouseEvent>) => void) | undefined;
}

// Create a chess piece placeholder (cube)
export const ChessPiece = ({ position, color, onClick }: ChessPieceProps) => {
  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
