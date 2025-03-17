import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/store/authSlice';
import { useLoginMutation } from '../redux/api';

import axios from 'axios';
import UniversalForm from '../components/UniversalForm';
import discussionImg from '../assets/img/discussionImg.png';

function LoginForm() {
  const [authorizationError, setError] = useState(null);
  const setAuthorizationErrorToNull = () => setError(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { error }] = useLoginMutation();

  const loginFooter = (
    <p className="mb-1 fs-5">
      {'Нет аккаунта? '}
      <Link className="text-info" to="/signup">
        Регистрация
      </Link>
    </p>
  );

  const handleSubmit = async (values) => {
    console.log(values);
    const token = await login(values);
    console.log(token);
    // axios
    //   .post('/api/v1/login', {
    //     username: values.login,
    //     password: values.password,
    //   })
    //   .then(({ data }) => {
    //     localStorage.setItem('tokenJWT', data.token);
    //     console.log(JSON.stringify(data.token));
    //     navigate('/');
    //   })
    //   .catch((error) => {
    //     setError(error.response.statusText);
    //     throw error;
    //   });
  };

  return (
    <UniversalForm
      handleSubmit={(values) => handleSubmit(values)}
      setAuthorizationErrorToNull={setAuthorizationErrorToNull}
      authorizationError={authorizationError}
      imgSrc={discussionImg}
      footer={loginFooter}
    />
  );
}

export default LoginForm;
