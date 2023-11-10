import React from "react";
import styles from "./MenuSocials.module.css";
import Link from "next/link";

const MenuProfile = () => {
  return (
    <section className={styles.main}>
      <Link
        href={"https://www.instagram.com/codexhimanshu/"}
        target="_blank"
        className={styles.cta}
      >
        follow the developer!<p>@codexhimanshu</p>
      </Link>

      <span>
        <img src="/assets/social_1.svg" height={"220px"} alt="img" />
        <img src="/assets/social_2.svg" height={"220px"} alt="img" />
      </span>
    </section>
  );
};

export default MenuProfile;