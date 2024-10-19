"use client";
import { CanvasWrapper } from "@/components/CanvasWrapper";
import ChessBoard from "@/components/Chessboard";

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <CanvasWrapper>
        <ChessBoard />
      </CanvasWrapper>
    </div>
  );
}
