import React, { useEffect } from "react";
import styles from "./MenuProfile.module.css";
import { useSession } from "@supabase/auth-helpers-react";

const MenuProfile = () => {
  const session = useSession();

  useEffect(() => {
    console.log("profile: ", session);
  }, []);

  return (
    <section className={styles.main}>
      <div className={styles.pfp}>
        <img
          src={session.user.user_metadata.avatar_url}
          height={120}
          alt="user profile"
        />
      </div>
      <div className={styles.details}>
        <p>
          name: <span>{session.user.user_metadata.name}</span>
        </p>
        {/* <p>nickname: <span>{user.nickname}</span></p> */}
        <p>
          email: <span>{session.user.email}</span>
        </p>
      </div>
    </section>
  );
};

export default MenuProfile;
