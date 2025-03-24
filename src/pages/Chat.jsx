import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../redux/store/authSlice';
import { useGetChannelsQuery, useGetMessagesQuery } from '../redux/api';
import ChannelChat from '../components/ChannelChat';

function ChatPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('tokenJWT');
  if (!token) {
    useEffect(() => {
      navigate('/login');
    });
  } else {
    dispatch(setToken(token));
  }

  const { data: channels } = useGetChannelsQuery();
  const chatChannels = channels ?? [];
  const { data: messages } = useGetMessagesQuery();
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeChannelMessages, setActiveChannelMessages] = useState([]);

  const handleChatClick = (channel) => {
    setActiveChannel(channel);
    setActiveChannelMessages(
      messages
        .filter(({ channelId }) => channelId === activeChannel.id)
        .map(({ body }) => body),
    );
  };

  return (
    <div className="container h-75 my-5 border shadow">
      <div className="row h-100">
        <div className="col-3 h-100 px-5 py-4 bg-primary-subtle border-end">
          <div className="row mb-4 fs-4 fw-medium">Каналы</div>
          {chatChannels.map(({ name, id }) => (
            <button
              key={id}
              type="button"
              className="fs-5 fw-normal btn btn-outline-dark border-0"
              onClick={() => handleChatClick({ name, id })}
            >
              &#9993;
              {name}
            </button>
          ))}
        </div>
        <div className="col-9">
          {activeChannel ? (
            <ChannelChat
              channelName={activeChannel.name}
              messages={activeChannelMessages}
            />
          ) : (
            <div className="p-5 fs-4">
              <p>Тут будут выводится сообщения из каналов...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
