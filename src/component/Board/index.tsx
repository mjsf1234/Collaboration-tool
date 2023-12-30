"use client";
import { useEffect, useRef } from "react";
import { COLOURS, MENU_ITEMS } from "@/constant";
import { useDispatch, useSelector } from "react-redux";
const Board = () => {
  const canvasRef = useRef();
  const activeMenuItem: any = useSelector(
    (state: any) => state.menu.activeMenuItem
  );
  const { color, size }: any = useSelector(
    (state: any) => state.toolbox[activeMenuItem]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: any = canvasRef.current;
    const ctx =
      canvas && canvas.getContext("2d") ? canvas.getContext("2d") : null;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);
  // console.log(color, size);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
