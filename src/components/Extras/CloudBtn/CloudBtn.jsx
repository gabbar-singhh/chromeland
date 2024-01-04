import React from "react";
import styles from "./CloudBtn.module.css";
import Link from "next/link";

const CloudBtn = (props) => {
  return (
    <div className={styles.cloud_main} style={props.customCSS}>
      <div className={styles.signin_btn}>
        <Link href={props.href} onClick={props.onClick} className={styles.link_sign}>
          {props.txt}
        </Link>
      </div>
    </div>
  );
};

export default CloudBtn;