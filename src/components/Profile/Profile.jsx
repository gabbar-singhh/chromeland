import React, { useEffect, useState, useContext } from "react";
import styles from "./Profile.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import WindowStatusContext from "../ContextAPI/WindowStatusContext";


const Profile = ({ name, profile_url, signOut, signIn, status, statusColor }) => {
    const { user, error, isLoading } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const windowStatus = useContext(WindowStatusContext);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const showWindowFrame = (appType) => {
        /*
        only 3 types of li

        - user profile
        - social handles
        - feedback

        */
       
        if (windowStatus.windowShow.visible === false) {
            windowStatus.setWindowShow({
                visible: true,
                appName: appType,

                noteDisplay: false,
                data: {
                    id: "",
                    title: "",
                    desc: "",
                    timestamp: ""
                }
            });
        } else if (windowStatus.windowShow.visible === true) {
            windowStatus.setWindowShow({
                visible: false,
                appName: appType,

                noteDisplay: false,
                data: {
                    id: "",
                    title: "",
                    desc: "",
                    timestamp: ""
                }
            });
        }

        console.log("👾👾", windowStatus.windowShow);

    }

    useEffect(() => {
        console.log("user", user);
        console.log(profile_url);
    }, []);

    return (
        <section className={styles.main}>
            <div onClick={toggleDropdown} className={styles.profile_box}>
                <img
                    className={styles.profile_img}
                    src={profile_url}
                    alt="profile image"
                />

                <span className={styles.profile_text}>
                    <p>{name}</p>
                    <p style={{ color: statusColor }}>{status}</p>
                </span>
            </div>

            <div className={styles.dropdown}>
                {isOpen && (
                    <ul className={styles.dropdown_content}>
                        <li onClick={() => {
                            showWindowFrame("user profile")
                        }}>
                            <Link
                                onClick={closeDropdown}
                                className={styles.dropdown_item}
                                href=""
                            >
                                profile
                            </Link>
                        </li>
                        <li onClick={() => {
                            showWindowFrame("social handles");
                        }}>
                            <Link
                                onClick={closeDropdown}
                                className={styles.dropdown_item}
                                href=""
                            >
                                social
                            </Link>
                        </li>
                        <li onClick={() => {
                            showWindowFrame("feedback");
                        }}>
                            <Link
                                onClick={closeDropdown}
                                className={styles.dropdown_item}
                                href=""
                            >
                                {"feedback"}
                            </Link>
                        </li>
                        {user ? (<li>
                            <Link
                                className={styles.dropdown_item}
                                href="#"
                                style={{ color: "#ff0000", marginBottom: 0 }}
                                onClick={() => {
                                    closeDropdown();
                                    signOut();
                                }}
                            >
                                log out
                            </Link>
                        </li>) : (
                            <li>
                                <Link
                                    className={styles.dropdown_item}
                                    href="#"
                                    style={{ color: "#ff0000", marginBottom: 0 }}
                                    onClick={() => {
                                        closeDropdown();
                                        signIn();
                                    }}
                                >
                                    log in
                                </Link>
                            </li>
                        )}

                    </ul>
                )}
            </div>
        </section>
    );
};

export default Profile;
