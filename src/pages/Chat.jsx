import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../redux/store/authSlice';
import { useGetChannelsQuery, useGetMessagesQuery, useSendMessageMutation } from '../redux/api';
import ChannelChat from '../components/ChannelChat';

function ChatPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sendMessage] = useSendMessageMutation();
  const username = useSelector((state) => state.auth.data.username);

  const token = localStorage.getItem('tokenJWT');
  if (!token) {
    useEffect(() => {
      navigate('/login');
    });
  } else {
    dispatch(setToken(token));
  }

  const { data: channels } = useGetChannelsQuery();
  const { data: messages } = useGetMessagesQuery();
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeChannelMessages, setActiveChannelMessages] = useState([]);

  const getActiveChannelMessages = () =>
    messages?.filter(({ channelId }) => channelId === activeChannel?.id);

  const handleChannelChange = (channel) => {
    setActiveChannel(channel);
    setActiveChannelMessages(getActiveChannelMessages());
  };

  useEffect(() => {
    if (activeChannel) {
      return;
    }
    if (!activeChannel && channels && messages) {
      const defaultActiveChannel = channels.filter((chan) => chan.name === 'general')[0];
      handleChannelChange(defaultActiveChannel);
    }
  }, [channels]);

  useEffect(() => setActiveChannelMessages(getActiveChannelMessages()), [messages]);

  return (
    <div className="container h-75 my-5 border shadow">
      <div className="row h-100">
        <div className="col-3 h-100 px-5 py-4 bg-primary-subtle border-end">
          <div className="row mb-4 fs-4 fw-medium">Каналы</div>
          {channels?.map((channel) => (
            <button
              key={channel.id}
              type="button"
              className="fs-5 fw-normal btn btn-outline-dark border-0"
              onClick={() => handleChannelChange(channel)}
            >
              &#9993;
              {channel.name}
            </button>
          ))}
        </div>
        <div className="col-9">
          <ChannelChat
            username={username}
            channelName={activeChannel?.name}
            channelId={activeChannel?.id}
            messages={activeChannelMessages}
            sendMessageHandler={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
