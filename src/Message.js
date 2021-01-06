import React, { forwardRef } from "react";

// material ui
import { Card, CardContent, Typography } from "@material-ui/core";

/*
  Q - Why use forwardRef ????
  A - Functional components do not have a ref, which is needed by Flip Move to work. To make it work you need to wrap your functional component into React.forwardRef and pass it down to the first element which accepts refs, such as DOM elements or class components:
*/

const Message = forwardRef(({ username, message }, ref) => {
  // higher order function
  const isUser = username === message.username;

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      {/* ref = 어떤 요소가 정확히 무엇인지 알려주는 일종의 링크 */}
      {/* BEM??????? */}
      <Card className={isUser ? "message__userCard" : "message_guestCard"}>
        <CardContent>
          <Typography color="white" variant="h5" component="h2">
            {!isUser && `${message.username || "Unknown User"} :`}{" "}
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
