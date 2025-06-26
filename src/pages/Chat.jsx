import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setData } from '../redux/store/authSlice';
import {
  useGetChannelsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useAddChannelMutation,
} from '../redux/api';
import ChannelChat from '../components/ChannelChat';
import AppModal from '../components/AppModal';

function ChatPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem('ChattyChat token');
  if (!token) {
    useEffect(() => {
      navigate('/login');
    });
  } else {
    const currentUsername = localStorage.getItem('ChattyChat username');
    dispatch(setData({ token, username: currentUsername }));
  }

  const [sendMessage] = useSendMessageMutation();
  const [addChannel] = useAddChannelMutation();
  const { data: channels } = useGetChannelsQuery();
  const { data: messages } = useGetMessagesQuery();
  const username = useSelector((state) => state.auth.data.username);

  const [activeChannelId, setActiveChannelId] = useState(null);
  const newAddedChannelName = useRef(null);
  const [showModal, setShowModal] = useState(null);
  const handleCloseModal = () => setShowModal(null);

  const getActiveChannel = () => channels?.filter((chan) => chan.id === activeChannelId)[0];
  const getActiveChannelMessages = () =>
    messages?.filter(({ channelId }) => channelId === activeChannelId);

  // set default channel for first render and when active channel was deleted
  // make newly added channel the active one
  useEffect(() => {
    if ((!activeChannelId || !getActiveChannel()) && channels) {
      const defaultActiveChannelId = channels.filter((chan) => chan.name === 'general')[0].id;
      setActiveChannelId(defaultActiveChannelId);
    }
    if (newAddedChannelName.current) {
      const newActiveChannelId = channels.filter(
        (chan) => chan.name === newAddedChannelName.current,
      )[0].id;
      setActiveChannelId(newActiveChannelId);
      newAddedChannelName.current = null;
    }
  }, [channels]);

  return (
    <div className="container h-75 my-sm-5 border shadow">
      <div className="row h-100">
        <div className="col-3 col-xl-2 h-100 px-1 py-4 bg-primary-subtle border-end">
          <div className="d-flex justify-content-around w-100 text-center mb-4 fs-4 fw-medium">
            <span className="d-none d-sm-block">Каналы</span>
            <button
              onClick={() => setShowModal('addChannelModal')}
              type="button"
              className="btn btn-dark"
            >
              +
            </button>
          </div>
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
      <AppModal
        show={showModal}
        handleClose={handleCloseModal}
        handleModalAction={(data) => {
          newAddedChannelName.current = data.name;
          addChannel(data);
        }}
        channelsNames={channels?.map(({ name }) => name)}
      />
    </div>
  );
}

export default ChatPage;
