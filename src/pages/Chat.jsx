import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setData } from '../redux/store/authSlice';
import {
  useGetChannelsQuery,
  useRenameChannelMutation,
  useDeleteChannelMutation,
  useAddChannelMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
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
  const [renameChannel] = useRenameChannelMutation();
  const [deleteChannel] = useDeleteChannelMutation();
  const { data: channels } = useGetChannelsQuery();
  const { data: messages } = useGetMessagesQuery();
  const username = useSelector((state) => state.auth.data.username);

  const [activeChannelId, setActiveChannelId] = useState(null);
  const newAddedChannelName = useRef(null);
  const [showModal, setShowModal] = useState(null);
  const handleCloseModal = () => setShowModal(null);
  const [showChannelOptions, setShowChannelOptions] = useState(null);

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

  const chooseModalAction = (modal) => (data) => {
    switch (modal) {
      case 'addChannelModal':
        newAddedChannelName.current = data.name;
        return addChannel(data);
      case 'renameChannelModal':
        return renameChannel(data);
      case 'deleteChannelModal':
        return deleteChannel(data);
      default:
        throw new Error('There is no modal action for these case!');
    }
  };

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
          <ul className="nav d-block">
            {channels?.map((channel) => (
              <li key={channel.id}>
                <div className="d-flex dropdown btn-group">
                  <button
                    onClick={() => setActiveChannelId(channel.id)}
                    type="button"
                    className={`w-100 fs-6 fw-normal text-start text-break btn border-0 ${channel.id === activeChannelId ? 'btn-dark' : ''}`}
                  >
                    {`# ${channel.name}`}
                  </button>
                  {channel.removable ? (
                    <>
                      <button
                        onClick={() => {
                          const areThisChannelOptionsShowing = showChannelOptions === channel.id;
                          return areThisChannelOptionsShowing
                            ? setShowChannelOptions(null)
                            : setShowChannelOptions(channel.id);
                        }}
                        type="button"
                        className={`btn dropdown-toggle dropdown-toggle-split ${showChannelOptions === channel.id ? 'btn-outline-dark' : ''}`}
                      >
                        <span className="visually-hidden">Управление каналом</span>
                      </button>
                      <ul
                        className={`dropdown-menu ${showChannelOptions === channel.id ? 'show' : ''} `}
                        style={{
                          position: 'absolute',
                          inset: '40px -30px auto auto',
                        }}
                      >
                        <li>
                          <a
                            onClick={() => setShowModal('deleteChannelModal')}
                            role="button"
                            className="dropdown-item"
                          >
                            Удалить
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => setShowModal('renameChannelModal')}
                            role="button"
                            className="dropdown-item"
                          >
                            Переименовать
                          </a>
                        </li>
                      </ul>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
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
        showModal={showModal}
        optionsChannelId={showChannelOptions}
        handleClose={() => {
          setShowChannelOptions(null);
          handleCloseModal();
        }}
        handleModalAction={chooseModalAction(showModal)}
        channelsNames={channels?.map(({ name }) => name)}
      />
    </div>
  );
}

export default ChatPage;
