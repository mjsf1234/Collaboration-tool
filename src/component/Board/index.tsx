"use client";
import { useEffect, useRef } from "react";
const Board = () => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: any = canvasRef.current;
    const ctx =
      canvas && canvas.getContext("2d") ? canvas.getContext("2d") : null;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
