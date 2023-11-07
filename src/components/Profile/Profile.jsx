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
          <ul className={styles.dropdown_content}>
            <li>
              <Link
                onClick={closeDropdown}
                className={styles.dropdown_item}
                href="#"
              >
                profile
              </Link>
            </li>
            <li>
              <Link
                onClick={closeDropdown}
                className={styles.dropdown_item}
                href="#"
              >
                social
              </Link>
            </li>
            <li>
              <Link
                onClick={closeDropdown}
                className={styles.dropdown_item}
                href="#"
              >
                {"feedback"}
              </Link>
            </li>
            <li>
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
            </li>
          </ul>
        )}
      </div>
    </section>
  );
};

export default Profile;
