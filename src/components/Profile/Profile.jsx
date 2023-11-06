import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

const Profile = ({ name, profile_url, signOut }) => {
    const { user, error, isLoading } = useUser();

    useEffect(() => {
        console.log("user", user);
        console.log(profile_url);
    }, []);

    return (
        <section className={styles.main}>
            {/* <section className={styles.main} onClick={signOut}> */}

            <div className={styles.profile_box}>
                <img className={styles.profile_img} src={profile_url} alt="profile image" />

                <span className={styles.profile_text}>
                    <p>{name}</p>
                    <p>{'logged in'}</p>
                </span>

            </div>

        </section>
    );
};

export default Profile;