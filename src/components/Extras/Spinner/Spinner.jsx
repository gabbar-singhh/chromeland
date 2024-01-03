import React from "react";
import styles from './Spinner.module.css'

const Spinner = () => {
  return (
    <section className={styles.main}>
    <div class={styles.lds_ellipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    </section>
  );
};

export default Spinner;
