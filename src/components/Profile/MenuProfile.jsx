import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./MenuProfile.module.css";

const MenuProfile = () => {
    const { user, error, isLoading } = useUser();

    useEffect(() => {
        console.log("profile: ", user);
    }, []);

    return (
        <section className={styles.main}>
            <div className={styles.pfp}>
                <img src={user.picture} height={120} alt="user profile" />
            </div>
            <div className={styles.details}>
                <p>name: <span>{user.name}</span></p>
                <p>nickname: <span>{user.nickname}</span></p>
                <p>email: <span>{user.email}</span></p>
            </div>
        </section>
    );
};

export default MenuProfile;
