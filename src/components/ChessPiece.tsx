import React from "react";
import { ThreeEvent, Vector3 } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three";

interface ChessPieceProps {
  position: Vector3;
  color: string;
  onClick?: ((event: ThreeEvent<MouseEvent>) => void) | undefined;
}

export const ChessPiece = ({ position, color, onClick }: ChessPieceProps) => {
  const { scene } = useGLTF("/3d-models/peter_ganine_classic_king.glb");
  const clonedScene = scene.clone(true);
  clonedScene.traverse((child) => {
    if (child instanceof Mesh) {
      child.material = new MeshStandardMaterial({
        color: color,
      });
    }
  });
  return (
    <group onClick={onClick}>
      <primitive
        object={clonedScene}
        position={position}
        scale={[0.015, 0.015, 0.015]}
      />
    </group>
  );
};
