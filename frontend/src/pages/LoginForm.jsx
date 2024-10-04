import {
  Formik, Form, Field,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// валидация - что логинящийся юзер (его логин) есть в базе, и что его пароль соответствует логину

function LoginForm() {
  const navigate = useNavigate();
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
                  onSubmit={(values, { setErrors }) => {
                    axios.post('/api/v1/login', { username: values.login, password: values.password })
                      .then(({ data }) => {
                        console.log(`${data}`);
                        localStorage.setItem('tokenJWT', data.token);
                        console.log(`hey, token is here ---> ${localStorage.getItem('tokenJWT')}`);
                        navigate('/');
                      })
                      .catch((error) => setErrors({ submit: [error.response.statusText] }));
                  }}
                >
                  {(errors) => (
                    <Form className="d-flex flex-column align-items-center justify-content-center w-100">
                      <Field type="login" name="login" className="form-control d-block mb-3" placeholder="Ваш ник" />
                      <Field type="password" name="password" className="form-control mb-4" placeholder="Пароль" />
                      {errors.submit ? <div> УПС </div> : null}
                      <button type="submit" className="w-100 mb-3 btn btn-dark">
                        Войти
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="p-3 text-center bg-warning-subtle border">
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
