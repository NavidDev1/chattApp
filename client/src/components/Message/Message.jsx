import React from 'react';

function Message({ message }) {
  return (
    <div className="Message">
      <p>{message.author}: {message.text}</p>
    </div>
  );
}

export default Message;
