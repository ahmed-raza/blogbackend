import React, { useEffect, useState } from "react";
import { Message } from "semantic-ui-react";

const Messages = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message !== "") {
      setVisible(true);
    }
  }, [message]);

  const handleDismiss = () => {
    setVisible(false);
    message = "";
  };

  if (visible) {
    return (
      <Message
        success
        onDismiss={handleDismiss}
        header="Success"
        content={message}
      />
    );
  }

  return;
};

export default Messages;
