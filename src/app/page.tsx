"use client";
import { CanvasWrapper } from "@/components/CanvasWrapper";
import ChessBoard from "@/components/Chessboard";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <CanvasWrapper>
          <ChessBoard />
        </CanvasWrapper>
      </div>
    </NextUIProvider>
  );
}
