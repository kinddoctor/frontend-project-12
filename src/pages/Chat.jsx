import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../redux/store/authSlice';
import { useGetChannelsQuery } from '../redux/api';

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
}

export default ChatPage;
