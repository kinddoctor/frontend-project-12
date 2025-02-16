import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import UniversalForm from '../components/UniversalForm';
import discussionImg from '../assets/img/discussionImg.png';

function LoginForm() {
  const [authorizationError, setError] = useState(null);
  const setAuthorizationErrorToNull = () => setError(null);
  const navigate = useNavigate();

  const loginFooter = (
    <p className="mb-1 fs-5">
      {'Нет аккаунта? '}
      <Link className="text-info" to="/signup">
        Регистрация
      </Link>
    </p>
  );

  const handleSubmit = (values) => {
    axios
      .post('/api/v1/login', {
        username: values.login,
        password: values.password,
      })
      .then(({ data }) => {
        localStorage.setItem('tokenJWT', data.token);
        navigate('/');
      })
      .catch((error) => setError(error.response.statusText));
  };

  return (
    <UniversalForm
      handleSubmit={handleSubmit}
      setAuthorizationErrorToNull={setAuthorizationErrorToNull}
      authorizationError={authorizationError}
      imgSrc={discussionImg}
      footer={loginFooter}
    />
  );
}

export default LoginForm;
