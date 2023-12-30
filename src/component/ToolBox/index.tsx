"use-client";

import styles from "./index.module.css";
import { Colours, MENU_ITEMS } from "@/constant";
import { useSelector } from "react-redux";
const ToolBox = () => {
  function upadateBrushSize(e: any): void {}

  const activeMenuItem: any = useSelector(
    (state: any) => state.menu.activeMenuItem
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
              className={styles.colorBox}
              style={{ backgroundColor: Colours.BLACK }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: Colours.RED }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: Colours.GREEN }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: Colours.YELLOW }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: Colours.BLACK }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: Colours.ORANGE }}
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
              // onChange={upadateBrushSize}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBox;
