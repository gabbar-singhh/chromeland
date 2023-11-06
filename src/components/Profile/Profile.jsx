import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const Profile = ({ name, profile_url, signOut }) => {
    const { user, error, isLoading } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        console.log("user", user);
        console.log(profile_url);
    }, []);

    return (
        <section className={styles.main}>
            {/* <section className={styles.main} onClick={signOut}> */}

            <div onClick={toggleDropdown} className={styles.profile_box}>
                <img
                    className={styles.profile_img}
                    src={profile_url}
                    alt="profile image"
                />

                <span className={styles.profile_text}>
                    <p>{name}</p>
                    <p>{"logged in"}</p>
                </span>
            </div>

            <div className={styles.dropdown}>
                {isOpen && (
                    <div className={styles.dropdown_content}>
                        <Link onClick={closeDropdown} className={styles.dropdown_item} href="#">
                            <p>Profile</p>
                        </Link>
                        <Link onClick={closeDropdown} className={styles.dropdown_item} href="#">
                            <p>feedback:)</p>
                        </Link>
                        <Link onClick={closeDropdown} className={styles.dropdown_item} href="#">
                            <p style={{ color: "red" }}>log out</p>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Profile;
