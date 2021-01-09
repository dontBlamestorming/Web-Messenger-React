import React, { useState, useEffect } from "react";

// other components
import Message from "./Message";

// firebase
import firebase from "firebase";

// db
import db from "./firebase";

// material ui
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

// css
import "./Message.css";
import "./App.css";

// for animation
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // ===== get messages from firebase ========
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);
  // ========================================

  // for pop up function that try to save username
  useEffect(() => {
    setUsername(prompt("이름을 입력해 주세요."));
  }, []);

  // ===== add messages to firebass ========
  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  // ========================================

  return (
    <div className="App">
      <img src="/logo192.png" alt="React Logo Image" />
      <h1>Welcome to Web-messenger made by dontBlamestroming</h1>
      <h2>반가워요 {username}님😄</h2>

      {/* 하단의 input box */}
      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Enter a message...</InputLabel>
          <Input
            className="app__input"
            placeholder="메세지를 입력하세요."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            className="app_iconButton"
            type="submit"
            onClick={sendMessage}
            variant="contained"
            color="primary"
            disabled={!input}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      {/* 채팅 메시지  */}
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
