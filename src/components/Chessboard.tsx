import React, { useCallback, useMemo, useState } from "react";
import { Billboard, Text } from "@react-three/drei";
import { Square } from "./Square";
import { ChessPiece } from "./ChessPiece";
import { Chess, Color, Square as chessjsSquare, PieceSymbol } from "chess.js";

const PIECE_COLORS: Record<Color, string> = {
  b: "gray",
  w: "white",
};

const INDEX_TO_COLOMN = ["a", "b", "c", "d", "e", "f", "g", "h"];

const getToFromColAndRow = (col: number, row: number) =>
  `${INDEX_TO_COLOMN[col]}${8 - row}`;

const ChessBoard = () => {
  const [selectedPiece, setSelectedPiece] = useState<{
    square: chessjsSquare;
    type: PieceSymbol;
    color: Color;
  } | null>(null);
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [turn, setTurn] = useState(chess.turn());
  const inCheck = useMemo(() => chess.inCheck(), [chess]);
  const isCheckmate = useMemo(() => chess.isCheckmate(), [chess]);

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
    <>
      <Billboard follow position={[4, 7, 3]}>
        <Text fontSize={0.5} anchorX="center" anchorY="middle">
          {turn === "w" ? "White's turn" : "Black's turn"}
        </Text>
        <Text fontSize={0.5} anchorX="center" anchorY="middle">
          {isCheckmate ? "Checkmate!" : inCheck ? "Check!" : ""}
        </Text>
      </Billboard>

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
                key={`${piece.color} - ${piece.square}`}
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
    </>
  );
};

export default ChessBoard;
