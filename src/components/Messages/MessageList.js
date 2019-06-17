import React from 'react';

import MessageItem from './MessageItem';

const MessageList = ({
  authUser,
  messages,
  onEditMessage,
  onCompleteMessage,
  onRemoveMessage,
}) => (
  <ol>
    {messages.map(message => (
      <MessageItem
        authUser={authUser}
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onCompleteMessage={onCompleteMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ol>
);

export default MessageList;
