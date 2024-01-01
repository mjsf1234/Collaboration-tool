"use client";

import {
  faEraser,
  faFileArrowDown,
  faPencil,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { MENU_ITEMS } from "@/constant";
import { menuItemClick, actionItemClick } from "@/Redux/slice/menuSlice";
import socket from "@/socket";

const Menu = () => {
  const dispatch = useDispatch();
  const { activeMenuItem, actionMenuItem } = useSelector(
    (state: any) => state.menu
  );
  const { color, size }: any = useSelector(
    (state: any) => state.toolbox[activeMenuItem]
  );

  const handleMenuItem = (itemName: any): void => {
    dispatch(menuItemClick(itemName));
    socket.emit("changeConfig", {
      currentMenuItem: itemName,
      color,
      size: size,
    });
  };

  const handleActionItemClick = (itemName: any) => {
    dispatch(actionItemClick(itemName));
    socket.emit("changeConfig", {
      currentMenuItem: itemName,
      color,
      size: size,
    });
  };

  return (
    <div className={styles.menuContainer}>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
        })}
        onClick={() => {
          handleMenuItem(MENU_ITEMS.PENCIL);
        }}
      >
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </div>

      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
        })}
        onClick={() => {
          handleMenuItem(MENU_ITEMS.ERASER);
        }}
      >
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </div>

      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleActionItemClick(MENU_ITEMS.UNDO);
        }}
      >
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
      </div>

      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleActionItemClick(MENU_ITEMS.REDO);
        }}
      >
        <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
      </div>

      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleActionItemClick(MENU_ITEMS.DOWNLOAD);
        }}
      >
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
      </div>
    </div>
  );
};

export default Menu;
