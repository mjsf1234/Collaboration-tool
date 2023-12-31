"use-client";

import { changeBrushSize, changeColour } from "@/Redux/slice/toolboxSlice";
import styles from "./index.module.css";
import { COLOURS, MENU_ITEMS } from "@/constant";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
const ToolBox = () => {
  const dispatch = useDispatch();

  const updateColour = (selectedColor: any) => {
    dispatch(changeColour({ item: activeMenuItem, color: selectedColor }));
  };

  function upadateBrushSize(e: any): void {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
  }

  const activeMenuItem: any = useSelector(
    (state: any) => state.menu.activeMenuItem
  );
  const { color, size }: any = useSelector(
    (state: any) => state.toolbox[activeMenuItem]
  );
  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.PENCIL ||
    activeMenuItem === MENU_ITEMS.ERASER;
  return (
    <div className={styles.toolboxContainer}>
      {showStrokeToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Strok colour </h4>
          <div className={styles.itemContainer}>
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLOURS.BLACK,
              })}
              style={{ backgroundColor: COLOURS.BLACK }}
              onClick={() => {
                updateColour(COLOURS.BLACK);
              }}
            />
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLOURS.RED,
              })}
              style={{ backgroundColor: COLOURS.RED }}
              onClick={() => {
                updateColour(COLOURS.RED);
              }}
            />
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLOURS.GREEN,
              })}
              style={{ backgroundColor: COLOURS.GREEN }}
              onClick={() => {
                updateColour(COLOURS.GREEN);
              }}
            />
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLOURS.YELLOW,
              })}
              style={{ backgroundColor: COLOURS.YELLOW }}
              onClick={() => {
                updateColour(COLOURS.YELLOW);
              }}
            />
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLOURS.WHITE,
              })}
              style={{ backgroundColor: COLOURS.WHITE }}
              onClick={() => {
                updateColour(COLOURS.WHITE);
              }}
            />
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLOURS.ORANGE,
              })}
              style={{ backgroundColor: COLOURS.ORANGE }}
              onClick={() => {
                updateColour(COLOURS.ORANGE);
              }}
            />
          </div>
        </div>
      )}
      {showBrushToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Brush Size</h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              onChange={upadateBrushSize}
              value={size}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBox;
