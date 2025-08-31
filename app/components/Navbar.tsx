"use client";
import { useState } from "react";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className={styles.nav}>
        <img
          className={`${styles.logo} ${open ? styles.hidden : ""}`}
          src="./abcblacklogo.svg"
          alt="logo"
        />
        <div className={styles.links}>
          <h4><a href="#">Events</a></h4>
          <h4><a href="#">Research</a></h4>
          <h4><a href="#">Board</a></h4>
        </div>
        <h3 className={styles.menuBtn} onClick={() => setOpen(!open)}>Menu</h3>
      </nav>
      <div className={`${styles.full} ${open ? styles.fullOpen : ""}`}>
        <div className={styles.fullInner} />
      </div>
    </>
  );
}
