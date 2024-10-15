import React, { useCallback, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Square } from "./Square";
import { ChessPiece } from "./ChessPiece";
import { AnimatedCamera } from "./AnimatedCamera";
import { Chess, Color, Square as chessjsSquare, PieceSymbol } from "chess.js";

const PIECE_COLORS: Record<Color, string> = {
  b: "gray",
  w: "white",
};

const INDEX_TO_COLOMN = ["a", "b", "c", "d", "e", "f", "g", "h"];

const getToFromColAndRow = (col: number, row: number) =>
  `${INDEX_TO_COLOMN[col]}${8 - row}`;

const ChessBoard = () => {
  const fixedRef = useRef(false);
  const [selectedPiece, setSelectedPiece] = useState<{
    square: chessjsSquare;
    type: PieceSymbol;
    color: Color;
  } | null>(null);
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [turn, setTurn] = useState(chess.turn());

  const possibleMoves = useMemo(
    () => chess.moves({ verbose: true, square: selectedPiece?.square }),
    [chess, selectedPiece?.square]
  );

  const handleClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      const square = board[rowIndex][colIndex];
      if (square && square.color === turn) {
        setSelectedPiece(square);
      } else {
        const move = possibleMoves.find(
          (m) =>
            m.from === selectedPiece?.square &&
            m.to === getToFromColAndRow(colIndex, rowIndex)
        );

        console.log(move);

        if (move) {
          chess.move(move.san);
          setBoard(chess.board());
          setTurn(chess.turn());
          setSelectedPiece(null);
        }
      }
    },
    [board, chess, possibleMoves, selectedPiece?.square, turn]
  );

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

      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <>
            <Square
              key={`${rowIndex}-${colIndex}`}
              position={[colIndex, 0, rowIndex]}
              color={rowIndex % 2 === colIndex % 2 ? "white" : "green"}
              onClick={
                selectedPiece
                  ? () => handleClick(rowIndex, colIndex)
                  : undefined
              }
              isSelected={Boolean(
                selectedPiece &&
                  selectedPiece.square === piece?.square &&
                  selectedPiece.color === turn
              )}
              isPossibleDestination={Boolean(
                selectedPiece &&
                  possibleMoves.some(
                    (m) => m.to === getToFromColAndRow(colIndex, rowIndex)
                  )
              )}
            />
            {piece && (
              <ChessPiece
                key={piece.square}
                position={[colIndex, 0.5, rowIndex]}
                color={PIECE_COLORS[piece.color]}
                onClick={
                  turn === piece.color
                    ? () => handleClick(rowIndex, colIndex)
                    : undefined
                }
              />
            )}
          </>
        ))
      )}

      {/* {chessboard} */}

      {/* {pieces} */}
    </Canvas>
  );
};

export default ChessBoard;
