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
  // state means no refresh, that's why we using STATE
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // useState = variavle in REACT (매번 재실행)
  // useEffect = run code on a condition in REACT(특정 조건에서 한번 실행)

  // ===== get messages from firebase ========

  useEffect(() => {
    // run once when the component loads
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // collection -> get whole docs -> access each doc -> make doc to json by doc.data()
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  // ========================================

  // for pop up function that try to save username
  useEffect(() => {
    // run code here...
    // const username = prompt("이름을 입력해 주세요.")
    setUsername(prompt("이름을 입력해 주세요."));
  }, []); // condition(second patameter)
  // if it's black inside[], this code run ONCE when the app component loads
  // else if it have a variable like 'input', it runs every time when 'input' is changed

  // ===== add messages to firbass ========

  const sendMessage = (event) => {
    event.preventDefault();
    // all the logic to send a message goes

    db.collection("messages").add({
      // this codes will add username, message to firebase
      // and it's need timestamp
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // this codes send message by the local way
    // '...messages'가 없으면 input할 때마다 대화기록이 모두 사라질 것
    // setMessages([...messages, { username: username, message: input }]);

    // init input
    setInput("");
  };

  // ========================================

  return (
    <div className="App">
      <h1>Hello Programmer</h1>
      <h2>Welcome {username}</h2>

      <form className="app__form">
        {/* before code */}
        {/* <input 
          value={input}
          onChange={(event) => setInput(event.target.value)}
        /> */}

        <FormControl className="app__formControl">
          <InputLabel>Enter a message...</InputLabel>
          {/* input field */}
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

          {/* button */}
          {/* <Button
            type="submit"
            onClick={sendMessage}
            variant="contained"
            color="primary"
            disabled={!input}
          >
            Send Messages
          </Button> */}
        </FormControl>
      </form>
      {/* 
        messages themselves - 실제로 메세지를 웹에 띄우는 작업을 할 듯
        배열에 map을 시키는데 p태그 붙여서 그냥 읽히면 됨 - jsx의 위력
      */}

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>

      {/* 유저와 메세지 내용을 명확하게 분리해야한다? */}
    </div>
  );
}

export default App;
