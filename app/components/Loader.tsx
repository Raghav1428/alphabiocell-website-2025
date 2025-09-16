"use client";
import { useEffect, useState } from "react";
import styles from "./loader.module.css";

export default function Loader() {
  const [off, setOff] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOff(true), 4200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`${styles.loader} ${off ? styles.hidden : ""}`}>
      <h1>BREATHE</h1>
      <h1>IN</h1>
      <h1>OPPORTUNITY</h1>
    </div>
  );
}
