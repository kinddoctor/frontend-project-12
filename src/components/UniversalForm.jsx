import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';

function UniversalForm({
  handleSubmit,
  clearAuthorizationError,
  authorizationError,
  needToConfirmPassword,
  imgSrc,
  footer,
}) {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-75">
      <div className="row justify-content-center align-content-end h-100">
        <div className="col-10 col-xl-6">
          <div className="shadow">
            <div className="row p-4">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={imgSrc} alt="" className="img-fluid rounded w-auto" />
              </div>
              <div className="col-12 col-md-6 mt-3 mt-md-0 d-flex flex-column align-items-center justify-content-center">
                <h1 className="mb-4">Войти</h1>
                <Formik
                  initialValues={{ login: '', password: '' }}
                  onSubmit={(values) => handleSubmit(values)}
                >
                  {() => (
                    <Form
                      onChange={clearAuthorizationError}
                      className="d-flex flex-column align-items-center justify-content-center w-100"
                    >
                      <Field
                        type="login"
                        name="login"
                        className="form-control d-block mb-3"
                        placeholder="Ваш ник"
                      />
                      <Field
                        type="password"
                        name="password"
                        className="form-control mb-3"
                        placeholder="Пароль"
                      />
                      {needToConfirmPassword && (
                        <Field
                          type="password"
                          name="password"
                          className="form-control mb-3"
                          placeholder="Подтвердите пароль"
                        />
                      )}
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
            <div className="p-3 text-center bg-primary-subtle border">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversalForm;
