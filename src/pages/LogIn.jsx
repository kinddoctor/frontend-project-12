import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { setError } from '../redux/store/authSlice';
import sendAuthRequest from '../api/auth.service';
import UniversalForm from '../components/UniversalForm';
import discussionImg from '../assets/img/discussionImg.png';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorizationError = useSelector((state) => state.auth.error);
  const clearAuthorizationError = () => dispatch(setError(''));

  const handleSubmit = async ({ login: username, password }) => {
    const autorize = () => navigate('/chat');
    await sendAuthRequest(dispatch, { username, password }, autorize);
  };

  const loginFooter = (
    <p className="mb-1 fs-5">
      {'Нет аккаунта? '}
      <Link className="text-info" to="/signup">
        Регистрация
      </Link>
    </p>
  );

  return (
    <UniversalForm
      handleSubmit={(values) => handleSubmit(values)}
      clearAuthorizationError={clearAuthorizationError}
      authorizationError={authorizationError}
      needToConfirmPassword={false}
      imgSrc={discussionImg}
      footer={loginFooter}
    />
  );
}

export default LoginForm;
