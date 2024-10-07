import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Formik, Form, Field,
} from 'formik';
import axios from 'axios';

function LoginForm() {
  const [authorizationError, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-10 col-xl-6">
          <div className="shadow">
            <div className="row p-4">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="./assets/img/discussionImg.png" alt="conversation of two" className="img-fluid rounded w-auto" />
              </div>
              <div className="col-12 col-md-6 mt-3 mt-md-0 d-flex flex-column align-items-center justify-content-center">
                <h1 className="mb-4">Войти</h1>
                <Formik
                  initialValues={{ login: '', password: '' }}
                  onSubmit={(values) => {
                    axios.post('/api/v1/login', { username: values.login, password: values.password })
                      .then(({ data }) => {
                        localStorage.setItem('tokenJWT', data.token);
                        navigate('/');
                      })
                      .catch((error) => setError(error.response.statusText));
                  }}
                >
                  {() => (
                    <Form className="d-flex flex-column align-items-center justify-content-center w-100">
                      <Field type="login" name="login" className="form-control d-block mb-3" placeholder="Ваш ник" />
                      <Field type="password" name="password" className="form-control mb-4" placeholder="Пароль" />
                      {authorizationError ? <div className="alert alert-danger text-center" role="alert">{t(`errors.${authorizationError}`)}</div> : null}
                      <button type="submit" className="w-100 mb-3 btn btn-dark">
                        Войти
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="p-3 text-center bg-primary-subtle border">
              <p className="mb-1">
                Нет аккаунта?
                Регистрация
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
