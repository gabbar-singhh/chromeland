import React, { useState } from "react";
import styles from "./MenuFeedback.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import validator from "validator";
import supabase from "@/lib/supabaseClient";
import Spinner from "../Extras/Spinner/Spinner";

const MenuProfile = () => {
    const { user, error, isLoading } = useUser();

    const [showLoader, setShowLoader] = useState(false);
    const [btnText, setBtnText] = useState("submit")
    const [feedbackPlaceholder, setFeedbackPlaceholder] = useState("here you go!");

    const [name, setName] = useState(user.name || "Monkey D. Luffy");
    const [email, setEmail] = useState(user.email || "luffy.monkey@pirate.com");
    const [feedback, setFeedback] = useState("");

    const submitHandler = () => {
        console.log("starts!   showLoader:", showLoader);

        if (
            validator.isEmail(email) &&
            !validator.isEmpty(name) &&
            !validator.isEmpty(feedback)
        ) {
            setShowLoader(true)

            insertDataToFeedbackTable(name, email, feedback);

            setTimeout(() => {
                setShowLoader(false)
            }, 4000);
        } else {
            console.log("Invalid input. Please provide a valid email and ensure name and feedback are empty.");
        }
        console.log("ends!   showLoader:", showLoader);

        setName("");
        setEmail("");
        setFeedback("");
        setBtnText("done");
        setFeedbackPlaceholder("");
    };

    const insertDataToFeedbackTable = async (
        input_name,
        input_email,
        input_feedback
    ) => {

        const insertData = await supabase
            .from("feedback")
            .insert([
                {
                    created_at: new Date().toISOString(),
                    name: input_name,
                    email_id: input_email,
                    feedback: input_feedback,
                },
            ])
            .select();

    };

    return (
        <section className={styles.main}>
            <div className={styles.form}>
                <div className={styles.feedback_name}>
                    <p>name:</p>
                    <input
                        className={`${styles.input}`}
                        value={name}
                        type="text"
                        name=""
                        id=""
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>

                <div className={styles.feedback_email}>
                    <p>email:</p>
                    <input
                        className={`${styles.input}`}
                        type="text"
                        name=""
                        id=""
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>

                <div className={styles.feedback_feedback}>
                    feedback:
                    <textarea
                        name=""
                        value={feedback}
                        onChange={(e) => {
                            setFeedback(e.target.value);
                        }}
                        id=""
                        cols="30"
                        rows="8"
                        placeholder={feedbackPlaceholder}
                    ></textarea>
                </div>
            </div>

            <div className={styles.submit_btn} onClick={submitHandler}>
                {showLoader ? <Spinner /> : btnText}
            </div>
        </section>
    );
};

export default MenuProfile;