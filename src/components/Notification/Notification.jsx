import React, { useEffect, useState } from "react";

const Notification = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const channel = new BroadcastChannel("notification-channel");

    channel.onmessage = (event) => {
      setMessage(event.data);
    };

    return () => {
      channel.close();
    };
  }, []);

  return (
    <div className="notification">
      {message && <div className="notification-content">{message}</div>}
    </div>
  );
};

export default Notification;
