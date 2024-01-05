import React, { useEffect, useState, useContext } from "react";
import styles from "./Profile.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { showWindow } from "@/feature/windowFrame/windowStatusSlice";
import { useSession } from "@supabase/auth-helpers-react";
import { signIn, signOut } from "@/feature/auth/authSlice";

const Profile = ({ name, profile_url, status, statusColor }) => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const windowStatus = useSelector((state) => state.window.windowStatus);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const showWindowFrame = (appType) => {
    /*
ONLY 3 TYPES OF appType applicable: 
- 'user profile'
- 'social handles'
- 'feedback'
            */

    dispatch(
      showWindow({
        visible: true,
        appName: appType,

        noteDisplay: false,
        data: {
          id: "",
          title: "",
          desc: "",
          timestamp: "",
        },
      })
    );
  };

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
            <li
              onClick={() => {
                showWindowFrame("user profile");
              }}
            >
              <Link
                onClick={closeDropdown}
                className={styles.dropdown_item}
                href=""
              >
                profile
              </Link>
            </li>
            <li
              onClick={() => {
                showWindowFrame("social handles");
              }}
            >
              <Link
                onClick={closeDropdown}
                className={styles.dropdown_item}
                href=""
              >
                social
              </Link>
            </li>
            <li
              onClick={() => {
                showWindowFrame("feedback");
              }}
            >
              <Link
                onClick={closeDropdown}
                className={styles.dropdown_item}
                href=""
              >
                {"feedback"}
              </Link>
            </li>
            {session ? (
              <li>
                <Link
                  className={styles.dropdown_item}
                  href="#"
                  style={{ color: "#ff0000", marginBottom: 0 }}
                  onClick={() => {
                    closeDropdown();
                    dispatch(signOut());
                  }}
                >
                  log out
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  className={styles.dropdown_item}
                  href="#"
                  style={{ color: "#ff0000", marginBottom: 0 }}
                  onClick={() => {
                    closeDropdown();
                    dispatch(signIn());
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
