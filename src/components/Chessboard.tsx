import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Square } from "./Square";
import { ChessPiece } from "./ChessPiece";
import { AnimatedCamera } from "./AnimatedCamera";

const ChessBoard = () => {
  const boardSize = 8;
  const fixedRef = useRef(false);

  // Create the chessboard grid with alternating colors
  const chessboard = [];
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const color = (row + col) % 2 === 0 ? "white" : "green";
      chessboard.push(
        <Square key={`${row}-${col}`} position={[col, 0, row]} color={color} />
      );
    }
  }

  // Create chess piece placeholders (cubes) for both sides
  const pieces = [];
  for (let col = 0; col < 8; col++) {
    pieces.push(
      // White pieces (row 0 and 1)
      <ChessPiece key={`w-${col}`} position={[col, 0.5, 0]} color="white" />,
      <ChessPiece
        key={`w-pawn-${col}`}
        position={[col, 0.5, 1]}
        color="white"
      />,
      // Black pieces (row 6 and 7)
      <ChessPiece
        key={`b-pawn-${col}`}
        position={[col, 0.5, 6]}
        color="gray"
      />,
      <ChessPiece key={`b-${col}`} position={[col, 0.5, 7]} color="gray" />
    );
  }

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

      {chessboard}

      {pieces}
    </Canvas>
  );
};

export default ChessBoard;
