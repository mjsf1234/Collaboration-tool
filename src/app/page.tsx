"use client";

import Board from "@/component/Board";
import Menu from "@/component/Menu";
import ToolBox from "@/component/ToolBox";
import { useSelector } from "react-redux";
export default function Home() {
  return (
    <>
      <Menu />
      <ToolBox />
      <Board />
    </>
  );
}
