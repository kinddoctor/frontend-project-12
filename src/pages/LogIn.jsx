import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';

import { setError } from '../redux/store/authSlice';
import sendAuthRequest from '../api/auth.service';
import discussionImg from '../assets/img/discussionImg.png';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorizationError = useSelector((state) => state.auth.error);
  const clearAuthorizationError = () => dispatch(setError(''));

  const handleSubmit = async ({ username, password }) => {
    const autorize = () => navigate('/');
    await sendAuthRequest(dispatch, { username, password }, autorize);
  };

  const { t } = useTranslation();

  return (
    <div className="container-fluid h-75">
      <div className="row justify-content-center align-content-end h-100">
        <div className="col-10 col-xl-6">
          <div className="shadow">
            <div className="row p-4">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={discussionImg} alt="" className="img-fluid rounded w-auto" />
              </div>
              <div className="col-12 col-md-6 mt-3 mt-md-0 d-flex flex-column align-items-center justify-content-center">
                <h1 className="mb-4">Войти</h1>
                <Formik
                  initialValues={{ username: '', password: '' }}
                  onSubmit={(values) => handleSubmit(values)}
                >
                  {() => (
                    <Form
                      onChange={clearAuthorizationError}
                      className="d-flex flex-column align-items-center justify-content-center w-100"
                    >
                      <Field
                        type="text"
                        name="username"
                        className="form-control d-block mb-3"
                        placeholder="Ваш ник"
                      />
                      <Field
                        type="password"
                        name="password"
                        className="form-control mb-3"
                        placeholder="Пароль"
                      />
                      {authorizationError ? (
                        <div className="alert alert-danger text-center p-2" role="alert">
                          {t(`errors.${authorizationError}`)}
                        </div>
                      ) : null}
                      <button type="submit" className="w-100 mt-1 fs-4 btn btn-dark">
                        Войти
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="p-3 text-center bg-primary-subtle border">
              <p className="mb-1 fs-5">
                {'Нет аккаунта? '}
                <Link className="text-info" to="/signup">
                  Регистрация
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
