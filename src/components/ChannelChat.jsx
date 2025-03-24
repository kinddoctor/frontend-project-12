export default function ChannelChat({ channelName, messages }) {
  return (
    <div className="d-flex flex-column justify-content-between h-100 pb-4">
      <div className="row p-3 shadow-sm bg-primary-subtle">
        <span>{channelName}</span>
        <span>{`${messages.length} сообщений`}</span>
      </div>
      <div className="input-group">
        <input
          className="form-control"
          placeholder="Введите сообщение"
          aria-label="Your message"
        />
        <button type="submit" className="btn btn-outline-secondary">
          Отправить
        </button>
      </div>
    </div>
  );
}
