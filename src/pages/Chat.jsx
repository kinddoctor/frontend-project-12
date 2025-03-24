import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../redux/store/authSlice';
import { useGetChannelsQuery } from '../redux/api';
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

  return (
    <div className="container h-75 my-5 border shadow">
      <div className="row h-100">
        <div className="col-3 h-100 px-5 py-4 bg-primary-subtle border-end">
          <div className="row mb-4 fs-4 fw-medium">Каналы</div>
          {chatChannels.map(({ name }) => (
            <div className="row fs-5 fw-normal">&#9993; {name}</div>
          ))}
        </div>
        <div className="col-9">
          {/* <div className="p-5 fs-4">
            <p>Тут будут выводится сообщения из каналов...</p>
          </div> */}
          <ChannelChat channelName="some channel" messages={[]} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
