import { useRef } from 'react';

export default function ChannelChat({
  currentUser,
  channelName = 'Загружаем...',
  channelId,
  messages = [],
  sendMessageHandler,
}) {
  // console.log(messages);
  const inputRef = useRef(null);

  return (
    <div className="d-flex flex-column justify-content-between h-100 pb-4">
      <div className="row p-3 shadow-sm bg-primary-subtle">
        <span className="fw-medium">{channelName}</span>
        <span>{`${messages.length} сообщений`}</span>
      </div>
      <div className="h-100 p-4">
        {messages.map(({ body, username }) => (
          <div>
            <span className="fw-medium">{username}: </span>
            {body}
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          ref={inputRef}
          className="form-control"
          placeholder="Введите сообщение"
          aria-label="Your message"
        />
        <button
          onClick={() => {
            const newMessage = { body: inputRef.current.value, channelId, username: currentUser };
            sendMessageHandler(newMessage);
            inputRef.current.value = '';
          }}
          type="submit"
          className="btn btn-outline-secondary"
        >
          Отправить
        </button>
      </div>
    </div>
  );
}
