import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatPage() {
  const hasToken = Object.prototype.hasOwnProperty.call(localStorage, 'tokenJWT');
  const navigate = useNavigate();
  if (!hasToken) {
    useEffect(() => {
      navigate('/login');
    });
  } else {
    return (
      <div>
        YOU MADE IT!
      </div>
    );
  }
}

export default ChatPage;
