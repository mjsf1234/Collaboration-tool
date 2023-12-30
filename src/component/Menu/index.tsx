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
import { useDispatch } from "react-redux";
import { MENU_ITEMS } from "@/constant";
import { menuItemClick, actionItemClick } from "@/Redux/slice/menuSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const handleMenuItem = (itemName: any): void => {
    dispatch(menuItemClick(itemName));
  };
  return (
    <div className={styles.menuContainer}>
      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleMenuItem(MENU_ITEMS.PENCIL);
        }}
      >
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </div>

      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleMenuItem(MENU_ITEMS.ERASER);
        }}
      >
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </div>

      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleMenuItem(MENU_ITEMS.UNDO);
        }}
      >
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
      </div>

      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleMenuItem(MENU_ITEMS.REDO);
        }}
      >
        <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
      </div>

      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleMenuItem(MENU_ITEMS.DOWNLOAD);
        }}
      >
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
      </div>
    </div>
  );
};

export default Menu;
