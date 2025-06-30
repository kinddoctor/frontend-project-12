import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function ChannelChat({
  currentUser,
  channelName = 'Загружаем...',
  channelId,
  messages = [],
  sendMessageHandler,
}) {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, [channelName]);

  return (
    <div className="d-flex flex-column justify-content-between h-100 pb-4">
      <div className="row p-3 shadow-sm bg-primary-subtle">
        <span className="fw-medium">{channelName}</span>
        <span>{`${messages.length} сообщений`}</span>
      </div>
      <div className="h-100 p-4">
        {messages.map(({ body, username, id }) => (
          <div className="text-break">
            <span key={id} className="fw-medium">
              {`${username}: `}
            </span>
            {body}
          </div>
        ))}
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newMessage = { body: inputRef.current.value, channelId, username: currentUser };
            sendMessageHandler(newMessage);
            inputRef.current.value = '';
          }}
          className="input-group"
        >
          <input
            ref={inputRef}
            className="form-control"
            placeholder={t('channelChat.placeholders.input')}
            aria-label="Your message"
          />
          <button type="submit" className="btn btn-outline-secondary">
            {t('channelChat.submitBtn')}
          </button>
        </form>
      </div>
    </div>
  );
}
