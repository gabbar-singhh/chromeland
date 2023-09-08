import React, { useState, useEffect, useContext } from "react";
import styles from "./WindowFrame.module.css";
import Draggable from "react-draggable";
import CloudBtn from "../Buttons/CloudBtn/CloudBtn";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  auth,
} from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import UserAuthContext from "../ContextAPI/UserAuthContext";
import WindowStatusContext from "../ContextAPI/WindowStatusContext";
import supabase from "@/lib/supabaseClient";
// import { auth } from "@/lib/firebase";

const WindowFrame = ({ children, windowName, visible }) => {
  const [notes, setNotes] = useState([]);
  const [fetchData, setFetchData] = useState();

  const authDetail = useContext(UserAuthContext);
  const windowStatus = useContext(WindowStatusContext);

  const setAuthDetailsToContext = () => {
    authDetail.setUserAuthDetail(userData);
  };

  const closeWindow = () => {
    windowStatus.setWindowShow({
      visible: false,
      appName: "none",
    });
  };

  const auth = getAuth();

  const insertData = async (name, email, profile) => {
    const insertData = await supabase
      .from("users")
      .insert([
        {
          name: name,
          email_id: email,
          profile_url: profile,
        },
      ])
      .select();

    console.log("🫂", insertData);
  };

  const signInBtnHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        // user details be saved
        authDetail.setUserAuthDetail({
          credential: credential,
          token: token,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          isLoggedIn: true,
        });

        // ADD USER TO USERS COLLECTION
        insertData(user.displayName, user.email, user.photoURL);

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
        // window.location.reload();
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // The email of the user's account used.
        // const email = error.customData.email;

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  // const signOutBtnHandler = () => {
  //   signOut(auth)
  //     .then(() => {
  //       authDetail.setUserAuthDetail({
  //         credential: "",
  //         token: "",
  //         displayName: "",
  //         email: "",
  //         photoURL: "",
  //         isLoggedIn: false,
  //       });

  //       localStorage.removeItem("user");
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       console.log("🔴Error in WindowFrame.jsx", error);
  //     });
  // };

  useEffect(() => {
    const fetchData = async () => {
      const data = await supabase.from("users").select();
      setFetchData(data);
      console.log("💙", data.data);
    };

    const prevSignInDetails = JSON.parse(localStorage.getItem("user"));
    if (prevSignInDetails) {
      authDetail.setUserAuthDetail(prevSignInDetails);
    }
    fetchData();
  }, []);

  return (
    <>
      {windowStatus.windowShow && (
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
                authDetail.userAuthDetail.isLoggedIn ? (
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
            </div>
          </section>
        </Draggable>
      )}
    </>
  );
};

export default WindowFrame;
