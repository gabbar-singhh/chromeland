import React, { useState, useEffect } from "react";
import styles from "./WindowFrame.module.css";
import Draggable from "react-draggable";
import CloudBtn from "../Buttons/CloudBtn/CloudBtn";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import app from "@/lib/firebase";

const WindowFrame = ({ children, windowName, visible }) => {
  const [show, setShow] = useState(visible);
  const [notes, setNotes] = useState([]);

  const [userData, setUserData] = useState({
    credential: "",
    token: "",
    displayName: "",
    email: "",
    photoURL: "",
    isLoggedIn: false,
  });

  const closeWindow = () => {
    setShow(false);
  };

  const auth = getAuth();

  const signInBtnHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        // user details be saved
        setUserData({
          credential: credential,
          token: token,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          isLoggedIn: true,
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            credential: credential,
            token: token,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            isLoggedIn: true,
          })
        );
        window.location.reload();
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // The email of the user's account used.
        const email = error.customData.email;

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const signOutBtnHandler = () => {
    signOut(auth)
      .then(() => {
        setUserData({
          credential: "",
          token: "",
          displayName: "",
          email: "",
          photoURL: "",
          isLoggedIn: false,
        });
        localStorage.removeItem("user");
        console.log("signed out succesfully");
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const prevSignInDetails = JSON.parse(localStorage.getItem("user"));
    if (prevSignInDetails) {
      setUserData(prevSignInDetails);
    }
  }, []);

  return (
    <>
      {show && (
        <Draggable>
          <section className={styles.container_windowframe}>
            <div className={styles.top_frame}>
              <p onClick={closeWindow} className={styles.close_program}>
                <img src="/icons/x.png" height={15} alt="" />
              </p>

              <div className={styles.black_lines}>
                <div className={styles.line_1}></div>
                <div className={styles.line_2}></div>
                <div className={styles.line_3}></div>
                <div className={styles.line_4}></div>
                <div className={styles.line_4}></div>
              </div>

              <p>{windowName}</p>

              <div className={styles.black_lines}>
                <div className={styles.line_1}></div>
                <div className={styles.line_2}></div>
                <div className={styles.line_3}></div>
                <div className={styles.line_4}></div>
                <div className={styles.line_4}></div>
              </div>
            </div>

            <div className={styles.data_container}>
              {
                userData.isLoggedIn ? (
                  <>{children}</>
                ) : (
                  <CloudBtn href="" onClick={signInBtnHandler} txt="SIGN IN" />
                )
                /* <div className={styles.notes_list}>
                    {notes.map((element) => {
                      return (
                        
                      );
                    })}
                  </div> */
              }
              {/* {user && <>{children}</>} */}
            </div>
          </section>
        </Draggable>
      )}
    </>
  );
};

export default WindowFrame;
