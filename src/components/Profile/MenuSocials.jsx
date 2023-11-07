import React from "react";
import styles from "./MenuSocials.module.css";
import Link from "next/link";

const MenuProfile = () => {

    return (
        <section className={styles.main}>
            <Link href={'https://www.instagram.com/codexhimanshu/'} target="_blank">
                <p>
                    follow @codexhimanshu
                </p>
            </Link>
        </section>
    );
};

export default MenuProfile;
