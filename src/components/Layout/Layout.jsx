import React from "react";
import styles from "./Layout.module.css";

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Layout;
