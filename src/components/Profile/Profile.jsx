import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

const Profile = ({ name, profile_url, signOut }) => {
    const { user, error, isLoading } = useUser();

    useEffect(() => {
        console.log("user", user);
    }, []);

    return (
        <section className={styles.main} onClick={signOut}>
            <img className={styles.main_img} src={profile_url} alt="profile image" />

            <p className={styles.main_name}>{name}</p>
        </section>
    );
};

export default Profile;
