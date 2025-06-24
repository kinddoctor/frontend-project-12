import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setData } from '../redux/store/authSlice';
import { useGetChannelsQuery, useGetMessagesQuery, useSendMessageMutation } from '../redux/api';
import ChannelChat from '../components/ChannelChat';

function ChatPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sendMessage] = useSendMessageMutation();
  const username = useSelector((state) => state.auth.data.username);

  const token = localStorage.getItem('ChattyChat token');
  if (!token) {
    useEffect(() => {
      navigate('/login');
    });
  } else {
    const previousUsername = localStorage.getItem('ChattyChat username');
    dispatch(setData({ token, username: previousUsername }));
  }

  const { data: channels } = useGetChannelsQuery();
  const { data: messages } = useGetMessagesQuery();
  const [activeChannelId, setActiveChannelId] = useState(null);

  const getActiveChannel = () => channels?.filter((chan) => chan.id === activeChannelId)[0];
  const getActiveChannelMessages = () =>
    messages?.filter(({ channelId }) => channelId === activeChannelId);

  useEffect(() => {
    if (activeChannelId) {
      return;
    }
    if (!activeChannelId && channels) {
      const defaultActiveChannelId = channels.filter((chan) => chan.name === 'general')[0].id;
      setActiveChannelId(defaultActiveChannelId);
    }
  }, [channels]);

  return (
    <div className="container h-75 my-sm-5 border shadow">
      <div className="row h-100">
        <div className="col-3 col-xl-2 h-100 px-1 py-4 bg-primary-subtle border-end">
          <div className="d-none d-sm-block w-100 text-center mb-4 fs-4 fw-medium">Каналы</div>
          {channels?.map((channel) => (
            <button
              key={channel.id}
              type="button"
              className={
                channel.id === activeChannelId
                  ? 'w-100 fs-6 fw-normal btn border-0 btn-dark'
                  : 'w-100 fs-6 fw-normal btn border-0'
              }
              onClick={() => setActiveChannelId(channel.id)}
            >
              &#9993;
              {channel.name}
            </button>
          ))}
        </div>
        <div className="col-9 col-xl-10">
          <ChannelChat
            currentUser={username}
            channelName={getActiveChannel()?.name}
            channelId={getActiveChannel()?.id}
            messages={getActiveChannelMessages()}
            sendMessageHandler={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
