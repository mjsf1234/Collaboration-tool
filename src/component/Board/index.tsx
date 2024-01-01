"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { COLOURS, MENU_ITEMS } from "@/constant";
import { useDispatch, useSelector } from "react-redux";
import { actionItemClick } from "@/Redux/slice/menuSlice";
import socket from "@/socket";
const Board = () => {
  const canvasRef: any = useRef();
  const shouldDraw = useRef(false);
  const dispatch = useDispatch();
  const drawHistory = useRef<Array<any>>([]);
  const historyPointer = useRef<number>(0);
  const { activeMenuItem, actionMenuItem } = useSelector(
    (state: any) => state.menu
  );
  const { color, size }: any = useSelector(
    (state: any) => state.toolbox[activeMenuItem]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: any = canvasRef.current;
    const ctx =
      canvas && canvas.getContext("2d") ? canvas.getContext("2d") : null;
    ctx.str;

    //add the download feature
    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a"); //creating the anchor tag
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    } else if (actionMenuItem === MENU_ITEMS.UNDO) {
      if (historyPointer.current > 0) historyPointer.current -= 1;
      const imageData = drawHistory.current[historyPointer.current];
      ctx.putImageData(imageData, 0, 0);
    } else if (actionMenuItem === MENU_ITEMS.REDO) {
      if (historyPointer.current < drawHistory.current.length - 1)
        historyPointer.current += 1;
      const imageData = drawHistory.current[historyPointer.current];
      ctx.putImageData(imageData, 0, 0);
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: any = canvasRef.current;
    const ctx =
      canvas && canvas.getContext("2d") ? canvas.getContext("2d") : null;
    ctx.str;

    const changeConfig = () => {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
    };
    changeConfig();
    console.log("size", size, color);
  }, [color, size]);

  //mounting
  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const canvas: any = canvasRef.current; // when the component mounted in the DOM , we need to have the reference of it using the useRef
    const ctx =
      canvas && canvas.getContext("2d") ? canvas.getContext("2d") : null; // get the context to start tooling
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x: any, y: any) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const handleMouseDown = (e: any) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
      socket.emit("beginPath", { x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = (e: any) => {
      shouldDraw.current = false;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };

    const drawLine = (x: any, y: any) => {
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const handleMouseMove = (e: any) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);
      socket.emit("drawLine", { x: e.clientX, y: e.clientY });
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    const handleBeginPath = (args: any) => {
      beginPath(args.x, args.y);
    };

    const handleDrawPath = (args: any) => {
      drawLine(args.x, args.y);
    };

    socket.on("beginPath", handleBeginPath);
    socket.on("drawLine", handleDrawPath);

    //cleanup function

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
