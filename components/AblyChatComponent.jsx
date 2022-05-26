import React, { useEffect, useState } from 'react';
import { useChannel } from "./AblyReactEffect";
import styles from './AblyChatComponent.module.css';
import { useSpeechSynthesis } from 'react-speech-kit';
import  { getDefaultName, getRandomFact } from '../utils/Utils';

const AblyChatComponent = () => {

  const { speak } = useSpeechSynthesis();

  let inputBox = null;
  let messageEnd = null;

  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;
  const [userName, setUserName] = useState(getDefaultName());

  const [messCounter, setMessCounter] = useState(0);

  const [channel, ably] = useChannel("chat-demo", (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
    if (message.data.userName === 'System') {
      speak({ text: `Nerad tě vyrušuji, ale rád bych ti připomněl, že: ${message.data.text}`});
    } else {
      speak({ text: `${message.data.userName} řekl: ${message.data.text}`});
    }
  });

  const sendChatMessage = (messageText) => {
    channel.publish({ name: "chat-message", data: {userName: userName, text: messageText}});
    setMessageText("");
    inputBox.focus();
    setMessCounter(messCounter + 1);

    // Make random annoucment in messCounter * 10 minutes
    setTimeout(() => {
      const fact = getRandomFact();
      sendSystemMessage(`${fact}. Konec hlášení`);
    }, (messCounter + 1) * 600000);
  }

  const sendSystemMessage = (messageText) => {
    channel.publish({ name: "chat-message", data: {userName: 'System', text: messageText}});
  }

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  }

  const handleKeyPress = (event) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  }

  const messages = receivedMessages.map((message, index) => {
  const author = message.connectionId === ably.connection.id ? "me" : "other";
  const alignMessage = (author === "me")? "right":"left";
  console.log(alignMessage);
    return (
      <span key={index} align-message={alignMessage}>
        <div className={styles.messageHeader}>{message.data.userName + ':'}</div>
        <div className={styles.message} data-author={author}>{message.data.text}</div>
      </span>
    );
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messages}
        <div ref={(element) => { messageEnd = element; }}></div>
      </div>
      <table>
        <thead>
          <tr className={styles.textInputTableHead}>
            <th>Username</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><textarea
              ref={(element) => { inputBox = element; }}
              value={userName}
              placeholder="Type a message..."
              onChange={e => setUserName(e.target.value)}
            ></textarea></td>
            <td>
              <form onSubmit={handleFormSubmission} className={styles.form}>
                <textarea
                  ref={(element) => { inputBox = element; }}
                  value={messageText}
                  placeholder="Type a message..."
                  onChange={e => setMessageText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={styles.textarea}
                ></textarea>
                <button type="submit" className={styles.button} disabled={messageTextIsEmpty}>Send</button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AblyChatComponent;